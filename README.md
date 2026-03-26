# RCMI IDC Website Design Prototype

## Overview
This is a comprehensive website design prototype for the **Research Centers in Minority Institutions (RCMI) Investigator Development Core (IDC)** at Morgan State University. The design features a modern, professional aesthetic appropriate for an academic research program.

## Design Philosophy

### Visual Identity
- **Modern Academic**: Professional yet approachable design that reflects the institution's commitment to research excellence
- **Bold Typography**: Playfair Display for headers (serif, elegant) paired with Work Sans for body text (clean, readable)
- **Vibrant Color Palette**: Navy blue primary with energetic orange accents to represent both academic rigor and innovation
- **Dynamic Layouts**: Asymmetric grids, generous white space, and engaging visual hierarchy

### Color Palette
```
Primary (Navy):     #003366 - Trust, professionalism, academic authority
Secondary (Orange): #FF6B35 - Energy, innovation, enthusiasm
Accent (Gold):      #F7931E - Excellence, achievement, warmth
Dark (Text):        #1a1a2e - Strong readability
Light (Background): #f8f9fa - Clean, modern
Text:               #2c3e50 - Comfortable reading
Border:             #e0e6ed - Subtle separation
```

### Typography
- **Display Font**: Playfair Display (600, 700, 800 weights)
  - Used for: Main headings, page titles, section headers
  - Character: Elegant, distinguished, authoritative
  
- **Body Font**: Work Sans (300, 400, 500, 600 weights)
  - Used for: Body text, navigation, buttons
  - Character: Clean, modern, highly readable

### Design Elements
- **Gradient Overlays**: Used in hero sections and buttons for visual depth
- **Card-Based Layouts**: Consistent rounded corners (20px) with subtle shadows
- **Hover Effects**: Smooth transitions with lift effects and shadow increases
- **Iconography**: Emoji-based icons for quick visual communication
- **Animations**: Subtle fade-ins and slide effects for enhanced user experience

## Pages Included

### 1. Homepage (index.html)
**Purpose**: First impression and navigation hub

**Key Sections**:
- Hero section with compelling value proposition
- Core activities overview (3 feature cards)
- Program statistics
- Leadership preview
- Clear call-to-action buttons

**Design Notes**:
- Large, impactful hero with gradient background
- Animated elements on scroll
- Feature cards with hover effects
- Statistical highlights in contrasting section

### 2. About Page (about.html)
**Purpose**: Detailed information about RCMI and IDC mission

**Key Sections**:
- RCMI program overview
- IDC core activities
- Mission and strategic goals
- Leadership profiles with detailed bios
- Impact statement

**Design Notes**:
- Long-form content with clear hierarchy
- Highlight boxes for important information
- Mission cards in grid layout
- Full leader profiles with photos and descriptions

### 3. Faculty Page (faculty.html)
**Purpose**: Showcase faculty members and their research

**Key Sections**:
- Filter tabs for different faculty categories
- Faculty profiles with photos
- Education credentials
- Research interests and areas
- Contact information
- Publication highlights

**Design Notes**:
- Grid layout for easy scanning
- Detailed cards with comprehensive information
- Tags for research areas
- Expandable sections for publications

### 4. Research Page (research.html)
**Purpose**: Highlight research areas and ongoing projects

**Key Sections**:
- Research focus areas (6 main categories)
- Featured research projects
- Research infrastructure
- Collaboration opportunities
- Call-to-action for joining

**Design Notes**:
- Visual icons for each research area
- Project cards with metadata
- Tags for research topics
- Infrastructure showcase

### 5. Opportunities Page (opportunities.html)
**Purpose**: Present funding and development opportunities

**Key Sections**:
- Pilot grant program details
- Writing and research support
- Mentorship program
- Workshops and training
- Application timeline
- Support services

**Design Notes**:
- Opportunity cards with detailed information
- Visual timeline for application process
- Service grid for additional resources
- Clear application CTAs

### 6. Contact Page (contact.html)
**Purpose**: Provide contact information and inquiry form

**Key Sections**:
- Contact information with icons
- Message submission form
- Team contact cards
- Location information
- Office hours

**Design Notes**:
- Two-column layout (info + form)
- Styled form elements
- Team member quick contacts
- Map placeholder for location

## Technical Specifications

### Responsive Design
- **Desktop**: Optimized for 1400px max-width
- **Tablet**: Grid layouts adjust to 2 columns
- **Mobile**: Single column, stacked layouts
- **Breakpoints**: 768px (mobile) and 968px (tablet)

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard CSS3 and HTML5
- No JavaScript dependencies (pure CSS animations)

### Performance Considerations
- External fonts loaded from Google Fonts
- Minimal external dependencies
- CSS-only animations for smooth performance
- Optimized image placeholders

## Implementation Guide for Adobe Express

### Step 1: Color Setup
1. Create a color palette with the exact hex values provided
2. Save as a custom palette for consistency across pages
3. Apply primary color to headers and navigation
4. Use secondary color for buttons and accents

### Step 2: Typography
1. Add Playfair Display font for all headings
2. Add Work Sans font for body text
3. Set up text styles:
   - H1: Playfair Display, 56px, Bold
   - H2: Playfair Display, 44px, Bold
   - H3: Playfair Display, 28px, Bold
   - Body: Work Sans, 16px, Regular
   - Button: Work Sans, 16px, SemiBold

### Step 3: Layout Components
1. Create master header/navigation template
2. Design footer template with 4 columns
3. Build card components with rounded corners
4. Set up consistent spacing (padding: 48px sections)

### Step 4: Hero Sections
1. Use gradient backgrounds (navy to lighter blue)
2. Large white text (56px)
3. Subtle overlay patterns
4. Clear CTAs with orange buttons

### Step 5: Content Sections
1. Alternate between white and light gray backgrounds
2. Use card-based layouts with shadows
3. Consistent spacing between elements
4. Icon + text combinations for features

### Step 6: Interactive Elements
1. Buttons: Rounded (50px radius), bold text
2. Cards: Slight shadow, hover lift effect
3. Links: Orange color, underline on hover
4. Forms: Rounded inputs (10px), focus states

## Content Guidelines

### Writing Style
- Clear, concise, professional
- Active voice preferred
- Emphasis on impact and outcomes
- Academic but accessible tone

### Image Recommendations
- Faculty headshots: Professional, consistent backgrounds
- Research images: High-quality, action-oriented
- Hero images: Wide, inspiring, relevant to health research
- Icons: Simple, consistent style throughout

### Accessibility
- High contrast ratios for text
- Clear hierarchy and structure
- Descriptive link text
- Alt text for all images
- Keyboard navigation support

## Customization Options

### Easy Modifications
1. **Colors**: Update CSS variables at the top of each file
2. **Fonts**: Change Google Fonts link and font-family declarations
3. **Spacing**: Adjust padding/margin values globally
4. **Images**: Replace emoji icons with actual images or icon fonts

### Adding New Content
1. **New Pages**: Copy structure from existing pages
2. **New Sections**: Use existing card/grid patterns
3. **New Faculty**: Duplicate faculty-card structure
4. **New Projects**: Copy project-card template

## File Structure
```
rcmi-idc-website/
├── index.html          # Homepage
├── about.html          # About RCMI & IDC
├── faculty.html        # Faculty & Research
├── research.html       # Research Areas & Projects
├── opportunities.html  # Funding & Opportunities
├── contact.html        # Contact Information
└── README.md          # This file
```

## Notes for Adobe Express
- All pages use consistent navigation and footer
- Header is fixed on scroll for easy navigation
- Smooth transitions enhance user experience
- Grid layouts are responsive and flexible
- Color scheme maintains brand consistency

## Future Enhancements
1. Add actual faculty photos
2. Integrate real research project data
3. Implement working contact form backend
4. Add news/blog section

## Publications Search

The live publications page now loads records from `docs/data/publications.csv` and applies client-side search and filtering after the CSV data is loaded. Users can filter by year, publication type, and department, and search across publication title, authors, department, and related project title.
5. Include publication database
6. Create student/trainee section
7. Add event calendar
8. Integrate social media feeds

## Support & Maintenance
For questions about this design prototype:
- Review this README for design specifications
- Check individual page comments for section details
- Refer to color/typography guidelines above
- Test all responsive breakpoints

## Credits
- Design System: Custom for RCMI IDC
- Typography: Google Fonts (Playfair Display, Work Sans)
- Color Palette: Custom academic-inspired scheme
- Layout: Modern card-based responsive design

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Created For**: Morgan State University RCMI IDC Program
