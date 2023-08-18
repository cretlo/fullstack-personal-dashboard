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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postgres_1 = __importDefault(require("postgres"));
const express_1 = __importDefault(require("express"));
// Routes
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
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
        app.use("/api/users", users_1.default);
        app.use("/api/auth", auth_1.default);
        app.use("/api/contacts", contacts_1.default);
        app.use("/api/events", events_1.default);
        app.use("/api/notes", notes_1.default);
        app.listen(4000, () => {
            console.log("Server listening on port 4000");
        });
    });
}
main().catch((err) => console.error(err));
