"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CSVParser_1 = __importDefault(require("./CSVParser"));
class ContractorCSVParser extends CSVParser_1.default {
    constructor() {
        super(...arguments);
        this.parse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.readAndParse(req);
            const contractorHeader = rows[0];
            const contractorRows = rows.slice(1).map((row) => {
                const contractor = {
                    name: row[0],
                    address: row[1],
                    regions: row[2].split(';'),
                    weekdays: row[3].split(';'),
                };
                return contractor;
            });
            const contractorTable = {
                header: contractorHeader,
                rows: contractorRows,
            };
            return new Promise((resolve, reject) => {
                const onResolve = () => {
                    res.status(200).send('Contractors uploaded successfully');
                    return contractorTable;
                };
                const onReject = () => {
                    res.status(500).send('Contractors upload failed');
                    return null;
                };
                if (contractorTable) {
                    resolve(onResolve());
                }
                else {
                    reject(onReject());
                }
            });
        });
    }
}
exports.default = ContractorCSVParser;
