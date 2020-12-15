const { Pharmacies } = require("../models");

/**
 * Inserts a pharmacy based on the request body
 *
 * @param {Object} req - request
 * @param {Object} res - response
 */
const insert = async (req, res) => {
  try {
    await Pharmacies.insert(req.body);
  } catch {
    return res.status(400).send({ error: error.message });
  }

  res.status(200).send({ message: "Pharmacy created!", pharmacy: req.body });
};

/**
 * Gets the nearest pharmacy to the given latitude and longitude
 *
 * @param {Object} req - request
 * @param {Object} res - response
 */
const getByLatitudeAndLongitude = async (req, res) => {
  if (!req.body.latitude) {
    throw new Error(`"latitude" is required`);
  }
  if (!req.body.longitude) {
    throw new Error(`"longitude" is required`);
  }

  const pharmacy = await findNearestPharmacy(
    req.body.latitude,
    req.body.longitude
  );

  !pharmacy
    ? res.status(404).send({ message: "No Pharmacy found" })
    : res.status(200).send(pharmacy);
};

/**
 * Calculates the nearest pharmacy using haversine's formula
 *
 * @see https://www.igismap.com/haversine-formula-calculate-geographic-distance-earth/
 * @param {number} givenLatitude - latitude you wish to calculate distance from.
 * @param {number} givenLongitude - longitude you wish to calculate distance from.
 *
 * @returns {Object}
 */
const findNearestPharmacy = async (givenLatitude, givenLongitude) => {
  const { Items } = await Pharmacies.getPharmacies(
    givenLatitude,
    givenLongitude
  );
  const EARTHS_RADIUS_MILES = 3959; // constant for converting to miles, 6371 for kilometers
  let distanceArray = [];
  let radCurrentLat,
    radCurrentLong,
    deltaLong,
    radDeltaLong,
    deltaLat,
    radDeltaLat,
    distance;

  for (let item of Items) {
    const { latitude, longitude, _id } = item;

    if (givenLatitude == latitude && givenLongitude == longitude) {
      // already at the given latitude and longitude
      distanceArray.push({ _id, distance: 0 });
      break;
    } else {
      radCurrentLat = toRadians(givenLatitude);
      radCurrentLong = toRadians(givenLongitude);
      deltaLong = longitude - givenLongitude;
      radDeltaLong = toRadians(deltaLong);
      deltaLat = latitude - givenLatitude;
      radDeltaLat = toRadians(deltaLat);

      const a =
        Math.pow(Math.sin(radDeltaLat / 2), 2) +
        Math.cos(radCurrentLat) *
          Math.cos((latitude * Math.PI) / 180) *
          Math.pow(Math.sin(radDeltaLong / 2), 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      distance = EARTHS_RADIUS_MILES * c;

      distanceArray.push({ _id, distance });
    }
  }

  distanceArray.sort((firstE, secondE) => {
    return firstE.distance - secondE.distance;
  });

  const pharmacy = Items.find(
    (pharmacy) => pharmacy._id === distanceArray[0]._id
  );

  return { pharmacy, distance: distanceArray[0].distance };
};

/**
 * Converts a number to radians
 *
 * @param {number} num
 *
 * @returns the provided number in radians.
 */
const toRadians = (num) => {
  return (num * Math.PI) / 180;
};

module.exports = {
  insert,
  getByLatitudeAndLongitude,
};
