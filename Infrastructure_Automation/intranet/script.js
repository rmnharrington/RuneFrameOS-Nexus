// Bad Guy Gas IT Intranet - JavaScript Functionality
// Author: RuneFrameOS Infrastructure Team
// Version: 1.0.0

// =============================================================================
// DOM CONTENT LOADED
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bad Guy Gas IT Intranet loaded successfully');
    
    // Initialize all functionality
    initializeDateTime();
    initializeSmoothScrolling();
    initializeStatusUpdates();
    initializeResourceCards();
});

// =============================================================================
// DATE & TIME DISPLAY
// =============================================================================
function initializeDateTime() {
    const dateTimeElement = document.getElementById('datetime');
    if (!dateTimeElement) return;
    
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// =============================================================================
// SMOOTH SCROLLING FOR NAVIGATION
// =============================================================================
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const offset = headerHeight + navHeight + 20;
                
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================================================
// STATUS UPDATES
// =============================================================================
function initializeStatusUpdates() {
    // This function can be extended to fetch real-time status updates
    // from the monitoring stack APIs
    
    console.log('Status update system initialized');
    
    // Example: Update status badges periodically
    setInterval(() => {
        // In a real implementation, this would fetch status from:
        // - Prometheus metrics
        // - Service health checks
        // - Monitoring APIs
        console.log('Status check completed');
    }, 30000); // Check every 30 seconds
}

// =============================================================================
// RESOURCE CARDS INTERACTIVITY
// =============================================================================
function initializeResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click tracking (optional)
        card.addEventListener('click', function(e) {
            // Don't track if clicking on links or buttons
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            console.log('Resource card clicked:', this.querySelector('h3').textContent);
        });
    });
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Format bytes to human readable format
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Format percentage
function formatPercentage(value, decimals = 1) {
    return value.toFixed(decimals) + '%';
}

// Format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// =============================================================================
// ERROR HANDLING
// =============================================================================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Log to console for debugging
    console.log('Error details:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

// =============================================================================
// PERFORMANCE MONITORING
// =============================================================================
if ('performance' in window) {
    window.addEventListener('load', function() {
        // Log page load performance
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page Load Performance:', {
                    'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms',
                    'Load Complete': perfData.loadEventEnd - perfData.loadEventStart + 'ms',
                    'Total Load Time': perfData.loadEventEnd - perfData.fetchStart + 'ms'
                });
            }
        }, 0);
    });
}

// =============================================================================
// ACCESSIBILITY ENHANCEMENTS
// =============================================================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close any open modals or dropdowns
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
        // Add modal closing logic here if needed
    }
    
    // Tab key navigation tracking
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// =============================================================================
// RESPONSIVE BEHAVIOR
// =============================================================================
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    // Add responsive classes to body
    document.body.classList.toggle('mobile', isMobile);
    document.body.classList.toggle('tablet', isTablet && !isMobile);
    document.body.classList.toggle('desktop', !isMobile && !isTablet);
}

// Initialize responsive behavior
window.addEventListener('resize', handleResize);
handleResize(); // Call once on load

// =============================================================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// =============================================================================
window.BadGuyGasIntranet = {
    formatBytes,
    formatPercentage,
    formatTimestamp,
    updateDateTime: initializeDateTime,
    refreshStatus: initializeStatusUpdates
};

console.log('Bad Guy Gas IT Intranet JavaScript loaded and ready');

