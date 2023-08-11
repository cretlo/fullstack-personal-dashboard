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
const db_1 = __importDefault(require("../db/db"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const router = express_1.default.Router();
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.select().from(schema_1.events);
        res.status(200).send(result);
    }
    catch (err) {
        res.send({ message: "Couldn't get events" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEvent = {
        title: req.body.title,
        start: new Date(req.body.start),
        end: req.body.end ? new Date(req.body.end) : null,
        description: req.body.description,
        allDay: req.body.allDay,
    };
    try {
        const result = yield db_1.default.insert(schema_1.events).values(newEvent).returning();
        console.log("Post result: ", result);
        res.status(200).send(result[0]);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const updatedEvent = Object.assign({}, req.body);
    try {
        const result = yield db_1.default
            .update(schema_1.events)
            .set(updatedEvent)
            .where((0, drizzle_orm_1.eq)(schema_1.events.id, eventId))
            .returning();
        res.status(200).send(result[0]);
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const result = yield db_1.default
            .delete(schema_1.events)
            .where((0, drizzle_orm_1.eq)(schema_1.events.id, eventId))
            .returning();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
}));
exports.default = router;
