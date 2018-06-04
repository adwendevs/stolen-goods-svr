const debug = require("debug")("app:config");

// NB: setting NODE_ENV environment variable
// will activate production configuration data.
const isProduction =
    process.env.NODE_ENV && process.env.NODE_ENV === "production"
        ? true
        : false;

debug(
    !isProduction ? "Running in DEVELOPMENT mode" : "Running in PRODUCTION mode"
);

const config = !isProduction
    ? {

        // MongoDB connection strings
        MONGODB_URL: "mongodb://localhost/stolen-items",

        // Cloudinary Hosting
        CLOUDINARY_CLOUD_NAME: "xxx",
        CLOUDINARY_API_KEY: "xxx",
        CLOUDINARY_API_SECRET: "xxx",

        // Security
        NODE_ENV: "development",
        JWT_TOKEN_SECRET: "xxx",
    }
    : {

        // MongoDB connection string
        MONGODB_URL: process.env.MONGODB_URL,

        // Cloudinary Hosting (storing images)
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

        // Security
        NODE_ENV: "production",
        JWT_TOKEN_SECRET: "xxx",
    };

//console.log("config is", config);

module.exports = config;
