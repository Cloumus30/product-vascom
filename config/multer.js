const multer = require("multer");
const fs = require('fs')
const mime = require('mime-types');

const defaultStorage = (pathFile) => multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir(`./public/uploads/${pathFile}`, {recursive:true},(err)=>{
            callback(null, `./public/uploads/${pathFile}`);
         });
    },
    filename: (req, file, callback) =>{
        const body = req.body;
        const nameFile = body.name || 'product'
        const temp_file_arr = file.originalname.split(".");

        const temp_file_extension = mime.extension(file.mimetype);

        callback(null, `${nameFile}-` + Date.now() + '.' + temp_file_extension);
    }
})

module.exports = {
    defaultStorage
}