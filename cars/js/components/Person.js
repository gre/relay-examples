import React, {Component} from "react";
import Relay from "react-relay";

class Person extends Component {
  render () {
    const { person } = this.props;
    return <span><strong>{person.name}</strong></span>;
  }
}

export default Relay.createContainer(Person, {
  fragments: {
    person: () => Relay.QL`
fragment on Person {
  id
  name
}`
  }
});
