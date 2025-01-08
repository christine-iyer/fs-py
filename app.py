from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Adjust the URI as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)  # Enable CORS to allow requests from React (frontend)

# Initialize the database
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)

# Create tables within the application context
with app.app_context():
    db.create_all()

# Route to get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "name": user.name, "age": user.age} for user in users])

# Route to create a new user
@app.route('/create', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(name=data['name'], age=data['age'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"id": new_user.id, "name": new_user.name, "age": new_user.age}), 201

if __name__ == '__main__':
    app.run(debug=True)
