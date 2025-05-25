# Onebox Email Viewer

A React component to fetch, display, and interact with emails via a Onebox API backend.  
Supports listing emails, viewing detailed email content (HTML formatted), replying, and deleting emails.

---

## Features

- Fetch email list via token-protected API
- View email details with HTML content rendering
- Reply to emails with inline HTML support
- Delete emails with confirmation
- Handles loading and error states gracefully

---

## System Requirements

- Node.js v16+ (Recommended: Latest LTS)
- npm or yarn package manager
- Modern browser supporting React apps

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/onebox-email-viewer.git
cd onebox-email-viewer
````
### 2.Install Dependencies
npm install
# or
yarn install

#### 3. Configure Environment

Create a .env file if needed (e.g., for API base URL):

VITE_API_BASE_URL=https://hiring.reachinbox.xyz/api/v1

Adjust API URL in your api.js utils accordingly.

#### 4. Run the development server
npm run dev

Open http://localhost:5173 to view the app.

*******API Endpoints Used***********
GET /onebox/list — Fetches email list

GET /onebox/messages/:threadId — Fetches detailed email by threadId

POST /onebox/reply — Sends a reply to an email

DELETE /onebox/messages/:threadId — Deletes an email



