
// Model types
export class Garage {
  constructor (id, cars, people) {
    this.id = id;
    this.cars = cars;
    this.people = people;
  }
}
export class Car {
  constructor (id, model, ownerId) {
    this.id = id;
    this.model = model;
    this.ownerId = ownerId;
  }
}
export class Person {
  constructor (id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

const persons = [
  new Person("1", "Michel", 32),
  new Person("2", "Bernard", 64),
  new Person("3", "Olivier", 20),
];

const cars = [
  new Car("1", "Fiat Punto", "1"),
  new Car("2", "BMW M3", "2"),
  new Car("3", "Citroen C5", "3"),
];

const garage = new Garage(
  "1",
  cars.map(c => c.id),
  persons.map(c => c.id),
);

export function getCar (id) {
  return cars.find(o => o.id === id);
}

export function getPerson (id) {
  return persons.find(o => o.id === id);
}

export function changeCarOwner (carId, ownerId) {
  const car = getCar(carId);
  if (!car) throw new Error("car "+carId+" not found");
  car.ownerId = ownerId;
}

export function getGarage () {
  return garage;
}
