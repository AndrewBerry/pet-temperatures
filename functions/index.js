require("dotenv").config();

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio")(process.env.TWILLO_ACCOUNT_SID, process.env.TWILLO_AUTH_TOKEN);

admin.initializeApp();

const fieldLabels = {
  high: "High temp.",
  low: "Low temp.",
  humidity: "Humidity"
}

exports.submitDataPoint = functions.https.onRequest(async (req, res) => {
  const { high, low, humidity, petId } = req.body;

  if (
    typeof high === "undefined" ||
    typeof low === "undefined" ||
    typeof humidity === "undefined" ||
    typeof petId === "undefined"
  ) {
    res
      .status(401)
      .send({
        success: false,
        message: "Missing data points. Required: high, low, humidity and petId"
      })
      .end();

    return;
  }

  const petDoc = admin.firestore().doc(`pets/${petId}`);
  const petSnapshot = await petDoc.get();

  if (!petSnapshot.exists) {
    await petDoc.set({
      name: petId,
      temps: [
        {
          w: Date.now(),
          h: high,
          l: low,
          hu: humidity
        }
      ]
    });

    res.send({ success: true }).end();
    return;
  }

  const petData = petSnapshot.data();

  if (typeof petData === "undefined") {
    res
      .status(404)
      .send({
        success: false,
        message: "Could not locate userId/petId combination."
      })
      .end();

    return;
  }

  const temps = petData.temps || [];
  const recentTemps = temps.filter(({ w }) => w > Date.now() - 86400000);

  await petDoc.update({
    temps: [
      ...recentTemps,
      {
        w: Date.now(),
        h: high,
        l: low,
        hu: humidity
      }
    ]
  });

  const alertSnapshots = await admin.firestore().collection("alerts")
    .where("petIds", "array-contains", petId)
    .where("lastTriggered", "<=", Date.now() - (1000 * 60 * 60 * 60))
    .get();

  alertSnapshots.forEach(async doc => {
    const { field, operator, threshold, recipient } = doc.data();

    let message = null;

    switch (operator) {
      case "GT":
        if (req.body[field] > threshold) {
          message = `Pet Temperature Alert:\n\n${petData.name}: ${fieldLabels[field]} is exceeding ${threshold}`;
        }
        break;
      case "LT":
        if (req.body[field] > threshold) {
          message = `Pet Temperature Alert:\n\n${petData.name}: ${fieldLabels[field]} is below ${threshold}`;
        }
        break;
    }

    if (message === null) {
      return;
    }

    await twilio.messages
      .create({
        body: message,
        from: "PETTEMPS",
        to: recipient
      });

    await admin.firestore().doc(`alerts/${doc.id}`).update({
      lastTriggered: Date.now()
    });
  });

  res.send({ success: true }).end();
});
