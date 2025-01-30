import { useState } from 'react';
import { uploadFile } from '../api/wrestlers';

export const useUpload = (setFormData, formData) => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [fileToUpload, setFileToUpload] = useState({
        file: null,
        name: '',
        preview: ''
    });

    const handleUpload = (e) => {
        setShowUploadModal(true);
    };

    const cancelUpload = () => {
        setShowUploadModal(false);
        setFileToUpload({
            file: null,
            name: '',
            preview: ''
        });
    };

    const confirmUpload = () => {
        if (fileToUpload.file && fileToUpload.name) {
            uploadFile(fileToUpload.file, fileToUpload.name)
                .then((response) => {
                    setFormData({ ...formData, image: response.data.data });
                    alert(`File "${fileToUpload.name}" uploaded successfully!`);
                })
                .catch((err) => {
                    alert('Failed to upload file. Please try again later.');
                })
                .finally(() => {
                    cancelUpload();
                });
        } else {
            alert('Please select a file and enter a name.');
        }
    };

    return {
        showUploadModal,
        fileToUpload,
        handleUpload,
        cancelUpload,
        confirmUpload,
        setFileToUpload
    };
};

export default useUpload;