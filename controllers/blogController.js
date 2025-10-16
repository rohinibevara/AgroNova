const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');

// Sample blog data (fallback if database is empty)
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

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
exports.getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const category = req.query.category;
        const search = req.query.search;
        
        let query = { isPublished: true };
        
        if (category) {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Try to get blogs from database first
        let blogs = await Blog.find(query)
            .populate('author', 'name avatar')
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit);

        // If no blogs in database, return sample data
        if (blogs.length === 0) {
            blogs = sampleBlogs;
        }

        const total = blogs.length;
        const totalPages = Math.ceil(total / limit);

        res.json({
            success: true,
            count: blogs.length,
            pagination: {
                page,
                totalPages,
                total,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            data: blogs
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        // If database error, return sample data
        res.json({
            success: true,
            count: sampleBlogs.length,
            pagination: {
                page: 1,
                totalPages: 1,
                total: sampleBlogs.length,
                hasNext: false,
                hasPrev: false
            },
            data: sampleBlogs
        });
    }
};

// @desc    Get single blog
// @route   GET /api/blog/:id
// @access  Public
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'name avatar')
            .populate('comments.user', 'name avatar');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Increment views
        await blog.incrementViews();

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching blog'
        });
    }
};