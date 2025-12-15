const multer = require('multer');

// ? Disk Storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
//     // Todo: for users
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.originalname);
//     }
//   });
  
//   module.exports = {
//     upload: multer({ storage: storage })
//   };

// ? Memory Storage 
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = { upload };
