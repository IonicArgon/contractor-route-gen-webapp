import { Request, Response } from 'express';
import { IContractor, IContractorTable } from '../types/ContractorTypes';
import CSVParser from './CSVParser';

class ContractorCSVParser extends CSVParser {
    public parse = async (req: Request, res: Response): Promise<IContractorTable | null> => {
        const rows: string[][] = await this.readAndParse(req);
        const contractorHeader = rows[0];
        const contractorRows = rows.slice(1).map((row) => {
            const contractor: IContractor = {
                name: row[0],
                address: row[1],
                regions: row[2].split(';'),
                weekdays: row[3].split(';'),
            }
            return contractor;
        });

        const contractorTable: IContractorTable = {
            header: contractorHeader,
            rows: contractorRows,
        }

        return new Promise((resolve, reject) => {
            const onResolve = (): IContractorTable => {
                res.status(200).send('Contractors uploaded successfully');
                return contractorTable;
            }
            const onReject = (): null => {
                res.status(500).send('Contractors upload failed');
                return null;
            }
            
            if (contractorTable) { resolve(onResolve()); }
            else { reject(onReject()); }
        });
    }
}

export default ContractorCSVParser;