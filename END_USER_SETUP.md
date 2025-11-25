# AutomateFlow - End User Setup Guide

## Welcome! 👋

This guide will help you set up AutomateFlow for your business. By the end, you'll have a fully functional file upload portal that sends files to your n8n automation workflows.

**What You're Building**: A branded web application where your customers can upload files that automatically trigger your n8n workflows.

**Time Required**: 30-60 minutes (first time setup)
**Technical Level**: Beginner-friendly (no coding required!)

## 📋 What You'll Need

Before you start, gather these items:

- [ ] n8n account/instance (where your workflows live)
- [ ] Supabase account (for user authentication) - FREE
- [ ] Your workflow information:
  - Workflow webhook URLs from n8n
  - Bearer tokens for authentication
  - User-friendly names for each workflow
- [ ] (Optional) GitHub account for deployment
- [ ] (Optional) Custom domain name

## 🚀 Quick Start

### Step 1: Set Up Your Development Environment

1. **Install Node.js** (if you haven't already)
   - Go to https://nodejs.org
   - Download the "LTS" version (recommended)
   - Run the installer
   - Verify installation:
     ```bash
     node --version
     # Should show v18 or higher
     ```

2. **Download the Project**
   - If you have this as a zip file, extract it
   - If it's on GitHub, clone or download the repository
   - Open Terminal (Mac) or Command Prompt (Windows)
   - Navigate to the project folder:
     ```bash
     cd path/to/Receipt\ Upload\ Practice/app
     ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   This will take a few minutes...

### Step 2: Configure Environment Variables

1. **Create Your Configuration File**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Open `.env.local` in a Text Editor**
   - Mac: Use TextEdit (right-click → Open With → TextEdit)
   - Windows: Use Notepad
   - Or use VS Code if you have it

3. **You'll see a template like this:**
   ```env
   # SUPABASE CONFIGURATION
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

   # WORKFLOW 1
   NEXT_PUBLIC_WORKFLOW_1_NAME="Receipt Processing"
   NEXT_PUBLIC_WORKFLOW_1_DESCRIPTION="Automatically process receipt images"
   WORKFLOW_1_WEBHOOK_URL=https://your-n8n.com/webhook/receipts
   WORKFLOW_1_BEARER_TOKEN=your_secret_token
   ```

**Don't worry!** We'll fill this in step-by-step in the next sections.

### Step 3: Set Up Supabase (Authentication)

Supabase provides user login functionality. It's free for small projects!

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub or email

2. **Create a New Project**
   - Click "New Project"
   - Choose your organization (create one if needed)
   - Fill in:
     - **Name**: `automate-flow` (or your preferred name)
     - **Database Password**: Create a strong password (SAVE THIS!)
     - **Region**: Choose closest to your users
   - Click "Create new project"
   - ☕ Wait ~2 minutes for setup

3. **Get Your API Credentials**
   - In your Supabase project, click "Settings" (gear icon)
   - Click "API" in the sidebar
   - You'll see two important values:
     - **Project URL**: Looks like `https://xxxxx.supabase.co`
     - **anon public key**: Long string starting with `eyJ...`

4. **Add to Your `.env.local` File**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJxxx...
   ```
   (Replace with your actual values)

5. **Enable Email Authentication**
   - In Supabase, go to "Authentication" → "Providers"
   - Make sure "Email" is enabled (should be by default)
   - Scroll down and UNCHECK "Confirm email" (for easier testing)
   - Click "Save"

6. **Create Your First User**
   - Go to "Authentication" → "Users"
   - Click "Add user" → "Create new user"
   - Enter:
     - Email: your@email.com
     - Password: (choose a password)
     - ✅ Check "Auto Confirm User"
   - Click "Create user"

✅ **Supabase Setup Complete!**

### Step 4: Set Up Your n8n Workflows

For EACH workflow you want to add, follow these steps:

#### 4.1: Create/Configure n8n Workflow

1. **Open Your n8n Workflow**
   - Go to your n8n instance
   - Create a new workflow OR open an existing one

2. **Add/Configure Webhook Node**
   - Add a "Webhook" node as the trigger
   - Configure:
     - **HTTP Method**: POST
     - **Path**: Choose something unique (e.g., `/receipt-upload`)
     - **Authentication**: Header Auth
     - **Header Name**: `Authorization`
     - **Header Value**: We'll set this next...

#### 4.2: Generate a Bearer Token

A bearer token is like a password that proves the request is coming from your authorized application.

**Option A - Using Terminal (Mac/Linux):**
```bash
openssl rand -base64 32
```
Copy the output - that's your token!

**Option B - Online Generator:**
1. Go to https://generate-random.org/api-token-generator
2. Click "Generate"
3. Copy the token

**Option C - Manual:**
Create a random string with at least 32 characters.
Example: `aK9mP3xL2wQ8vN5zR7yT1uJ6hF4gD0sB8cE2fG5h`

#### 4.3: Configure n8n Webhook with Token

Back in your n8n Webhook node:
- **Header Value**: `Bearer YOUR_TOKEN_HERE`
  (Replace YOUR_TOKEN_HERE with the token you generated)
- Example: `Bearer aK9mP3xL2wQ8vN5zR7yT1uJ6hF4gD0sB`

#### 4.4: Get Your Webhook URL

1. Click "Listen for Test Event" OR "Execute Workflow"
2. Copy the webhook URL from the Webhook node
3. It will look like: `https://your-n8n.com/webhook/receipt-upload`
4. For production, activate the workflow and use the Production URL

#### 4.5: Add to Your `.env.local` File

Now add your workflow configuration:

```env
# WORKFLOW 1 - Receipt Processing (example)
NEXT_PUBLIC_WORKFLOW_1_NAME="Receipt Processing"
NEXT_PUBLIC_WORKFLOW_1_DESCRIPTION="Automatically process receipt images"
WORKFLOW_1_WEBHOOK_URL=https://your-n8n.com/webhook/receipt-upload
WORKFLOW_1_BEARER_TOKEN=aK9mP3xL2wQ8vN5zR7yT1uJ6hF4gD0sB
```

**For Additional Workflows:**
- Use WORKFLOW_2, WORKFLOW_3, WORKFLOW_4, WORKFLOW_5
- Follow the same pattern
- Each workflow needs its own token!

#### 4.6: Configure n8n to Process Files

In your n8n workflow, after the Webhook node:

1. **Access Files**:
   - Files come in as `file0`, `file1`, `file2`, etc.
   - Access using: `{{ $binary.file0 }}`
   - Get filename: `{{ $binary.file0.fileName }}`

2. **Example Processing Nodes**:
   - Extract text from images (OCR)
   - Save to Google Drive/Dropbox
   - Add data to Google Sheets
   - Send email notifications
   - Store in database
   - Whatever you need!

3. **Return Response**:
   - Add a "Respond to Webhook" node at the end
   - Return JSON: `{"success": true, "message": "File processed"}`

### Step 5: Start Your Application

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Browser**
   - Go to http://localhost:3000
   - You should see the AutomateFlow landing page!

3. **Test Login**
   - Click "Sign in"
   - Use the email and password you created in Supabase
   - You should be redirected to the Dashboard

4. **Test File Upload**
   - On the Dashboard, you should see your workflow(s) in the dropdown
   - Select a workflow
   - Drag and drop a file OR click to browse
   - Click "Upload X Files"
   - ✅ Check your n8n workflow to see if it received the file!

### Step 6: Troubleshooting

#### ❌ "No workflows configured" Warning

**Problem**: Workflows don't appear in dropdown

**Solution**:
1. Check that `.env.local` file exists in project root
2. Verify workflow environment variables are set correctly
3. Restart your server: Stop (Ctrl+C) and run `npm run dev` again
4. Check for typos in variable names

#### ❌ "Upload failed" Error

**Problem**: Files aren't reaching n8n

**Solutions**:
1. **Test n8n webhook directly:**
   - Use a tool like Postman or Insomnia
   - POST to your webhook URL
   - Add header: `Authorization: Bearer YOUR_TOKEN`
   - Add a file to form-data
   - Should return 200 OK

2. **Check n8n workflow:**
   - Is workflow activated?
   - Is webhook configured with correct authentication?
   - Check n8n execution logs

3. **Verify `.env.local`:**
   - Webhook URL is correct (no typos)
   - Bearer token matches EXACTLY (no extra spaces)

#### ❌ Can't Log In

**Problem**: Login doesn't work

**Solutions**:
1. **Check Supabase credentials:**
   - Verify URL and key in `.env.local`
   - Make sure they match Supabase dashboard

2. **Verify user exists:**
   - Supabase → Authentication → Users
   - Check that user is created
   - Try creating a new test user

3. **Check redirect URLs:**
   - Supabase → Authentication → URL Configuration
   - Add `http://localhost:3000/**` to allowed redirect URLs

## 🎨 Customization (Optional)

### Change Branding Colors

Want to change from purple/pink to your brand colors?

1. **Find and Replace** in these files:
   - `app/globals.css`
   - `app/layout.tsx`
   - `components/file-upload.tsx`
   - `components/login-form.tsx`

2. **Replace**:
   - `purple-600` → your primary color
   - `pink-600` → your secondary color
   - `purple-500` → your primary color (lighter)
   - `pink-500` → your secondary color (lighter)

**Example**: For blue/green theme
- `purple-600` → `blue-600`
- `pink-600` → `green-600`

### Change Site Name

1. **Open `app/layout.tsx`**
2. **Find**:
   ```typescript
   title: "AutomateFlow",
   ```
3. **Replace** with your business name

4. **Find**:
   ```typescript
   <span className="...">AutomateFlow</span>
   ```
5. **Replace** with your business name

## 🚀 Deployment (Going Live)

### Option A: Deploy with Vercel (Easiest!)

1. **Prepare Your Code**
   - Commit all changes to git
   - Push to GitHub
   - Make sure `.env.local` is NOT committed (it shouldn't be!)

2. **Deploy**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your repository
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel project settings
   - Go to "Environment Variables"
   - Add EACH variable from your `.env.local`
   - Copy exact names and values

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a URL like: `https://your-project.vercel.app`

5. **Update Supabase**
   - In Supabase, go to Authentication → URL Configuration
   - Add your Vercel URL to:
     - Site URL
     - Redirect URLs (add `https://your-project.vercel.app/**`)

6. **Test Production**
   - Visit your Vercel URL
   - Try logging in
   - Upload a test file
   - Verify it works!

### Option B: Custom Domain

1. **In Vercel**:
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update Supabase**:
   - Add your custom domain to redirect URLs

## 🔒 Security Checklist

Before giving access to customers:

- [ ] All bearer tokens are strong (32+ characters, random)
- [ ] `.env.local` is NOT in git
- [ ] Supabase has strong password requirements enabled
- [ ] Each workflow has a unique bearer token
- [ ] n8n workflows are activated and tested
- [ ] Webhook URLs are HTTPS (not HTTP)
- [ ] Test all workflows with real files
- [ ] Supabase redirect URLs are configured correctly

## 📞 Getting Help

### Work with an AI Assistant

This project includes guides for AI assistants to help you:

1. **Using Claude**: Show Claude the `CLAUDE.md` file and ask questions
2. **Using Gemini**: Show Gemini the `GEMINI.md` file and ask questions

Both AI assistants are trained to help you with:
- Adding workflows
- Troubleshooting errors
- Customizing branding
- Deploying to production
- Security best practices

### Example Questions to Ask Your AI Assistant

- "I want to add a new workflow for invoice processing. Can you help?"
- "How do I change the colors to match my brand?"
- "The upload isn't working. Can you help me troubleshoot?"
- "How do I deploy this to Vercel?"
- "Can you explain how the bearer token authentication works?"

## 🎉 You're Done!

Congratulations! You now have a fully functional file upload portal for your n8n workflows.

**What You've Accomplished:**
✅ Set up user authentication with Supabase
✅ Configured n8n workflow integrations
✅ Created a secure file upload system
✅ (Optional) Deployed to production
✅ (Optional) Customized your branding

**Next Steps:**
- Create additional workflows as needed
- Share access with your customers
- Monitor n8n workflow executions
- Gather feedback and improve!

---

**Questions or Issues?**
Refer to `CLAUDE.md` or `GEMINI.md` and work with an AI assistant for personalized help!
