import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send("Error parsing form");

    const file = files.file?.[0] || files.file;
    if (!file) return res.status(400).send("No file uploaded");

    try {
      const catForm = new FormData();
      catForm.append("reqtype", "fileupload");
      catForm.append("fileToUpload", fs.createReadStream(file.filepath));

      const catbox = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: catForm,
      });

      const text = await catbox.text();
      res.status(200).send(text);
    } catch (e) {
      res.status(500).send("Upload failed: " + e.message);
    }
  });
}
