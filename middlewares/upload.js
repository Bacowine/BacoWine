const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MiB
  },
});

const imageHandler = async (req, res, next) => {
  if (req.file) {
    try {
      req.file.buffer = await sharp(req.file.buffer)
        .rotate()
        .resize({
          width: 1024,
          height: 768,
          fit: 'contain',
          background: {
            r: 0, g: 0, b: 0, alpha: 0,
          },
        })
        .webp({ nearLossless: true, quality: 50, alphaQuality: 100 })
        .toBuffer();
    } catch (error) {
      console.log(error);
    }
  }
  next();
};

module.exports = { upload, imageHandler };
