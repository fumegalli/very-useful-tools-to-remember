import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.send({ message: 'hello world' }).status(200);
});

app.listen(3333, () => console.log('Server is running on port 3333'));
