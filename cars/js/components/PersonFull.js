import React, {Component} from "react";
import Relay from "react-relay";

class PersonFull extends Component {
  render () {
    const { person } = this.props;
    return <span>
      <strong>{person.name}</strong>
      <span> </span>
      (<em>{person.age} years old</em>)
    </span>;
  }
}

export default Relay.createContainer(PersonFull, {
  fragments: {
    person: () => Relay.QL`
fragment on Person {
  id
  name
  age
}`
  }
});
