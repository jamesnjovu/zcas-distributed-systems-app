# 🤖 CLAUDE.md - AI Development Context

This file contains the development history, design decisions, and context for AI assistants (like Claude) to understand and continue work on this project.

## 📋 Project Overview

**Project Name:** Distributed Systems Study Guide  
**Type:** Interactive Educational Web Application  
**Framework:** Next.js 14 (App Router)  
**Created:** 2024  
**AI Assistant:** Claude (Anthropic)  

## 🎯 Project Goals

1. **Primary Goal:** Create an interactive study guide for Distributed Systems course
2. **Secondary Goals:**
   - Provide multiple learning modalities (visual, audio, reading)
   - Enable progress tracking
   - Integrate course PDF materials
   - Make studying engaging and efficient

## 🏗️ Architecture Decisions

### Why Next.js?
- **Static Export:** Perfect for GitHub Pages deployment
- **App Router:** Modern React patterns with Server/Client components
- **Built-in Optimization:** Image optimization, code splitting
- **Developer Experience:** Hot reload, TypeScript support

### Why Single Page Component?
- **Simplicity:** All logic in one file for educational project
- **State Management:** React hooks sufficient for app complexity
- **No Server Logic:** Purely client-side application
- **Easy to Understand:** Students can read and learn from code

### Why Tailwind CSS?
- **Rapid Development:** Utility-first approach speeds up styling
- **Consistency:** Design system built-in
- **Responsive:** Mobile-first by default
- **Small Bundle:** Only used classes included

## 🎨 Design Philosophy

### User Experience Principles

1. **Progressive Disclosure**
   - Hide complexity initially
   - Expandable sections for details
   - Collapsible answers to encourage thinking

2. **Multi-Modal Learning**
   - Visual: Beautiful UI with color coding
   - Audio: Text-to-speech for accessibility
   - Reading: Comprehensive text content
   - Reference: Integrated PDF viewer

3. **Immediate Feedback**
   - Hover states on interactive elements
   - Smooth animations for state changes
   - Visual progress indicators
   - Audio playback status

4. **Cognitive Load Management**
   - One concept at a time
   - Clear visual hierarchy
   - Consistent color coding
   - Focused content sections

### Color Scheme

```
Primary Colors:
- Blue (#2563eb): Content, primary actions
- Purple (#7c3aed): Exercises, assessments
- Green (#10b981): Audio, success states
- Indigo (#4f46e5): PDF, references
- Amber (#f59e0b): Tips, warnings

Gradients:
- Blue to Purple: Headers, cards
- Green to Teal: Audio controls
- Indigo to Purple: PDF sections
```

## 🔧 Technical Implementation

### Component Structure

```
DistributedSystemsApp (Root)
├── HomePage
│   └── Unit Cards (map)
└── UnitView
    ├── Audio Controls
    ├── Summary Section
    │   └── Key Points (map)
    ├── PDF Viewer Section
    │   ├── Toggle Controls
    │   ├── Zoom Controls
    │   └── iframe Viewer
    ├── Topics Section
    │   └── Expandable Topics (map)
    ├── Exercises Section
    │   └── Q&A Cards (map)
    └── Navigation Controls
```

### State Management

```javascript
// View State
currentView: 'home' | 'unit'
currentUnit: Unit | null

// UI State
expandedAnswers: { [key: string]: boolean }
expandedTopics: { [key: string]: boolean }
showPdfViewer: boolean
pdfScale: number (0.5 - 2.0)

// Audio State
isSpeaking: boolean
isPaused: boolean
speechSupported: boolean

// Progress State
completedUnits: Set<number>
```

### Data Structure

```typescript
interface Unit {
  id: number;
  title: string;
  pdfPages: string; // e.g., "3-13"
  summary: string;
  keyPoints: string[];
  topics: Topic[];
  exercises: Exercise[];
}

interface Topic {
  title: string;
  summary: string;
}

interface Exercise {
  q: string; // question
  a: string; // answer
}
```

## 🎤 Text-to-Speech Implementation

### Browser API Usage

```javascript
// Feature Detection
if ('speechSynthesis' in window) {
  setSpeechSupported(true);
}

// Speech Synthesis
const utterance = new SpeechSynthesisUtterance(text);
utterance.rate = 0.9;  // Slightly slower for clarity
utterance.pitch = 1;   // Natural pitch
utterance.volume = 1;  // Full volume

window.speechSynthesis.speak(utterance);
```

### Supported Browsers
- ✅ Chrome/Edge (Best support)
- ✅ Firefox (Good support)
- ⚠️ Safari (Limited support)
- ❌ Older browsers (No support)

## 📄 PDF Integration

### Implementation Approach

**Method:** iframe with URL fragment
```javascript
// URL with page parameter
`/pdf-filename.pdf#page=${startPage}`
```

### Why iframe?
- **Native Support:** Browsers have built-in PDF viewers
- **No Dependencies:** No need for PDF.js library
- **Performance:** Browser-optimized rendering
- **Features:** Browser controls available in new tab

### Limitations
- Browser-dependent rendering
- Limited styling control
- Mobile support varies
- Some security restrictions

### Future Improvements
Consider PDF.js if needed:
- Custom UI controls
- Annotation support
- Text selection/search
- Consistent cross-browser rendering

## 🚀 Deployment Strategy

### GitHub Pages Choice

**Why GitHub Pages?**
- Free hosting
- Automatic HTTPS
- GitHub integration
- Custom domain support
- Simple deployment workflow

### Build Configuration

```javascript
// next.config.js
{
  output: 'export',           // Static export
  basePath: '/repo-name',     // GitHub Pages path
  images: { unoptimized: true } // No image optimization
}
```

### Deployment Methods

1. **GitHub Actions (Recommended)**
   - Automatic deployment on push
   - Built-in caching
   - Status badges
   - Easy rollback

2. **gh-pages Package (Alternative)**
   - Manual deployment
   - Faster initial setup
   - More control
   - Simpler for beginners

## 🐛 Known Issues & Solutions

### Issue 1: PDF Not Displaying

**Symptoms:** Empty iframe or error message

**Causes:**
- PDF file not in public folder
- Incorrect filename
- Browser doesn't support PDF in iframe
- CORS restrictions

**Solutions:**
1. Verify file location: `public/Distributed Systems Courrse Module.pdf`
2. Check browser console for errors
3. Try "Open in New Tab" button
4. Use Chrome/Edge for best support

### Issue 2: Audio Not Working

**Symptoms:** Speaker buttons don't play audio

**Causes:**
- Browser doesn't support Web Speech API
- Autoplay policies
- Audio context not started

**Solutions:**
1. Test in Chrome/Edge
2. User interaction required before audio
3. Check speechSupported state
4. Browser console for specific errors

### Issue 3: GitHub Pages 404

**Symptoms:** Deployed site shows 404

**Causes:**
- basePath mismatch
- Jekyll processing
- Build not completed

**Solutions:**
1. Match basePath to repo name
2. Add `.nojekyll` file
3. Check GitHub Actions logs
4. Verify gh-pages branch exists

## 📚 Content Guidelines

### Adding New Units

```javascript
{
  id: 11, // Next sequential ID
  title: "Clear, Descriptive Title",
  pdfPages: "112-125", // Page range
  summary: "2-3 sentence overview",
  keyPoints: [
    "7-11 bullet points",
    "Most important concepts",
    "Exam-focused information"
  ],
  topics: [
    {
      title: "Topic Name",
      summary: "Detailed explanation (100-200 words)"
    }
  ],
  exercises: [
    {
      q: "Clear question?",
      a: "Comprehensive answer with examples"
    }
  ]
}
```

### Writing Guidelines

**Summaries:**
- 2-3 sentences
- High-level overview
- No technical jargon
- Student-friendly language

**Key Points:**
- 7-11 bullets per unit
- One concept per bullet
- Exam-focused
- Memorable phrasing

**Topic Summaries:**
- 100-200 words
- Technical details
- Examples included
- Comprehensive coverage

**Exercises:**
- Clear, specific questions
- Detailed answers
- Real-world examples
- Multiple aspects covered

## 🔄 Version History

### v1.0.0 - Initial Release
- 10 complete units
- Text-to-speech integration
- PDF viewer with zoom
- Progress tracking
- Responsive design
- GitHub Pages deployment

### Future Versions (Planned)

**v1.1.0**
- [ ] Search functionality
- [ ] Dark mode
- [ ] Print-friendly view
- [ ] Export notes

**v1.2.0**
- [ ] Flashcard mode
- [ ] Quiz system
- [ ] Spaced repetition
- [ ] Study statistics

**v2.0.0**
- [ ] Backend integration
- [ ] User accounts
- [ ] Cloud sync
- [ ] Collaborative features

## 🤝 AI Assistant Guidelines

### When Helping with This Project

1. **Understand the Context**
   - This is an educational project
   - Simplicity is valued
   - Student-focused features
   - No over-engineering

2. **Code Style**
   - Functional components
   - React hooks
   - Tailwind utilities
   - Clear variable names
   - Comments for complex logic

3. **Adding Features**
   - Consider educational value
   - Maintain simplicity
   - Test in multiple browsers
   - Update documentation
   - Consider mobile users

4. **Bug Fixes**
   - Identify root cause
   - Provide clear explanation
   - Offer multiple solutions
   - Test thoroughly
   - Update CLAUDE.md

5. **Content Updates**
   - Follow style guidelines
   - Verify accuracy
   - Maintain consistency
   - Student-appropriate language
   - Include examples

## 📝 Development Workflow

### Local Development

```bash
# Setup
npm install
npm run dev

# Testing
npm run build
npx serve out

# Linting
npm run lint
```

### Before Committing

- [ ] Test all features
- [ ] Check console for errors
- [ ] Verify responsive design
- [ ] Test audio functionality
- [ ] Verify PDF loads
- [ ] Update documentation
- [ ] Run build successfully

### Deployment Checklist

- [ ] Update version in package.json
- [ ] Test production build locally
- [ ] Verify basePath configuration
- [ ] Check all assets load
- [ ] Test on multiple browsers
- [ ] Update README if needed
- [ ] Push to main branch
- [ ] Verify GitHub Actions success
- [ ] Test deployed site

## 🧪 Testing Scenarios

### Manual Testing

**Home Page:**
- [ ] All unit cards visible
- [ ] Cards are clickable
- [ ] Hover effects work
- [ ] Completed badges show
- [ ] Progress counter accurate

**Unit Page:**
- [ ] Navigation works
- [ ] Audio buttons appear (if supported)
- [ ] PDF toggles correctly
- [ ] Topics expand/collapse
- [ ] Exercises show/hide answers
- [ ] Zoom controls work
- [ ] Back button returns home

**Audio Features:**
- [ ] Play full unit works
- [ ] Pause/resume functions
- [ ] Stop cancels properly
- [ ] Individual audio plays
- [ ] No audio conflicts

**PDF Viewer:**
- [ ] Shows correct pages
- [ ] Zoom in/out works
- [ ] New tab opens correctly
- [ ] Page indicator accurate
- [ ] Toggle hide/show works

## 💡 Design Patterns Used

### Component Composition
```javascript
// Reusable patterns
<Section>
  <Header />
  <Content />
  <Actions />
</Section>
```

### State Management Pattern
```javascript
// Controlled components
const [state, setState] = useState(initial);
const toggle = () => setState(!state);
```

### Event Handling Pattern
```javascript
// Stop propagation when needed
onClick={(e) => {
  e.stopPropagation();
  handleAction();
}}
```

### Conditional Rendering
```javascript
// Clear ternaries
{condition ? <ComponentA /> : <ComponentB />}
{condition && <Component />}
```

## 🎓 Learning Objectives

### For Students Using This App
- Understand distributed systems concepts
- Practice with real exam questions
- Learn through multiple modalities
- Track progress systematically

### For Developers Reading This Code
- Next.js App Router patterns
- React hooks usage
- Tailwind CSS utilities
- Browser API integration
- State management techniques
- Responsive design principles

## 📖 References

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

### Inspiration
- Modern educational platforms
- Interactive learning apps
- Study guide best practices
- Accessibility guidelines

---

## 🔮 Future AI Assistant Context

When continuing work on this project:

1. **Read this file first** - Understand design decisions
2. **Check courseData** - See content structure
3. **Review state management** - Understand data flow
4. **Test thoroughly** - Verify browser compatibility
5. **Update documentation** - Keep this file current
6. **Maintain simplicity** - Don't over-complicate
7. **Focus on education** - Student needs first

**Last Updated:** October 2024  
**AI Assistant:** Claude (Anthropic)  
**Status:** Active Development

---

*This file helps AI assistants provide better assistance by understanding the full context, decisions, and goals of the project.*