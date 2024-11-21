const db=require('../util/database');

// const fs = require('fs');
// const path = require('path');
const Cart=require('./cart');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    return db.execute('insert into products (title,price,description,imageUrl) values(?,?,?,?)',
      [this.title,this.price,this.description,this.imageUrl]);
   
    // getProductsFromFile(products => {
    //   if(this.id){
    //     const existingProductIndex=products.findIndex(prod=>prod.id===this.id);
    //     const updatedProducts=[...products];
    //     updatedProducts[existingProductIndex]=this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   }else{
    //     this.id=Math.random().toString();
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), err => {
    //     console.log(err);
    //   });
    //   }
      
    // });
  }
  static deleteById(id){
    return db.execute('delete from products where products.id=?',[id]);

    // getProductsFromFile(products=>{
    //   const product=products.find(prod=>prod.id===id);
    //   const updatedProducts=products.filter(prod=>prod.id!==id);
    //  // cb(product);
    //   fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
    //     if(!err){
    //       Cart.deleteProduct(id,product.price);
    //     }
    //   })
    // })
  }
  static fetchAll() {
   // getProductsFromFile(cb);
    return db.execute('select * from products');
  }
  static findById(id){
  //   getProductsFromFile(products=>{
  //     const product=products.find(p=>p.id===id);
  //     cb(product);
  //   })
  return db.execute('select * from products where products.id=?',[id]);
   }
};
