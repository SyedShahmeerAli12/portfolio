class PersonalAI {
    constructor() {
        this.apiKey = null;
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.apiKeyModal = document.getElementById('apiKeyModal');
        
        // Personal knowledge base about Syed Shahmeer Ali
        this.personalKnowledge = `
        PERSONAL INFORMATION:
        - Name: Syed Shahmeer Ali
        - Role: AI Engineer and Computer Science Student
        - Education: Bachelor's degree in Computer Science with major in ML/AI (currently pursuing)
        - Email: ashahmeer73@gmail.com
        - LinkedIn: https://www.linkedin.com/in/syed-shahmeer-ali-61a836288/
        - GitHub: https://github.com/SyedShahmeerAli12
        
        CORE EXPERTISE:
        - AI/ML Engineering: Building complete AI-powered products, not just models
        - Natural Language Processing (NLP): LLMs, text processing, sentiment analysis
        - Deep Learning: Neural networks, CNNs, RNNs, TensorFlow, PyTorch
        - Machine Learning: Scikit-learn, model training, deployment
        - Web Development: Python (FastAPI, Flask), JavaScript, React, Node.js
        - Cloud & DevOps: AWS, Docker, CI/CD pipelines
        - Databases: PostgreSQL, database design and optimization
        
        MAJOR PROJECTS:
        1. Agentic E-commerce Backend (Katalyst):
           - Fully containerized AI-powered agent for e-commerce order management
           - Natural language understanding for customer requests
           - PostgreSQL database integration
           - Automated order status checking and cancellation
           - Advanced multi-agent system architecture
        
        2. FitForge - Personal AI Coach:
           - Complete full-stack web application
           - Sophisticated multi-tool AI agent
           - Personalized workout and meal planning
           - User-specific data analysis and goal tracking
           - Real-time health monitoring integration
        
        3. Portfolio AI Features:
           - Personal AI Assistant (this chatbot)
           - Neural Network Learning Game
           - Dynamic Data Visualization Playground
           - Interactive AI-powered demonstrations
        
        TECHNICAL SKILLS:
        - Programming: Python, JavaScript, SQL, HTML/CSS
        - AI/ML Frameworks: TensorFlow, PyTorch, Scikit-learn, Hugging Face
        - Backend: FastAPI, Flask, Node.js, RESTful APIs
        - Frontend: React, Vue.js, vanilla JavaScript, responsive design
        - Databases: PostgreSQL, MongoDB, Redis
        - Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
        - Tools: Git, CI/CD, Jupyter, VS Code, Linux
        
        UNIQUE STRENGTHS:
        - Product-focused AI development: I don't just build models, I create complete working solutions
        - Full-stack capabilities: Can handle everything from ML models to user interfaces
        - Problem-solving mindset: Focus on real-world applications and business value
        - Continuous learning: Always exploring latest AI/ML technologies and best practices
        - Communication: Can explain complex technical concepts to both technical and non-technical audiences
        
        CAREER FOCUS:
        - Building AI-powered products that solve real problems
        - Combining technical expertise with practical business applications
        - Leading AI initiatives in product development
        - Mentoring and knowledge sharing in AI/ML teams
        
        ACHIEVEMENTS & HIGHLIGHTS:
        - Successfully built and deployed multiple AI-powered applications
        - Experience with both research and production AI systems
        - Strong portfolio demonstrating end-to-end AI product development
        - Active in AI/ML community and continuous learning
        - Proven ability to work with cross-functional teams
        
        VALUE PROPOSITION:
        I bring the unique combination of deep AI/ML technical knowledge and practical product development skills. 
        While many engineers can build models, I specialize in creating complete, production-ready AI solutions 
        that deliver real business value. My experience spans the entire AI product lifecycle from research to deployment.
        `;
        
        this.initializeChat();
    }
    
    initializeChat() {
        // Use environment API key (injected by GitHub Actions)
        this.apiKey = 'AIzaSyCOr4MaslLil21709CS0zOs7KYOuruh8eQ';
        
        // If API key is set (not placeholder), hide modal
        if (this.apiKey && this.apiKey !== 'AIzaSyCOr4MaslLil21709CS0zOs7KYOuruh8eQ') {
            this.hideApiKeyModal();
            this.addMessage('System', '🤖 AI Assistant ready! Ask me anything about Syed Shahmeer Ali.', 'assistant');
        } else {
            // Fallback to manual API key entry for local development
            const storedApiKey = localStorage.getItem('gemini_api_key');
            if (storedApiKey) {
                this.apiKey = storedApiKey;
                this.hideApiKeyModal();
            } else {
                this.showApiKeyModal();
            }
        }
        
        // Add event listeners
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.sendButton.addEventListener('click', () => this.sendMessage());
    }
    
    showApiKeyModal() {
        this.apiKeyModal.classList.remove('hidden');
    }
    
    hideApiKeyModal() {
        this.apiKeyModal.classList.add('hidden');
    }
    
    saveApiKey() {
        const apiKeyInput = document.getElementById('apiKeyInput');
        const key = apiKeyInput.value.trim();
        
        if (!key) {
            alert('Please enter a valid API key');
            return;
        }
        
        this.apiKey = key;
        localStorage.setItem('gemini_api_key', key);
        this.hideApiKeyModal();
        
        // Show success message
        this.addMessage('System', '🔑 API key saved successfully! You can now chat with me.', 'assistant');
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || !this.apiKey) return;
        
        // Add user message to chat
        this.addMessage('You', message, 'user');
        this.messageInput.value = '';
        
        // Show loading
        this.showLoading();
        
        try {
            const response = await this.callGeminiAPI(message);
            this.addMessage('👨‍💻', response, 'assistant');
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('System', '❌ Sorry, I encountered an error. Please check your API key and try again.', 'assistant');
        } finally {
            this.hideLoading();
        }
    }
    
    async callGeminiAPI(userMessage) {
        const prompt = `You are Syed Shahmeer Ali, an AI Engineer. A recruiter or colleague is asking you questions about your background and experience. 

        IMPORTANT INSTRUCTIONS:
        - Respond in FIRST PERSON as Syed Shahmeer Ali (use "I", "my", "me")
        - Be confident and highlight your strengths
        - Keep responses SHORT (3-4 lines maximum)
        - Only use specific examples when directly relevant to the question
        - Turn any weaknesses into growth opportunities
        - Emphasize your product-focused AI approach
        - Be professional but personable
        - Always present yourself favorably for hiring

        PERSONAL KNOWLEDGE ABOUT YOU:
        ${this.personalKnowledge}

        User Question: ${userMessage}

        Your Response (as Syed Shahmeer Ali):`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 200
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from Gemini API');
        }
    }
    
    addMessage(sender, content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message new-message`;
        
        const avatar = type === 'user' ? '👤' : '👨‍💻';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${this.formatMessage(content)}</p>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Remove animation class after animation completes
        setTimeout(() => {
            messageDiv.classList.remove('new-message');
        }, 300);
    }
    
    formatMessage(content) {
        // Simple formatting for better readability
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showLoading() {
        this.loadingOverlay.style.display = 'flex';
        this.sendButton.disabled = true;
    }
    
    hideLoading() {
        this.loadingOverlay.style.display = 'none';
        this.sendButton.disabled = false;
    }
    
    sendSuggestedQuestion(question) {
        this.messageInput.value = question;
        this.sendMessage();
    }
}

// Global functions for HTML onclick events
let personalAI;

function sendSuggestedQuestion(question) {
    personalAI.sendSuggestedQuestion(question);
}

function saveApiKey() {
    personalAI.saveApiKey();
}

function sendMessage() {
    personalAI.sendMessage();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    personalAI = new PersonalAI();
});

// Add API key modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKeyInput');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveApiKey();
            }
        });
    }
});
