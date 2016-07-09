
import Relay from "react-relay";

export default class ChangeCarOwnerMutation extends Relay.Mutation {
  static fragments = {
    car: () => Relay.QL`
      fragment on Car {
        id,
        owner { id }
      }
    `,
    person: () => Relay.QL`
      fragment on Person {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{changeCarOwner}`;
  }
  getCollisionKey() {
    return `car_${this.props.car.id}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ChangeCarOwnerPayload {
        car {
          id
          owner
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        car: this.props.car.id,
      },
    }];
  }
  getVariables() {
    return {
      carId: this.props.car.id,
      ownerId: this.props.person.id,
    };
  }
  getOptimisticResponse() {
    return {
      car: {
        id: this.props.car.id,
        owner: {
          id: this.props.person.id,
        },
      },
    };
  }
}
