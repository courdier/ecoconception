from flask import Flask, render_template
from codecarbon import EmissionsTracker

# Initialiser l'application Flask
app = Flask(__name__)

@app.route('/')
def home():
    """
    Route principale qui sert une vraie page HTML.
    """
    return render_template('index.html')

@app.route('/about')
def about():
    """
    Route pour une page 'À propos'.
    """
    return render_template('about.html')

if __name__ == "__main__":
    # Initialiser le tracker CodeCarbon
    tracker = EmissionsTracker(project_name="ApplicationWebFlask")
    tracker.start()  # Démarrer le suivi des émissions

    try:
        # Lancer l'application Flask
        app.run(debug=True)
    finally:
        # Arrêter le suivi des émissions lorsque l'application se termine
        tracker.stop()
