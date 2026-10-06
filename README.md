# 🚀 Surya | DevOps Engineer Portfolio

An immersive portfolio built with React, Vite, Tailwind CSS, GSAP, and Framer Motion, deployed as a static site on Render. Features smooth scroll animations, a responsive Bento Grid design, and a custom AI Chat Widget.

🔗 **Live Link:https://portfolio-syr6.onrender.com

---

## 🛠️ Tech Stack & Key Libraries

### **Frontend & Core**
*   **React 19** - Component-based interactive UI.
*   **Vite** - Lightning-fast build tool and development server.
*   **Tailwind CSS** - Modern utility-first CSS styling.
*   **Lucide React** - High-quality minimalist SVG icon library.

### **Animations & Motion Design**
*   **GSAP (GreenSock Animation Platform)** - Heavyweight timeline-based scroll animations and canvas sequence drivers.
*   **Framer Motion** - Fluid micro-interactions, spring physics, and entry animations.
*   **Lenis Scroll** - Butter-smooth scrolling synchronized with GSAP ScrollTrigger.

### **Hosting & Deployment**
*   **Render (Static Site)** - Global CDN with free managed TLS, Brotli compression, and HTTP/2. Deploys from the repo via the included `render.yaml` blueprint.

---

## 🌟 Key Features

*   **Network Preloader:** A professional, animated preloading screen that monitors font and image resource load progress.
*   **Hero Canvas Sequence:** A high-end interactive canvas element displaying image-sequence animations linked to scroll position.
*   **Bento Grid Layout:** A sleek, content-dense dashboard showing education, interests, projects, and tech competencies.
*   **AI Chat Widget:** An inline, interactive AI companion widget allowing visitors to ask questions about your skills and experience.
*   **Custom Fluid Cursor:** A dynamic cursor effect that follows user pointer movement with custom lag and hover-state scales.
*   **Film Grain Overlay:** A subtle overlay giving the portfolio a premium, cinematic textured look.

---

## 📁 Project Structure

This is a fully static, frontend-centric Single Page Application (SPA). The Vite build outputs the production site into `/dist`, which Render serves over its CDN:

```
├── public/                # Static public assets (Favicon, images, PWA assets)
├── render.yaml            # Render Static Site blueprint (build + SPA rewrite)
├── src/
│   ├── components/        # Reusable UI & animation components
│   │   ├── AIChatWidget.jsx          # AI interaction modal & logic
│   │   ├── BentoCard.jsx             # Tilt/spotlight grid card
│   │   ├── BentoGrid.jsx             # Grid display of cards & highlights
│   │   ├── CustomCursor.jsx          # Follow-pointer micro-interaction
│   │   ├── Footer.jsx                  # Site footer with socials
│   │   ├── HeroCanvas.jsx            # Static hero + scroll animation controller
│   │   ├── NetworkPreloader.jsx      # Resource loader and entry gate
│   │   └── ...                       # Footer, Navbar, skills, timeline, etc.
│   ├── App.jsx            # Main app page shell and initialization (Lenis/GSAP)
│   ├── index.css          # Global Tailwind directives & custom CSS animations
│   └── main.jsx           # React DOM Entrypoint
├── tailwind.config.js     # Tailwind setup and theme extensions
├── vite.config.js         # Vite compilation options
└── package.json           # Project dependencies & build scripts
```

> [!NOTE]
> **No backend folder.** This portfolio is a static site; the AI chat widget is a self-contained rule-based UI, and the contact form posts directly to the Web3Forms API — no dedicated backend server is needed.

---

## 🚀 Getting Started Locally

Follow these steps to run the portfolio on your local machine:

### **Prerequisites**
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### **1. Clone the Repository**
```bash
git clone https://github.com/suryax123/Portfolio.git
cd Portfolio
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start the Development Server**
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build and Deployment

### **Build for Production**
To generate optimized static assets:
```bash
npm run build
```
This outputs the compiled site inside the `/dist` directory.

### **Deploy to Render**
The repo includes a `render.yaml` blueprint that pre-configures a Static Site. Two options:

**Option A — Blueprint (recommended):**
1. Push this repo to your GitHub account.
2. In the Render dashboard: **New → Blueprint**, pick this repo, and click **Apply**.
3. Render creates the static site with the correct build command and `dist` publish path automatically.

**Option B — Manual Static Site:**
1. In the Render dashboard: **New → Static Site** and connect this repo.
2. Set these values:
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`
3. Click **Create Static Site**.

