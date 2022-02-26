import express from 'express'
import { port } from './config'
 
const app = express();

//Definir el motor de vistas de express.
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

app.use(express.static(`${__dirname}/public`));

export const server = app.listen(3000, function() {
  console.log(`Start in port: ${port}`)
});