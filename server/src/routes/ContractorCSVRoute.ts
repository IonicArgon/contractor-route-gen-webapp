import express, { Router } from 'express';
import { IContractorTable } from '../types/ContractorTypes';
import multer from 'multer';
import os from 'os';
import dotenv from 'dotenv';

import ContractorCSVParser from '../parse/ContractorCSVParser';

dotenv.config();
const contractorRouter: Router = express.Router();
const upload = multer({ dest: os.tmpdir() })
const contractorCSVParser = new ContractorCSVParser();

//todo: move this to a database
let contractorTable: IContractorTable = {
    header: [],
    rows: [],
};
const auth_token: string | undefined = process.env.TEST_AUTH_TOKEN;

contractorRouter.post(
    '/api/contractor/csv',
    upload.single('file'),
    async (req, res) => {
        const result = await contractorCSVParser.parse(req, res);
        if (result) { contractorTable = result; }
    }
);

contractorRouter.get(
    '/api/contractor/csv',
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
            res.status(200).send(contractorTable);
        } else {
            res.status(403).send('Unauthorized');
        }
    }
);

export default contractorRouter;