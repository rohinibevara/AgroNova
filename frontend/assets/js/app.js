import apiService from './api.js';
import domManager from './components.js';

// Event Handlers
const eventHandlers = {
    // Handle contact form submission
    async handleContactSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            company: form.company.value,
            subject: form.subject.value,
            message: form.message.value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            domManager.showAlert('Please fill in all required fields.', 'error');
            return;
        }

        domManager.toggleFormLoading(true);

        try {
            const result = await apiService.submitContact(formData);
            
            if (result.success) {
                domManager.showAlert(result.message || 'Thank you for your message! We will get back to you soon.');
                form.reset();
            } else {
                domManager.showAlert(result.message || 'There was an error sending your message. Please try again.', 'error');
            }
        } catch (error) {
            domManager.showAlert('Network error. Please check your connection and try again.', 'error');
        } finally {
            domManager.toggleFormLoading(false);
        }
    },

    // Handle blog click
    handleBlogClick(event) {
        if (event.target.closest('.read-more')) {
            event.preventDefault();
            const blogId = event.target.closest('.read-more').dataset.blogId;
            // In a real app, this would navigate to a blog detail page
            alert(`This would open blog post ${blogId} in a real application`);
        }
    }
};

// Utility Functions
const utils = {
    // Mobile Navigation Toggle
    initMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }
    },

    // Smooth scrolling for anchor links
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// Initialize the application
async function initApp() {
    console.log('🚀 Initializing AgroNova application...');

    // Initialize utilities
    utils.initMobileNavigation();
    utils.initSmoothScrolling();

    // Load services
    try {
        const servicesResult = await apiService.getServices();
        if (servicesResult.success) {
            domManager.renderServices(servicesResult.data);
        } else {
            // Fallback to default services if API fails
            const defaultServices = [
                {
                    title: "Smart Crop Monitoring",
                    description: "Utilizing drones and IoT sensors to monitor crop health, soil conditions, and environmental factors in real-time.",
                    icon: "fas fa-seedling",
                    features: ["Real-time monitoring", "Drone technology", "IoT sensors"]
                },
                {
                    title: "Precision Irrigation",
                    description: "Automated irrigation systems that deliver water precisely when and where it's needed, reducing waste by up to 50%.",
                    icon: "fas fa-tint",
                    features: ["Water conservation", "Automated systems", "Smart scheduling"]
                }
            ];
            domManager.renderServices(defaultServices);
        }
    } catch (error) {
        console.error('Error loading services:', error);
    }

    // Load blog posts
    try {
        const blogsResult = await apiService.getBlogs();
        if (blogsResult.success) {
            domManager.renderBlogs(blogsResult.data);
        } else {
            // Fallback to default blog posts if API fails
            const defaultBlogs = [
                {
                    _id: "1",
                    title: "The Future of Precision Agriculture",
                    excerpt: "Exploring how AI and machine learning are revolutionizing farming practices and increasing efficiency.",
                    publishedAt: new Date().toISOString(),
                    featuredImage: "https://images.unsplash.com/photo-1592982537447-7448a57fbab7?auto=format&fit=crop&w=1170&q=80"
                }
            ];
            domManager.renderBlogs(defaultBlogs);
        }
    } catch (error) {
        console.error('Error loading blogs:', error);
    }

    // Set up event listeners
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', eventHandlers.handleContactSubmit);
    }

    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        blogContainer.addEventListener('click', eventHandlers.handleBlogClick);
    }

    console.log('✅ AgroNova application initialized successfully!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);