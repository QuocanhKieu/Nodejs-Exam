const Product = require("./../model/product.model");
exports.listProduct = async (req, res) => {
    try {
        const sortField = req.query.sort || 'ProductStoreCode';
        const sortOrder = { [sortField]: -1 }; // Sort in descending order by default

        const products = await Product.find().sort(sortOrder);
        console.log("get here");
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

