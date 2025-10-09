# Contributing to Digital Sarpanch

Thank you for your interest in contributing to Digital Sarpanch! We welcome contributions from the community to help improve this AI-driven rural governance platform.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## 📜 Code of Conduct

This project adheres to a Code of Conduct adapted from the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/digital-sarpanch.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add your message"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## 🔄 Development Workflow

### Branch Naming Convention
- `feature/feature-name` for new features
- `bugfix/issue-name` for bug fixes
- `hotfix/urgent-fix` for urgent production fixes
- `docs/documentation-update` for documentation changes

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
type(scope): description

body (optional)

footer (optional)
```

Types include: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Example
```
feat(chatbot): add multilingual support for voice interactions

Implement real-time translation between English and regional languages
using Google Generative AI for seamless citizen communication.

Closes #123
```

## 💻 Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint rules defined in `.eslintrc`
- Use Prettier for code formatting
- Write JSDoc comments for functions and classes

### React/Next.js
- Use functional components with hooks
- Follow React best practices
- Use TypeScript interfaces for props
- Implement proper error handling

### CSS/Tailwind
- Use Tailwind CSS utility classes
- Follow the existing design system
- Maintain responsive design principles
- Use consistent spacing and typography

### Accessibility
- Ensure WCAG 2.1 AA compliance
- Use semantic HTML
- Implement proper ARIA attributes
- Test with screen readers

## 📥 Pull Request Process

1. Ensure your code follows the coding standards
2. Write clear, descriptive commit messages
3. Include tests for new functionality
4. Update documentation as needed
5. Ensure all tests pass
6. Submit a Pull Request with a clear title and description
7. Link any related issues
8. Request review from maintainers

### Pull Request Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Description of testing performed

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] New and existing tests pass locally
```

## 🐛 Reporting Issues

### Before Submitting an Issue
1. Check existing issues to avoid duplicates
2. Ensure you're using the latest version
3. Try to reproduce the issue

### Issue Template
```markdown
## Description
Clear and concise description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
Description of what you expected to happen

## Actual Behavior
Description of what actually happened

## Screenshots
If applicable, add screenshots to help explain

## Environment
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 22]

## Additional Context
Add any other context about the problem
```

## 🌐 Community

### Communication Channels
- GitHub Issues for bug reports and feature requests
- Discussions for general questions and community interaction

### Recognition
Contributors will be recognized in:
- README.md contributors list
- Release notes
- Social media acknowledgments

## 📚 Additional Resources

- [Project Documentation](README.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [API Documentation](API_DOCUMENTATION.md)

Thank you for contributing to Digital Sarpanch!