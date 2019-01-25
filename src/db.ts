import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.MONGO_DB_URL);
