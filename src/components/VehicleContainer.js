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
    height: "100%",
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
    marginLeft: ((window.innerWidth/5)-130)/2.8
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

export default class VehicleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicleDescription: []
    };
  }

  componentDidMount() {
    this.props.getVehicleDetails().then(result => {
      const car = [];
      _.map(result, res => {
        axios.get(`http://localhost:9988${res.url}`).then(res2 => {
          car.push({
            description: res2.data.description,
            price: res2.data.price,
            image: res.media[0].url,
            name: res.media[0].name
          });
          this.setState({ vehicleDescription: car });
        });
      });
    });
  }

  render() {
    const { vehicleDescription } = this.state;
    const vehicleList = vehicleDescription.length ? (
      _.map(vehicleDescription, veh => {
        return (
          <Card style={{ width: "100%", height: 400 }} key={veh.image}>
            <CardActionArea>
              <CardMedia
                image={veh.image}
              >
                <img src={veh.image} style={styles.cardMedia} />
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
    return <div className="desktop">{vehicleList}</div>;
  }
}
