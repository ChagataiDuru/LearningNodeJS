import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose';
import path from 'path';


const app = express()
const router = express.Router()
const port = 3000

app.use(express.json());
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

require('dotenv').config()
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.get('/', (req, res) => {
  res.send('Hello NodeJS!')
})

app.listen(port, () => {
  console.log(`NodeJS app listening on port ${port}`)
})
