from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/api/v1/profile', methods=['GET'])
def get_profile():
    return jsonify({
        "name": "Sergio Briones",
        "role": "Cloud Engineer & Python Developer",
        "availability": "Inmediata",
        "location": "Valparaíso, Chile",
        "summary": "Junior Cloud Engineer with a passion for automation, infrastructure as code, and building scalable backend systems."
    })

@main.route('/api/v1/skills', methods=['GET'])
def get_skills():
    return jsonify({
        "frontend": ["React", "Tailwind CSS", "HTML5", "CSS3"],
        "backend": ["Python", "Flask", "Django", "SQL"],
        "devops": ["Docker", "Terraform", "AWS", "CI/CD"]
    })

@main.route('/api/v1/timeline', methods=['GET'])
def get_timeline():
    return jsonify([
        {
            "year": "2024",
            "title": "Cloud Engineer Certification",
            "description": "Achieved AWS Solutions Architect Associate certification."
        },
        {
            "year": "2023",
            "title": "Full Stack Developer",
            "description": "Graduated from intensive bootcamp covering Python, React, and Cloud technologies."
        }
    ])

@main.route('/api/v1/certifications', methods=['GET'])
def get_certifications():
    return jsonify([
        {
            "id": 1,
            "title": "AWS Certified Solutions Architect",
            "issuer": "Amazon Web Services",
            "date": "2024-01",
            "url": "https://aws.amazon.com/verification"
        },
        {
            "id": 2,
            "title": "Professional Cloud DevOps Engineer",
            "issuer": "Google Cloud",
            "date": "2023-11",
            "url": "https://google.com/verification"
        }
    ])
