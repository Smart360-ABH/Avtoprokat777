from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, SelectField, EmailField
from wtforms.validators import DataRequired, Email, Optional, Length
from datetime import datetime, timedelta

class BookingForm(FlaskForm):
    name = StringField('Имя', validators=[DataRequired(), Length(min=2, max=100)])
    phone = StringField('Телефон', validators=[DataRequired(), Length(min=10, max=20)])
    email = EmailField('Email', validators=[Optional(), Email()])
    car_id = SelectField('Автомобиль', coerce=int, validators=[DataRequired()])
    start_date = DateField('Дата начала аренды', validators=[DataRequired()])
    end_date = DateField('Дата окончания аренды', validators=[DataRequired()])
    message = TextAreaField('Дополнительная информация', validators=[Optional(), Length(max=500)])

    def validate_dates(self):
        if self.start_date.data and self.end_date.data:
            if self.start_date.data < datetime.now().date():
                return False, "Дата начала не может быть в прошлом"
            if self.end_date.data <= self.start_date.data:
                return False, "Дата окончания должна быть позже даты начала"
        return True, ""

class ContactForm(FlaskForm):
    name = StringField('Имя', validators=[DataRequired(), Length(min=2, max=100)])
    phone = StringField('Телефон', validators=[DataRequired(), Length(min=10, max=20)])
    email = EmailField('Email', validators=[Optional(), Email()])
    subject = StringField('Тема', validators=[Optional(), Length(max=200)])
    message = TextAreaField('Сообщение', validators=[DataRequired(), Length(min=10, max=1000)])
