# 🚀 GitHub Pages Setup with Automatic API Key Injection

## 📋 Step-by-Step Setup Instructions

### **Step 1: Get Your Gemini API Key**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated API key (starts with `AIza...`)

### **Step 2: Add API Key as GitHub Secret**
1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Set:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Paste your API key from Step 1
6. Click **Add secret**

### **Step 3: Enable GitHub Pages**
1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically trigger on your next push to `main` branch

### **Step 4: Push Your Code**
```bash
git add .
git commit -m "Deploy portfolio with auto API key injection"
git push origin main
```

### **Step 5: Watch the Magic! ✨**
1. Go to **Actions** tab in your repository
2. You'll see the "Deploy Portfolio to GitHub Pages" workflow running
3. Once complete, your site will be live at: `https://[username].github.io/[repository-name]`
4. **The AI Assistant will work automatically without asking for an API key!**

## 🔧 How It Works

### **Local Development:**
- When running locally, the AI Assistant will ask for an API key (shows modal)
- You can enter your API key manually for testing

### **GitHub Pages Deployment:**
- GitHub Actions automatically replaces `YOUR_GEMINI_API_KEY_PLACEHOLDER` with your secret API key
- The AI Assistant loads immediately without prompting users
- Your API key is never exposed in the source code

## 🛡️ Security Features

✅ **API key is never visible in source code**  
✅ **Only you have access to the secret in GitHub**  
✅ **Automatic injection during build time**  
✅ **Works seamlessly on GitHub Pages**  
✅ **Falls back to manual entry for local development**

## 🔍 Troubleshooting

### **If AI Assistant still asks for API key:**
1. Check that your secret is named exactly: `GEMINI_API_KEY`
2. Verify the workflow ran successfully in Actions tab
3. Make sure you pushed to the `main` branch
4. Wait a few minutes for deployment to complete

### **If deployment fails:**
1. Check the Actions tab for error details
2. Ensure your API key is valid
3. Verify the secret name matches exactly

## 🎉 You're All Set!

Your portfolio now has:
- ✅ **Automatic API key injection**
- ✅ **Secure GitHub Pages deployment**  
- ✅ **Beautiful AI-powered features**
- ✅ **Professional presentation for recruiters**

No more API key prompts for your visitors! 🚀
