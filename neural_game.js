class NeuralSnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.score = 0;
        this.networkLayers = 1;
        this.aiIntelligence = 'Basic';
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameInterval = null;
        
        // Snake
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        
        // Food
        this.food = { x: 5, y: 5 };
        
        // Neural network layers and capabilities
        this.neuralLayers = ['Input Layer (4 neurons)'];
        this.capabilities = ['Basic movement detection'];
        
        // Quiz
        this.quizQuestions = this.initializeQuizQuestions();
        this.currentQuizIndex = 0;
        
        this.initializeEventListeners();
        this.generateFood();
        this.updateDisplay();
        this.draw();
    }
    
    initializeEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning || this.gamePaused) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    if (this.dy === 0) { this.dx = 0; this.dy = -1; }
                    break;
                case 'ArrowDown':
                    if (this.dy === 0) { this.dx = 0; this.dy = 1; }
                    break;
                case 'ArrowLeft':
                    if (this.dx === 0) { this.dx = -1; this.dy = 0; }
                    break;
                case 'ArrowRight':
                    if (this.dx === 0) { this.dx = 1; this.dy = 0; }
                    break;
            }
        });
    }
    
    startGame() {
        if (this.gameRunning && !this.gamePaused) return;
        
        if (!this.gameRunning) {
            this.resetGame();
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.dx = 1; // Start moving right
        this.dy = 0;
        
        this.gameInterval = setInterval(() => {
            this.update();
        }, 150);
        
        this.showLearningTip("Game started! Use arrow keys to control your neural snake. Each food eaten adds a new layer to your network!");
    }
    
    pauseGame() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            clearInterval(this.gameInterval);
            this.showLearningTip("Game paused. The neural network is resting!");
        } else {
            this.gameInterval = setInterval(() => {
                this.update();
            }, 150);
            this.showLearningTip("Game resumed! Keep feeding your neural network!");
        }
    }
    
    resetGame() {
        clearInterval(this.gameInterval);
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.networkLayers = 1;
        this.aiIntelligence = 'Basic';
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.neuralLayers = ['Input Layer (4 neurons)'];
        this.capabilities = ['Basic movement detection'];
        
        this.generateFood();
        this.updateDisplay();
        this.draw();
        this.showLearningTip("Neural network reset! Ready to start learning again.");
    }
    
    update() {
        // Move snake head
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    eatFood() {
        this.score++;
        this.networkLayers++;
        this.generateFood();
        this.addNeuralLayer();
        this.updateAIIntelligence();
        this.updateDisplay();
        this.showAchievement();
        
        // Update learning tip based on current layers
        const tips = [
            "Great! Added a hidden layer. Neural networks learn patterns through these hidden layers!",
            "Another layer! Deep networks can learn more complex features and patterns.",
            "Excellent! You're building a deep neural network. Each layer processes information at different levels of abstraction.",
            "Amazing! Your network is getting sophisticated. This is how modern AI systems work!",
            "Fantastic! You've built a complex neural network. This is the foundation of artificial intelligence!"
        ];
        
        const tipIndex = Math.min(this.networkLayers - 2, tips.length - 1);
        if (tipIndex >= 0) {
            this.showLearningTip(tips[tipIndex]);
        }
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        for (let segment of this.snake) {
            if (this.food.x === segment.x && this.food.y === segment.y) {
                this.generateFood();
                return;
            }
        }
    }
    
    addNeuralLayer() {
        const layerTypes = [
            'Hidden Layer 1 (8 neurons)',
            'Hidden Layer 2 (16 neurons)',
            'Hidden Layer 3 (32 neurons)',
            'Hidden Layer 4 (16 neurons)',
            'Hidden Layer 5 (8 neurons)',
            'Output Layer (4 neurons)'
        ];
        
        const capabilityTypes = [
            'Pattern recognition',
            'Feature extraction',
            'Complex decision making',
            'Advanced pathfinding',
            'Predictive analysis',
            'Strategic planning'
        ];
        
        if (this.networkLayers <= layerTypes.length + 1) {
            const newLayer = layerTypes[this.networkLayers - 2];
            const newCapability = capabilityTypes[this.networkLayers - 2];
            
            if (newLayer) {
                this.neuralLayers.push(newLayer);
            }
            if (newCapability) {
                this.capabilities.push(newCapability);
            }
        }
    }
    
    updateAIIntelligence() {
        if (this.networkLayers >= 6) {
            this.aiIntelligence = 'Expert';
        } else if (this.networkLayers >= 4) {
            this.aiIntelligence = 'Advanced';
        } else if (this.networkLayers >= 2) {
            this.aiIntelligence = 'Intermediate';
        } else {
            this.aiIntelligence = 'Basic';
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(71, 85, 105, 0.3)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
        
        // Draw snake
        this.ctx.fillStyle = '#06b6d4';
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            
            // Draw head differently
            if (i === 0) {
                this.ctx.fillStyle = '#0891b2';
                this.ctx.fillRect(segment.x * this.gridSize + 2, segment.y * this.gridSize + 2, this.gridSize - 6, this.gridSize - 6);
                this.ctx.fillStyle = '#06b6d4';
            }
        }
        
        // Draw food
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        
        // Add glow effect to food
        this.ctx.shadowColor = '#ef4444';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(this.food.x * this.gridSize + 4, this.food.y * this.gridSize + 4, this.gridSize - 10, this.gridSize - 10);
        this.ctx.shadowBlur = 0;
    }
    
    updateDisplay() {
        document.getElementById('gameScore').textContent = this.score;
        document.getElementById('networkLayers').textContent = this.networkLayers;
        document.getElementById('aiIntelligence').textContent = this.aiIntelligence;
        
        // Update architecture display
        const architectureDisplay = document.querySelector('.architecture-display');
        architectureDisplay.innerHTML = this.neuralLayers.map(layer => 
            `<div class="layer-item">${layer}</div>`
        ).join('');
        
        // Update capabilities list
        const capabilitiesList = document.getElementById('capabilitiesList');
        capabilitiesList.innerHTML = this.capabilities.map(capability => 
            `<li>${capability}</li>`
        ).join('');
    }
    
    showAchievement() {
        const toast = document.getElementById('achievementToast');
        const desc = document.getElementById('achievementDesc');
        
        const achievements = [
            'First neural layer added!',
            'Building deeper networks!',
            'Advanced AI capabilities unlocked!',
            'Expert-level neural architecture!',
            'You\'ve mastered neural networks!'
        ];
        
        const achievementIndex = Math.min(this.networkLayers - 2, achievements.length - 1);
        desc.textContent = achievements[achievementIndex] || 'Neural network growing!';
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    showLearningTip(tip) {
        document.getElementById('learningTip').textContent = tip;
    }
    
    gameOver() {
        clearInterval(this.gameInterval);
        this.gameRunning = false;
        this.showLearningTip(`Game Over! Your neural network processed ${this.score} training examples. Final intelligence level: ${this.aiIntelligence}`);
        
        // Draw game over overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ef4444';
        this.ctx.font = '48px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.font = '24px Inter';
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        this.ctx.fillText(`Network Layers: ${this.networkLayers}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
    
    initializeQuizQuestions() {
        return [
            {
                id: 'activation_1',
                question: 'What is the most common activation function in hidden layers?',
                options: ['ReLU', 'Sigmoid', 'Tanh', 'Linear'],
                correct: 'relu',
                explanation: 'ReLU (Rectified Linear Unit) is widely used because it helps solve the vanishing gradient problem and is computationally efficient.'
            },
            {
                id: 'layers_1',
                question: 'What does adding more layers to a neural network typically enable?',
                options: ['Learning more complex patterns', 'Faster training', 'Less memory usage', 'Simpler models'],
                correct: 'complex',
                explanation: 'Deeper networks with more layers can learn more complex and abstract patterns in data.'
            },
            {
                id: 'backprop_1',
                question: 'What is backpropagation used for in neural networks?',
                options: ['Forward pass', 'Weight adjustment', 'Data preprocessing', 'Model evaluation'],
                correct: 'weights',
                explanation: 'Backpropagation is the algorithm used to calculate gradients and update weights during training.'
            },
            {
                id: 'gradient_1',
                question: 'What problem can occur in very deep neural networks?',
                options: ['Overfitting', 'Vanishing gradients', 'Underfitting', 'High accuracy'],
                correct: 'vanishing',
                explanation: 'Vanishing gradients occur when gradients become very small in deep networks, making early layers learn very slowly.'
            }
        ];
    }
    
    nextQuiz() {
        this.currentQuizIndex = (this.currentQuizIndex + 1) % this.quizQuestions.length;
        const question = this.quizQuestions[this.currentQuizIndex];
        
        document.getElementById('quizQuestion').textContent = question.question;
        
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.textContent = question.options[index];
            option.className = 'quiz-option';
            option.onclick = () => this.answerQuiz(question.id, question.correct, option);
        });
    }
    
    answerQuiz(questionId, correctAnswer, selectedOption) {
        const question = this.quizQuestions.find(q => q.id === questionId);
        const options = document.querySelectorAll('.quiz-option');
        
        // Check if answer is correct
        const selectedText = selectedOption.textContent.toLowerCase();
        const isCorrect = (
            (correctAnswer === 'relu' && selectedText === 'relu') ||
            (correctAnswer === 'complex' && selectedText.includes('complex')) ||
            (correctAnswer === 'weights' && selectedText.includes('weight')) ||
            (correctAnswer === 'vanishing' && selectedText.includes('vanishing'))
        );
        
        // Show results
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            if (option === selectedOption) {
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });
        
        // Show explanation
        setTimeout(() => {
            this.showLearningTip(question.explanation);
            
            // Reset after 3 seconds
            setTimeout(() => {
                options.forEach(option => {
                    option.classList.remove('correct', 'incorrect');
                    option.style.pointerEvents = 'auto';
                });
            }, 3000);
        }, 1000);
    }
}

// Global functions for HTML onclick events
let game;

function startGame() {
    game.startGame();
}

function pauseGame() {
    game.pauseGame();
}

function resetGame() {
    game.resetGame();
}

function nextQuiz() {
    game.nextQuiz();
}

function answerQuiz(questionId, answer) {
    // This will be handled by the individual option click events
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new NeuralSnakeGame();
});
