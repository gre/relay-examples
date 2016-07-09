
import {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

import {
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from "graphql-relay";

import {
  Car,
  Person,
  Garage,
  getCar,
  getPerson,
  getGarage,
  changeCarOwner,
} from "./database";

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === "Car") {
      return getCar(id);
    } else if (type === "Person") {
      return getPerson(id);
    } else if (type === "Garage") {
      return getGarage();
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Car) {
      return carType;
    } else if (obj instanceof Person) {
      return personType;
    } else if (obj instanceof Garage) {
      return garageType;
    } else {
      return null;
    }
  }
);

const garageType = new GraphQLObjectType({
  name: "Garage",
  description: "a garage groups cars and owners",
  fields: () => ({
    id: globalIdField("Garage"),
    cars: {
      type: new GraphQLList(carType),
      resolve: obj => obj.cars.map(getCar),
    },
    people: {
      type: new GraphQLList(personType),
      resolve: obj => obj.people.map(getPerson),
    },
  }),
  interfaces: [nodeInterface],
});

const carType = new GraphQLObjectType({
  name: "Car",
  description: "a car",
  fields: () => ({
    id: globalIdField("Car"),
    model: {
      type: GraphQLString,
      description: "model of the car",
      resolve: obj => obj.model,
    },
    owner: {
      type: personType,
      description: "owner of the car",
      resolve: obj => getPerson(obj.ownerId),
    },
  }),
  interfaces: [nodeInterface],
});

const personType = new GraphQLObjectType({
  name: "Person",
  description: "a person",
  fields: () => ({
    id: globalIdField("Person"),
    name: {
      type: GraphQLString,
      description: "name of the person",
      resolve: obj => obj.name,
    },
    age: {
      type: GraphQLInt,
      description: "age of the person (in years)",
      resolve: obj => obj.age,
    },
  }),
  interfaces: [nodeInterface],
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    garage: {
      type: garageType,
      args: {

      },
      description: "the main garage",
      resolve: () => getGarage(),
    },
    car: {
      type: carType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      description: "get a car by its id",
      resolve: (root, {id}) => getCar(id),
    }
  }),
});

const ChangeCarOwnerMutation = mutationWithClientMutationId({
  name: "ChangeCarOwner",
  inputFields: {
    carId: { type: new GraphQLNonNull(GraphQLID) },
    ownerId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    car: {
      type: carType,
      resolve: ({ localCarId }) => getCar(localCarId),
    },
    owner: {
      type: personType,
      resolve: ({ localOwnerId }) => getPerson(localOwnerId),
    },
  },
  mutateAndGetPayload: ({ carId, ownerId }) => {
    const localCarId = fromGlobalId(carId).id;
    const localOwnerId = fromGlobalId(ownerId).id;
    changeCarOwner(localCarId, localOwnerId);
    return { localCarId, localOwnerId };
  },
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    changeCarOwner: ChangeCarOwnerMutation,
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
