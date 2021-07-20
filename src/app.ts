import 'dotenv/config';
import createServer from './server';

const startServer = () => {
  const app = createServer();

  const port : number = parseInt(<string>process.env.PORT) || 3001;

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  } )
  
}


startServer();