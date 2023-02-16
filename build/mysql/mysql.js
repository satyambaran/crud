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
const mysql_1 = __importDefault(require("mysql"));
function runQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
            multipleStatements: true,
        };
        console.log(obj);
        var connect = mysql_1.default.createPool(obj);
        connect.getConnection((err, conn) => {
            if (err) {
                return err;
            }
            else {
                console.log("Connected");
                conn.query(query, (err, rows) => {
                    console.log(err, rows);
                    conn.release();
                    if (err) {
                        return err;
                    }
                    else {
                        console.log(rows);
                        return rows;
                    }
                });
                return "default";
            }
        });
        return "default";
    });
}
exports.default = {
    runQuery,
};
