# 🎯 Sorting Algorithm Visualizer

A beautiful, interactive web application for visualizing sorting algorithms with real-time performance metrics and educational complexity information.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://your-vercel-url.vercel.app)
![Sorting Visualizer](https://img.shields.io/badge/Status-Complete-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Latest-orange)
![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

## ✨ Features

### 🔄 **Sorting Algorithms**
- **Bubble Sort** - Simple but inefficient comparison-based sorting
- **Insertion Sort** - Efficient for small datasets
- **Selection Sort** - Simple in-place sorting algorithm
- **Merge Sort** - Stable, divide-and-conquer algorithm
- **Quick Sort** - Fast average-case performance with divide-and-conquer

### 📊 **Real-time Analytics**
- **Live comparison counter** - tracks element comparisons
- **Swap counter** - monitors array element swaps
- **Execution time** - real-time performance timing
- **Visual progress** - color-coded bar states during sorting

### 🎨 **Modern UI/UX**
- **Light & Dark mode** - toggle between themes with persistent storage
- **Smooth animations** - 60fps transitions and effects
- **Responsive design** - works on desktop, tablet, and mobile
- **Interactive controls** - intuitive sliders and buttons

### 📚 **Educational Features**
- **Algorithm complexity** - Big O notation for time and space complexity
- **Performance comparison** - visual understanding of algorithm efficiency
- **Handwritten implementations** - authentic algorithm code for learning
- **Real-time statistics** - connect theory with practice

## 🚀 Quick Start

### Option 1: Live Demo (Recommended)
🌐 **[Try it online now!](https://your-vercel-url.vercel.app](https://visualizer-coral.vercel.app/))** - No setup required!

### Option 2: Direct Browser
1. Download all files to a folder
2. Double-click `index.html` to open in your browser
3. Start visualizing!

### Option 3: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎮 How to Use

### Basic Controls
1. **Select Algorithm** - Choose from dropdown menu
2. **Adjust Array Size** - Use size slider (5-200 elements)
3. **Control Speed** - Adjust animation speed (1-100%)
4. **Generate Array** - Create new random array
5. **Shuffle** - Randomize current array
6. **Start** - Begin sorting animation
7. **Stop** - Interrupt current sorting

### Visual Indicators
- 🔵 **Blue bars** - Normal elements
- 🔴 **Red bars** - Elements being compared
- 🟡 **Yellow bars** - Elements being swapped/moved
- 🟢 **Green bars** - Elements in final sorted position

### Theme Toggle
- Click the sun/moon icon in the header
- Your preference is automatically saved
- Smooth transitions between light and dark themes

## 📁 Project Structure

```
Sorting Visualizer/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── main.js             # Core functionality and algorithms
├── README.md           # This documentation
└── vercel.json         # Vercel deployment configuration (optional)
```

## 🚀 Deployment

### Vercel Deployment (Current)
This project is deployed on **Vercel** for easy access and sharing:

1. **Automatic deployments** from Git repository
2. **Global CDN** for fast loading worldwide
3. **Custom domain** support (optional)
4. **HTTPS enabled** by default

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow the prompts for configuration
```

### Alternative Deployment Options
- **Netlify** - Drag & drop deployment
- **GitHub Pages** - Free hosting for public repos
- **Firebase Hosting** - Google's hosting platform
- **AWS S3** - Static website hosting

## 🔧 Technical Details

### Algorithms Implemented
All sorting algorithms are **handwritten implementations** following these principles:
- Clean, readable code structure
- Proper comparison and swap tracking
- Educational clarity over optimization
- Real-time visualization integration

### Performance Tracking
- **Comparisons**: Every element comparison is counted
- **Swaps**: Array element swaps are tracked
- **Time**: Execution time measured in milliseconds
- **Complexity**: Theoretical Big O notation displayed

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎓 Educational Value

### Learning Objectives
- **Algorithm Understanding** - See how sorting algorithms work step-by-step
- **Complexity Analysis** - Compare theoretical vs. actual performance
- **Visual Learning** - Connect abstract concepts with visual representations
- **Performance Awareness** - Understand why some algorithms are better

### Algorithm Complexity Reference

| Algorithm | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

## 🎨 Customization

### Adding New Algorithms
1. Implement the algorithm in `main.js`
2. Add to the dropdown in `index.html`
3. Update complexity data
4. Follow the existing pattern for consistency

### Styling Modifications
- CSS variables in `:root` for easy theme customization
- Modular component styling
- Responsive design patterns
- Theme-aware color schemes

## 🤝 Contributing

This project was created as a DSA assignment. Feel free to:
- Report bugs or issues
- Suggest new features
- Improve algorithm implementations
- Enhance the UI/UX

## 📝 Assignment Context

**Course**: Data Structures and Algorithms  
**Assignment**: Sorting Algorithm Visualizer  
**Due Date**: October 15th  
**Requirements**: 
- ✅ Handwritten sorting algorithms (no AI-generated code)
- ✅ Visual representation of sorting process
- ✅ Multiple sorting algorithms implemented
- ✅ Interactive user interface

## 🏆 Features Completed

- [x] Bubble Sort implementation
- [x] Insertion Sort implementation  
- [x] Selection Sort implementation
- [x] Merge Sort implementation
- [x] Quick Sort implementation
- [x] Real-time visualization
- [x] Performance counters
- [x] Light/Dark theme toggle
- [x] Responsive design
- [x] Algorithm complexity display
- [x] Smooth animations
- [x] Modern UI/UX

## 📄 License

This project is created for educational purposes. Feel free to use and modify for learning.

## 🔗 Links

- 🌐 **Live Demo**: [Visit the deployed application]([https://your-vercel-url.vercel.app](https://visualizer-coral.vercel.app/))
- 📚 **Repository**: [View source code]([https://github.com/yourusername/sorting-visualizer](https://github.com/sivsagar/Visualizer))
- 🎯 **Assignment**: DSA Sorting Algorithm Visualizer

---

**Happy Sorting! 🎯**

*"The best way to understand algorithms is to see them in action."*

---

**Deployed with ❤️ on Vercel**
