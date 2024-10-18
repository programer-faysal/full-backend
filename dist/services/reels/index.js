"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reelsIndex;
const Initialize_1 = __importDefault(require("./Initialize"));
const videoUpload_1 = __importDefault(require("./videoUpload"));
const reelPublish_1 = __importDefault(require("./reelPublish"));
const videoScrapping_1 = require("./videoScrapping");
async function reelsIndex({ pageId, token, vUrl, description }) {
    try {
        const { upload_url, video_id } = await (0, Initialize_1.default)({ pageId, token });
        if (!video_id)
            throw new Error("Reel initialize fail");
        const { duration_ms, hd, sd, thumbnail, title, url } = await (0, videoScrapping_1.getFbVideoInfo)(vUrl);
        if (!hd)
            throw new Error("Reel scrapping fail");
        const upload = await (0, videoUpload_1.default)({ fileUrl: hd, token, videoId: video_id });
        if (!upload.success)
            throw new Error("Reel upload fail");
        const published = await (0, reelPublish_1.default)({ pageId, token, videoId: video_id, description });
        if (!published.success)
            throw new Error("Reel publish fail");
        return { message: "Upload Successful", success: true, videoId: published.post_id };
    }
    catch (error) {
        console.log(error);
    }
    return {
        message: "Reels Upload Fail",
        videoId: "",
        success: false,
    };
}
