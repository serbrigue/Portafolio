from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Enable CORS
    import os
    from dotenv import load_dotenv
    load_dotenv()
    
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev_key')
    allowed_origins = os.getenv('CORS_ORIGINS', '*').split(',')
    
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})
    
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app
