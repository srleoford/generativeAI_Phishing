# app.py

from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the model locally (you can replace this with the correct model)
model_name = "loresiensis/distilgpt2-emailgen-phishing"
generator = pipeline("text-generation", model=model_name)

@app.route('/generate', methods=['POST'])
def generate():
    input_text = request.json.get("text")
    output = generator(input_text, max_length=50)
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
