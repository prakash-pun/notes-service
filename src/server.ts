import express, { Application} from "express";
import cors from 'cors';
import routes from 'routes/index';
import mongoose from 'mongoose';
import config from 'config/dbConfig';

export default function createServer() {
  const app: Application = express();

  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
  }));

  app.use(express.json())

  mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error)
  });

  app.use(routes);

  return app;
}