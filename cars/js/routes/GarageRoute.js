import Relay from "react-relay";

export default class GarageRoute extends Relay.Route {
  static queries = {
    garage: () => Relay.QL`query { garage }`,
  };
  static routeName = "GarageRoute";
}
