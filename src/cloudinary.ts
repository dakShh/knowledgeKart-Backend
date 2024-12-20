import { v2 as cloudinary } from 'cloudinary';

export default cloudinary.config({
  cloud_name: 'dofbf3yyk',
  api_key: '164138173651931',
  api_secret: 'p7qoAqaGqUXngFzK7NrO40pN-H0'
});

// api env = CLOUDINARY_URL=cloudinary://164138173651931:p7qoAqaGqUXngFzK7NrO40pN-H0@dofbf3yyk

// Cloudinary Upload File
export const cloudinaryUploadFile = async (fileToUpload: string) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: 'auto'
    });

    return data;
  } catch (error) {
    console.log(error);
    // throw new Error('Internal Server Error (cloudinary)');
  }
};

// Cloudinary Remove File
export const cloudinaryRemoveFile = async (imagePublicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Internal Server Error (cloudinary)');
  }
};

// Cloudinary Remove Multiple Files
export const cloudinaryRemoveMultipleFiles = async (publicIds: string[]) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Internal Server Error (cloudinary)');
  }
};
