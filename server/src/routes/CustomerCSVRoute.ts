import epxress, { Router } from 'express';
import { ICustomerTable, ICustomer } from '../types/CustomerTypes';
import { IPlaceID } from '../types/GooglePlaceIDTypes';
import multer from 'multer';
import os from 'os';
import dotenv from 'dotenv';

import CustomerCSVParser from '../parse/CustomerCSVParser';
import GooglePlaceID from '../maps/GooglePlaceQuery';

dotenv.config();
const customerRouter: Router = epxress.Router();
const upload = multer({ dest: os.tmpdir() });
const customerCSVParser = new CustomerCSVParser();
const googlePlaceID = new GooglePlaceID(process.env.GOOGLE_AUTH_TOKEN as string);

// todo: move this to a database
let customerTable: ICustomerTable = {
    header: [],
    rows: [],
};
const authToken: string | undefined = process.env.TEST_AUTH_TOKEN;
const placeIDTable = {} as { [key: string]: {
    customer: ICustomer, 
    placeID: IPlaceID,
}};

customerRouter.post(
    '/api/customer/csv',
    upload.single('file'),
    async (req, res) => {
        const result = await customerCSVParser.parse(req, res);
        if (result) { customerTable = result; }
        for (const row of customerTable.rows) {
            const placeID = await googlePlaceID.getPlaceID(row.address);
            if (placeID) {
                placeIDTable[row.address] = {
                    customer: row,
                    placeID: placeID,
                };
            }
        }
    }
);

customerRouter.get(
    '/api/customer/csv',
    async (req, res) => {
        const auth = req.headers.authorization;
        if (authToken === undefined) {
            res.status(500).send('Internal Server Error');
            return;
        } else if (auth === undefined) {
            res.status(403).send('Unauthorized');
            return;
        }

        if (auth.includes(authToken)) {
            res.status(200).send(placeIDTable);
        } else {
            res.status(403).send('Unauthorized');
        }
    }
);

export default customerRouter;