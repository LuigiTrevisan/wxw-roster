const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = (fileBuffer, name) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ 
            resource_type: 'image',
            public_id: name
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.url);
            }
        });

        stream.end(fileBuffer);
    });
};

const getFile = (name) => {
    return cloudinary.url(name, { resource_type: 'raw' });
};

const deleteFile = (name) => {
    return cloudinary.uploader.destroy(name);
}

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};