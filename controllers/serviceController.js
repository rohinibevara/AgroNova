const Service = require('../models/Service');
const { validationResult } = require('express-validator');

// Sample services data (fallback if database is empty)
const sampleServices = [
    {
        title: "Smart Crop Monitoring",
        description: "Utilizing drones and IoT sensors to monitor crop health, soil conditions, and environmental factors in real-time.",
        icon: "fas fa-seedling",
        features: ["Real-time monitoring", "Drone technology", "IoT sensors", "Predictive analytics"],
        category: "Monitoring",
        isActive: true
    },
    {
        title: "Precision Irrigation",
        description: "Automated irrigation systems that deliver water precisely when and where it's needed, reducing waste by up to 50%.",
        icon: "fas fa-tint",
        features: ["Water conservation", "Automated systems", "Smart scheduling", "Soil moisture sensors"],
        category: "Irrigation",
        isActive: true
    },
    {
        title: "Automated Farming",
        description: "Robotic systems for planting, weeding, and harvesting that increase efficiency and reduce labor costs.",
        icon: "fas fa-robot",
        features: ["Robotic harvesters", "Automated planting", "Weed detection", "Labor optimization"],
        category: "Automation",
        isActive: true
    },
    {
        title: "Data Analytics",
        description: "Advanced analytics platforms that transform farm data into actionable insights for better decision-making.",
        icon: "fas fa-chart-line",
        features: ["Data visualization", "Predictive analytics", "Yield optimization", "Market insights"],
        category: "Analytics",
        isActive: true
    },
    {
        title: "Sustainable Practices",
        description: "Implementing regenerative agriculture techniques that improve soil health and biodiversity.",
        icon: "fas fa-leaf",
        features: ["Soil health management", "Biodiversity conservation", "Carbon sequestration", "Organic farming"],
        category: "Sustainability",
        isActive: true
    },
    {
        title: "Farmer Education",
        description: "Training programs and workshops to help farmers adopt new technologies and sustainable practices.",
        icon: "fas fa-graduation-cap",
        features: ["Workshops", "Online courses", "Field demonstrations", "Expert consultations"],
        category: "Education",
        isActive: true
    }
];

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
    try {
        const category = req.query.category;
        
        let query = { isActive: true };
        if (category) {
            query.category = category;
        }

        // Try to get services from database first
        let services = await Service.find(query).sort({ createdAt: -1 });

        // If no services in database, return sample data
        if (services.length === 0) {
            services = sampleServices;
        }

        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        console.error('Get services error:', error);
        // If database error, return sample data
        res.json({
            success: true,
            count: sampleServices.length,
            data: sampleServices
        });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

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
    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching service'
        });
    }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        console.error('Create service error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating service'
        });
    }
};