import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO = {
    options: MONGO_OPTIONS,
    url: `mongodb://localhost/myposts`
};

const config = {
    mongo: MONGO,
};

export default config;