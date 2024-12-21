import path from 'path';
import multer from 'multer';
import fs from 'fs';

const directoryPath = './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    cb(null, directoryPath); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to include the timestamp
  }
});

export const upload = multer({ storage: storage });
