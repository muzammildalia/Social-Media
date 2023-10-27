import multer from "multer";

export const uploadImg = (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../client/public/upload");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        },
    });

    const upload = multer({ storage: storage });
    upload.single("file")(req, res, (err) => {
        if (err) {
            // Handle any errors that occurred during the upload
            res.status(500).json({ error: err.message });
        } else {
            const file = req.file;
            res.status(200).json({ filename: file.filename });
        }
    });
}