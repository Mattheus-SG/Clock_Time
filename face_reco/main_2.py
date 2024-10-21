from flask import Flask, request, jsonify
import face_recognition
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def load_stored_images(user_id):
    IMAGES_STORE = os.path.join(os.getcwd(), 'fotos', str(user_id))

    images = []
    if not os.path.exists(IMAGES_STORE):
        return images

    for image in os.listdir(IMAGES_STORE):
        image_path = os.path.join(IMAGES_STORE, image)
        image = face_recognition.load_image_file(image_path)
        encoding = face_recognition.face_encodings(image)
        if encoding:
            images.append(encoding[0])
    return images

@app.route("/compare", methods=["POST"])
def compare_faces():
    if 'file' not in request.files or 'user_id' not in request.form:
        return jsonify({"error": "Dados incompletos (necessário user_id e imagem)"}), 400

    user_id = request.form['user_id']

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "Nenhuma imagem selecionada"}), 400

    try:
        image = face_recognition.load_image_file(file)
        current_encoding = face_recognition.face_encodings(image)[0]
    except IndexError:
        return jsonify({"error": "Nenhuma face detectada na imagem enviada"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    images = load_stored_images(user_id)

    if not images:
        return jsonify({"error": "Nenhuma imagem armazenada encontrada para comparação."}), 404

    face_distances = face_recognition.face_distance(images, current_encoding)

    best_match_index = face_distances.argmin()
    best_match_distance = float(face_distances[best_match_index])

    porcentagem_de_match = (1 - best_match_distance) * 100

    print(best_match_distance < 0.6)
    print(porcentagem_de_match)

    return jsonify({
        "match": best_match_distance < 0.6,
        "porcentagem_de_match": porcentagem_de_match
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
