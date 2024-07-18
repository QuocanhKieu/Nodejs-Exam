const Product = require("./../model/product.model");
exports.listProduct = async (req, res) => {
    try {
        let products = undefined;
        if (req.query.sort) {
            const sortField = req.query.sort ;
            const sortOrder = { [sortField]: -1 }; // Sort in descending order by default
            
        console.log("get in block");
            
            products = await Product.find().sort(sortOrder);
        }
        else {
            products = await Product.find()
        }
        res.render("product/index", {
            products: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
}
exports.newProduct = (req,res)=>{
    res.render("product/new");
}
exports.createProduct = async (req, res) => {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
  
    const product = new Product({
      ProductCode,
      ProductName,
      ProductDate: new Date(ProductDate),
      ProductOriginPrice,
      Quantity,
      ProductStoreCode
    });
  
    try {
      const savedProduct = await product.save();
      console.log('Product saved:', savedProduct);
      res.redirect('/product'); // Redirect to the products list page
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).send('Error saving product');
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // await product.remove();
      await Product.deleteOne({ _id: req.params.id });
      res.redirect("/product");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };