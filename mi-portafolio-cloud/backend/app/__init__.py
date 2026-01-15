from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all domains for now, can be restricted to frontend URL later
    CORS(app)
    
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app
