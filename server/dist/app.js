"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const ContractorCSVRoute_1 = __importDefault(require("./routes/ContractorCSVRoute"));
const CustomerCSVRoute_1 = __importDefault(require("./routes/CustomerCSVRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(ContractorCSVRoute_1.default);
app.use(CustomerCSVRoute_1.default);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
