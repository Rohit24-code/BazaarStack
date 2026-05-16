"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleBufferToCloudinary = uploadSingleBufferToCloudinary;
exports.uploadManyBuffersToCloudinary = uploadManyBuffersToCloudinary;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadSingleBufferToCloudinary(file, folder = "BazzarStack/products") {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder,
            resource_type: "image",
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            if (!result) {
                return reject(new Error("Cloudinary Upload Failed !!"));
            }
            else {
                resolve({
                    url: result?.secure_url,
                    publicId: result?.public_id,
                });
            }
        });
        // streamifier.createReadStream(file) turns your static bucket of data into a flowing stream.
        // Once you call .pipe(), Node.js starts moving chunks of your image from your server’s memory directly to Cloudinary’s servers.
        streamifier_1.default.createReadStream(file).pipe(uploadStream);
    });
}
async function uploadManyBuffersToCloudinary(files, folder = "BazzarStack/products") {
    return Promise.all(files?.map((file) => uploadSingleBufferToCloudinary(file, folder)));
}
