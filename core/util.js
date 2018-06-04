const path = require("path");
const fetch = require("node-fetch");
const multer = require("multer");
const cloudinary = require("cloudinary");
const Datauri = require("datauri");
const debug = require("debug")("app:core:util");

const config = require("./config");
const logger = require("./logger");

// Global credentials
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

class Util {
    async fetch() {
        return fetch(...arguments);
    }

    async fetchJSON() {
        return fetch(...arguments).then(res => {
            debug("util.fetchJSON() raw response -> ", res);
            return res.json();
        });
    }

    createJsonError(code, message) {
        return {
            error: { code, message }
        };
    }

    createJsonMessage({ code, message, data }) {
        return {
            code,
            message: message ? message : null,
            data: data ? data : null
        };
    }

    /**
     * Returns current date as UTC date string
     * @return {String} UTC date string in format the "YYYY-MM-DD HH:MM:SS"
     */
    nowAsUTCDateTimeString() {
        //(YYYY-MM-DD HH:MM:SS)
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }

    localPhoneNumberToInternational(phoneNumber) {
        return "+233" + ("" + phoneNumber + "").substring(1, 10);
    }

    checkImageFileType(file, callbackFunction) {
        // Allowed extensions
        const fileTypes = /jpeg|jpg|png|webp/;

        // Check extension
        const fileExtension = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        // Check mime type
        const mimeType = fileTypes.test(file.mimetype);

        return mimeType && fileExtension
            ? callbackFunction(null, true)
            : callbackFunction(
                "Only .png, .jpeg and .webp images file types are supported."
            );
    }

    async singleImageFileUploadHandler() {
        const upload = await multer({
            storage: multer.memoryStorage(),
            limits: { fileSize: 5242880, files: 1 },
            fileFilter: (req, file, callbackFunction) => {
                this.checkImageFileType(file, callbackFunction);
            }
        }).single("uploadFile");

        return upload(...arguments);
    }

    stripFileExtension(fileName) {
        if (!fileName) return null;

        //cast to ensure its a string
        const parts = (fileName + "").split(".");
        return parts[0];
    }

    getFileExtension(fileName) {
        return path.extname(fileName).toString();
    }

    async deleteFromCloudinary({ publicId }) {
        try {
            return await cloudinary.v2.uploader.destroy(
                publicId,
                (error, result) => {
                    error &&
                        debug(
                            "util.deleteFromCloudinary() request error",
                            error
                        );

                    return !error ? result : false;
                }
            );
        } catch (error) {
            debug(
                "util.deleteFromCloudinary() network failure try-catch error",
                error
            );

            return false;
        }
    }

    async uploadToCloudinary({ publicId, imageFile, tags }) {
        const dataURI = new Datauri();
        dataURI.format(
            path.extname(imageFile.originalname).toString(),
            imageFile.buffer
        );

        try {
            return await cloudinary.v2.uploader.upload(
                dataURI.content,
                {
                    public_id: publicId,
                    tags: tags ? tags : ["Unspecified"]
                },
                (error, result) => {
                    error &&
                        debug("util.uploadToCloudinary() request error", error);

                    return !error ? result : false;
                }
            );
        } catch (error) {
            debug("util.uploadToCloudinary() try-catch error", error);
            return false;
        }
    }
}

module.exports = new Util();
