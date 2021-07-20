import { Router, Request, Response } from "express";
import { User } from "entity/User";
import { TokenVerify } from 'middleware';

const router = Router();

/**
 * @route GET/auth
 * @desc create user
 * @access authenticated 
 */


router.post('/', TokenVerify, (req: Request, res: Response) => {
  res.status(200).json(res.locals.data);
})

export default router;
