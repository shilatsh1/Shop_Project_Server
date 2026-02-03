import {
    registerUserService,
  deleteUserByIdService,
  deleteUsersService,
  findUserByIdService,
  findUsersService,
  updateUserService,
  loginUserService,
  changePasswordService,
  resetUsersService
} from "../services/User.js";
import fs from "fs";
import { serverResponse } from "../utils/server_response.js";

export const resetUsersController= async (req, res) => {
  try{
    const usersFromJson= JSON.parse(fs.readFileSync("users.json", {encoding: "utf-8"}));
    if (usersFromJson.length ===0){
        serverResponse(res, 204, "the database is empty")
    }
    const allUsers= resetUsersService(usersFromJson);
    serverResponse(res, 201, allUsers);
  }catch(error){
    serverResponse(res, 400, "Error reseting users", error);
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await findUsersService();
    if (users.length === 0) {
      serverResponse(res, 204, "the database is empty");
    }
    serverResponse(res, 200, users);
  } catch (error) {
    serverResponse(res, 400, "Error getting all users", error);
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await findUserByIdService(req.params.id);
    if (!user) {
      serverResponse(res, 404, "User not found");
    }
    serverResponse(res, 200, user);
  } catch (error) {
    serverResponse(res, 400, "Invalid user ID", error);
  }
};

export const registerUserController = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    if(!result){
      serverResponse(res, 400,"user was not creating");
    }
    serverResponse(res, 201, result);
  } catch (error) {
    serverResponse(res, 400, "Error creating user", error);
  }
};

export const updateUserController = async (req, res) => {
  try {
    if ("password" in req.body) {
      return serverResponse(res, 403, "Password cannot be updated here");
    }
    const updatedUser = await updateUserService(req.params.id, req.body);
    if (!updatedUser) {
      serverResponse(res, 404, "User not found");
    }
    serverResponse(res, 200, updatedUser);
  } catch (error) {
    serverResponse(res, 400, "Error updating user", error);
  }
};

export const deleteUserByIdController = async (req, res) => {
  try {
    const deletedUser = await deleteUserByIdService(req.params.id);
    if (!deletedUser) {
      serverResponse(res, 404, "User not found");
    }
    serverResponse(res, 200, deletedUser);
  } catch (error) {
    return serverResponse(res, 400, "Invalid user ID", error);
  }
};

export const deleteUsersController = async (req, res) => {
  try {
    const users = await deleteUsersService();
    if (users.length === 0) {
      serverResponse(res, 204, "the database is empty");
    }
    serverResponse(res, 200, users);
  } catch (error) {
    return serverResponse(res, 400, "Error deleting all users", error);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    if (!result) {
      return serverResponse(res, 401, "Invalid email or password");
    }
    serverResponse(res, 200, result);
  } catch (error) {
    serverResponse(res, 400, "Login failed", error);
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await changePasswordService(email,oldPassword,newPassword);
    if (!user) {
      return serverResponse(res, 400, "Invalid email or password");
    }
    serverResponse(res, 200, "Password updated successfully");
  } catch (error) {
    serverResponse(res, 400, "Error changing password", error);
  }
};