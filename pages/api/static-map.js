/**
 * generate static maps from google maps*/
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(401).json({
      message: 'Method not allowed'
    })
  }
  let body;
  try {
    body = req.query;
  } catch (error) {
    return res.status(400).json({
      message: 'Missing required fiels. Location.'
    })
  }

  const { lat, lng } = body;

  const params = {
    center: `${lat},${lng}`,
    zoom: 13,
    size: '600x600',
    markers: `color:purple|${lat},${lng}`,
    scale: 2,
    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
  }

  // fetch image result from google static api 
  const result = await fetch(`https://maps.googleapis.com/maps/api/staticmap?${new URLSearchParams(params).toString()}`);


  if (!result.ok) {
    return res.status(400).json({
      message: 'Error fetching image'
    })
  };
  res.setHeader('Content-Type', 'image/png');
  await pipeline(result.body, res);

}