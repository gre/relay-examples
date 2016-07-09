import Relay from "react-relay";

export default class CarRoute extends Relay.Route {
  static queries = {
    car: () => Relay.QL`query { car(id: $id) }`,
  };
  static routeName = "CarRoute";
}
