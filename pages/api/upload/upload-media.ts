import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';

type Data = {
  name: string;
};

cloudinary.config({
  cloud_name: 'ddqh186vu',
  api_key: '667482683524756',
  api_secret: 'WSAXXBs3EA-58jp7TA1Ws0hVYio',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { postid },
    method,
  } = req;
 

  switch (method) {
    case 'POST':
      try {
        const data = await new Promise((resolve, reject) => {
          const form = new IncomingForm();

          form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
            
          });
        });

        const file = data?.files?.file?.filepath

        console.log(file);
      

        const response = await cloudinary.v2.uploader.upload(file, {
          resource_type: 'auto',
          folder: 'testing',
          upload_preset: 'dzne9w5l',
        });
      
        return res.status(200).json(response);
      } catch (error) {
        return res.status(200).json({ message: error });
      }

    default:
      break;
  }
  res.status(200).json({ message: 'Go away' });
}
