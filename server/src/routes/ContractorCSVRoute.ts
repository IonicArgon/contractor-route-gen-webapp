import express, { Router } from 'express';
import { IContractorTable } from '../types/ContractorTypes';
import multer from 'multer';
import os from 'os';

import ContractorCSVParser from '../parse/ContractorCSVParser';

const contractorRouter: Router = express.Router();
const upload = multer({ dest: os.tmpdir() })
const contractorCSVParser = new ContractorCSVParser();

let contractorTable: IContractorTable = {
    header: [],
    rows: []
};

contractorRouter.post(
    '/api/contractor/csv',
    upload.single('file'),
    async (req, res) => {
        contractorTable = await contractorCSVParser.parse(req, res);
    }
);

contractorRouter.get(
    '/api/contractor/csv',
    async (req, res) => {
        res.status(200).send(contractorTable);
    }
);

export default contractorRouter;