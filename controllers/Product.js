import {
    createProductService,
  deleteProductService,
  findProductByIdService,
  findProductsService,
  resetProductsService,
  updateProductService,
} from "../services/Product.js";
import fs from "fs";
import { serverResponse } from "../utils/server_response.js";

export const resetProductsController= async (req, res) => {
  try{
    const productsFromJson= JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}));
    if (productsFromJson.length ===0){
      serverResponse(res, 204, "the database is empty")
    }
    const allProducts= resetProductsService(productsFromJson);
    serverResponse(res, 201, allProducts);
  }catch(error){
    serverResponse(res, 400, "Error reseting products", error);
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await findProductsService();
    if (products.length === 0) {
      serverResponse(res, 204, "the database is empty");
    }
    serverResponse(res, 200, products);
  } catch (error) {
    serverResponse(res, 400, "Error getting all products", error);
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const product = await findProductByIdService(req.params.id);
    if (!product) {
      serverResponse(res, 404, "Product not found");
    }
    serverResponse(res, 200, product);
  } catch (error) {
    serverResponse(res, 400, "Invalid product ID", error);
  }
};

export const createProductController = async (req, res) => {
  try {
    const savedProduct = await createProductService(req.body);
    serverResponse(res, 201, savedProduct);
  } catch (error) {
    serverResponse(res, 400, "Error creating product", error);
  }
};

export const updateProductController = async (req, res) => {
  try {
    const updatedProduct = await updateProductService(req.params.id, req.body);
    if (!updatedProduct) {
      serverResponse(res, 404, "Product not found");
    }
    serverResponse(res, 200, updatedProduct);
  } catch (error) {
    serverResponse(res, 400, "Error updating product", error);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const deletedProduct = await deleteProductService(req.params.id);
    if (!deletedProduct) {
      serverResponse(res, 404, "Product not found");
    }
    serverResponse(res, 200, deletedProduct);
  } catch (error) {
    return serverResponse(res, 400, "Invalid product ID", error);
  }
};
