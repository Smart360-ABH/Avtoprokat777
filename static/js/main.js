// Main JavaScript file for АВТОПРОКАТ 777

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeScrollEffects();
    initializeForms();
    initializeMap();
    initializeCarousel();
    initializeDatePickers();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('7')) {
                value = value.substring(1);
            }
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `+7(${value}`;
                } else if (value.length <= 6) {
                    value = `+7(${value.slice(0,3)})${value.slice(3)}`;
                } else if (value.length <= 8) {
                    value = `+7(${value.slice(0,3)})${value.slice(3,6)}-${value.slice(6)}`;
                } else {
                    value = `+7(${value.slice(0,3)})${value.slice(3,6)}-${value.slice(6,8)}-${value.slice(8,10)}`;
                }
            }
            e.target.value = value;
        });
    });
});

// Initialize scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.card, .service-card, .car-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize forms
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            
            // Remove loading state after 3 seconds if form hasn't redirected
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }, 3000);
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('is-invalid', 'is-valid');
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Имя должно содержать минимум 2 символа';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный номер телефона';
            }
            break;
            
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный email адрес';
            }
            break;
            
        case 'start_date':
        case 'end_date':
            const today = new Date().toISOString().split('T')[0];
            if (value < today) {
                isValid = false;
                errorMessage = 'Дата не может быть в прошлом';
            }
            break;
    }
    
    // Apply validation styling
    if (value) { // Only validate if field has value
        field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        
        if (!isValid) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    return isValid;
}

// Initialize Yandex Map
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Load Yandex Maps API
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
    script.onload = function() {
        ymaps.ready(function () {
            const map = new ymaps.Map('map', {
                center: [42.8746, 41.0982], // Sukhumi coordinates
                zoom: 8,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            // Add placemark for main office area
            const placemark = new ymaps.Placemark([42.8746, 41.0982], {
                balloonContent: `
                    <div style="padding: 10px;">
                        <h6><strong>АВТОПРОКАТ 777</strong></h6>
                        <p>Зона обслуживания: Сухум и окрестности</p>
                        <p><i class="fas fa-phone"></i> +7(940)993-84-97</p>
                    </div>
                `,
                hintContent: 'АВТОПРОКАТ 777 - Сухум'
            }, {
                preset: 'islands#redDotIcon'
            });
            
            map.geoObjects.add(placemark);
            
            // Add area polygon for service zone
            const serviceArea = new ymaps.Polygon([[
                [42.5, 40.0],
                [43.5, 40.0],
                [43.5, 41.5],
                [42.5, 41.5]
            ]], {
                hintContent: 'Зона обслуживания АВТОПРОКАТ 777'
            }, {
                fillColor: '#2C5F7C',
                fillOpacity: 0.1,
                strokeColor: '#2C5F7C',
                strokeOpacity: 0.8,
                strokeWidth: 2
            });
            
            map.geoObjects.add(serviceArea);
        });
    };
    
    document.head.appendChild(script);
}

// Initialize image carousel/gallery
function initializeCarousel() {
    const carImages = document.querySelectorAll('.car-card img, .car-detail-card img');
    
    carImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal for image preview
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Просмотр изображения</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img src="${this.src}" class="img-fluid rounded" alt="${this.alt}">
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            
            // Remove modal after hiding
            modal.addEventListener('hidden.bs.modal', function() {
                modal.remove();
            });
        });
    });
}

// Initialize date pickers
function initializeDatePickers() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
        
        // Set default values
        if (input.name === 'start_date' && !input.value) {
            input.value = today;
        }
        
        if (input.name === 'end_date' && !input.value) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            input.value = tomorrow.toISOString().split('T')[0];
        }
        
        // Validate date relationships
        input.addEventListener('change', function() {
            const form = this.closest('form');
            const startDate = form.querySelector('input[name="start_date"]');
            const endDate = form.querySelector('input[name="end_date"]');
            
            if (startDate && endDate && startDate.value && endDate.value) {
                if (new Date(endDate.value) <= new Date(startDate.value)) {
                    const newEndDate = new Date(startDate.value);
                    newEndDate.setDate(newEndDate.getDate() + 1);
                    endDate.value = newEndDate.toISOString().split('T')[0];
                }
            }
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 150);
        }
    }, 5000);
}

// WhatsApp integration
function openWhatsApp(carName = '') {
    const phone = '79409938497';
    let message = 'Здравствуйте! Интересует аренда автомобиля.';
    
    if (carName) {
        message = `Здравствуйте! Хочу забронировать ${carName}.`;
    }
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Telegram integration
function openTelegram() {
    const url = 'https://t.me/+79409938497';
    window.open(url, '_blank');
}

// Price calculator
function calculatePrice(pricePerDay, startDate, endDate) {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays * pricePerDay;
}

// Export functions for global use
window.AutoRent = {
    showNotification,
    openWhatsApp,
    openTelegram,
    calculatePrice,
    validateField
};
