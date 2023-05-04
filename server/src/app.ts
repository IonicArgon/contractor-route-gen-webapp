import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import contractorRouter from './routes/ContractorCSVRoute';
import customerRouter from './routes/CustomerCSVRoute';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(contractorRouter)
app.use(customerRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
