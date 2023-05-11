import express, { Express, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import jsonwebtoken from "jsonwebtoken"

import Routes from "./routes/user.api.routes"

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use(requestLogger);

app.use("/api",Routes);

app.use(ErrorHandler);
