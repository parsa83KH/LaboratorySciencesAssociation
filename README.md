# Laboratory Sciences Association - IAUTM

Official website for the Laboratory Sciences Association of Islamic Azad University, Tehran Medical Sciences.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. Create a new repository on GitHub
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. Enable GitHub Pages in repository settings:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on the next push

4. **Important:** If your repository name is NOT `username.github.io`, you need to set the base path:
   - Edit `.github/workflows/deploy.yml`
   - Find the line: `VITE_BASE_PATH: /`
   - Change it to: `VITE_BASE_PATH: /YOUR_REPO_NAME/`
   - Example: `VITE_BASE_PATH: /LaboratorySciencesAssociation/`

### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Update base path in `vite.config.ts` if needed:
   ```typescript
   const base = '/YOUR_REPO_NAME/';  // Replace with your repository name
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

4. The `dist/` folder contains your production build

5. Push the `dist/` folder to the `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

   Or manually:
   - Copy the contents of `dist/` folder
   - Create/switch to `gh-pages` branch
   - Paste the contents
   - Commit and push

## 📁 Project Structure

```
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── lib/         # Utilities and data
│   └── types.ts     # TypeScript types
├── dist/            # Production build (created after npm run build)
└── .github/         # GitHub Actions workflows
```

## 🛠️ Technologies

- React 19
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS

## 📝 License

Private project

