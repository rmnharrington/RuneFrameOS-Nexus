# 🤝 Contributing to RuneFrameOS

## 🎯 **Welcome Contributors!**

Thank you for your interest in contributing to RuneFrameOS! This document provides guidelines and standards to ensure smooth collaboration and maintain code quality across the ecosystem.

## 📋 **Before You Start**

### **What We're Building**
RuneFrameOS is a unified gaming ecosystem where multiple specialized applications integrate seamlessly through the Nexus dashboard. Each app maintains its unique visual identity while following consistent structural patterns.

### **Our Values**
- **Structural Consistency**: Unified layout, sizing, and behavior across all apps
- **Visual Diversity**: Each app defines its own unique color scheme and theme
- **Responsive Excellence**: Mobile-first design with progressive enhancement
- **Integration Seamlessness**: Smooth navigation between Nexus and modules

## 🚀 **How to Contribute**

### **1. Choose Your Contribution Type**
- 🐛 **Bug Fixes**: Fix issues and improve stability
- ✨ **Features**: Add new functionality to existing apps
- 🎨 **UI/UX**: Improve design and user experience
- 📚 **Documentation**: Update guides and technical docs
- 🧪 **Testing**: Add tests and improve test coverage
- 🔧 **Infrastructure**: Improve build, deployment, or development tools

### **2. Find Something to Work On**
- Check the `README.md` for current priorities
- Look for issues labeled "good first issue" or "help wanted"
- Review the project roadmap in the documentation
- Ask in the project discussions

## 🛠️ **Development Setup**

### **Prerequisites**
1. **Read `GETTING_STARTED.md`** - Get the ecosystem running locally
2. **Read `GUI_DESIGN_SPECIFICATION.md`** - Understand design standards
3. **Read `SERVER_SETUP_ARCHITECTURE.md`** - Learn the system architecture

### **Required Tools**
- Docker Desktop
- Git
- VS Code or Cursor
- Node.js 18+ (for local development)

## 📝 **Code Standards**

### **File Naming**
- **Components**: PascalCase (e.g., `TavernView.tsx`)
- **Files**: kebab-case (e.g., `module-subscription-modal.tsx`)
- **Directories**: PascalCase for app folders, kebab-case for others

### **Code Style**
- **TypeScript**: Use strict mode, proper typing
- **React**: Functional components with hooks
- **CSS**: Tailwind CSS classes, avoid custom CSS
- **Comments**: Explain complex logic, not obvious code

### **Component Structure**
```tsx
// Standard component structure
interface ComponentProps {
  // Props interface
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  
  return (
    // JSX with proper Tailwind classes
  )
}

// Sidebar component (if applicable)
ComponentName.Sidebar = function ComponentSidebar() {
  return (
    // Sidebar JSX
  )
}
```

## 🎨 **Design Standards (CRITICAL)**

### **Layout Requirements (MANDATORY)**
- **Left Sidebar**: Always `w-48 lg:w-56` (192px mobile, 224px desktop)
- **Right Sidebar**: Always `w-64` (256px)
- **Responsive Grids**: Use `md:grid-cols-2` pattern for medium screens
- **No Fixed Positioning**: Never use `fixed` for sidebars

### **Color and Theming**
- **Colors are flexible**: Each app defines its own theme
- **Structure is consistent**: Follow Nexus layout patterns
- **Use Tailwind utilities**: Avoid custom CSS unless absolutely necessary

### **Responsive Design**
```tsx
// Standard responsive pattern
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
  {/* Content */}
</div>
```

## 🔄 **Git Workflow**

### **Branch Naming**
```
feature/feature-name
bugfix/bug-description
docs/documentation-update
refactor/component-name
```

### **Commit Messages**
```
feat: add new tavern chat functionality
fix: resolve sidebar positioning issue
docs: update getting started guide
refactor: simplify module integration logic
style: update button hover effects
```

### **Pull Request Process**
1. **Create Feature Branch**: `git checkout -b feature/your-feature`
2. **Make Changes**: Follow code standards and design requirements
3. **Test Locally**: Ensure your changes work in the ecosystem
4. **Commit Changes**: Use clear, descriptive commit messages
5. **Push Branch**: `git push origin feature/your-feature`
6. **Create PR**: Include description of changes and testing notes
7. **Code Review**: Address feedback and make requested changes
8. **Merge**: After approval, merge to main branch

## 🧪 **Testing Requirements**

### **Before Submitting**
- ✅ **Local Testing**: Your changes work in the local ecosystem
- ✅ **Cross-App Testing**: Changes don't break other applications
- ✅ **Responsive Testing**: Works on mobile, tablet, and desktop
- ✅ **Integration Testing**: Module integration still functions

### **Testing Checklist**
- [ ] App starts without errors
- [ ] Left sidebar visible and functional
- [ ] Right sidebar hidden on mobile/tablet
- [ ] Responsive design works correctly
- [ ] Module integration functions
- [ ] No console errors in browser
- [ ] Performance is acceptable

## 📚 **Documentation Requirements**

### **Code Documentation**
- **Complex Functions**: Add JSDoc comments
- **Props Interfaces**: Document all props clearly
- **State Management**: Explain complex state logic
- **API Integration**: Document external service calls

### **Update Documentation**
When making changes, update relevant documentation:
- **New Features**: Update `README.md` and relevant guides
- **API Changes**: Update `API_DOCUMENTATION.md`
- **Design Changes**: Update `GUI_DESIGN_SPECIFICATION.md`
- **Architecture Changes**: Update `SERVER_SETUP_ARCHITECTURE.md`

## 🚫 **What Not to Do**

### **Design Violations**
- ❌ **Custom sidebar widths** outside of `w-48 lg:w-56` and `w-64`
- ❌ **Fixed positioning** for sidebars
- ❌ **Grid layouts without `md:grid-cols-2`** pattern
- ❌ **Left sidebar hidden** on any screen size
- ❌ **Right sidebar visible** on mobile/tablet

### **Code Violations**
- ❌ **Custom CSS** that could break consistency
- ❌ **Hardcoded pixel values** instead of Tailwind utilities
- ❌ **Non-responsive designs** that don't scale properly
- ❌ **Inconsistent spacing** that doesn't follow the system

## 🔍 **Code Review Process**

### **What We Look For**
1. **Design Compliance**: Follows all layout and responsive standards
2. **Code Quality**: Clean, readable, maintainable code
3. **Functionality**: Features work as intended
4. **Integration**: Doesn't break existing functionality
5. **Performance**: No significant performance regressions
6. **Documentation**: Code is properly documented

### **Review Checklist**
- [ ] Follows design standards
- [ ] Uses proper TypeScript types
- [ ] Implements responsive design correctly
- [ ] Maintains structural consistency
- [ ] Includes proper error handling
- [ ] Updates relevant documentation

## 🆘 **Getting Help**

### **Before Asking**
1. ✅ Read the documentation thoroughly
2. ✅ Check existing issues and discussions
3. ✅ Test your changes locally
4. ✅ Review the code standards

### **When Asking for Help**
- **Be specific**: Describe what you're trying to accomplish
- **Include context**: Share relevant code and error messages
- **Show effort**: Demonstrate what you've already tried
- **Be patient**: Community members help in their free time

## 🎉 **Recognition**

### **Contributor Benefits**
- **Learning**: Gain experience with modern web development
- **Portfolio**: Build impressive projects for your resume
- **Community**: Connect with other developers
- **Impact**: Help shape the future of gaming tools

### **Contributor Hall of Fame**
- **Bug Fixes**: Fix critical issues and improve stability
- **Features**: Add valuable functionality to the ecosystem
- **Documentation**: Help others understand and contribute
- **Design**: Improve user experience and visual appeal

## 📞 **Contact & Community**

### **Communication Channels**
- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Code Reviews**: Provide feedback on pull requests
- **Documentation**: Help improve guides and standards

### **Community Guidelines**
- **Be respectful**: Treat all contributors with kindness
- **Be helpful**: Share knowledge and assist others
- **Be patient**: Everyone learns at their own pace
- **Be constructive**: Provide helpful, actionable feedback

---

**Thank you for contributing to RuneFrameOS!** 🚀

Your contributions help build a better gaming ecosystem for everyone. Whether you're fixing a small bug or adding a major feature, every contribution matters.

---

**Last Updated**: Current Development Session  
**Status**: Complete contributing guidelines for developers  
**Next**: Read `DEVELOPMENT_SETUP.md` for detailed environment setup
