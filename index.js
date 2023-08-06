const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 8081;
require('dotenv').config();
app.use(cors('*'));

const baseURL = 'http://dataservice.accuweather.com'
const searchByTextURL = `${baseURL}/locations/v1/cities/autocomplete`
const geoPositionURL = `${baseURL}/locations/v1/cities/geoposition/search`


app.get('/getFiveDays/:cityCode', async (req, res) => {
  const cityCode = req.params.cityCode;
  const apiKey = 'GBOpYKJGyAyD8E5W1mI86b3pA3HnbC5O'
  try {
    let response = await axios(`${baseURL}/forecasts/v1/daily/5day/${cityCode}?apikey=${apiKey}`)
    res.json(response?.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.get('/searchText/:text', async (req, res) => {
  const apiKey = 'GBOpYKJGyAyD8E5W1mI86b3pA3HnbC5O'
  const searchText = req.params.text;
  try {
    let response = await axios(`${searchByTextURL}?apikey=${apiKey}&q=${searchText}&language=en-us`)
    res.json(response?.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.get('/getSingleCity/:cityCode', async (req, res) => {
  const apiKey = 'GBOpYKJGyAyD8E5W1mI86b3pA3HnbC5O'
  const cityCode = req.params.cityCode;
  try {
    let response = await axios(`${baseURL}/currentconditions/v1/${cityCode}?apikey=${apiKey}&language=en-us`)
    res.json(response?.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.get('/getGeoPosition/:lat/:long', async (req, res) => {
  const apiKey = 'GBOpYKJGyAyD8E5W1mI86b3pA3HnbC5O'
  const lat = req.params.lat;
  const long = req.params.long;
  try {
    let response = await axios(`${geoPositionURL}?apikey=${apiKey}&q=${lat}%2C${long}&language=en-us&toplevel=false`
    )
    res.json(response?.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
