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
const dotenv_1 = __importDefault(require("dotenv"));
const ContractorCSVParser_1 = __importDefault(require("../parse/ContractorCSVParser"));
dotenv_1.default.config();
const contractorRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: os_1.default.tmpdir() });
const contractorCSVParser = new ContractorCSVParser_1.default();
//todo: move this to a database
let contractorTable = {
    header: [],
    rows: [],
};
const auth_token = process.env.TEST_AUTH_TOKEN;
contractorRouter.post('/api/contractor/csv', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contractorCSVParser.parse(req, res);
    if (result) {
        contractorTable = result;
    }
}));
contractorRouter.get('/api/contractor/csv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (auth_token === undefined) {
        res.status(500).send('Internal Server Error');
        return;
    }
    else if (auth === undefined) {
        res.status(403).send('Unauthorized');
        return;
    }
    if (auth.includes(auth_token)) {
        res.status(200).send(contractorTable);
    }
    else {
        res.status(403).send('Unauthorized');
    }
}));
exports.default = contractorRouter;
