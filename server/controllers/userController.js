const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Create initial admin user
exports.createAdminUser = async (req, res) => {
    try {
        console.log('Attempting to create admin user...');
        
        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists');
            return res.status(400).json({
                success: false,
                error: 'Admin user already exists'
            });
        }

        // Accept credentials from request body if provided, otherwise use defaults
        const username = req.body?.username?.trim() || 'admin';
        const plainPassword = req.body?.password || 'admin123';

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create new admin user
        const admin = await User.create({
            username,
            password: hashedPassword,
            role: 'admin',
            isActive: true
        });

        console.log('Admin user created successfully:', admin._id);

        res.status(201).json({
            success: true,
            data: {
                id: admin._id,
                username: admin.username,
                role: admin.role,
                isActive: admin.isActive
            }
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        console.log('Login attempt for user:', req.body.username);
        
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check if account is active
        if (!user.isActive) {
            console.log('Account is deactivated for user:', username);
            return res.status(403).json({
                success: false,
                error: 'Account is deactivated'
            });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Send email notification for admin login
        if (user.role === 'admin') {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.NOTIFICATION_EMAIL,
                    subject: 'Admin Login Notification',
                    html: `
                        <h2>Admin Login Alert</h2>
                        <p>An admin user has logged in to the system.</p>
                        <p><strong>Details:</strong></p>
                        <ul>
                            <li>Username: ${user.username}</li>
                            <li>Time: ${new Date().toLocaleString()}</li>
                            <li>IP Address: ${req.ip}</li>
                        </ul>
                        <p>If this was not you, please take immediate action to secure your account.</p>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log('Admin login notification email sent successfully');
            } catch (emailError) {
                console.error('Error sending admin login notification email:', emailError);
                // Don't fail the login if email fails
            }
        }

        console.log('User logged in successfully:', username);

        // Generate JWT token (valid 1 day)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1d'
        });

        res.status(200).json({
            success: true,
            token, // front-end can ignore if not needed yet
            data: {
                id: user._id,
                username: user.username,
                role: user.role,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        console.log('Fetching all users...');
        const users = await User.find().select('-password');
        console.log(`Found ${users.length} users`);
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single user
exports.getUser = async (req, res) => {
    try {
        console.log('Fetching user with ID:', req.params.id);
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            console.log('User not found with ID:', req.params.id);
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        console.log('User found:', user.username);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        console.log('Updating user with ID:', req.params.id);
        const { username, password, isActive, currentPassword } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            console.log('User not found with ID:', req.params.id);
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Verify current password if provided for sensitive updates
        if ((password || isActive !== undefined) && (!currentPassword || !(await bcrypt.compare(currentPassword, user.password)))) {
            console.log('Invalid current password');
            return res.status(401).json({
                success: false,
                error: 'Invalid current password'
            });
        }

        // Update allowed fields
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (isActive !== undefined) {
            user.isActive = isActive;
        }

        await user.save();

        console.log('User updated successfully:', user.username);
        res.status(200).json({
            success: true,
            data: user.toJSON({ select: '-password' })
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        console.log('Deleting user with ID:', req.params.id);
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            console.log('User not found with ID:', req.params.id);
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        console.log('User deleted successfully:', user.username);
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};