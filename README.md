# Morya Enterprises — Business Portfolio Website

**Built on Trust. Driven by Service.**

A modern, responsive single-page portfolio website for **Morya Enterprises**, built with pure HTML5, Tailwind-inspired custom CSS, and Vanilla JavaScript. Hosted free on GitHub Pages.

---

## 🌐 Live Site
> https://YOUR-USERNAME.github.io/morya-enterprises

---

## ✅ Before Going Live — Checklist

### 1. Update Contact Details
In `index.html`, search and replace:
- `+91-XX-XXXX-XXXX` → actual phone number (appears in multiple places)
- `info@moryaenterprises.com` → actual email address
- `91XXXXXXXXXX` → phone digits for WhatsApp links (no dashes)

### 2. Set Up Formspree (Contact Form)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your Form ID (looks like `xrgvkpqb`)
4. In `index.html`, replace `YOUR_FORM_ID` in this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

### 3. Deploy to GitHub Pages
```bash
# 1. Create a GitHub repository named: morya-enterprises
# 2. Push all files
git init
git add .
git commit -m "Initial: Morya Enterprises website"
git remote add origin https://github.com/YOUR-USERNAME/morya-enterprises.git
git push -u origin main

# 3. Go to: Repo Settings → Pages → Source: main / root
# 4. Your site is live at: https://YOUR-USERNAME.github.io/morya-enterprises
```

---

## 📁 Project Structure
```
morya-enterprises/
├── index.html                  ← Main website (single page)
├── assets/
│   ├── css/
│   │   └── style.css           ← All styles, brand design system
│   ├── js/
│   │   └── main.js             ← Navbar, language switcher, animations
│   └── images/
│       ├── logo.png            ← Full logo (extracted from PDF)
│       └── logo-nav.png        ← Compact logo for navbar
└── README.md
```

---

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | Custom CSS (brand design system) |
| Animations | AOS.js (CDN) |
| Icons | Font Awesome 6 (CDN) |
| Fonts | Google Fonts — Playfair Display + Inter |
| Form backend | Formspree (free) |
| Hosting | GitHub Pages (free) |

---

## 🎨 Brand Colors
| Name | Hex |
|---|---|
| Navy Blue | `#1B2A4A` |
| Gold / Amber | `#F5A623` |
| Burnt Orange | `#C0392B` |
| Cream / Beige | `#F5F0E8` |

---

## 📄 License
© 2024 Morya Enterprises. All rights reserved.
