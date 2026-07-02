const app = require('./src/app');
const express = require('exress')
const dotnev = require('dotenv')
const cors = require('cors')


dotnev.config();



app.use('/', (req , res ) => {
  res.send("hello")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});