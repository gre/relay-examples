import React, {Component} from "react";
import Relay from "react-relay";

import PersonFull from "./PersonFull";

class Car extends Component {
  render () {
    const { car } = this.props;
    return <div>
      Car <strong>{car.model}</strong>
      <span> owned by </span>
      <PersonFull person={car.owner} />
    </div>;
  }
}
export default Relay.createContainer(Car, {
  fragments: {
    car: () => Relay.QL`
fragment on Car {
  id
  model
  owner { ${PersonFull.getFragment("person")} }
}`
  }
});
