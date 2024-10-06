import axios from "axios";
import { appConfig } from "../config/config";

const FlightAPI = {
  getFlightById: async (id: string) => {
    try {
      const response = await axios.get(
        `${appConfig.backendUrl}/api/v1/flights/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default FlightAPI;
