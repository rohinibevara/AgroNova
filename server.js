const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Sample data (fallback when database is not available)
const sampleServices = [
    {
        _id: "1",
        title: "Smart Crop Monitoring",
        description: "Utilizing drones and IoT sensors to monitor crop health, soil conditions, and environmental factors in real-time.",
        icon: "fas fa-seedling",
        features: ["Real-time monitoring", "Drone technology", "IoT sensors", "Predictive analytics"],
        category: "Monitoring",
        isActive: true
    },
    {
        _id: "2",
        title: "Precision Irrigation",
        description: "Automated irrigation systems that deliver water precisely when and where it's needed, reducing waste by up to 50%.",
        icon: "fas fa-tint",
        features: ["Water conservation", "Automated systems", "Smart scheduling", "Soil moisture sensors"],
        category: "Irrigation",
        isActive: true
    },
    {
        _id: "3",
        title: "Automated Farming",
        description: "Robotic systems for planting, weeding, and harvesting that increase efficiency and reduce labor costs.",
        icon: "fas fa-robot",
        features: ["Robotic harvesters", "Automated planting", "Weed detection", "Labor optimization"],
        category: "Automation",
        isActive: true
    },
    {
        _id: "4",
        title: "Data Analytics",
        description: "Advanced analytics platforms that transform farm data into actionable insights for better decision-making.",
        icon: "fas fa-chart-line",
        features: ["Data visualization", "Predictive analytics", "Yield optimization", "Market insights"],
        category: "Analytics",
        isActive: true
    },
    {
        _id: "5",
        title: "Sustainable Practices",
        description: "Implementing regenerative agriculture techniques that improve soil health and biodiversity.",
        icon: "fas fa-leaf",
        features: ["Soil health management", "Biodiversity conservation", "Carbon sequestration", "Organic farming"],
        category: "Sustainability",
        isActive: true
    },
    {
        _id: "6",
        title: "Farmer Education",
        description: "Training programs and workshops to help farmers adopt new technologies and sustainable practices.",
        icon: "fas fa-graduation-cap",
        features: ["Workshops", "Online courses", "Field demonstrations", "Expert consultations"],
        category: "Education",
        isActive: true
    }
];

const sampleBlogs = [
    {
        _id: "1",
        title: "The Future of Precision Agriculture",
        excerpt: "Exploring how AI and machine learning are revolutionizing farming practices and increasing efficiency.",
        content: "Full content about precision agriculture...",
        featuredImage: "https://images.unsplash.com/photo-1592982537447-7448a57fbab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        category: "Technology",
        readTime: 5,
        isPublished: true,
        publishedAt: new Date('2024-06-15'),
        views: 150,
        tags: ["AI", "Machine Learning", "Precision Farming"]
    },
    {
        _id: "2",
        title: "Sustainable Farming Practices for the 21st Century",
        excerpt: "How regenerative agriculture can restore soil health and combat climate change.",
        content: "Full content about sustainable farming...",
        featuredImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        category: "Sustainability",
        readTime: 7,
        isPublished: true,
        publishedAt: new Date('2024-05-28'),
        views: 89,
        tags: ["Sustainability", "Regenerative Agriculture", "Soil Health"]
    },
    {
        _id: "3",
        title: "Harnessing Data for Smarter Farming Decisions",
        excerpt: "How data analytics is transforming agricultural decision-making and increasing yields.",
        content: "Full content about data analytics in farming...",
        featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        category: "Analytics",
        readTime: 6,
        isPublished: true,
        publishedAt: new Date('2024-04-12'),
        views: 120,
        tags: ["Data Analytics", "Smart Farming", "Yield Optimization"]
    }
];

// Routes
// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to AgroNova API',
        version: '1.0.0',
        endpoints: {
            services: '/api/services',
            blog: '/api/blog',
            contact: '/api/contact'
        }
    });
});

// Services routes
app.get('/api/services', (req, res) => {
    res.json({
        success: true,
        count: sampleServices.length,
        data: sampleServices
    });
});

app.get('/api/services/:id', (req, res) => {
    const service = sampleServices.find(s => s._id === req.params.id);
    if (!service) {
        return res.status(404).json({
            success: false,
            message: 'Service not found'
        });
    }
    res.json({
        success: true,
        data: service
    });
});

// Blog routes
app.get('/api/blog', (req, res) => {
    res.json({
        success: true,
        count: sampleBlogs.length,
        data: sampleBlogs
    });
});

app.get('/api/blog/:id', (req, res) => {
    const blog = sampleBlogs.find(b => b._id === req.params.id);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });
    }
    res.json({
        success: true,
        data: blog
    });
});

// Contact route
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message, phone, company } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields'
        });
    }

    // Simulate saving to database
    console.log('Contact form submission:', { name, email, subject, message, phone, company });
    
    res.status(201).json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        data: {
            id: Date.now().toString(),
            name,
            email
        }
    });
});

// Test routes
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is working!'
    });
});

// Error handling
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 AgroNova Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌱 API Documentation: http://localhost:${PORT}`);
    console.log(`✅ Backend is ready to receive requests!`);
});