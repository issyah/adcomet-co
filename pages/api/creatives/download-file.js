/**
 * Download file from firebase storage
**/

export const config = {
  runtime: 'edge'
};

export default async function handler(req, res) {
  if (req.method != 'GET') {
    return res.status(400).json({ message: 'You are not authorized to perform this action.' });
  };

  const { url, type } = req.query;
  const response = await fetch(url);
  const fileName = `download.${type.split('/')[1]}`;
  return new Response(response.body, {
    headers: {
      ...response.headers,
      "content-disposition": `attachment; filename=${fileName}`,
    }
  });
}