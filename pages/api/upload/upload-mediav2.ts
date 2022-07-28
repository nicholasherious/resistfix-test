import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import aws from 'aws-sdk';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postid },
    method,
  } = req;



  const region = 'us-east-2';
  const bucketName = 'resist-zoo-bucket';
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_ACCESS_SECRET;

  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
  });

  const imageName = uuidv4();

  switch (method) {
    case 'POST':
      try {
        const { name, type } = req.body;

        const s3Params = {
          Bucket: bucketName,
          Key: `media/${name}`,
          ContentType: type,
          Expires: 60,
        };

        

        const bucketPostUrl = await s3.getSignedUrlPromise('putObject', s3Params);
        
        const returnData = {
          signedRequest: bucketPostUrl,
          mediaUrl: `https://${bucketName}.s3.amazonaws.com/media/${name}`
        };

        return res.status(200).json(returnData);
      } catch (error) {
        return res.status(200).json({ message: error });
      }

    default:
      break;
  }
  res.status(200).json({ message: 'Go away' });
}
