# Shanjai S - Professional Portfolio

A high-performance, responsive portfolio website built for Shanjai S to showcase skills, projects, and experience as a Full-Stack Developer.

## 🚀 Features

- **Modern UI/UX**: Glassmorphism design, smooth gradients, and interactive animations using Framer Motion.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Dark Mode**: High-contrast dark theme by default tailored for developers.
- **SEO Optimized**: Meta tags, semantic HTML, and accessibility features.
- **Performance**: Built on Vite for lightning-fast loading.

## 🛠 Tech Stack

- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel / Netlify (Recommended)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shanjai110603/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run locally:**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:5173` to view the site.

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🌐 Deployment Guide

### Option A: Vercel (Recommended)
1.  Push your code to GitHub.
2.  Log in to [Vercel](https://vercel.com) and click "Add New Project".
3.  Import your GitHub repository.
4.  Vercel will detect Vite/React settings automatically.
5.  Click **Deploy**.

### Option B: Netlify
1.  Push to GitHub.
2.  Log in to [Netlify](https://netlify.com) and click "New site from Git".
3.  Connect your repository.
4.  Build command: `npm run build`
5.  Publish directory: `dist`
6.  Click **Deploy Site**.

## 🔍 SEO Setup

The project includes pre-configured SEO meta tags in `index.html`.
- **Title**: Shanjai S | Full-Stack Developer
- **Description**: Optimized for search engines.
- **Keywords**: tailored to your skills.

**To further improve SEO:**
1.  Update the `content` attributes in `index.html` if your focus changes.
2.  Generate a `sitemap.xml` using online tools after deployment and add it to `public/`.
3.  Register your site with **Google Search Console**.

## ⚡ Performance Tips

- **Image Optimization**: Convert images to WebP format before uploading to `src/assets`.
- **Lazy Loading**: React Components are lazy-loaded by Vite during build splitting.
- **Lighthouse Score**: Run a Lighthouse audit in Chrome DevTools to find specific improvements.

## 🔗 Custom Domain Setup

1.  Buy a domain from providers like GoDaddy, Namecheap, or Google Domains.
2.  **In Vercel/Netlify Dashboard**:
    - Go to **Settings > Domains**.
    - Add your custom domain (e.g., `shanjai.dev`).
3.  **In Domain Provider DNS**:
    - Add the **CNAME** or **A Record** provided by Vercel/Netlify.
    - Example (Vercel): CNAME `cname.vercel-dns.com`.
4.  Wait for propagation (usually 1-24 hours).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
