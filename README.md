# ශ්‍රී සරසවි ජාතික විද්‍යාලය - School Website

## 🚀 Getting Started

### Run Locally
```bash
npm install
npm start
```

### Deploy to Vercel
**Option A - CLI:**
```bash
npm install -g vercel
vercel
```

**Option B - GitHub Dashboard:**
1. Push to GitHub
2. vercel.com → New Project → Import repo
3. Framework: Create React App | Build: `npm run build` | Output: `build`
4. Deploy!

## 📝 Customize Content
Edit `src/data/schoolData.js` to change:
- School name, tagline, address, phones
- Staff members & photos
- Prefects & photos  
- Gallery photos
- News articles
- Stats numbers

## 🎵 Add Anthem Audio
Place your MP3 at: `public/anthem.mp3`

## 📸 Add Local Images
Place images in `public/images/` and reference as `/images/photo.jpg`

## 🎨 Change Colors
Edit `:root` in `src/index.css`

## ✅ Features
- Sinhala language | Animations | Gallery lightbox
- Audio player | Contact form | Fully responsive
- Vercel-ready | Sticky navbar | Scroll effects
