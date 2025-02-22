const Product = require('../models/product');
const Cart=require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll().
  then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All products',
      path: '/products'
    });
  }).
  catch(err=>console.log(err));
};
exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findById(prodId)
  .then(([product])=>{
    res.render('shop/product-detail',{
      product:product[0]
      ,pageTitle:product.title,
      path:'/products'
    });
  })
  .catch(err=>console.log(err));

};
exports.getIndex = (req, res, next) => {
  Product.fetchAll().
  then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).
  catch(err=>console.log(err));
  
};
exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId)
  .then(([product]) => {
    if (!product || product.length === 0) {
      console.error(`Product with ID ${prodId} not found.`);
      return res.redirect('/cart'); // Gracefully handle non-existing product
    }

    return Cart.deleteProduct(prodId, product[0].price).then(() => {
      res.redirect('/cart');
    });
  })
  .catch((err) => {
    console.error('Error deleting product from cart:', err);
     // Forward the error to the error-handling middleware
  });
  // Product.findById(prodId,product=>{
  //   Cart.deleteProduct(prodId,product.price);
  //   res.redirect('/cart');
  //   })


}
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) { // Remove the semicolon here
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);
  });
  res.redirect('/cart');

};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
