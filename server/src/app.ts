import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });
