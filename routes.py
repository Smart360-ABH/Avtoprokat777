from flask import render_template, request, redirect, url_for, flash
from app import app, db
from models import Car, BookingRequest, ContactMessage
from forms import BookingForm, ContactForm

# Initialize cars data if database is empty
def init_cars():
    if Car.query.count() == 0:
        cars_data = [
            {
                'name': 'Honda Fit RS',
                'model': 'Honda Fit RS',
                'price_per_day': 2500,
                'engine': '1.5 л',
                'seats': 4,
                'car_type': 'Компактный',
                'description': 'Экономичный и надежный автомобиль для городских поездок',
                'image_url': '/static/images/honda-fit-rs.jpg'
            },
            {
                'name': 'Toyota Mark X Premium',
                'model': 'Toyota Mark X Premium',
                'price_per_day': 3000,
                'engine': '3.0 л',
                'seats': 4,
                'car_type': 'Премиум седан',
                'description': 'Комфортный премиум-седан для деловых поездок',
                'image_url': '/static/images/toyota-mark-x.jpg'
            },
            {
                'name': 'Toyota Alphard',
                'model': 'Toyota Alphard',
                'price_per_day': 4500,
                'engine': '2.4 л',
                'seats': 7,
                'car_type': 'Минивэн',
                'description': 'Просторный минивэн для больших компаний и семей',
                'image_url': '/static/images/toyota-alphard.jpg'
            },
            {
                'name': 'Toyota Soarer',
                'model': 'Toyota Soarer',
                'price_per_day': 6000,
                'engine': '4.3 л',
                'seats': 2,
                'car_type': 'Кабриолет',
                'description': 'Роскошный кабриолет для незабываемых поездок',
                'image_url': '/static/images/toyota-soarer.jpg'
            }
        ]
        
        for car_data in cars_data:
            car = Car(**car_data)
            db.session.add(car)
        
        db.session.commit()

@app.route('/')
def index():
    cars = Car.query.filter_by(is_available=True).limit(4).all()
    return render_template('index.html', cars=cars)

@app.route('/fleet')
def fleet():
    cars = Car.query.filter_by(is_available=True).all()
    return render_template('fleet.html', cars=cars)

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    
    if form.validate_on_submit():
        contact_msg = ContactMessage(
            name=form.name.data,
            phone=form.phone.data,
            email=form.email.data,
            subject=form.subject.data,
            message=form.message.data
        )
        db.session.add(contact_msg)
        db.session.commit()
        flash('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html', form=form)

@app.route('/booking', methods=['GET', 'POST'])
def booking():
    form = BookingForm()
    form.car_id.choices = [(car.id, f"{car.name} - {car.price_per_day}₽/сутки") 
                          for car in Car.query.filter_by(is_available=True).all()]
    
    if form.validate_on_submit():
        is_valid, error_msg = form.validate_dates()
        if not is_valid:
            flash(error_msg, 'error')
            return render_template('contact.html', form=form, booking_form=form)
        
        booking = BookingRequest(
            name=form.name.data,
            phone=form.phone.data,
            email=form.email.data,
            car_id=form.car_id.data,
            start_date=form.start_date.data,
            end_date=form.end_date.data,
            message=form.message.data
        )
        db.session.add(booking)
        db.session.commit()
        flash('Заявка на бронирование отправлена! Мы свяжемся с вами для подтверждения.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html', booking_form=form)

@app.errorhandler(404)
def not_found(error):
    return render_template('base.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('base.html'), 500
