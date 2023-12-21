from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/api/synonyms')
def get_synonyms():
    word = request.args.get('word')
    if not word:
        return jsonify({"error": "No word provided"}), 400

    api_key = os.environ.get('API_KEY') # Get API key from environment variable
    response = requests.get(f'https://api.api-ninjas.com/v1/thesaurus?word={word}',
                            headers={'X-Api-Key': api_key})

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
