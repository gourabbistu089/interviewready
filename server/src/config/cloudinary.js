const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const streamifier = require('streamifier')
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Using localFile from Server -- diskstorage use

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     console.log(`Uploading file from path: ${localFilePath}`);

//     if (!localFilePath) {
//       throw new Error("Local file path is not provided");
//     }

//     // Upload to Cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto", // Automatically detect type (image, video, etc.)
//     });
//     console.log("File successfully uploaded to Cloudinary");
//     console.log(`Cloudinary URL: ${response.secure_url}`);

//     // Delete local file after upload
//     try {
//       fs.unlinkSync(localFilePath);
//       console.log(`Local file deleted: ${localFilePath}`);
//     } catch (fileError) {
//       console.error(`Failed to delete local file: ${localFilePath}`, fileError);
//     }

//     return response;
//   } catch (error) {
//     console.error("Error uploading file to Cloudinary:", error);

//     // Try to delete the local file in case of failure
//     try {
//       if (fs.existsSync(localFilePath)) {
//         fs.unlinkSync(localFilePath);
//         console.log(`Local file deleted after Cloudinary error: ${localFilePath}`);
//       }
//     } catch (fileError) {
//       console.error(`Failed to delete local file after upload error: ${localFilePath}`, fileError);
//     }

//     throw new Error("Cloudinary upload failed"); // Re-throw error to notify caller
//   }
// };
// const deleteFromCloudinary = async (imageUrl) => {
//   try {
//     const urlParts = imageUrl.split('/');
//     const fileName = urlParts[urlParts.length - 1]; // akqposeucjlne8mgbenx.png
//     const publicId = fileName.split('.')[0]; // akqposeucjlne8mgbenx

//     await cloudinary.uploader.destroy(publicId,{invalidate:true});
//     console.log('Image deleted from Cloudinary');
//   } catch (error) {
//     console.error('Failed to delete image:', error);
//   }
// };

// module.exports = {
//   uploadOnCloudinary,
//   deleteFromCloudinary
// };


// / Using buffer in RAM -- memorystorage use


const uploadOnCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error('File buffer is missing'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return reject(new Error('Cloudinary upload failed'));
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    const parts = imageUrl.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];

    await cloudinary.uploader.destroy(publicId, { invalidate: true });
    console.log('Image deleted from Cloudinary');
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
};

module.exports = {
  uploadOnCloudinary,
  deleteFromCloudinary
};
