import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing import image
import io


def preprocess_image(file_storage, target_size=(180, 180)):
    image_data = file_storage.read()
    image_stream = io.BytesIO(image_data)
    img = Image.open(image_stream)
    img = img.resize(target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0 
    return img_array

def predict_image_class(model, image_file, class_names):
    preprocessed_image = preprocess_image(image_file)
    predictions = model.predict(preprocessed_image)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_index]
    return predicted_class