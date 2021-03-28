import Chance from "chance";

const chance = new Chance();

export const generate = n =>
  Array(n)
    .fill(null)
    .map(() => ({
      firstname: chance.first(),
      lastname: chance.last(),
      age: chance.age(),
      gender: chance.gender(),
      address: chance.address(),
      zip: chance.zip(),
      city: chance.city(),
      country: chance.country()
    }));
