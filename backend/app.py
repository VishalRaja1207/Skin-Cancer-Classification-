from flask import Flask, request, jsonify
from predict_skin import predict_image_class 
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])

def predict():
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in the request'}), 400
    
    img_file = request.files['image']  
    loaded_model =  tf.keras.models.load_model("./Model/skin_cancer_model_inc.h5")
    class_names = [
        "Actinic Keratosis", 
        "Basal Cell Carcinoma", 
        "Dermatofibroma", 
        "Melanoma", 
        "Nevus",
        "Pigmented Benign Keratosis",
        "Seborrheic Keratosis",
        "Squamous Cell Carcinoma",
        "Vascular Lesion"
    ]
    predicted_class = predict_image_class(loaded_model, img_file, class_names)
    
    return jsonify({'predicted_class': predicted_class})

if __name__ == '__main__':
    print("Running on port 5000....")
    app.run(debug=True, port=5000)