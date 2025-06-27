# Modern Portfolio Website

A stunning, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. Features a beautiful glassmorphism design, dark/light mode toggle, smooth animations, and interactive features including a terminal interface and project playground.

## ✨ Features

- **Modern Design**: Clean, professional layout with glassmorphism effects
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Animations**: Smooth scroll animations and micro-interactions
- **Interactive Terminal**: Old-school command-line interface for exploring the site
- **Project Playground**: Interactive demos including games and code editor
- **Modular**: Easy to customize with data configuration
- **Fast**: Optimized for performance with lazy loading
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🚀 Live Demo

[View Live Demo](https://your-portfolio-url.netlify.app)

## 🎮 Interactive Features

### Terminal Interface
Access a retro terminal experience with commands like:
- `whoami` - Display user information
- `projects` - List all projects
- `skills` - Show technical skills
- `contact` - Get contact information
- `help` - See all available commands

### Project Playground
Interactive demos including:
- **Snake Game**: Classic arcade game with HTML5 Canvas
- **Code Editor**: Live JavaScript playground with execution
- **Particle Animation**: Physics-based particle system

## 📋 Sections

- **Hero Section**: Introduction with call-to-action buttons and interactive features
- **About**: Personal information and bio
- **Education**: Academic background with institutions and grades
- **Projects**: Featured projects with modal details
- **Skills**: Technical skills organized by category
- **Contact**: Contact form integrated with Netlify Forms
- **Footer**: Social links and copyright

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🎨 Customization

### Personal Information

Edit `src/data/portfolio.js` to update:
- Personal details (name, title, bio, contact info)
- Social media links
- Education background
- Skills and technologies
- Project information

### Terminal Commands

Customize the terminal experience by editing the `commands` object in `src/components/Terminal.jsx`. Add new commands or modify existing ones to match your personal brand.

### Interactive Demos

Add new interactive demos to the Project Playground by:
1. Creating a new component in `src/components/ProjectPlayground.jsx`
2. Adding it to the `demos` object
3. Implementing your custom interactive experience

### Styling

- **Colors**: Modify the gradient colors in Tailwind classes
- **Fonts**: Update font family in `tailwind.config.js`
- **Animations**: Adjust Framer Motion animations in components
- **Layout**: Customize component layouts and spacing

### Images

Replace placeholder images with your own:
- Update avatar/profile images in the data file
- Add project screenshots to the projects array
- Use high-quality images for best results

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Enable form submissions for the contact form

### Other Platforms

The built files in the `dist` folder can be deployed to:
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 📞 Contact Form

The contact form is configured to work with Netlify Forms. To use it:

1. Deploy to Netlify
2. The form will automatically be detected
3. Submissions will appear in your Netlify dashboard

For other hosting platforms, you'll need to:
- Integrate with a form service (Formspree, EmailJS, etc.)
- Set up a backend API endpoint
- Update the form submission logic

## 🔧 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Navigation header with interactive features
│   ├── Hero.jsx         # Hero section with CTA buttons
│   ├── About.jsx        # About section
│   ├── Education.jsx    # Education section
│   ├── Projects.jsx     # Projects section
│   ├── Skills.jsx       # Skills section
│   ├── Contact.jsx      # Contact form
│   ├── Footer.jsx       # Footer
│   ├── Terminal.jsx     # Interactive terminal interface
│   └── ProjectPlayground.jsx # Interactive project demos
├── data/
│   └── portfolio.js     # Portfolio data configuration
├── hooks/               # Custom React hooks
│   ├── useTheme.js      # Theme management
│   └── useScrollReveal.js # Scroll animations
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Components are split for better loading
- **Optimized Images**: Use proper image formats and sizes
- **Minimal Dependencies**: Only essential packages included
- **Efficient Animations**: Hardware-accelerated animations
- **Interactive Features**: Optimized canvas rendering and game loops

## 🌟 Customization Tips

1. **Brand Colors**: Update the gradient colors throughout the codebase
2. **Typography**: Choose fonts that match your personal brand
3. **Content**: Keep descriptions concise and impactful
4. **Projects**: Showcase your best work with high-quality images
5. **Interactive Features**: Customize terminal commands and playground demos
6. **SEO**: Update meta tags and descriptions for better search rankings

## 🎮 Interactive Features Guide

### Terminal Commands
The terminal supports various commands for exploring your portfolio:
- Navigation commands (`ls`, `pwd`, `cd`)
- Information commands (`whoami`, `about`, `contact`)
- Content commands (`projects`, `skills`, `education`)
- Utility commands (`clear`, `help`, `exit`)

### Project Playground
Interactive demonstrations of your technical skills:
- **Games**: Showcase game development skills
- **Simulations**: Demonstrate algorithm understanding
- **Live Code**: Interactive programming examples

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio-website/issues).

## 📧 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- GitHub: [Your GitHub Profile](https://github.com/yourusername)

---

⭐ **Star this repository if you found it helpful!**

🎮 **Try the interactive features - Terminal and Project Playground!**