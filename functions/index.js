const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

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
        message:
          "Missing data points. Required: high, low, humidity and petId"
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

  res.send({ success: true }).end();
});
