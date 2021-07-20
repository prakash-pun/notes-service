import { verify } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { User } from 'entity/User';
import { getRepository } from 'typeorm';

export default (req: Request, res: Response, next: NextFunction): void => {

  const appOrigin: string = process.env.ORIGIN || "";
  const appServices: string = process.env.SERVICES || "";
  const secret: string = process.env.JWT_SECRET_KEY || "";
  let token: string;

  if(!req.header("Authorization")){
    res.status(401).json({ status: "error", message: "authentication credential not provided"})
    return;
  }

  token = req.header("Authorization").split(" ")[1]; 
  if(!token){
    res.status(401).json({ status: "error", message: "token not provided"});
    return;
  }
  const userToken = verify(token, secret, async (err, user) =>{
    if (err) return res.status(403).json({status: "error", message: "invalid token"})
    
    if (user.origin === appOrigin && user.services === appServices) {
      let userRepository = getRepository(User);
      let userObj: User;
      userObj = await userRepository.findOne({
        where: {
          email: user.userEmail,
          userName: user.userName
        }
      });
      if (!userObj) {
        const userData: {
          firstName: string;
          lastName: string;
          userName: string;
          email: string;
          origin: string;
          services: string;
        } = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          userName: user.userName,
          email: user.userEmail,
          origin: user.origin,
          services: user.services,
        }
        userObj = await userRepository.create(userData);
        const result = await userRepository.save(userObj);
        console.log("user created");
        res.locals.data = result;
        next();
      } else {
        console.log("user logged in");
        res.locals.data = userObj;
        next();
      }
    } else {
      return res.status(401).json({status: "error", message: "token invalid"});
    }
  });
};

