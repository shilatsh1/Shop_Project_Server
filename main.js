import express from "express";
import cors from "cors";
import { connectDB } from "./DB/db.js";
import "dotenv/config";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  resetProductsController,
  updateProductController,
} from "./controllers/Product.js";
import {
  loginUserController,
  changePasswordController,
  registerUserController,
  deleteUserByIdController,
  deleteUsersController,
  getUserByIdController,
  getUsersController,
  updateUserController,
  resetUsersController,
} from "./controllers/User.js";
import { verifyToken } from "./middlewares/auth.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 4000;
const mongoUri= process.env.MONGOURI || "";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("client/dist"));

//Product
app.post("/api/resetProducts", resetProductsController);

app.get("/api/products", getProductsController);

app.get("/api/products/:id", getProductByIdController);

app.post("/api/products", createProductController);

app.put("/api/products/:id", updateProductController);

app.delete("/api/products/:id", deleteProductController);

//User
app.post("/api/resetUsers", resetUsersController);

app.get("/api/users", getUsersController);

app.get("/api/users/:id", getUserByIdController);

app.post("/api/users", registerUserController);

app.put("/api/users/:id", verifyToken, updateUserController);

app.delete("/api/users/:id", deleteUserByIdController);

app.delete("/api/users/", deleteUsersController);

app.post("/api/users/login", loginUserController);

app.post("/api/users/change_password", verifyToken, changePasswordController);

app.get(/.*/, (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/client/dist/index.html");
});

const startServer = async () => {
  await connectDB(mongoUri);
  app.listen(port, () => {
    console.log(`🚀 Server running at PORT:${port}`);
  });
};

startServer();
