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
const postgres_1 = __importDefault(require("postgres"));
const express_1 = __importDefault(require("express"));
// Routes
const contacts_1 = __importDefault(require("./routes/contacts"));
const events_1 = __importDefault(require("./routes/events"));
const notes_1 = __importDefault(require("./routes/notes"));
//Middleware
const cors_1 = __importDefault(require("cors"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // migrations
        const migrationClient = (0, postgres_1.default)("postgres://postgres:postgres@localhost:5432/planner", { max: 1 });
        //await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use("/contacts", contacts_1.default);
        app.use("/events", events_1.default);
        app.use("/notes", notes_1.default);
        app.listen(4000, () => {
            console.log("Server listening on port 4000");
        });
    });
}
main().catch((err) => console.error(err));
