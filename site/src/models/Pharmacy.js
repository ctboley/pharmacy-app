export default class Pharmacy {
  constructor(pharmacy, distance) {
    this._id = pharmacy._id;
    this.address = pharmacy.address;
    this.city = pharmacy.city;
    this.latitude = pharmacy.latitude;
    this.longitude = pharmacy.longitude;
    this.name = pharmacy.name;
    this.state = pharmacy.state;
    this.zip = pharmacy.zip;
    this.distance = distance;
  }

  toString() {
    return `Name: ${this.name}\nAddress: ${this.address}, ${this.city}, ${this.state} ${this.zip}\nDistance (in miles): ${this.distance}`;
  }
}
