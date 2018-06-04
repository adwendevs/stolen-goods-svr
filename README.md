# Stolen Goods platform server (stolen-goods-svr)

This is a project geared towards developing an application to serve as a platform where every individual can list found or stolen items in Ghana via a mobile app or web client - and can get contacted by the rightful owner to retrieve the missing or stolen item. Development is done by volunteers willing to help make a change. 

> You may also check the front-end at https://github.com/adwendevs/stolen-goods-wc

## Usage
Server is configured for both local development and production deployment. Configurations are all stored in `core/config.js`. To test locally, replace the the information in the config file with your own. For production, you must set the environment variables used in the config file.


## Stack Used
The server is written Node.JS (>= V8.x). Below are the stack and packages used:

### Platforms
* MongoDB on MLab for data storage (mongoose,  mongoose-paginate)
* Cloudinary for image storage (cloudinary, datauri, multer)

### Node.JS packages
* MongoDB (mongoose,  mongoose-paginate)
* Cloudinary (cloudinary, datauri, multer)
* Server setup (express, body-parser,)
* Security and encryption (helmet, cors, bcrypt, jsonwentoken)
* Utilities (debug, node-fetch, validator)