"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cornJob = void 0;
const reels_1 = __importDefault(require("./reels"));
const client_1 = require("../client");
const cornJob = async () => {
    try {
        // Find active pages
        const pages = await client_1.prisma.page.findMany({
            where: {
                active: true,
                nPublish: {
                    lte: new Date(),
                },
            },
            include: {
                reel: {
                    where: {
                        status: "SCHEDULE",
                        OR: [{ publish: null }, { publish: { lte: new Date() } }],
                    },
                },
            },
        });
        for (const page of pages) {
            // Check if the page has reels to publish
            if (page.reel.length > 0) {
                // Find the first reel to publish (either without a publish date or the next scheduled one)
                const reelToPublish = page.reel.find((reel) => reel.status !== "SCHEDULE");
                if (reelToPublish) {
                    const description = reelToPublish.description || page.description;
                    const res = await (0, reels_1.default)({
                        pageId: page.id,
                        token: page.token,
                        vUrl: reelToPublish.link,
                        description,
                    });
                    if (res.success) {
                        await client_1.prisma.reel.update({
                            where: { id: reelToPublish.id },
                            data: {
                                status: "PUBLISH",
                                publish: new Date(), // Set the current time as the publish time
                            },
                        });
                        console.log(`Published reel ${reelToPublish.id} for page ${page.id}`);
                        // Update lPublish and nPublish fields for the page
                        const currentTime = new Date();
                        const nextPublishTime = new Date(currentTime.getTime() + page.after * 60 * 60 * 1000);
                        await client_1.prisma.page.update({
                            where: { id: page.id },
                            data: {
                                lPublish: currentTime,
                                nPublish: nextPublishTime,
                            },
                        });
                    }
                }
            }
            else {
                const totalReel = await client_1.prisma.reel.count({
                    where: { userId: page.id },
                });
                if (totalReel > 0) {
                    await client_1.prisma.page.update({
                        where: { id: page.id },
                        data: {
                            active: false,
                        },
                    });
                    console.log(`Deactivated page ${page.id} due to no reels.`);
                }
            }
        }
    }
    catch (error) {
        console.error("Error running cron job:", error);
    }
};
exports.cornJob = cornJob;
