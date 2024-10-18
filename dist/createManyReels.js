"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManyReels = void 0;
const client_1 = require("./client");
const client_2 = require("@prisma/client");
const createManyReels = async ({ links, pageId, userId, status, }) => {
    const reels = links.map((link) => ({
        link,
        userId,
        pageId,
        status: status ? client_2.Status.SCHEDULE : client_2.Status.PENDING,
    }));
    try {
        const res = await client_1.prisma.reel.createMany({
            data: reels,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createManyReels = createManyReels;
