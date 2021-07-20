import { Router } from 'express';
import auth from './auth';
import post from './posts';

const routes = Router();

routes.use("/auth", auth);
routes.use("/post", post);

export default routes;
