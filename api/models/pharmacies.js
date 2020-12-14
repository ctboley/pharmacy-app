/**
 * Model: Pharmacies
 */

const AWS = require("aws-sdk");
const shortid = require("shortid");

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/**
 * Inserts a pharmacy into DynamoDb
 *
 * @param {Object} pharmacy
 */
const insert = async (pharmacy) => {
  validatePharmacy(pharmacy);

  const params = {
    TableName: process.env.db,
    Item: {
      _id: shortid.generate(),
      name: pharmacy.name,
      address: pharmacy.address,
      city: pharmacy.city,
      state: pharmacy.state,
      zip: pharmacy.zip,
      latitude: pharmacy.latitude,
      longitude: pharmacy.longitude,
    },
  };

  await dynamodb.put(params).promise();
};

/**
 * Selects all pharmacies
 *
 * @returns {Object[]} - An array of pharmacies
 */
const getPharmacies = async () => {
  const params = {
    TableName: process.env.db,
  };

  const pharmacies = await dynamodb.scan(params).promise();
  return pharmacies;
};

/**
 * Selects a pharmacy with the given Id
 *
 * @param {string} id
 */
const getPharmacyById = async (id) => {
  const params = {
    TableName: process.env.db,
    Key: {
      _id: id,
    },
  };

  const pharmacy = await dynamodb.get(params).promise();
  return pharmacy;
};

/**
 * Validates pharmacy attributes
 *
 * @param {Object} pharmacy
 */
const validatePharmacy = (pharmacy) => {
  if (!pharmacy.name) {
    throw new Error(`"name" is required`);
  }
  if (!pharmacy.address) {
    throw new Error(`"address" is required`);
  }
  if (!pharmacy.city) {
    throw new Error(`"city" is required`);
  }
  if (!pharmacy.state) {
    throw new Error(`"state" is required`);
  }
  if (!pharmacy.zip) {
    throw new Error(`"zip" is required`);
  }
  if (!pharmacy.latitude) {
    throw new Error(`"latitude" is required`);
  }
  if (!pharmacy.longitude) {
    throw new Error(`"longitude" is required`);
  }
};

module.exports = {
  insert,
  getPharmacies,
  getPharmacyById,
};
