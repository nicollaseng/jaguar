import React, { Component } from "react";

import VehicleContainer from "./VehicleContainer";
import VehicleContainerMobile from "./VehicleContainerMobile";
import { getVehicleDetails } from "../api/index";

import Media from "react-media";

export default class VehicleList extends Component {
  render() {
    return (
      <div>
        <Media
          query={{ minWidth: 300, maxWidth: 766 }}
          render={() => (
            <VehicleContainerMobile getVehicleDetails={getVehicleDetails} />
          )}
        />
        <Media
          query={{ minWidth: 1025 }}
          render={() => (
            <VehicleContainer getVehicleDetails={getVehicleDetails} />
          )}
        />
      </div>
    );
  }
}
