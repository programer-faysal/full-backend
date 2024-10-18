"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = videoUpload;
const axios = require("axios");
async function videoUpload({ fileUrl, token, videoId }) {
    const url = `https://rupload.facebook.com/video-upload/v21.0/${videoId}`;
    const headers = {
        Authorization: `OAuth ${token}`,
        file_url: fileUrl,
    };
    const res = await axios.post(url, null, { headers });
    return res.data;
}
