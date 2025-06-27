# Yorukot's Personal Portfolio & Blog

A modern, multilingual personal portfolio and blog built with Astro, featuring a sleek design, responsive layout, and optimized performance.

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yorukot/blog.git
   cd blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 📜 Available Scripts

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `pnpm dev`      | Starts local dev server at `localhost:4321` |
| `pnpm build`    | Build your production site to `./dist/`     |
| `pnpm preview`  | Preview your build locally                   |
| `pnpm astro`    | Run CLI commands like `astro add`           |

## Internationalization

The site supports two languages:
- **English** (`en`) - Default language
- **Traditional Chinese** (`zh-tw`)

All content, including blog posts and UI text, is fully localized. The routing automatically handles language prefixes.

## Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `src/content/blog/[locale]/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   author: "Yorukot"
   pubDate: 2024-01-01
   description: "Post description"
   lang: "en" # or "zh-tw"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write your content using MDX syntax

### Custom Components

The project includes custom MDX components like:
- `<Alert>` - Information, warning, and error alerts
- `<CodeTabs>` - Tabbed code blocks
- Automatic copy buttons for code blocks

## Configuration

Main configuration is in `src/config.ts`:
- Personal information and bio
- Project showcases  
- Tech stack and skills
- Experience timeline
- Contact information
- Analytics settings

## Customization

### Themes and Colors
- Modify CSS custom properties in `src/styles/global.css`
- Update Tailwind configuration in `tailwind.config.js`
- Color scheme uses CSS variables for easy theming

### Layout and Components
- All components are in `src/components/`
- Main layout in `src/layouts/Layout.astro`
- Responsive design with mobile-first approach

## Deployment

The site is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify** 
- **Cloudflare Pages**
- Any static hosting service

Build command: `pnpm build`
Output directory: `dist/`

## Contributing

This is a personal portfolio project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Use as inspiration for your own site

## License

This project is open source and available under the [MIT License](LICENSE).

