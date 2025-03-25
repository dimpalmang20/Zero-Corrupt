from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, UserMixin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"

# ----------------------
# User Model
# ----------------------


db = SQLAlchemy()
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ----------------------
# Serve Public Files
# ----------------------
@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:filename>')
def serve_public_files(filename):
    return send_from_directory('public', filename)

# ----------------------
# Serve Static Files
# ----------------------
@app.route('/static/<path:filename>')
def serve_static_files(filename):
    return send_from_directory('static', filename)

# ----------------------
# Handle Login Request
# ----------------------
@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('serve_index'))  # Redirect to home
        else:
            flash('Invalid credentials', 'danger')
            return redirect('/login.html')  # Redirect back to login page
    return render_template("login.html")

# ----------------------
# Handle Registration Request
# ----------------------
@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(name=name, email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful! Please log in.', 'success')
        return redirect('/login.html')
    
    return render_template("register.html")

# ----------------------
# Logout Route
# ----------------------
@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("serve_index"))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure the database is created
    app.run(debug=True)
