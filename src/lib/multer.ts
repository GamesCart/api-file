const mkdirp = require('mkdirp')
import {diskStorage} from "multer";
const crypto = require("crypto");

export  const  configMulter =  diskStorage({
    destination: (req, file, cb) =>{
        // Генерации папки с датой загрузки файла
        const date = new Date()
        const day = date.getDate();
        const month = date.getMonth();
        const urlAll = 
        `./dist/img/${req.body.url}${month}.${day}`;
        mkdirp.sync(urlAll)
        cb(null, urlAll);
    },
    filename: (req, file, cb) => {
        // рандомное значение + имя файла!
        const id = crypto.randomBytes(15).toString('hex');
        cb(null, `${id}-${file.originalname}`);
    },
})