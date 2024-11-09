const express = require('express');
const connection = require('./connection');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/crops/:season', async (req, res) => {
  try {
    const database = connection.db("Weather_App");
    const collection = database.collection("Crop_recommendations");

    console.log(req.params.season);


    const documents = await collection.findOne();

    const crops = documents[req.params.season];

    if (!crops) {
      return res.status(404).send("Crops not found.");
    }

    res.status(200).json(crops);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).send("Error fetching data.");
  }
});

app.get("/current-weather", async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${lat}&lng=${lng}`;
  const response = await fetch(url, {
    headers: { "x-api-key": "d829342a2c8c3199c592d9ace5a7ee138946d8f3a1d773545f7244d8e9995292" },
  });
  const data = await response.json();
  console.log(data);
  
  res.json(data);
});

app.get("/air-quality", async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lng}`;
  const response = await fetch(url, {
    headers: { "x-api-key": "d829342a2c8c3199c592d9ace5a7ee138946d8f3a1d773545f7244d8e9995292" },
  });
  const data = await response.json();
  console.log(data);
  
  res.json(data);
});

app.get("/disaster-detection", async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.ambeedata.com/disasters/latest/by-lat-lng?lat=${lat}&lng=${lng}`;
  const response = await fetch(url, {
    headers: { "x-api-key": "d829342a2c8c3199c592d9ace5a7ee138946d8f3a1d773545f7244d8e9995292" },
  });
  const data = await response.json();
  console.log(data);
  
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server has started.");
});
