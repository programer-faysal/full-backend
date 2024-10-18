"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reelPublish;
const axios = require("axios");
async function reelPublish({ pageId, token, videoId, description, }) {
    const url = `https://graph.facebook.com/v21.0/${pageId}/video_reels`;
    const params = {
        access_token: token,
        video_id: videoId,
        upload_phase: "finish",
        video_state: "PUBLISHED",
        description,
    };
    const res = await axios.post(url, null, { params });
    return res.data;
}
