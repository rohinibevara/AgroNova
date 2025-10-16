// DOM Management Functions
const domManager = {
    // Show alert message
    showAlert(message, type = 'success', containerId = 'contact-alert') {
        const alertDiv = document.getElementById(containerId);
        alertDiv.innerHTML = `
            <div class="alert alert-${type}">
                ${message}
            </div>
        `;
        alertDiv.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    },

    // Render services
    renderServices(services, containerId = 'services-container') {
        const servicesContainer = document.getElementById(containerId);
        const footerServices = document.getElementById('services-footer');
        
        if (!services || services.length === 0) {
            servicesContainer.innerHTML = '<p class="text-center">No services available at the moment.</p>';
            return;
        }

        servicesContainer.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon || 'fas fa-seedling'}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                ${service.features && service.features.length > 0 ? `
                    <ul style="text-align: left; margin-top: 15px;">
                        ${service.features.map(feature => `<li style="margin-bottom: 5px;">• ${feature}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');

        // Also update footer services
        if (footerServices) {
            footerServices.innerHTML = services.map(service => `
                <li><a href="#services">${service.title}</a></li>
            `).join('');
        }
    },

    // Render blog posts
    renderBlogs(blogs, containerId = 'blog-container') {
        const blogContainer = document.getElementById(containerId);
        
        if (!blogs || blogs.length === 0) {
            blogContainer.innerHTML = '<p class="text-center">No blog posts available at the moment.</p>';
            return;
        }

        blogContainer.innerHTML = blogs.map(blog => `
            <div class="blog-card">
                <div class="blog-image">
                    <img src="${blog.featuredImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'}" alt="${blog.title}">
                </div>
                <div class="blog-content">
                    <div class="blog-date">${new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</div>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="#" class="read-more" data-blog-id="${blog._id}">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    },

    // Toggle form loading state
    toggleFormLoading(loading, buttonId = 'submit-btn') {
        const submitBtn = document.getElementById(buttonId);
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');
        
        if (loading) {
            submitBtn.disabled = true;
            submitText.style.display = 'none';
            submitSpinner.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            submitSpinner.style.display = 'none';
        }
    }
};

export default domManager;