const { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } = require("../models/User");

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data 
    });
}

 const createUser = async (req, res, next) => {
    try {
    const newUser = await createUserService(req.body);
    handleResponse(res, 201, "User created successfully", newUser);
    }
    catch(error){
    next(error);
    }
}
 const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users fetched successfully", users);
    }
    catch(error){
        next(error);
    }
}

 const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        if(!user){
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User fetched successfully", user);
    }
    catch(error){
        next(error);
    }
}
 const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await updateUserService(id, req.body);
        if(!user){
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User updated successfully", user);
    }
    catch(error){
        next(error);
    }
}
 const deleteUser = async (req, res, next) => {       
    try {
        const { id } = req.params;
        const user = await deleteUserService(id);
        if(!user){
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User deleted successfully", user);
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}