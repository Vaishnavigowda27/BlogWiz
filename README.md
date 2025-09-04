# BlogWiz – AI-Powered Blog Generator

[🌐 Visit the Live Site](https://blogwiz-ai.netlify.app)

BlogWiz is an intelligent content-generation platform that lets you create high-quality, SEO-friendly blogs using AI.  
Powered by **Google Gemini**, **SerpAPI**, and a sleek **glassmorphism UI**, BlogWiz brings modern design and AI content creation into one seamless tool.

---

## 📸 Screenshots

### Generate Blog in Hindi
![BlogWiz Hindi Screenshot](https://github.com/user-attachments/assets/acef15d8-4c32-4bdc-a7b6-6468254be96a)

### Generate Blog in English
![BlogWiz English Screenshot](https://github.com/user-attachments/assets/b923fc49-18ce-46ce-b3d4-110b76761d90)

---

## 🚀 Features

- ✍️ **AI Blog Generation** using Gemini API  
- 🔎 **Smart Blog Titles** via SerpAPI  
- 🖼️ **Auto-Fetched Images** for blog context  
- 🧊 **Glassmorphism UI** with dark mode toggle  
- 🌐 **Multi-language Support** (English, Hindi, Kannada)  
- 🚫 **Content Filtering** to restrict unsafe topics  
- ⚡ Built with **Streamlit**, **Flask**, and **React**

---

## 🛠️ Tech Stack

| Frontend              | Backend           | AI/Utilities                 | Deployment             |
|-----------------------|-------------------|------------------------------|------------------------|
| React + Tailwind CSS  | Flask + Streamlit | Google Gemini API, SerpAPI   | Vercel / Streamlit Cloud |

---

## 📦 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Vaishnavigowda27/BlogWiz.git
cd BlogWiz

# 2. (Frontend) Install React dependencies
cd frontend
npm install
npm run dev

# 3. (Backend) Setup Flask + Streamlit API
cd ../backend
pip install -r requirements.txt
streamlit run app.py
