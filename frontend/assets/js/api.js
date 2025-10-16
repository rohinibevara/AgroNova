// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Service Functions
const apiService = {
    // Get all services
    async getServices() {
        try {
            const response = await fetch(`${API_BASE_URL}/services`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching services:', error);
            return { success: false, data: [] };
        }
    },

    // Get all blog posts
    async getBlogs() {
        try {
            const response = await fetch(`${API_BASE_URL}/blog`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return { success: false, data: [] };
        }
    },

    // Submit contact form
    async submitContact(formData) {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting contact form:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    },

    // Get single blog post
    async getBlog(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/blog/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching blog:', error);
            return { success: false, data: null };
        }
    }
};

export default apiService;