
from keras.applications.resnet50 import ResNet50
from keras.preprocessing.image import img_to_array
from keras.applications import imagenet_utils
from PIL import Image
import numpy as np
import flask
import tensorflow as tf
import io


# initialize the Flask application and the Keras model
app = flask.Flask(__name__)
model = None


# load the pre-trained Keras model.  Here we are using a pre-trained model
# on ImageNet, provided by Keras, but you can substitute in your own trained model
def load_model():
    global graph
    graph = tf.get_default_graph()
    global model
    model = ResNet50(weights="imagenet")


# pre-process the inbound data, an image in this case
def prepare_image(image, target):
    # if the image mode is not RGB, convert it
    if image.mode != "RGB":
        image = image.convert("RGB")

    # resize the input image and preprocess it
    image = image.resize(target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = imagenet_utils.preprocess_input(image)

    # return the processed image
    return image


# this method processes any requests to the /predict endpoint
@app.route("/predict", methods=["POST"])
def predict():
    # initialize the data dictionary that will be returned in the response
    data = {"success": False}

    # ensure that the image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            # read the image in PIL format
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))

            # pre-process the image and prepare it for classification
            image = prepare_image(image, target=(224, 224))

            # classify the input image & then initialize the list of predictions
            # to return to the client
            with graph.as_default():
                preds = model.predict(image)
                results = imagenet_utils.decode_predictions(preds)
                data["predictions"] = []

                # loop over the results and add them to the list of returned predictions
                for (imagenetID, label, prob) in results[0]:
                    r = {"label": label, "probability": float(prob)}
                    data["predictions"].append(r)

            # indicate that the request was a success
            data["success"] = True

    # return the data dictionary as a JSON response
    return flask.jsonify(data)


# if this is the main execution thread, first load the model and then start the server
if __name__ == "__main__":
    print(("* Loading the Keras model and starting the server..."
          "please wait until the server has fully started"))
    load_model()
    app.run()
