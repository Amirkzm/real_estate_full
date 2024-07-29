import multer from "multer";
import path from "path";

// Configure multer to store files in the 'uploads' directory with the original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads"); // Adjust path to point to 'uploads'
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    ); // Append file extension
  },
});

const upload = multer({ storage });

export default upload;
