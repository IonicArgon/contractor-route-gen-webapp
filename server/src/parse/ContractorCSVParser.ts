import { Request, Response } from 'express';
import { IContractor, IContractorTable } from '../types/ContractorTypes';
import * as csv from 'csv';
import fs from 'fs'

class ContractorCSVParser {
    public parse = async (req: Request, res: Response): Promise<IContractorTable> => {
        const file = req.file;
        let parser = null;
        if (file) {
            parser = fs
                .createReadStream(file.path)
                .pipe(csv.parse({}));
        }

        const records = [];
        if (parser) {
            for await (const record of parser) {
                records.push(record);
            }
        }

        const header = records[0];
        const rows = records.slice(1).map((row) => {
            const contractor: IContractor = {
                name: row[0],
                address: row[1],
                regions: row[2].split(','),
                weekdays: row[3].split(',')
            };
            return contractor;
        });

        const contractorTable: IContractorTable = {
            header,
            rows
        };

        return new Promise((resolve, reject) => {
            const onResolve = (): IContractorTable => {
                res.status(200).send("OK");
                return contractorTable;
            }

            const onReject = (): null => {
                res.status(500).send("Internal Server Error");
                return null;
            }

            if (file) {
                resolve(onResolve());
            } else {
                reject(onReject());
            }
        });
    }
}

export default ContractorCSVParser;