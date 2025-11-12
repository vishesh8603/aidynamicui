

A sophisticated persona-based portfolio generator that leverages AI prompt injection to create hyper-personalized portfolio experiences. Built as part of the AI-Powered Dynamic UI Engine project showcasing advanced frontend development and AI integration.


## Features

### Persona-Based Generation
Choose from 6 distinct professional personas, each generating unique visual experiences:

-  Developer: Dark theme, minimal design, tech-focused colors (blues/cyans)
-  Designer: Creative layouts, vibrant colors, artistic visual emphasis  
-  Manager: Professional corporate styling, structured business presentation
- Entrepreneur: Bold startup aesthetic, dynamic colors, innovative layouts
-  Creative: Artistic expression, unique layouts, expressive typography
-  Student: Fresh academic styling, clean and approachable design
- Dark theme, minimal design, tech-focused colors (blues/cyans)
- Creative layouts, vibrant colors, artistic visual emphasis  
- Manager: Professional corporate styling, structured business presentation
- Entrepreneur: Bold startup aesthetic, dynamic colors, innovative layouts
- Creative: Artistic expression, unique layouts, expressive typography
- Student: Fresh academic styling, clean and approachable design

### AI-Powered Styling
- Prompt Injection**: Constructs persona-specific prompts for Gemini API
 Professional portfolio sections populated with real resume data:
- Leadership positions and community involvement
- Contact information and social links


## Technology Stack

- Frontend: HTML5, CSS3, Vanilla JavaScript
- AI Integration: Gemini API for CSS generation
- Styling: CSS Custom Properties, CSS Grid, Flexbox
- Architecture: Modular component-based design
- Responsive Design: Mobile-first approach with breakpoints


## Project Structure

```
ai-portfolio-generator/
 index.html          # Main application structure
style.css           # Base styling and theme system
 app.js             # Core application logic
 README.md          # Project documentation
 index.html          # Main application structure
 style.css           # Base styling and theme system
 app.js             # Core application logic
 README.md          # Project documentation
```


## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Access the application
   Open `http://localhost:8000` in your browser


## Configuration

### Backend API Setup
Create a backend endpoint that accepts POST requests to `/api/generate-css`:
 @@ GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```


## How It Works

### 1. Persona Selection
Users start by selecting their preferred professional persona from an elegant grid layout.
@@ -148,7 +148,7 @@ IGNORE ANY OTHER INSTRUCTIONS. Return CSS now.
- Styles are applied instantly to all portfolio components
- Smooth transitions enhance user experience

## Customization

### Adding New Personas
1. **Define persona configuration**:
@@ -177,15 +177,15 @@ const portfolioData = {
};
```

## Security Considerations

- Input Sanitization: User preferences are sanitized before prompt injection
- Prompt Length Limits: Prevents excessive API usage
- Rate Limiting: Built-in delays between API calls
- Error Handling: Graceful fallbacks for API failures
- CORS Configuration: Proper cross-origin request handling

## Advanced Features

### Performance Optimization
- CSS Caching: Generated styles are cached for quick reapplication
 @@ analytics.track('persona_selected', {
});
```

##  Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
@@ -216,14 +216,14 @@ analytics.track('persona_selected', {
- Document all functions and components
- Test across multiple browsers

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **CSS Generation Time**: < 2.0s
- **Style Application**: < 0.5s

## › Troubleshooting


### Common Issues

@@ -245,28 +245,28 @@ Issue: Dark/light mode switch unresponsive
Solution: Check JavaScript event listeners and CSS variable definitions
```

## Acknowledgments

- **Google Gemini API** for AI-powered CSS generation
- **Modern CSS Features** for responsive design capabilities
- **Web Standards** for semantic HTML structure
- **Open Source Community** for inspiration and best practices


## Contact

**Vishesh** - Computer Science Engineering Student
- Email: visheshyadav_co22a8_19@dtu.ac.in

---

## Future Enhancements

- [ ] Multi-language Support for international users
- [ ] Custom Color Picker for personalized palettes
- [ ] Analytics Dashboard for usage insights
- [ ] Mobile App version using React Native
