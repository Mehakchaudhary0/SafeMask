from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///safemask_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = 'recordings'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

db = SQLAlchemy(app)

class SOSAlert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(20))
    time = db.Column(db.String(20))
    latitude = db.Column(db.String(50))
    longitude = db.Column(db.String(50))

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sos-trigger', methods=['POST'])
def sos_trigger():
    data = request.json
    now = datetime.now()
    new_alert = SOSAlert(
        date=now.strftime("%d-%b-%Y"), # Example: 22-Mar-2026
        time=now.strftime("%I:%M %p"), # Example: 10:30 PM
        latitude=str(data.get('lat')),
        longitude=str(data.get('lon'))
    )
    db.session.add(new_alert)
    db.session.commit()
    return jsonify({"status": "success"})

@app.route('/get-logs')
def get_logs():
    alerts = SOSAlert.query.order_by(SOSAlert.id.desc()).all()
    return jsonify([{
        "date": a.date,
        "time": a.time,
        "lat": a.latitude,
        "lon": a.longitude,
        "map_url": f"https://www.google.com/maps?q={a.latitude},{a.longitude}"
    } for a in alerts])

@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    file = request.files['audio']
    filename = f"REC_{datetime.now().strftime('%H%M%S')}.webm"
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    return jsonify({"status": "saved"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
