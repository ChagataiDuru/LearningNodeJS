import express, { Express } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import Routes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000
app.use(bodyParser.json());
app.use("/api",Routes)

const url: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.r5mot0a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })