"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cronJob_1 = require("./services/cronJob");
const createManyReels_1 = require("./createManyReels");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.get('/search-reels', async (req, res) => {
    await (0, cronJob_1.cornJob)();
    res.send("Done");
});
app.post('/many-reels', async (req, res) => {
    const { pageId, status, userId, links } = req.body;
    if (pageId && status && userId && links) {
        try {
            const result = await (0, createManyReels_1.createManyReels)({ links, pageId, status, userId });
            res.json({ message: "Reels store done", result });
            return;
        }
        catch (error) {
            console.log(error);
        }
    }
    res.send("Must provide data");
});
app.get("/", (req, res) => {
    res.send("Welcome to my home page server");
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
