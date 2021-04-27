import mongoose, { Mongoose } from 'mongoose';

export const connect = async (): Promise<Mongoose> => {
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB Error occurred');
    console.error(err);

    process.exit(1);
  });

  mongoose.connection.once('open', () => {
    console.log('MongoDB connection establish');
  });

  return await mongoose.connect('mongodb://localhost:27017/vuttr',  {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
