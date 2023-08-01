// /**
//  * Download file from firebase storage
//  **/
// export const config = {
//   runtime: "edge",
// };

// import moment from "moment";
// import admin from "../../../utils/firebase-admin";
// import { NextRequest } from "next/server";
// const storage = admin.storage();
// export default async function handler(req, res) {
//   if (req.method != "GET") {
//     return res
//       .status(400)
//       .json({ message: "You are not authorized to perform this action." });
//   }
//   const { searchParams } = new URL(req.url);
//   console.log(req.url);
//   const path = searchParams.get("path");
//   console.log(path);
//   let file;
//   try {
//     file = await storage
//       .bucket()
//       .file(path)
//       .download()
//       // .getSignedUrl({
//       //   action: "read",
//       //   expires: moment().add(120, "days").format("MM-DD-YYYY"),
//       // });
//   } catch (error) {
//     return res.status(400).json({
//       code: error.code,
//       message: error.message,
//     });
//   }
//   return new Response(response.body, {
//     headers: {
//       ...response.headers,
//       "content-disposition": `attachment; filename=${file}`,
//     },
//   });
// }
