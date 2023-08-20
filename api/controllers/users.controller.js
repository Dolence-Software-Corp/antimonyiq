const User = require('../models/User');
require('dotenv').config();


async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        const data = {
            success: true,
            message: 'ok',
            data: users
        }
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error retrieving wallets',
            error: error.message
        }
        res.status(500).json(data);
    }
}

async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            const data = {
                success: false,
                message: 'wallet not found',
                data: null
            };
            return res.status(404).json(data);
        }

        const data = {
            success: true,
            message: 'OK',
            data: user
        };
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error retrieving wallet',
            error: error.message,
        };
        res.status(500).json(data);
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
    
        // Delete the user
        const user = await User.findByIdAndDelete(userId);
    
        if (!user) {
            const data = {
                success: false,
                message: 'Wallet not found',
                data: null,
            };
            return res.status(404).json(data);
        }
    
        const data = {
            success: true,
            message: 'Wallet deleted successfully',
            data: user,
        };
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error deleting wallet',
            data: null,
        };
        res.status(500).json(data);
    }
}

async function updateUser(req, res) {
    try {
        const { wallet, balance, total_ref } = req.body;

        // Check if required fields are present and non-empty
        if (!wallet || !balance || !total_ref || typeof balance !== 'number' || typeof total_ref !== 'number' || balance < 0 || total_ref < 0) {
            const data = {
                success: false,
                message: 'Invalid or missing fields',
                data: null,
            };
            return res.status(400).json(data);
        }

        // Update the user
        const user = await User.findOneAndUpdate(
            { wallet: wallet },
            { $inc: { balance: balance, total_ref: total_ref } },
            { new: true }
        );

        if (!user) {
            const data = {
                success: false,
                message: 'User not found',
                data: null,
            };
            return res.status(404).json(data);
        }

        const data = {
            success: true,
            message: 'User updated successfully',
            data: user,
        };
        res.json(data);
        
    } catch (error) {
        const data = {
            success: false,
            message: 'Error updating user',
            data: null,
            error: error.message, // Include the actual error message
        };
        res.status(500).json(data);
    }
}

const createUser = async (req, res) => {
    try {
        const { wallet } = req.body;

        const existingUser = await User.findOne({ wallet: wallet });
        if (existingUser) {
            return res.status(409).json({
                success: true,
                message: 'wallet already exists',
                data: existingUser
            });
        }

        const newUser = new User({
            wallet: wallet,
        });
  
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: 'wallet saved successfully',
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error: Failed to create user',
            error: error.message
        });
    }
};
  

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser,
};
