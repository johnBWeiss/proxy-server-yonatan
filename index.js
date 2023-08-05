const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;
require('dotenv').config();

const baseURL = 'http://dataservice.accuweather.com'
const apiKey = process.env.API_KEY;

app.get('/', async (req, res) => {

  try {
    let response = await axios(`${baseURL}/forecasts/v1/daily/5day/${payload.cityCode}?apiKey=${apiKey}&language=en-us`)
    console.log(response);

  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
