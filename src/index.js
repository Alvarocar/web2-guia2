const express = require('express');
const bodyParser = require('body-parser')

const userRoutes = require('./app/routes/cliente')

const PORT = 3000

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

userRoutes(app)

app.get('/', (req, res) => {
 res.json({ message: 'Hola Mundo'})
})

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`)
})