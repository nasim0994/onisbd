const Banner = require("../models/bannerModel");
const fs = require("fs");

exports.addBanner = async (req, res) => {
  const galleries = req.files.gallery ? req.files.gallery : [];

  try {
    if (galleries?.length > 10) {
      galleries?.forEach((gallery) => {
        fs.unlink(`./uploads/banner/${gallery?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      return res.json({
        success: false,
        message: "You can't upload more than 10 images",
      });
    }

    const isExist = await Banner.findOne();
    if (isExist) {
      return res.json({
        success: false,
        message: "Banner already exist",
      });
    }

    let data = {
      ...req?.body,
    };

    if (galleries?.length > 0) {
      data.galleries = galleries?.map((gallery) => ({
        url: gallery.filename,
        name: gallery.originalname,
      }));
    }

    const result = await Banner.create(data);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });

    if (galleries?.length > 0) {
      galleries?.forEach((gallery) => {
        fs.unlink(`./uploads/banner/${gallery?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};

exports.getBanner = async (req, res) => {
  try {
    const result = await Banner.findOne();

    if (!result) {
      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const id = req?.params?.id;
  const galleries = req?.files?.gallery ? req.files.gallery : [];
  const { galleriesUrl } = req?.body;

  try {
    const isExist = await Banner.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    let data = {
      ...req?.body,
    };

    let newImages = [];

    if (galleries?.length > 0) {
      const newImage = galleries?.map((gallery) => ({
        url: gallery.filename,
        name: gallery.originalname,
      }));

      newImages.push(...newImages, ...newImage);
    }

    if (isExist?.galleries) {
      const filterImages = isExist?.galleries?.filter((gallery) =>
        galleriesUrl?.includes(gallery?.url)
      );

      newImages = [...filterImages, ...newImages];
    }

    if (newImages?.length > 10) {
      if (galleries?.length > 0) {
        galleries?.forEach((gallery) => {
          fs.unlink(`./uploads/banner/${gallery?.filename}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      }

      return res.json({
        success: false,
        message: "You can't upload more than 10 images",
      });
    }

    data.galleries = newImages;

    const result = await Banner.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: result,
    });

    if (result) {
      if (galleriesUrl && isExist?.galleries?.length > 0) {
        const deletedImages = isExist?.galleries?.filter(
          (gallery) => !galleriesUrl?.includes(gallery?.url)
        );

        deletedImages?.forEach((image) => {
          fs.unlink(`./uploads/banner/${image?.url}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      }

      if (!galleriesUrl && isExist?.galleries?.length > 0) {
        isExist?.galleries?.forEach((image) => {
          fs.unlink(`./uploads/banner/${image?.url}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    if (galleries?.length > 0) {
      galleries?.forEach((gallery) => {
        fs.unlink(`./uploads/banner/${gallery?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};
