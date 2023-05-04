import epxress, { Router } from 'express';
import { ICustomerTable } from '../types/CustomerTypes';
import multer from 'multer';
import os from 'os';
import dotenv from 'dotenv';

import CustomerCSVParser from '../parse/CustomerCSVParser';

dotenv.config();
const customerRouter: Router = epxress.Router();
const upload = multer({ dest: os.tmpdir() });
const customerCSVParser = new CustomerCSVParser();

// todo: move this to a database
let customerTable: ICustomerTable = {
    header: [],
    rows: [],
};
const auth_token: string | undefined = process.env.TEST_AUTH_TOKEN;

customerRouter.post(
    '/api/customer/csv',
    upload.single('file'),
    async (req, res) => {
        const result = await customerCSVParser.parse(req, res);
        if (result) { customerTable = result; }
    }
);

customerRouter.get(
    '/api/customer/csv',
    async (req, res) => {
        const auth = req.headers.authorization;
        if (auth_token === undefined) {
            res.status(500).send('Internal Server Error');
            return;
        } else if (auth === undefined) {
            res.status(403).send('Unauthorized');
            return;
        }

        if (auth.includes(auth_token)) {
            res.status(200).send(customerTable);
        } else {
            res.status(403).send('Unauthorized');
        }
    }
);

export default customerRouter;