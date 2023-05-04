import { Request, Response } from 'express';
import { ICustomer, ICustomerTable } from '../types/CustomerTypes';
import CSVParser from './CSVParser';

class CustomerCSVParser extends CSVParser {
    public parse = async (req: Request, res: Response): Promise<ICustomerTable | null> => {
        const rows: string[][] = await this.readAndParse(req);
        const customerHeader = rows[0];
        const customerRows = rows.slice(1).map((row) => {
            const customer: ICustomer = {
                address: row[0],
                region: row[1],
                dates: row[2].split(';'),
            }
            return customer;
        });

        const customerTable: ICustomerTable = {
            header: customerHeader,
            rows: customerRows,
        }

        return new Promise((resolve, reject) => {
            const onResolve = (): ICustomerTable => {
                res.status(200).send('Customers uploaded successfully');
                return customerTable;
            }
            const onReject = (): null => {
                res.status(500).send('Customers upload failed');
                return null;
            }
            
            if (customerTable) { resolve(onResolve()); }
            else { reject(onReject()); }
        });
    }
}

export default CustomerCSVParser;