const Product = require('../models/productModel');

const getSearchProducts = async (q, page) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  return await Product.find(q || '', limit, offset);
};

const getProductBySku = async (sku) => {
  const product = await Product.findBySku(sku);
  if (!product) throw new Error('Product not found');
  return product;
};

const createNewProduct = async (data) => {
  return await Product.create(data);
};

const removeProduct = async (id) => {
  return await Product.remove(id); 
};

const updateProduct = async (id, data) => {
  return await Product.update(id, data);
};

module.exports = { getSearchProducts, getProductBySku, createNewProduct, removeProduct, updateProduct};