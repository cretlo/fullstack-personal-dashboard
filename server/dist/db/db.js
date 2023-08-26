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
exports.initMigrations = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const postgres_1 = __importDefault(require("postgres"));
const connectionURI = process.env.CONNECTION_URI_STRING ||
    "postgres://postgres:postgres@localhost:5432/planner";
function initMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retry logic needed for docker compose
        let retries = 5;
        while (retries) {
            try {
                const migrationClient = (0, postgres_1.default)(connectionURI, { max: 1 });
                yield (0, migrator_1.migrate)((0, postgres_js_1.drizzle)(migrationClient), { migrationsFolder: "drizzle" });
                break;
            }
            catch (err) {
                console.log(err);
                retries -= 1;
                console.log(`retries left ${retries}`);
                yield new Promise((res) => setTimeout(res, 5000));
            }
        }
    });
}
exports.initMigrations = initMigrations;
const queryClient = (0, postgres_1.default)(connectionURI);
const db = (0, postgres_js_1.drizzle)(queryClient);
exports.default = db;
