# Docker, Flask, Keras & TensorFlow Image Classification API

This is a REST API exposing a neural network for image classification. The user submits an image as a POST request to the /predict endpoint where a neural network classifies the image type. The image classification probabilities are returned as a JSON response.  The API service implementation / deployment is performed using a Docker container. Use Postman, curl or similar to submit your REST request to the exposed Docker port.

The REST API is written using the Flask web framework. The API uses a pre-trained ResNet50 neural network with a Keras and TensorFlow AI backend. 

