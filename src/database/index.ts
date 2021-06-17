import mongoose, {Mongoose} from 'mongoose';

export const connect = async (): Promise<Mongoose> => {
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB Error occurred');
    console.error(err);

    process.exit(1);
  });

  mongoose.connection.once('open', () => {
    console.log('MongoDB connection establish');
  });

  return await mongoose.connect(process.env.MONGO_DB_URI || '',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
  );
};

export const close = (): Promise<void> => mongoose.connection.close();
