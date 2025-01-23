import { Request } from "express";
import multer from "multer";
import { BadRequestError } from "../errors/customErrors";
const storage = multer.diskStorage({
  // This is the temporary path where the images will be stored
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // This will be the filename of the image
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage,
  // We set the file image size to 500 KB (0.5M), if the image size is greater then in validationMiddleware we execute validateImageSize middleware to throw BadRequestError if error instance is of type MulterError
  limits: {
    fileSize: 500000,
  },
  fileFilter: async (request: Request, file, cb) => {
    // We verify if the file is an image
    if (file.mimetype.startsWith("image/")) {
      // If is an image we allow it to upload to the cloudinary server
      cb(null, true);
    } else {
      // If is not an image we send a BadRequestError
      cb(new BadRequestError("Only images are allowed"));
    }
  },
});
