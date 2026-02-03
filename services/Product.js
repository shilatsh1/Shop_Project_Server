import { Product } from "../models/Product.js";

export const resetProductsService = async (productsFromJson)=> {
  await Product.deleteMany({});
  return await Product.insertMany(productsFromJson);
};

export const findProductsService= async ()=>{
    return await Product.find({});
};

export const findProductByIdService= async (id)=>{
    return await Product.findOne({_id: id});
};

export const createProductService = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

export const updateProductService = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id);
};