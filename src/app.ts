import express, { Application, Request, Response } from 'express'
import path from 'path';


const app = express()
const router = express.Router()
const port = 3000

app.use(express.static(__dirname + 'public')); //Serves resources from public folder


app.get('/', (req, res) => {
  res.send('Hello NodeJS!')
})

app.listen(port, () => {
  console.log(`NodeJS app listening on port ${port}`)
})
