import AWS from 'aws-sdk';
import fs from 'fs';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3()
export async function upload() {
    let files = fs.readdirSync(process.env.LOCAL_PATH)
    let filePaths = files.map(i => process.env.LOCAL_PATH + i)
    filePaths.forEach(filePath => {
        let params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: filePath.replace(process.env.LOCAL_PATH, 'images/'),
            Body: fs.readFileSync(filePath)
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File uploaded successfully: '+ data.Location);
            }
        });
    });
}