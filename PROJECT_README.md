# AutomateFlow - n8n Workflow File Upload Portal

## 🎯 Project Overview

AutomateFlow is a white-label web application that enables non-technical users to upload files and send them directly to n8n automation workflows. Built with Next.js and Supabase, it provides a secure, branded portal for businesses to offer workflow automation services to their customers.

## ✨ Key Features

- **🔐 Secure Authentication**: User login via Supabase Auth
- **📁 Multiple Workflows**: Support for up to 5 workflows (easily extensible)
- **🚀 Direct n8n Integration**: Files sent directly to n8n webhooks with bearer token authentication
- **🎨 Customizable Branding**: Purple/pink gradient theme (easily customizable)
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🌙 Dark Mode**: Automatic theme switching
- **⚡ Modern Stack**: Next.js 16, React 19, Tailwind CSS, TypeScript

## 🏗️ Architecture

### System Flow

```
User → Login (Supabase Auth) → Dashboard → Select Workflow → Upload Files → n8n Webhook → Workflow Execution
```

### Security Model

1. **Authentication**: Users must log in via Supabase before accessing dashboard
2. **Authorization**: Bearer tokens authenticate requests to n8n webhooks
3. **Configuration Security**: Sensitive data stored in `.env.local` (not in git)
4. **Direct Upload**: Files sent directly from browser to n8n (no intermediate storage)

### Configuration System

**Two-Layer Security**:
1. **`.env.local`** (Server-side only):
   - Stores webhook URLs and bearer tokens
   - Never exposed to browser
   - Never committed to git

2. **`lib/workflows.config.ts`** (Application logic):
   - Reads environment variables
   - Provides type-safe workflow access
   - Separates public (names/descriptions) from private (URLs/tokens) data

**Public vs Private Variables**:
```env
# Public (safe to expose to browser)
NEXT_PUBLIC_WORKFLOW_1_NAME="Receipt Processing"
NEXT_PUBLIC_WORKFLOW_1_DESCRIPTION="Process receipt images"

# Private (server-side only)
WORKFLOW_1_WEBHOOK_URL=https://n8n.example.com/webhook/receipts
WORKFLOW_1_BEARER_TOKEN=secret_token_here
```

## 📂 Project Structure

```
app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with global navigation
│   ├── page.tsx                 # Landing page (home)
│   ├── auth/login/page.tsx      # Login page
│   └── protected/page.tsx       # Dashboard (requires auth)
│
├── components/
│   ├── file-upload.tsx          # Main upload component with workflow selector
│   ├── login-form.tsx           # Branded login form
│   ├── auth-button.tsx          # Authentication UI controls
│   ├── hero-section.tsx         # Landing page hero
│   └── ui/                      # shadcn/ui components
│
├── lib/
│   ├── workflows.config.ts      # Workflow configuration system ⭐
│   ├── supabase/
│   │   ├── server.ts           # Server-side Supabase client
│   │   └── client.ts           # Client-side Supabase client
│   └── utils.ts                # Utility functions
│
├── .env.local                   # Environment variables (NOT in git) ⭐
├── .env.local.example           # Template for configuration ⭐
│
├── CLAUDE.md                    # Guide for Claude AI ⭐
├── GEMINI.md                    # Guide for Gemini AI ⭐
├── END_USER_SETUP.md            # Step-by-step setup guide ⭐
└── PROJECT_README.md            # This file
```

**⭐ = Critical files for workflow setup**

## 🔧 How to Add Workflows

### 1. Configure n8n Workflow

In your n8n workflow:
1. Add a Webhook trigger node
2. Set HTTP Method to POST
3. Enable Header Authentication:
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_SECURE_TOKEN`
4. Access uploaded files via `{{ $binary.file0 }}`, `{{ $binary.file1 }}`, etc.
5. Activate workflow and copy webhook URL

### 2. Add to Environment Variables

In `.env.local`:
```env
# Replace X with next available number (1-5)
NEXT_PUBLIC_WORKFLOW_X_NAME="Your Workflow Name"
NEXT_PUBLIC_WORKFLOW_X_DESCRIPTION="What this workflow does"
WORKFLOW_X_WEBHOOK_URL=https://your-n8n.com/webhook/your-path
WORKFLOW_X_BEARER_TOKEN=your_secure_random_token
```

### 3. Restart Application

```bash
npm run dev
```

The workflow will automatically appear in the dashboard dropdown!

## 🔒 Security Best Practices

### Token Generation

Generate secure bearer tokens using:

```bash
# Option 1: OpenSSL (Mac/Linux)
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Security Checklist

- [ ] Use HTTPS for all n8n webhook URLs
- [ ] Generate unique bearer token per workflow (minimum 32 characters)
- [ ] Never commit `.env.local` to git
- [ ] Use environment variables in deployment (Vercel/platform settings)
- [ ] Enable Supabase Row Level Security (RLS)
- [ ] Configure strong password requirements in Supabase
- [ ] Regularly rotate bearer tokens (every 3-6 months)
- [ ] Keep n8n instance behind authentication

## 🚀 Deployment

### Option A: Vercel (Recommended)

1. Push code to GitHub (without `.env.local`)
2. Import project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy
5. Update Supabase redirect URLs with Vercel domain

### Option B: Self-Hosted

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

Configure:
- Process manager (PM2)
- Reverse proxy (nginx)
- SSL certificate (Let's Encrypt)
- Environment variables

## 🧪 Testing

### Test n8n Webhook Directly

Use Postman or curl:

```bash
curl -X POST https://your-n8n.com/webhook/test \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file0=@test-file.pdf"
```

Should return 200 OK with JSON response.

### Test Authentication Flow

1. Create test user in Supabase dashboard
2. Log in at `/auth/login`
3. Verify redirect to `/protected`
4. Check that workflows appear in dropdown

### Test File Upload

1. Select a workflow from dropdown
2. Add test file(s)
3. Click Upload
4. Check n8n workflow execution logs
5. Verify file was received and processed

## 📚 Documentation for AI Assistants

This project includes comprehensive guides for AI assistants to help users with setup and customization:

### CLAUDE.md
- Detailed task-based guide
- Common user scenarios
- Troubleshooting steps
- Security best practices
- Extension patterns

### GEMINI.md
- Quick reference format
- Step-by-step instructions
- Visual aids and examples
- Debugging workflows
- Advanced scenarios

### END_USER_SETUP.md
- Complete setup tutorial
- No technical knowledge required
- Screenshots and examples
- Troubleshooting guide
- Deployment instructions

**Usage**: When working with AI assistants, reference the appropriate guide to get context-aware help.

## 🔌 n8n Workflow Examples

### Example 1: Receipt Processing

```
[Webhook Trigger]
    ↓
[Extract Binary Data]
    ↓
[OCR (Tesseract/Google Vision)]
    ↓
[Parse Receipt Data]
    ↓
[Google Sheets - Add Row]
    ↓
[Send Email Notification]
    ↓
[Respond to Webhook]
```

### Example 2: Document Archive

```
[Webhook Trigger]
    ↓
[Get File Metadata]
    ↓
[Google Drive - Upload File]
    ↓
[Airtable - Create Record]
    ↓
[Slack - Send Message]
    ↓
[Respond to Webhook]
```

### Example 3: Invoice Processing

```
[Webhook Trigger]
    ↓
[PDF Parser]
    ↓
[Extract Invoice Fields]
    ↓
[QuickBooks - Create Invoice]
    ↓
[Send Confirmation Email]
    ↓
[Respond to Webhook]
```

## 🛠️ Extending the Application

### Add More Than 5 Workflows

Edit `lib/workflows.config.ts`:

```typescript
// Add Workflow 6
if (process.env.NEXT_PUBLIC_WORKFLOW_6_NAME) {
  workflows.push({
    id: "workflow_6",
    name: process.env.NEXT_PUBLIC_WORKFLOW_6_NAME,
    description: process.env.NEXT_PUBLIC_WORKFLOW_6_DESCRIPTION || "",
    webhookUrl: process.env.WORKFLOW_6_WEBHOOK_URL || "",
    bearerToken: process.env.WORKFLOW_6_BEARER_TOKEN || "",
  });
}
```

Repeat pattern for unlimited workflows!

### Add File Type Restrictions

In `components/file-upload.tsx`:

```typescript
const ALLOWED_TYPES = ['image/*', 'application/pdf', '.csv'];

<input
  type="file"
  multiple
  accept={ALLOWED_TYPES.join(',')}
  // ...
/>
```

### Add File Size Limits

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const validateFile = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    alert(`${file.name} is too large. Maximum size is 10MB.`);
    return false;
  }
  return true;
};
```

### Add User Role-Based Access

1. Add role field to Supabase user profiles
2. Create workflow permissions table
3. Filter workflows in `getWorkflows()` based on user role
4. Display only authorized workflows in dropdown

## 🐛 Common Issues

### "No workflows configured" Warning
- **Cause**: `.env.local` missing or workflow variables not set
- **Solution**: Create `.env.local` from example, add workflow configuration, restart server

### "Upload failed" Error
- **Cause**: n8n workflow not active, wrong token, network issue
- **Solution**: Test webhook with Postman, verify token matches, check n8n logs

### Authentication Not Working
- **Cause**: Wrong Supabase credentials, redirect URLs not configured
- **Solution**: Verify `.env.local` credentials, add localhost to Supabase redirect URLs

### Files Not Reaching n8n
- **Cause**: CORS issues, webhook URL wrong, bearer token mismatch
- **Solution**: Use HTTPS, verify exact URL/token, configure n8n CORS if needed

## 📈 Performance Considerations

- **Direct Upload**: Files go straight from browser to n8n (no server storage)
- **Async Processing**: n8n handles heavy processing asynchronously
- **Supabase Edge**: Authentication handled at the edge for low latency
- **Static Generation**: Landing page statically generated for fast load
- **Code Splitting**: Components lazy-loaded for smaller initial bundle

## 🔐 Compliance & Privacy

- **Data Flow**: Files never stored on application server
- **Authentication**: Supabase handles password hashing, session management
- **Encryption**: All data transmitted over HTTPS
- **Audit Trail**: n8n execution logs track all file processing
- **GDPR**: User data stored in Supabase (EU hosting available)

## 📞 Support Resources

1. **AI Assistant Guides**: `CLAUDE.md` and `GEMINI.md`
2. **End User Guide**: `END_USER_SETUP.md`
3. **n8n Documentation**: https://docs.n8n.io
4. **Supabase Documentation**: https://supabase.com/docs
5. **Next.js Documentation**: https://nextjs.org/docs

## 🎉 Success Stories

This template is perfect for:
- **Accounting Firms**: Receipt/invoice processing
- **Legal Services**: Document intake and categorization
- **Marketing Agencies**: Asset collection from clients
- **HR Departments**: Resume and application processing
- **Real Estate**: Property document management
- **Healthcare**: HIPAA-compliant document handling
- **Any Business**: Custom workflow automation

## 📝 License

[Your License Here]

## 👥 Contributing

[Your Contribution Guidelines Here]

---

**Built with** ❤️ **using Next.js, Supabase, and n8n**

**Questions?** Reference the AI assistant guides (`CLAUDE.md` or `GEMINI.md`) for personalized help!
