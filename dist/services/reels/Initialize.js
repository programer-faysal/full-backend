"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Initialize;
const axios = require("axios");
async function Initialize({ pageId, token, }) {
    const url = `https://graph.facebook.com/v21.0/${pageId}/video_reels`;
    const data = {
        upload_phase: "start",
        access_token: token,
    };
    const res = await axios.post(url, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
}
