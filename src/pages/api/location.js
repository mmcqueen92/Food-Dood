import { prisma } from "../../../server/db/client";
import axios from "axios";

export default async function handler(req, res) {
  const { method, query } = req;
  const API_KEY = process.env.COORDS_API_KEY;
  console.log("API KEY: ", API_KEY);

  switch (method) {
    case "POST":
      const lat = query.lat;
      const long = query.long;
      const location = await axios
      .get(
          `http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${lat},${long}`
        )
        .then((response) => {
          return response.data.data[0]
        });

        res.status(201).json(location)
  }
}
