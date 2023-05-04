import { Request } from 'express';
import * as csv from 'csv';
import fs from 'fs'

class CSVParser {
    protected readAndParse = async (req: Request): Promise<string[][]> => {
        let parser = null;
        if (req.file) {
            parser = fs
                .createReadStream(req.file.path)
                .pipe(csv.parse({}));
        }

        const rows: string[][] = [];
        if (parser) {
            for await (const row of parser) {
                rows.push(row);
            }
        }

        return new Promise((resolve, reject) => {
            resolve(rows);
            reject(null);
        });
    }
}

export default CSVParser;