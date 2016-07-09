import React, {Component} from "react";
import {render} from "react-dom";
import Relay from "react-relay";

import Car from "./components/Car";
import CarFull from "./components/CarFull";
import ChangeCarOwner from "./components/ChangeCarOwner";
import CarRoute from "./routes/CarRoute";
import GarageRoute from "./routes/GarageRoute";

const createEnv = () => {
  const env = new Relay.Environment();
  env.injectNetworkLayer(new Relay.DefaultNetworkLayer("/graphql"));
  return env;
};

class App extends Component {
  state = {
    env: createEnv(),
    carRoute: new CarRoute({ id: "1" }),
    garageRoute: new GarageRoute(),
    loadExtra: false,
  };

  onLoadExtra = () => this.setState({ loadExtra: true });

  render () {
    const { carRoute, garageRoute, env, loadExtra } = this.state;
    return <div>
      <Relay.Renderer
        environment={env}
        Container={ChangeCarOwner}
        queryConfig={garageRoute}
        render={({props, error}) =>
          error || !props
          ? undefined
          :
          <ChangeCarOwner
            {...props}
          />
        }
      />
      <hr />
      <Relay.Renderer
        environment={env}
        Container={Car}
        queryConfig={carRoute}
        render={({props, error}) =>
          error || !props
          ? undefined
          : <Car {...props} />
        }
      />
      <hr />
      {
        loadExtra
        ? <Relay.Renderer
          environment={env}
          Container={CarFull}
          queryConfig={carRoute}
          render={({props, error}) =>
            error || !props
            ? undefined
            : <CarFull {...props} />
          }
        />
        : <button onClick={this.onLoadExtra}>LOAD EXTRA</button> }
    </div>;
  }
}

render(
  <App />,
  document.getElementById("root")
);
