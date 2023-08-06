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

const apiKeysArray = ['IeogV01qgqGpHm1XxALIFB1JAtbxBs7E', 'n3dsU8isX5GGSbrRWMrxOxGK7Wb3TgIQ', '9x0oehpt46AI4aK2veZLfftoKZfi3AR8', 'R2wMZwBSVoGRpGVartAWpcPs7Oaz9zsy']

const getRandomKey = (apiKeysArray) => {
  const randomIndex = Math.floor(Math.random() * apiKeysArray.length);
  return apiKeysArray[randomIndex];
}


app.get('/', async (req, res) => {
  console.log(apiKey);
  try {

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});



app.get('/getFiveDays/:cityCode', async (req, res) => {
  const cityCode = req.params.cityCode;
  const apiKey = 'CjfrofJZlG4PhsDzPl4O6ErKHBmGE77F'

  //const apiKey = getRandomKey(apiKeysArray)
  // const apiKey = 's0jaA8ot7GpKr1vrvB2U7l1Hzvebkt35'
  console.log(apiKey);


  try {
    let response = await axios(`${baseURL}/forecasts/v1/daily/5day/${cityCode}?apikey=${apiKey}`)
    res.json(response?.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});
app.get('/searchText/:text', async (req, res) => {
  const apiKey = 'CjfrofJZlG4PhsDzPl4O6ErKHBmGE77F'
  // const apiKey = getRandomKey(apiKeysArray)
  // const apiKey = 's0jaA8ot7GpKr1vrvB2U7l1Hzvebkt35'

  console.log(apiKey);

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
  //const apiKey = getRandomKey(apiKeysArray)
  // const apiKey = 's0jaA8ot7GpKr1vrvB2U7l1Hzvebkt35'
  const apiKey = 'CjfrofJZlG4PhsDzPl4O6ErKHBmGE77F'

  console.log(apiKey);

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
  //const apiKey = getRandomKey(apiKeysArray)
  // const apiKey = 's0jaA8ot7GpKr1vrvB2U7l1Hzvebkt35'
  const apiKey = 'CjfrofJZlG4PhsDzPl4O6ErKHBmGE77F'

  console.log(apiKey);

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
