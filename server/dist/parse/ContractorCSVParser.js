"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv = __importStar(require("csv"));
const fs_1 = __importDefault(require("fs"));
class ContractorCSVParser {
    constructor() {
        this.parse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const file = req.file;
            let parser = null;
            if (file) {
                parser = fs_1.default
                    .createReadStream(file.path)
                    .pipe(csv.parse({}));
            }
            const records = [];
            if (parser) {
                try {
                    for (var _d = true, parser_1 = __asyncValues(parser), parser_1_1; parser_1_1 = yield parser_1.next(), _a = parser_1_1.done, !_a;) {
                        _c = parser_1_1.value;
                        _d = false;
                        try {
                            const record = _c;
                            records.push(record);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = parser_1.return)) yield _b.call(parser_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            const header = records[0];
            const rows = records.slice(1).map((row) => {
                const contractor = {
                    name: row[0],
                    address: row[1],
                    regions: row[2].split(','),
                    weekdays: row[3].split(',')
                };
                return contractor;
            });
            const contractorTable = {
                header,
                rows
            };
            return new Promise((resolve, reject) => {
                const onResolve = () => {
                    res.status(200).send("OK");
                    return contractorTable;
                };
                const onReject = () => {
                    res.status(500).send("Internal Server Error");
                    return null;
                };
                if (file) {
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
