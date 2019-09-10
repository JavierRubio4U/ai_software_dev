# Flask - Keras Image Classification API

This is a REST API exposing a neural network for image classification. The user submits an image as a POST request to the /predict endpoint where a neural network classifies the image type. The image classification probabilities are returned as a JSON response.  Execute the Python keras_server.py program and test it out using Postman, curl or similar.

The REST API is written using the Flask web framework. The API uses a pre-trained ResNet50 neural network with a Keras and TensorFlow AI backend. 

