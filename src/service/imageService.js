import { upload } from '../S3Client.js';

class imageService {

    validateURL(url) {
        return /\.(jpg|jpeg|png)$/.test(url);
    }

    async storeImageToS3() {
        upload()
    }
}

export default new imageService