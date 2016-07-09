import React, {Component} from "react";
import Relay from "react-relay";
import ChangeCarOwnerMutation from "../mutations/ChangeCarOwnerMutation";

class ChangeCarOwner extends Component {

  onSubmit = () => {
    const { garage, relay } = this.props;
    relay.commitUpdate(
      new ChangeCarOwnerMutation({
        car: garage.cars[this.refs.car.selectedIndex],
        person: garage.people[this.refs.person.selectedIndex],
      })
    );
  };

  render () {
    const { garage } = this.props;
    return <div>
      <select ref="car">
      {garage.cars.map(car =>
        <option key={car.id} value={car.id}>
          {car.model}
        </option>)}
      </select>
      <select ref="person">
      {garage.people.map(person =>
        <option key={person.id} value={person.id}>
          {person.name}
        </option>)}
      </select>
      <button onClick={this.onSubmit}>ASSIGN CAR</button>
    </div>;
  }
}

export default Relay.createContainer(ChangeCarOwner, {
  fragments: {
    garage: () => Relay.QL`
fragment on Garage {
  people { name id ${ChangeCarOwnerMutation.getFragment("person")} }
  cars { model id ${ChangeCarOwnerMutation.getFragment("car")} }
}`
  }
});
