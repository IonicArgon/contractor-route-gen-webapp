"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractorParser = void 0;
class ContractorParser {
    constructor() {
        this.parseContractor = (req, res) => {
            console.log(req.body);
            res.status(200).json({ message: 'Contractor parsed successfully' });
        };
    }
}
exports.ContractorParser = ContractorParser;
