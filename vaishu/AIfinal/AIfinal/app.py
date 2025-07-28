
from flask import Flask, request, jsonify
import google.generativeai as genai
from apikey import google_gemini_api_key, serpapi_key
from serpapi import GoogleSearch
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

genai.configure(api_key=google_gemini_api_key)

RESTRICTED_TOPICS = [
    "sexual content", "sex", "rape", "harassment", "porn", "pornography",
    "sexual assault", "sexual violence", "nudity", "explicit content",
    "sexual abuse", "child abuse", "molestation", "incest"
]

def contains_restricted_content(text):
    if not text:
        return False
    text_lower = text.lower()
    return any(topic in text_lower for topic in RESTRICTED_TOPICS)

generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_ONLY_HIGH"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_ONLY_HIGH"},
]

model = genai.GenerativeModel(
    model_name="models/gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

@app.route('/generate-blog', methods=['POST'])
def generate_blog():
    data = request.json
    blog_title = data.get('blog_title')
    keywords = data.get('keywords')
    num_words = data.get('num_words', 250)
    num_images = data.get('num_images', 0)
    custom_structure = data.get('custom_structure', '')
    tone = data.get('tone', 'Neutral')
    lang_ui = data.get('lang', 'English')
    font_style = data.get('font_style', 'Arial')
    font_size = data.get('font_size', 16)

    if not blog_title or not keywords:
        return jsonify({'error': 'Please provide both blog title and keywords.'}), 400
    if contains_restricted_content(blog_title) or contains_restricted_content(keywords):
        return jsonify({'error': 'Content generation restricted for this topic.'}), 403

    image_instruction = f"Include {num_images} image references." if num_images > 0 else "Do not include images."
    prompt = f'''
    Generate a blog on: "{blog_title}"
    Keywords: {keywords}
    Word count: {num_words}
    Tone: {tone}
    {"Structure: " + custom_structure if custom_structure else ""}
    {image_instruction}
    Ensure it's engaging, informative, and avoids restricted content.
    '''

    try:
        response = model.generate_content(prompt)
        blog_english = response.text.strip()

        if contains_restricted_content(blog_english):
            return jsonify({'error': 'Content generation restricted for this topic.'}), 403

        # Translate if needed
        if lang_ui != "English":
            translation_prompt = f"Translate the following blog into {lang_ui}:\n\n{blog_english}"
            translation = model.generate_content(translation_prompt).text.strip()
            blog_display = translation
        else:
            blog_display = blog_english

        # Highlight keywords
        for kw in map(str.strip, keywords.split(",")):
            if len(kw) > 1:
                pattern = re.compile(rf"\b({re.escape(kw)})\b", re.IGNORECASE)
                blog_display = pattern.sub(r"<u><b>\1</b></u>", blog_display)

        return jsonify({
            'blog_title': blog_title,
            'blog_english': blog_english,
            'blog_display': blog_display
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/suggest-titles', methods=['GET'])
def suggest_titles():
    query = request.args.get('query')
    num_results = int(request.args.get('num_results', 5))
    params = {
        "engine": "google",
        "q": query,
        "api_key": serpapi_key,
        "num": num_results,
    }
    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        titles = [
            {"title": item["title"], "link": item["link"]}
            for item in results.get("organic_results", [])[:num_results]
            if "title" in item and "link" in item
        ]
        return jsonify({'titles': titles})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/fetch-images', methods=['GET'])
def fetch_images():
    query = request.args.get('query')
    num_images = int(request.args.get('num_images', 2))
    if num_images == 0 or contains_restricted_content(query):
        return jsonify({'images': []})
    params = {
        "engine": "google",
        "q": query,
        "tbm": "isch",
        "num": num_images,
        "api_key": serpapi_key
    }
    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        images = [img["original"] for img in results.get("images_results", [])[:num_images]]
        return jsonify({'images': images})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
