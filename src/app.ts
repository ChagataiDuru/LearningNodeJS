import express, { Express, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import Routes from "./routes"

import ErrorHandler from "./middlewares/ErrorHandler"

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000

const url: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.r5mot0a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected to Database Successfully, Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })

const requestLogger = (req: Request,res: Response,next: NextFunction) =>{
  console.log(`${req.method} url:: ${req.url}`);
  next();
}

app.use(requestLogger);
app.use(bodyParser.json());

app.use("/api",Routes);

app.use(ErrorHandler);
