import axios from "axios";

export const getVehicleDetails = () => {
  return axios.get("http://localhost:9988/api/vehicle").then(res => res.data.vehicles);
};
