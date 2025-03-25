from flask import request, redirect, url_for, flash
from backend.app import app, db, bcrypt
from backend.models import User
from flask_login import login_user, logout_user

@app.route("/login", methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return redirect(url_for('home'))
    else:
        flash('Invalid credentials', 'danger')
        return redirect(url_for('login'))

@app.route("/register", methods=['POST'])
def register_post():
    # Registration logic
    ...
    return redirect(url_for('login'))
