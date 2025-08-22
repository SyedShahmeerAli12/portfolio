# 🤖 Syed Shahmeer Ali - AI Engineer Portfolio

A stunning, interactive portfolio website showcasing AI/ML engineering expertise with dynamic features powered by Google Gemini AI.

## 🌟 Live Demo

Visit: [Your GitHub Pages URL]

## ✨ Features

### 🎯 **Interactive AI-Powered Components:**
- **👨‍💻 Personal AI Assistant:** Chat with an AI that knows everything about Syed and answers questions in his favor
- **🐍 Neural Network Learning Game:** Learn neural network concepts through an interactive Snake game
- **📊 Dynamic Data Visualization Playground:** Create stunning visualizations from CSV data with AI insights

### 🛠 **Technical Highlights:**
- **Pure Frontend:** No backend required - deploys anywhere as static files
- **Google Gemini Integration:** Real-time AI conversations directly in the browser
- **Interactive Games:** Educational neural network learning through gameplay
- **Data Science Tools:** Professional-grade data visualization capabilities
- **Responsive Design:** Perfect on desktop, tablet, and mobile

### 🎨 **Stunning Visual Design:**
- ✨ **Animated Neural Network Background** - Floating particles and pulsing gradients
- 🧠 **AI Brain Visualization** - Interactive 3D brain with floating synapses in hero section
- 📊 **Animated Statistics** - Dynamic counters and progress bars
- 💫 **Smooth Gradient Effects** - Beautiful color transitions throughout
- 🎭 **Code Animation** - Typing effect visualization in About section
- 🎪 **Interactive Hover Effects** - Cards, buttons, and elements respond to user interaction
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🌟 **Professional Dark Theme** - Modern, recruiter-friendly aesthetic

## 🚀 Quick Setup for GitHub Pages

### **Automatic Setup (Recommended)**
1. **Get Google Gemini API Key:** Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Add as GitHub Secret:** Repository Settings → Secrets → Actions → New secret
   - Name: `GEMINI_API_KEY`
   - Value: Your API key
3. **Enable GitHub Pages:** Settings → Pages → Source: "GitHub Actions"
4. **Push to main branch** - GitHub Actions will automatically deploy with your API key injected!

**Result:** AI Assistant works immediately for all visitors - no API key prompts! ✨

### **Manual Setup (Alternative)**
1. Fork/Clone this repository
2. Users will be prompted to enter their own API key when using AI features
3. Deploy via Settings → Pages → Deploy from branch → `main`

📋 **See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed step-by-step instructions!**

### 3. **Local Development**
```bash
# Clone the repository
git clone [your-repo-url]
cd [repository-name]

# Serve locally (Python)
python -m http.server 8000

# Or with Node.js
npx serve .

# Or with any static file server
# Visit http://localhost:8000
```

## 📁 File Structure

```
portfolio/
├── index.html              # Main portfolio page
├── personal_ai.html         # AI Assistant feature
├── neural_game.html         # Snake learning game
├── data_viz.html           # Data visualization playground
├── portfolio.css           # Main styles
├── personal_ai.css         # AI Assistant styles
├── neural_game.css         # Game styles
├── data_viz.css           # Visualization styles
├── portfolio.js            # Main interactions
├── personal_ai.js          # AI Assistant logic
├── neural_game.js          # Game logic
├── data_viz.js            # Visualization logic
└── README.md              # This file
```

## 🔧 Customization

### **Personal Information**
Edit the following files to customize with your details:
- `index.html` - Update name, description, projects, contact info
- `personal_ai.js` - Update the `personalKnowledge` section with your background

### **Projects**
Update the project cards in `index.html`:
```html
<div class="project-card" onclick="window.open('YOUR_GITHUB_URL', '_blank')">
    <h3>Your Project Name</h3>
    <p>Your project description...</p>
</div>
```

### **Styling**
All color schemes and layouts can be customized in the respective CSS files.

## 🎮 How to Use

### **Personal AI Assistant:**
1. Enter your Google Gemini API key when prompted
2. Ask questions about Syed's background, skills, and experience
3. The AI responds in first-person as Syed, optimized for recruiters

### **Neural Snake Game:**
1. Use arrow keys to control the snake
2. Eat food to grow and add neural network layers
3. Learn about neural networks through gameplay
4. Answer quiz questions to test your knowledge

### **Data Visualization:**
1. Upload CSV files or generate sample datasets
2. Choose from multiple chart types (bar, line, pie, scatter, etc.)
3. Get AI-powered insights about your data
4. Export visualizations as PNG images

## 🛡️ Security & Privacy

- **API Key Storage:** Your Gemini API key is stored locally in your browser only
- **No Data Collection:** No personal data is sent to any servers except Google's Gemini API
- **Static Deployment:** No backend means maximum security and reliability

## 🎯 Perfect For

- **AI/ML Engineers** showcasing their skills to recruiters
- **Students** demonstrating practical AI knowledge
- **Professionals** wanting an interactive, engaging portfolio
- **Anyone** interested in modern web development with AI integration

## 📞 Contact

- **Email:** ashahmeer73@gmail.com
- **LinkedIn:** [Syed Shahmeer Ali](https://www.linkedin.com/in/syed-shahmeer-ali-61a836288/)
- **GitHub:** [SyedShahmeerAli12](https://github.com/SyedShahmeerAli12)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Syed Shahmeer Ali | Powered by Google Gemini AI