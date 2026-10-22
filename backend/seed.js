const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");

dotenv.config();

const User = require('./model/User');
const Product = require("./model/Product");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected for seeding"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Dummy Users Data
const dummyUsers = [
    {
        name: "Admin User",
        email: "admin@shopnest.com",
        password: "Admin@123",
        role: "admin",
        verified: true
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: "User@123",
        role: "user",
        verified: true
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "User@123",
        role: "user",
        verified: true
    },
    {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "User@123",
        role: "user",
        verified: true
    }
];

// Dummy Products Data
const dummyProducts = [
    {
        name: "Everyday Sneakers",
        description: "Comfortable lightweight sneakers for everyday wear.",
        price: 59.99,
        category: "Fashion",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        ratings: 4.5,
        numReviews: 24
    },
    {
        name: "Classic Wristwatch",
        description: "A minimalist watch with a durable stainless-steel case.",
        price: 89.99,
        category: "Accessories",
        stock: 18,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        ratings: 4.7,
        numReviews: 31
    },
    {
        name: "Wireless Headphones",
        description: "Over-ear wireless headphones with clear sound and soft cushions.",
        price: 74.99,
        category: "Electronics",
        stock: 22,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        ratings: 4.6,
        numReviews: 19
    },
    {
        name: "Cotton Crew T-Shirt",
        description: "A breathable, regular-fit cotton T-shirt for daily comfort.",
        price: 24.99,
        category: "Fashion",
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        ratings: 4.3,
        numReviews: 16
    },
    {
        name: "Leather Crossbody Bag",
        description: "A compact crossbody bag with an adjustable strap and roomy pockets.",
        price: 64.99,
        category: "Accessories",
        stock: 14,
        imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        ratings: 4.4,
        numReviews: 12
    },
    {
        name: "Ceramic Table Vase",
        description: "A simple decorative ceramic vase for flowers or home display.",
        price: 29.99,
        category: "Home",
        stock: 27,
        imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80",
        ratings: 4.2,
        numReviews: 9
    },
    {
        name: "Instant Film Camera",
        description: "A fun instant camera for capturing and printing memorable moments.",
        price: 99.99,
        category: "Electronics",
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        ratings: 4.8,
        numReviews: 28
    },
    {
        name: "Insulated Travel Mug",
        description: "A reusable stainless-steel mug that keeps drinks hot or cold.",
        price: 19.99,
        category: "Home",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        ratings: 4.1,
        numReviews: 11
    }
];

// Seed function
const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log("Cleared existing data");

        // Hash passwords and insert users
        const usersWithHashedPasswords = await Promise.all(
            dummyUsers.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return { 
                    ...user, 
                    password: hashedPassword
                };
            })
        );

        const createdUsers = await User.insertMany(usersWithHashedPasswords);
        console.log(` Seeded ${createdUsers.length} users`);

        // Insert products
        const createdProducts = await Product.insertMany(dummyProducts);
        console.log(` Seeded ${createdProducts.length} products`);

        console.log('\n Database seeded successfully!');
        console.log('\nLogin Credentials:');
        console.log('Admin: admin@shopnest.com / Admin@123');
        console.log('User: john@example.com / User@123');

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase();
