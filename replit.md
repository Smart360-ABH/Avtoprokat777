# АВТОПРОКАТ 777 - Car Rental Service

## Overview

АВТОПРОКАТ 777 is a car rental service web application built for Abkhazia, offering a fleet of vehicles ranging from compact cars to premium sedans and convertibles. The application provides a complete booking system with customer contact forms, fleet management, and rental request processing. The interface is designed in Russian language to serve the local market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask for server-side rendering
- **UI Framework**: Bootstrap 5 for responsive design and component styling
- **Icons**: Font Awesome for consistent iconography
- **JavaScript**: Vanilla JavaScript for client-side interactions including phone number formatting, smooth scrolling, and form enhancements
- **Styling**: Custom CSS with CSS variables for consistent theming and responsive design

### Backend Architecture
- **Web Framework**: Flask with Python for the main application logic
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy for database operations
- **Form Handling**: Flask-WTF with WTForms for form validation and CSRF protection
- **Session Management**: Flask sessions with configurable secret key
- **Database**: SQLite for development with PostgreSQL support via environment configuration
- **Middleware**: ProxyFix for handling reverse proxy headers

### Data Models
- **Car Model**: Stores vehicle information including name, model, pricing, specifications, and availability status
- **BookingRequest Model**: Manages rental requests with customer details, dates, and booking status
- **ContactMessage Model**: Handles general customer inquiries and contact form submissions

### Form Architecture
- **BookingForm**: Comprehensive rental booking with date validation and car selection
- **ContactForm**: Customer contact form with validation for inquiries
- **Validation**: Custom date validation ensuring future booking dates and logical date ranges

### Database Design
- **Relational Structure**: Foreign key relationships between cars and bookings
- **Automatic Timestamps**: Created_at fields for audit trails
- **Status Tracking**: Booking status management (pending, confirmed, etc.)
- **Flexible Schema**: Support for car specifications, customer details, and messaging

### Application Structure
- **Modular Design**: Separated concerns with dedicated files for models, routes, forms, and configuration
- **Database Initialization**: Automatic table creation and sample data seeding
- **Environment Configuration**: Support for development and production database URLs
- **Logging**: Comprehensive logging configuration for debugging and monitoring

## External Dependencies

### Core Dependencies
- **Flask**: Web application framework
- **SQLAlchemy**: Database ORM and connection management
- **Flask-WTF**: Form handling and CSRF protection
- **WTForms**: Form validation and rendering
- **Werkzeug**: WSGI utilities and proxy handling

### Frontend Dependencies
- **Bootstrap 5**: CSS framework loaded via CDN
- **Font Awesome**: Icon library loaded via CDN
- **jQuery**: JavaScript library for enhanced functionality

### Database
- **SQLite**: Default development database
- **PostgreSQL**: Production database support via DATABASE_URL environment variable
- **Connection Pooling**: Configured with pool recycling and pre-ping for reliability

### Potential Integrations
- **Payment Processing**: Ready for integration with payment gateways
- **SMS/Email Services**: Contact forms prepared for notification services
- **Map Services**: Infrastructure for location-based features
- **Image Storage**: Support for car image hosting services