import AWS from "aws-sdk";
import { createHash } from "crypto";

const hashedSecretKey = createHash('sha256').update(process.env.R2_SECRET_ACCESS_KEY).digest('hex');
export const r2BucketName = process.env.R2_BUCKET_NAME;
export const r2 = new AWS.S3({
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: hashedSecretKey,
    signatureVersion: 'v4',
    region: 'auto'
});


/**
 * R2ストレージに画像を送信する
 * @param fileName ファイル名 e.g. 2024-12-3
 * @param extension 拡張子 e.g. .png
 * @param file ファイルのデータ
 */
export const uploadR2Storage = async (fileName: string, extension: string, file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        r2.upload({
            Bucket: r2BucketName,
            Key: fileName + extension,
            Body: file
        }).send((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Location);
        });
    });
}