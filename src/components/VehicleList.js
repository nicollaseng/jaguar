import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  cardMedia: {
    height: 300,
    width: "100%"
  },
  vehicleName: {
    textAlign: "center"
  },
  divVehicleName: {
    borderTop: "1px solid gray",
    borderWidth: 2,
    borderBottom: "1px solid gray",
    width: 130,
    alignItems: "center",
    marginLeft: 115
  },
  price: {
    textAlign: "center",
    marginTop: 10
  },
  description: {
    textAlign: "center",
    marginTop: 10
  }
};

export default class VehicleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: [],
      vehicleDescription: []
    };
  }

  componentDidMount() {
    const arr = [];
    axios.get("http://localhost:9988/api/vehicle").then(res => {
      this.setState({
        vehicle: res.data.vehicles
      });
      _.map(res.data.vehicles, res2 => {
        axios.get(`http://localhost:9988${res2.url}`).then(res3 => {
          arr.push({
            description: res3.data.description,
            price: res3.data.price,
            image: res2.media[0].url,
            name: res2.media[0].name
          });
          this.setState({ vehicleDescription: arr });
        });
      });
    });
  }

  render() {
    const { vehicle, vehicleDescription } = this.state;
    const vehicleList =
      vehicleDescription.length && vehicle.length ? (
        _.map(vehicleDescription, veh => {
          return (
            <Card style={{ width: "100%", height: 450 }}>
              <CardActionArea>
                <CardMedia>
                  {/* <img src={`../..${veh.image}`} style={styles}/> */}
                  <img
                    src="https://3907a206863254a8df74-6c964fe6420f033f39c4a320d459b17a.ssl.cf1.rackcdn.com/SAJAD4FX6JCP29450/9182ec950de63dd4afe15c34d91c2f08.jpg"
                    style={styles.cardMedia}
                  />
                </CardMedia>
                <CardContent>
                  <div style={styles.divVehicleName} />
                  <Typography
                    variant="headline"
                    component="h2"
                    style={styles.vehicleName}
                  >
                    {veh.name.toUpperCase()}
                  </Typography>
                  <div style={styles.divVehicleName} />
                  <Typography component="p" style={styles.price}>
                    From {veh.price}
                  </Typography>
                  <Typography component="p" style={styles.description}>
                    {veh.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      ) : (
        <div className="center"> Loading... </div>
      );
    return (
      <div
        className="container"
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        {vehicleList}
      </div>
    );
  }
}
