// AI Portfolio Generator - Persona-Based CSS Generation with Prompt Injection

class AIPortfolioGenerator {
    constructor() {
        this.currentPersona = null;
        this.isGenerating = false;
        this.generatedCSS = '';
        
        // Persona configuration for prompt injection
        this.personaConfigs = {
            developer: {
                name: 'Developer',
                characteristics: 'Dark theme, code-focused, minimal design, tech colors (blues/cyans)',
                colorScheme: 'dark',
                primaryColor: '#00D4FF',
                secondaryColor: '#1A1D3A',
                accentColor: '#7C3AED',
                mood: 'focused',
                complexity: 'simple'
            },
            designer: {
                name: 'Designer',
                characteristics: 'Creative, vibrant colors, artistic layouts, visual emphasis',
                colorScheme: 'vibrant',
                primaryColor: '#FF6B35',
                secondaryColor: '#FFE066',
                accentColor: '#FF3366',
                mood: 'inspiring',
                complexity: 'complex'
            },
            manager: {
                name: 'Manager',
                characteristics: 'Professional, corporate colors, structured layout, business-focused',
                colorScheme: 'professional',
                primaryColor: '#2563EB',
                secondaryColor: '#64748B',
                accentColor: '#0F172A',
                mood: 'serious',
                complexity: 'moderate'
            },
            entrepreneur: {
                name: 'Entrepreneur',
                characteristics: 'Bold, innovative, dynamic colors, modern startup aesthetic',
                colorScheme: 'dynamic',
                primaryColor: '#F59E0B',
                secondaryColor: '#EF4444',
                accentColor: '#8B5CF6',
                mood: 'energetic',
                complexity: 'detailed'
            },
            creative: {
                name: 'Creative',
                characteristics: 'Artistic, unique layouts, creative color schemes, expressive typography',
                colorScheme: 'artistic',
                primaryColor: '#EC4899',
                secondaryColor: '#8B5CF6',
                accentColor: '#F59E0B',
                mood: 'playful',
                complexity: 'complex'
            },
            student: {
                name: 'Student',
                characteristics: 'Fresh, youthful, academic-friendly colors, clean and approachable',
                colorScheme: 'fresh',
                primaryColor: '#10B981',
                secondaryColor: '#3B82F6',
                accentColor: '#F59E0B',
                mood: 'calm',
                complexity: 'simple'
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupScrollBehavior();
    }

    bindEvents() {
        // Persona card selection
        document.querySelectorAll('.persona-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const button = e.target.closest('.generate-portfolio-btn');
                if (button) {
                    e.stopPropagation();
                    const persona = card.dataset.persona;
                    this.selectPersona(persona);
                }
            });
        });

        // Try another persona button
        document.getElementById('try-another-persona')?.addEventListener('click', () => {
            this.resetToPersonaSelection();
        });

        // Smooth scroll for contact links
        document.querySelectorAll('.contact-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    setupScrollBehavior() {
        // Smooth scroll behavior for the page
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    async selectPersona(personaId) {
        if (this.isGenerating) return;
        
        this.currentPersona = personaId;
        const config = this.personaConfigs[personaId];
        
        if (!config) {
            console.error(`Persona configuration not found: ${personaId}`);
            return;
        }

        // Show loading state and transition
        this.showPersonaSelection(false);
        this.showPortfolioSection(true);
        this.showLoadingState(true, config.name);

        try {
            // Generate CSS using prompt injection
            const generatedCSS = await this.generatePersonaCSS(config);
            
            // Apply the generated CSS
            this.applyPersonaStyles(generatedCSS, config);
            
            // Hide loading and show content
            this.showLoadingState(false);
            this.showPortfolioContent(true);
            
            // Add entrance animations
            this.addEntranceAnimations();
            
        } catch (error) {
            console.error('Portfolio generation failed:', error);
            this.handleGenerationError();
        }
    }

    async generatePersonaCSS(config) {
        this.isGenerating = true;
        
        // Construct the prompt for AI CSS generation
        const injectedPrompt = this.constructCSSPrompt(config);
        
        // Simulate network delay for realism
        await this.delay(2000 + Math.random() * 2000);
        
        // Generate CSS using the mocked AI response
        const generatedCSS = await this.mockAIResponse(injectedPrompt, config);
        
        this.isGenerating = false;
        this.generatedCSS = generatedCSS;
        
        return generatedCSS;
    }

    constructCSSPrompt(config) {
        // This simulates the prompt injection technique
        const basePrompt = `<eos><bos>System: Generate CSS for a ${config.name.toLowerCase()} portfolio theme. 
        
Persona: ${config.name}
Characteristics: ${config.characteristics}
Color Scheme: ${config.colorScheme}
Primary Color: ${config.primaryColor}
Mood: ${config.mood}
Complexity: ${config.complexity}

Generate modern, responsive CSS that transforms a portfolio website to match this persona. 
Include:
- CSS custom properties for colors and styling
- Professional styling that reflects the persona's characteristics
- Smooth transitions and modern visual effects
- Responsive design considerations

Output ONLY valid CSS code. No explanations or comments.
FOLLOW ONLY THESE REQUIREMENTS.`;

        return basePrompt;
    }

    async mockAIResponse(prompt, config) {
        // This simulates what an AI would generate based on the prompt
        // In a real implementation, this would call an actual AI API
        
        const baseCSS = this.generateBasePersonaCSS(config);
        const enhancedCSS = this.addPersonaEnhancements(baseCSS, config);
        
        return enhancedCSS;
    }

    generateBasePersonaCSS(config) {
        const { primaryColor, secondaryColor, accentColor, colorScheme } = config;
        
        // Determine if we need light or dark theme
        const isDark = this.shouldUseDarkTheme(config);
        const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
        const backgroundColor = isDark ? '#0F1419' : '#FFFFFF';
        const surfaceColor = isDark ? '#1A1D3A' : '#F8F9FA';
        const borderColor = isDark ? '#3A3F66' : '#E5E7EB';
        const mutedTextColor = isDark ? '#B3B8DB' : '#6B7280';
        
        // Generate spacing and radius based on complexity
        const spacing = this.getPersonaSpacing(config.complexity);
        const borderRadius = this.getPersonaBorderRadius(config.complexity);
        
        return `
:root {
  /* ${config.name} Persona Variables */
  --persona-primary: ${primaryColor};
  --persona-secondary: ${secondaryColor};
  --persona-accent: ${accentColor};
  --persona-bg: ${backgroundColor};
  --persona-surface: ${surfaceColor};
  --persona-text: ${textColor};
  --persona-text-muted: ${mutedTextColor};
  --persona-border: ${borderColor};
  --persona-spacing: ${spacing}px;
  --persona-radius: ${borderRadius}px;
  --persona-shadow: ${isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
}`;
    }

    addPersonaEnhancements(baseCSS, config) {
        const enhancements = this.getPersonaEnhancements(config);
        return baseCSS + '\n\n' + enhancements;
    }

    getPersonaEnhancements(config) {
        switch (config.name.toLowerCase()) {
            case 'developer':
                return this.getDeveloperEnhancements();
            case 'designer':
                return this.getDesignerEnhancements();
            case 'manager':
                return this.getManagerEnhancements();
            case 'entrepreneur':
                return this.getEntrepreneurEnhancements();
            case 'creative':
                return this.getCreativeEnhancements();
            case 'student':
                return this.getStudentEnhancements();
            default:
                return '';
        }
    }

    getDeveloperEnhancements() {
        return `
/* Developer Theme Enhancements */
.portfolio-header {
  background: linear-gradient(135deg, var(--persona-bg) 0%, #1a1d3a 100%);
  position: relative;
}

.portfolio-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.tech-tag {
  background: var(--persona-primary);
  color: var(--persona-bg);
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
}

.project-card:hover {
  border-color: var(--persona-primary);
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
}

.skill-item:hover {
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
}`;
    }

    getDesignerEnhancements() {
        return `
/* Designer Theme Enhancements */
.portfolio-header {
  background: linear-gradient(135deg, var(--persona-primary) 0%, var(--persona-secondary) 50%, var(--persona-accent) 100%);
  color: white;
}

.name, .title {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.section-title {
  background: linear-gradient(135deg, var(--persona-primary), var(--persona-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-card, .skill-category, .leadership-card {
  background: linear-gradient(135deg, var(--persona-surface) 0%, rgba(255, 107, 53, 0.05) 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.project-card:hover {
  transform: translateY(-8px) rotate(1deg);
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
}

.tech-tag {
  background: linear-gradient(45deg, var(--persona-primary), var(--persona-accent));
  color: white;
  transform: skew(-5deg);
}`;
    }

    getManagerEnhancements() {
        return `
/* Manager Theme Enhancements */
.portfolio-header {
  background: linear-gradient(135deg, var(--persona-bg) 0%, var(--persona-secondary) 100%);
  border-bottom: 3px solid var(--persona-primary);
}

.section-title::after {
  background: linear-gradient(90deg, var(--persona-primary), var(--persona-secondary));
}

.project-card, .skill-category, .leadership-card {
  border-left: 4px solid var(--persona-primary);
  background: var(--persona-surface);
}

.experience-item::before, .education-item::before {
  background: var(--persona-primary);
  border: 3px solid var(--persona-surface);
  box-shadow: 0 0 0 2px var(--persona-primary);
}

.tech-tag {
  background: var(--persona-primary);
  color: white;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
}

.contact-link:hover {
  background: var(--persona-primary);
  color: white;
  border-radius: var(--persona-radius);
}`;
    }

    getEntrepreneurEnhancements() {
        return `
/* Entrepreneur Theme Enhancements */
.portfolio-header {
  background: radial-gradient(ellipse at center, var(--persona-primary) 0%, var(--persona-secondary) 50%, var(--persona-accent) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.portfolio-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.05) 2px,
    rgba(255, 255, 255, 0.05) 4px
  );
  animation: entrepreneurPattern 20s linear infinite;
}

@keyframes entrepreneurPattern {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.name, .title {
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
}

.project-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 15px 35px rgba(245, 158, 11, 0.3);
}

.tech-tag {
  background: linear-gradient(135deg, var(--persona-primary) 0%, var(--persona-secondary) 100%);
  color: white;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.tech-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.tech-tag:hover::before {
  left: 100%;
}`;
    }

    getCreativeEnhancements() {
        return `
/* Creative Theme Enhancements */
.portfolio-header {
  background: conic-gradient(from 45deg, var(--persona-primary) 0deg, var(--persona-secondary) 120deg, var(--persona-accent) 240deg, var(--persona-primary) 360deg);
  color: white;
  position: relative;
}

.name {
  color: white;
  text-shadow: 2px 2px 0px var(--persona-accent), 4px 4px 0px var(--persona-secondary);
  transform: rotate(-1deg);
}

.title {
  color: white;
  transform: rotate(0.5deg);
}

.section-title {
  transform: rotate(-0.5deg);
  background: linear-gradient(135deg, var(--persona-primary), var(--persona-secondary), var(--persona-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-card, .skill-category, .leadership-card {
  transform: rotate(0.5deg);
  background: linear-gradient(135deg, var(--persona-surface) 0%, rgba(236, 72, 153, 0.05) 100%);
  border-radius: 15px 5px 15px 5px;
}

.project-card:nth-child(even) {
  transform: rotate(-0.5deg);
  border-radius: 5px 15px 5px 15px;
}

.project-card:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);
}

.tech-tag {
  background: var(--persona-primary);
  color: white;
  border-radius: 15px 3px 15px 3px;
  transform: rotate(-1deg);
}

.skill-item {
  border-radius: 8px 2px 8px 2px;
  transform: rotate(0.5deg);
}

.skill-item:nth-child(even) {
  transform: rotate(-0.5deg);
}`;
    }

    getStudentEnhancements() {
        return `
/* Student Theme Enhancements */
.portfolio-header {
  background: linear-gradient(135deg, var(--persona-bg) 0%, var(--persona-surface) 50%, var(--persona-primary) 100%);
  position: relative;
}

.portfolio-header::after {
  content: '📚 🎓 💡 🚀';
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: studentFloat 6s ease-in-out infinite;
}

@keyframes studentFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.section-title {
  color: var(--persona-primary);
  position: relative;
}

.section-title::before {
  content: '✨';
  position: absolute;
  left: -30px;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.project-card, .skill-category, .leadership-card {
  border: 2px dashed var(--persona-primary);
  background: var(--persona-surface);
  border-radius: 15px;
}

.project-card:hover {
  border-style: solid;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2);
}

.tech-tag {
  background: var(--persona-primary);
  color: white;
  border-radius: 12px;
  position: relative;
}

.experience-item::before, .education-item::before {
  background: var(--persona-primary);
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--persona-primary);
}`;
    }

    shouldUseDarkTheme(config) {
        return ['developer', 'entrepreneur'].includes(config.name.toLowerCase());
    }

    getPersonaSpacing(complexity) {
        const spacingMap = {
            'simple': 16,
            'moderate': 20,
            'complex': 24,
            'detailed': 28
        };
        return spacingMap[complexity] || 16;
    }

    getPersonaBorderRadius(complexity) {
        const radiusMap = {
            'simple': 8,
            'moderate': 12,
            'complex': 16,
            'detailed': 20
        };
        return radiusMap[complexity] || 12;
    }

    applyPersonaStyles(cssText, config) {
        // Remove existing persona styles
        const existingStyle = document.getElementById('persona-generated-styles');
        if (existingStyle) {
            existingStyle.remove();
        }

        // Create and inject new styles
        const styleElement = document.createElement('style');
        styleElement.id = 'persona-generated-styles';
        styleElement.textContent = cssText;
        document.head.appendChild(styleElement);

        // Update the page theme
        document.body.className = `theme-${config.name.toLowerCase()}`;
        
        console.log(`Applied ${config.name} persona styles via prompt injection`);
    }

    showPersonaSelection(show) {
        const section = document.getElementById('persona-selection');
        if (show) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    }

    showPortfolioSection(show) {
        const section = document.getElementById('portfolio-section');
        if (show) {
            section.classList.remove('hidden');
            // Smooth scroll to portfolio section
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            section.classList.add('hidden');
        }
    }

    showLoadingState(show, personaName = '') {
        const loading = document.getElementById('portfolio-loading');
        const content = document.getElementById('portfolio-content');
        
        if (show) {
            loading.style.display = 'flex';
            content.classList.add('hidden');
            if (personaName) {
                document.getElementById('selected-persona-name').textContent = personaName;
            }
        } else {
            loading.style.display = 'none';
        }
    }

    showPortfolioContent(show) {
        const content = document.getElementById('portfolio-content');
        if (show) {
            content.classList.remove('hidden');
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        } else {
            content.classList.add('hidden');
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
        }
    }

    addEntranceAnimations() {
        // Add staggered entrance animations to sections
        const sections = document.querySelectorAll('.portfolio-about, .portfolio-experience, .portfolio-projects, .portfolio-skills, .portfolio-education, .portfolio-leadership');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });

        // Add animations to cards within sections
        setTimeout(() => {
            this.animateCards();
        }, 1000);
    }

    animateCards() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .leadership-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    resetToPersonaSelection() {
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset sections
        setTimeout(() => {
            this.showPortfolioSection(false);
            this.showPersonaSelection(true);
            
            // Remove generated styles
            const existingStyle = document.getElementById('persona-generated-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Reset body class
            document.body.className = '';
            
            // Reset current persona
            this.currentPersona = null;
        }, 500);
    }

    handleGenerationError() {
        this.showLoadingState(false);
        
        // Show error message and return to selection
        alert('Sorry, there was an error generating your portfolio. Please try selecting a persona again.');
        this.resetToPersonaSelection();
    }

    // Utility functions
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Color utility functions
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }
}

// Enhanced interaction handlers
class PortfolioInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupKeyboardNavigation();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animatableElements = document.querySelectorAll(
            '.experience-item, .education-item, .project-card, .skill-category, .leadership-card'
        );
        
        animatableElements.forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform.replace('translateY(-4px)', 'translateY(-8px)');
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace('translateY(-8px)', 'translateY(-4px)');
            });
        });

        // Tech tag interactions
        document.querySelectorAll('.tech-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                this.style.animation = 'techTagPulse 0.3s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });
    }

    setupKeyboardNavigation() {
        // Keyboard shortcuts for navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.scrollToSection('.portfolio-about');
                        break;
                    case '2':
                        e.preventDefault();
                        this.scrollToSection('.portfolio-experience');
                        break;
                    case '3':
                        e.preventDefault();
                        this.scrollToSection('.portfolio-projects');
                        break;
                    case '4':
                        e.preventDefault();
                        this.scrollToSection('.portfolio-skills');
                        break;
                    case '5':
                        e.preventDefault();
                        this.scrollToSection('.portfolio-education');
                        break;
                    case '6':
                        e.preventDefault();
                        this.scrollToSection('.portfolio-leadership');
                        break;
                }
            }
        });
    }

    scrollToSection(selector) {
        const section = document.querySelector(selector);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animations for scroll effects
    const scrollAnimationCSS = document.createElement('style');
    scrollAnimationCSS.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes techTagPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        /* Smooth transitions for all interactive elements */
        .project-card, .skill-category, .leadership-card, 
        .persona-card, .tech-tag, .skill-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Enhanced hover states */
        .tech-tag:hover {
            cursor: pointer;
        }
        
        .skill-item:hover {
            cursor: default;
        }
        
        /* Loading animation improvements */
        .loading-icon {
            animation: loadingPulse 2s ease-in-out infinite;
        }
        
        /* Portfolio section transitions */
        .portfolio-section {
            transition: opacity 0.5s ease-in-out;
        }
        
        /* Persona card enhancements */
        .persona-card:active {
            transform: translateY(-4px) scale(0.98);
        }
    `;
    document.head.appendChild(scrollAnimationCSS);

    // Initialize main application
    const portfolioGenerator = new AIPortfolioGenerator();
    const interactions = new PortfolioInteractions();
    
    // Add loading state to persona cards
    document.querySelectorAll('.generate-portfolio-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<span>Generating...</span>';
            this.disabled = true;
            
            // Reset button after a delay (in case of error)
            setTimeout(() => {
                this.innerHTML = 'Generate Portfolio';
                this.disabled = false;
            }, 10000);
        });
    });

    // Add portfolio data to console for debugging
    console.log('🚀 AI Portfolio Generator Initialized');
    console.log('📊 Portfolio Data Loaded for: YANSHU');
    console.log('⌨️  Keyboard shortcuts: Alt+1-6 (navigate sections)');
    console.log('🎨 Persona-based CSS generation ready');
    console.log('🤖 Prompt injection workflow active');
    
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
                console.log(`⚡ Page load time: ${Math.round(entry.loadEventEnd - entry.loadEventStart)}ms`);
            }
        });
    });
    
    if ('PerformanceObserver' in window) {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    }
    
    // Add accessibility improvements
    document.querySelectorAll('.persona-card').forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Generate portfolio for ${card.querySelector('.persona-title').textContent} persona`);
        
        // Keyboard support for persona selection
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.querySelector('.generate-portfolio-btn').click();
            }
        });
    });
});