# Simply Productive Software

A modern, responsive website showcasing browser extensions for productivity. Built with clean HTML, CSS, and JavaScript following best practices for accessibility, performance, and maintainability.

## Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels, semantic HTML, and keyboard navigation
- **Performance**: Optimized images, efficient CSS, and minimal JavaScript
- **SEO Optimized**: Proper meta tags, structured data, and semantic markup
- **Modern UI**: Clean, minimalist design with smooth animations and interactions

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Primary stylesheet
├── utilities.css       # Utility classes and helper styles
├── script.js          # JavaScript functionality
├── config.json        # Site configuration (for future use)
├── images/            # Image assets and favicons
├── CNAME              # GitHub Pages domain configuration
└── README.md          # This file
```

## Products Featured

1. **Simply Notes** - Minimalist note-taking extension (Coming Soon)
2. **Simply Todo** - Clean task management extension
3. **Simply Timezones** - Global time management tool
4. **Simply Pomodoro** - Productivity timer using the Pomodoro Technique

## Technical Details

### CSS Architecture
- **CSS Custom Properties**: Using CSS variables for consistent theming
- **Mobile-First**: Responsive design starting from mobile breakpoints
- **Grid Layout**: CSS Grid for flexible product card layouts
- **Smooth Animations**: CSS transitions for enhanced user experience

### JavaScript Features
- **ES6+ Classes**: Modern JavaScript with class-based architecture
- **Event Delegation**: Efficient event handling
- **Scroll Spy**: Active navigation highlighting based on scroll position
- **Throttled Scrolling**: Performance-optimized scroll event handling

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators and logical tab order
- **Alt Text**: Descriptive alternative text for all images

## Development

### Quick Start with Build Script
The easiest way to start development is using the included build script:

```bash
# Make the script executable (first time only)
chmod +x build.sh

# Run validation and start local server
./build.sh
```

The build script will:
- Validate HTML syntax (if `html5validator` is installed)
- Lint CSS code (if `stylelint` is installed)
- Lint JavaScript code (if `eslint` is installed)
- Check image file sizes for optimization
- Start a local development server

### Optional Development Tools
For full validation functionality, install these tools:

```bash
# HTML validation
pip install html5validator

# CSS linting
npm install -g stylelint stylelint-config-standard

# JavaScript linting
npm install -g eslint
```

### Manual Local Development
If you prefer not to use the build script:

```bash
# Serve the site locally (Python)
python -m http.server 8000

# Or using Node.js
npx serve .

# Or using PHP
php -S localhost:8000
```

### File Organization
- Keep all styles in `styles.css` and `utilities.css`
- JavaScript functionality in `script.js`
- Images optimized and stored in `images/` directory
- Configuration in `config.json` for future dynamic content

### Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- **Image Optimization**: WebP format where supported, appropriate sizing
- **CSS Minification**: Production builds should minify CSS
- **JavaScript Efficiency**: Throttled scroll events, minimal DOM queries
- **Font Loading**: Preconnect to Google Fonts for faster loading

## SEO Features

- **Meta Tags**: Proper title, description, and viewport meta tags
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema markup for better search results
- **Sitemap**: XML sitemap for search engine crawling

## Deployment

This site is configured for GitHub Pages deployment:

1. Push changes to the main branch
2. GitHub Pages automatically deploys from the root directory
3. Custom domain configured via CNAME file

## Contributing

When adding new products or features:

1. Update `config.json` with product information
2. Add product images to the `images/` directory
3. Update navigation in both HTML and JavaScript
4. Test responsive design across all breakpoints
5. Validate accessibility with screen readers

## License

© 2025 Simply Productive Software. All rights reserved.
