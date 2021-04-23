const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
// const webpush = require('web-push')
const router = express.Router();
const multer = require("multer");

const PUBLIC_KEY = "BIVjmRqi0LMYhs3kciV76hMGHThRmeP2i6guAF37UgL3ukJI_L4OCz08McerTtMKpRWcrT4z6A5s4JB62r8neT4"
const PRIVATE_KEY = "CB4aRcyZFUgYWVH_usYhDZwaPSqvY_j-HGsOJp0_fSI"

// webpush.setVapidDetails('mailto:jorammanoah1@gmail.com', PUBLIC_KEY, PRIVATE_KEY)


//_____________image upload_________________
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).fields([{ name: "file", maxCount: 1 }]);

//____________________upload route_________________________
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) console.log(err);
    else res.end();
  });
});

//____________________product routes__________________________
//_________________find all products___________________________

router.get("/products", (req, res) => {
  Product.findAll({ order: [["updatedAt", "DESC"]] })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => console.log(err));

});

// router.post("/products", (req, res) => {

//     const subscription = req.body
//     const payload = JSON.stringify({title:'Hey there'})
//     webpush.sendNotification(subscription, payload).catch(err=>console.log(err))
//     console.log(subscription)

// });

//_____________________add product_________________________
router.post("/productz/add", async (req, res, next) => {
  await Product.create({
    product_name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
    shop: req.body.shop,
    ratings: req.body.ratings,
  })
    .then(
      res.send({
        success:true,
        message:"Product save succesfully"
      })

    )
    .catch((err) => res.send({ success: false, err }));
});

//_____________________edit product_________________________
router.put("/product/add/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  console.log(product.id);
  Product.update(
    { product_name: req.body.name, image: req.body.image },
    { where: { id: product.id } }
  );
});

//_______________get category route_____________________
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  const product = await Product.findAll({
    where: {
      category: category,
    },
  });
  res.send(product);
});

//______________find all categories___________________
router.get("/allcategory", (req, res) => {
  Category.findAll({ order: [["updatedAt", "DESC"]] })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => console.log(err));
});

router.post("/post", (req, res) => {
  const { category } = req.body;

  Product.findAll({
    where: {
      category: category,
    },
  }).then((product) => {
    if (!product) {
      return res.json({
        found: false,
        message: "Product not found",
      });
    }
    return res.json({
      product: product,
    });
  });
});

//_________find a product with unique id____________
router.get(`/product/:id`, async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.json({
      productFound: false,
      message: "Product not found",
    });
  }
  return res.send(product);
});

//_______________delete a certain product________________
router.delete("/product/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  //   Product.destroy({
  //     where: {
  //       id: id,
  //     },
  //   }).then(
  //     res
  //       .send({
  //         success: true,
  //       })
  //       .catch((error) => console.log(error))
  //   );
  res.end();
});

module.exports = router;
