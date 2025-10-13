# 📚 Distributed Systems Study Guide

An interactive, feature-rich study application for the Distributed Computing course. Built with Next.js, React, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)

## ✨ Features

### 📖 Comprehensive Study Materials
- **10 Complete Units** covering all Distributed Systems topics
- **Unit Summaries** for quick review
- **Key Points** - Essential concepts in bullet format
- **Detailed Topic Explanations** with expandable summaries
- **Practice Exercises** with comprehensive answers

### 🔍 Search & Navigation
- **Global Search** - Find content across all units, topics, and exercises
- **Smart Filtering** - Real-time results as you type
- **Unit Navigation** - Previous/Next buttons for sequential learning
- **Quick Jump** - Navigate directly to any unit from home

### 🔊 Audio Learning
- **Text-to-Speech Integration** - Listen to any content
- **Full Unit Audio** - Play entire units (15-20 minutes each)
- **Section-by-Section Audio** - Listen to summaries, topics, or exercises
- **Individual Element Audio** - Click speaker icon on any item
- **Playback Controls** - Play, Pause, Resume, Stop

### 📄 PDF Integration
- **React-PDF Viewer** - Advanced PDF rendering with page-by-page navigation
- **Unit-Specific Pages** - Automatically shows relevant pages for each unit
- **Page Navigation** - Previous/Next/First/Last page controls
- **Zoom Controls** - Adjust PDF size (75%-200%)
- **Page Input** - Jump to any page within unit range
- **External Viewer** - Open in new tab for full features

### 🎯 Progress Tracking
- **Mark Units Complete** - Track your learning progress
- **Visual Indicators** - Checkmarks on completed units
- **Progress Counter** - See completion percentage
- **Persistent State** - Progress saved during session

### 🎨 Modern UI/UX
- **Modular Components** - Clean, maintainable code architecture
- **Beautiful Gradients** - Eye-catching color schemes
- **Smooth Animations** - Fade-ins and transitions
- **Responsive Design** - Works on all device sizes
- **Interactive Elements** - Hover effects and feedback
- **Color-Coded Sections** - Easy visual navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/distributed-systems-app.git
   cd distributed-systems-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your PDF file**
   - Place your PDF in the `public/` folder
   - Name it: `Distributed Systems Courrse Module.pdf`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📁 Project Structure

```
distributed-systems-app/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── AudioControls.js    # Text-to-speech controls
│   │   ├── Exercises.js        # Q&A practice sections
│   │   ├── Header.js           # Unit page header
│   │   ├── HomePage.js         # Main landing page
│   │   ├── PDFViewer.js       # PDF viewing component
│   │   ├── SearchBar.js        # Search functionality
│   │   ├── Topics.js           # Expandable topics
│   │   ├── UnitCard.js         # Unit card component
│   │   ├── UnitNavigation.js   # Previous/Next navigation
│   │   ├── UnitSummary.js      # Summary and key points
│   │   └── UnitView.js         # Complete unit view
│   ├── data/
│   │   └── courseData.js       # All course content data
│   ├── hooks/
│   │   └── useSpeech.js        # Custom speech synthesis hook
│   ├── page.js                 # Main app component
│   ├── layout.js               # Root layout configuration
│   └── globals.css             # Global styles with Tailwind
├── public/
│   └── distributed-systems-module.pdf  # Course PDF
├── package.json                # Dependencies and scripts
├── next.config.mjs            # Next.js configuration
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── README.md                  # This file
└── CLAUDE.md                  # AI development context
```

## 🎓 Course Content

### Unit 1: Fundamentals
- What is a Distributed Computing System
- Evolution of Distributed Computing
- System Models (Minicomputer, Workstation, etc.)

### Unit 2: Design Issues
- Transparency Types
- Reliability and Fault Tolerance
- Microkernel Architecture
- Performance and Scalability

### Unit 3: Remote Procedure Calls
- RPC Concepts and Operations
- Client-Server Stubs
- Marshaling and IDL
- Server Management

### Unit 4: RPC Advanced Topics
- Communication Protocols
- Client-Server Binding
- Lightweight RPC
- Performance Optimizations

### Unit 5: Distributed Shared Memory
- Consistency Models
- Granularity and Structure
- Coherence Protocols
- Thrashing Prevention

### Unit 6: Synchronization
- Clock Synchronization
- Logical Clocks and Event Ordering
- Mutual Exclusion Algorithms
- Election Algorithms

### Unit 7: Resource Management I
- Scheduling Approaches
- Process Migration
- Load Balancing vs Load Sharing
- Threads for Concurrency

### Unit 8: Resource Management II
- File System Architecture
- File Models and Semantics
- Caching and Access Models
- Transactions

### Unit 9: Distributed File Systems
- Caching Schemes
- NFS Architecture
- AFS Architecture
- Design Principles

### Unit 10: Naming
- Naming Requirements
- Name Spaces and Resolution
- Name Caching
- Security (Capabilities and ACLs)

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Text-to-Speech:** Web Speech API
- **PDF Viewing:** React-PDF Library
- **Build Tool:** Turbopack (development)
- **Architecture:** Modular Component-Based

## 📖 Usage Guide

### Navigation
- **Home Page:** Click any unit card to view details
- **Unit Page:** Use "Back to Units" to return home
- **Previous/Next:** Navigate between units sequentially

### Studying
1. **Read Summary:** Quick overview of the unit
2. **Review Key Points:** Most important concepts
3. **Explore Topics:** Click to expand detailed summaries
4. **View PDF:** Toggle PDF viewer for course material
5. **Test Knowledge:** Answer exercises before revealing solutions
6. **Mark Complete:** Track progress as you finish units

### Audio Features
- **Play Full Unit:** Green audio bar plays all content
- **Play Sections:** Use section-specific audio buttons
- **Individual Items:** Click speaker icons on any element
- **Controls:** Play, pause, resume, or stop anytime

### PDF Viewer
- **Show PDF:** Click button to display embedded viewer
- **Zoom:** Use +/- buttons to adjust size
- **New Tab:** Open in browser for full PDF features
- **Page Range:** Automatically shows unit-specific pages

## 🎨 Color Coding

- 🔵 **Blue** - Content sections (summaries, topics)
- 🟣 **Purple** - Exercises and practice questions
- 🟢 **Green** - Audio controls and playback
- 🟠 **Amber** - Study tips and helpful hints
- 🟪 **Indigo** - PDF viewer and course materials

## 🌐 Deployment

### GitHub Pages

See `CLAUDE.md` for complete deployment instructions including:
- GitHub Actions setup
- Configuration files
- Custom domain setup
- Troubleshooting guide

### Quick Deploy

```bash
# Build for production
npm run build

# Test production build
npx serve out

# Deploy to GitHub Pages (after setup)
git push origin main
```

Your app will be live at:
```
https://YOUR_USERNAME.github.io/distributed-systems-app/
```

## 🔧 Configuration

### Update Repository Name

Edit `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',  // Change this
  images: { unoptimized: true },
}
```

### Customize Content

Edit `app/page.js` and update the `courseData` object:
- Add/remove units
- Modify summaries and key points
- Update topic details
- Change exercise questions

## 🐛 Troubleshooting

### PDF Not Loading
- Verify PDF is in `public/` folder
- Check filename matches exactly
- Try opening in new tab
- Use Chrome/Edge for best support

### Audio Not Working
- Text-to-speech is browser-dependent
- Works best in Chrome/Edge
- Check browser console for errors
- Some browsers don't support it

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check `globals.css` imports correctly
- Verify no conflicting CSS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Course material from Distributed Systems Course Module
- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

Project Link: [https://github.com/YOUR_USERNAME/distributed-systems-app](https://github.com/YOUR_USERNAME/distributed-systems-app)

## 🎯 Study Tips

1. **Use Audio While Commuting** - Perfect for passive learning
2. **Test Before Revealing** - Try exercises before showing answers
3. **Focus on Key Points** - Most important for exams
4. **Read PDF Material** - Detailed explanations in course module
5. **Mark Progress** - Track completed units for motivation
6. **Review Regularly** - Spaced repetition improves retention

## 🚀 Recent Updates

### Version 1.1.0 (Latest)
- ✅ **Search Functionality** - Find content across all units
- ✅ **Unit Navigation** - Previous/Next buttons for sequential learning
- ✅ **React-PDF Integration** - Page-by-page PDF navigation with zoom
- ✅ **Modular Architecture** - Refactored into clean, reusable components
- ✅ **Custom Hooks** - Extracted speech functionality to custom hook
- ✅ **Improved Performance** - Optimized component rendering

## 🔮 Future Enhancements

- [ ] Include flashcards for quick review
- [ ] Add quiz mode with scoring
- [ ] Enable note-taking feature
- [ ] Add bookmarks for important sections
- [ ] Include practice exam questions
- [ ] Add dark mode support
- [ ] Enable offline access with PWA
- [ ] Add keyboard shortcuts
- [ ] Export progress data
- [ ] Multi-language support

---

**Built with ❤️ for students studying Distributed Systems**

Happy Studying! 📚✨