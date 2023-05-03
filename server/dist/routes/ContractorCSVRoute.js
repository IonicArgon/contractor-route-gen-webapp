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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const os_1 = __importDefault(require("os"));
const ContractorCSVParser_1 = __importDefault(require("../parse/ContractorCSVParser"));
const contractorRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: os_1.default.tmpdir() });
const contractorCSVParser = new ContractorCSVParser_1.default();
let contractorTable = {
    header: [],
    rows: []
};
contractorRouter.post('/api/contractor/csv', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    contractorTable = yield contractorCSVParser.parse(req, res);
}));
contractorRouter.get('/api/contractor/csv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(contractorTable);
}));
exports.default = contractorRouter;
