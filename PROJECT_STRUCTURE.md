# Project Structure

This document explains the organization of the Digital Sarpanch codebase.

## Root Directory

```
digital-sarpanch/
├── app/                    # Next.js app router - main pages and layouts
├── components/             # Reusable UI components
├── lib/                    # Utility functions and services
├── public/                 # Static assets (images, icons, etc.)
├── styles/                 # Global styles and theme files
├── hooks/                  # Custom React hooks
├── tests/                  # Test files (when implemented)
├── docs/                   # Documentation files
├── .git/                   # Git version control files
├── node_modules/           # Dependencies (not committed)
├── .next/                  # Next.js build output (not committed)
└── out/                    # Static export output (not committed)
```

## App Directory Structure

```
app/
├── api/                    # API routes
│   ├── mistral/           # Mistral AI integration
│   ├── translate/         # Translation services
│   └── ...                # Other API endpoints
├── agents/                # Specialized AI agent dashboards
│   ├── farm/
│   ├── water/
│   ├── power/
│   ├── welfare/
│   ├── education/
│   ├── market/
│   └── coordinator/
├── citizen/                # Citizen-facing interfaces
├── officer/                # Panchayat officer dashboards
├── demo/                   # Demo and testing pages
├── cost-breakdown/         # Financial analysis pages
├── ivr-test/              # IVR system testing
├── translation-demo/       # Translation workflow demo
├── api-test/              # API testing pages
├── chatbot-test/          # Chatbot testing pages
├── test/                   # General test pages
└── ...                    # Other pages
```

## Components Directory

```
components/
├── ui/                     # Reusable UI components from shadcn/ui
├── voice-console.tsx       # Voice interaction component
├── chatbot.tsx             # AI chatbot component
├── agent-header.tsx        # Header for agent dashboards
├── agent-navigation.tsx    # Navigation for agents
├── i18n-provider.tsx       # Internationalization provider
├── theme-provider.tsx      # Theme management
├── accessibility-suite.tsx # Accessibility controls
├── ...                     # Other components
```

## Lib Directory

```
lib/
├── ai-service.ts           # AI service abstraction
├── utils.ts                # General utility functions
└── ...                     # Other utility libraries
```

## Key Files

### Configuration Files
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `components.json` - Component library configuration

### Documentation Files
- `README.md` - Project overview and setup instructions
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community guidelines
- `LICENSE` - License information
- `CHANGELOG.md` - Version history
- `SECURITY.md` - Security policies
- `PROJECT_STRUCTURE.md` - This file

### Environment Files
- `.env.example` - Example environment variables
- `.gitignore` - Files and directories to ignore in Git

## Development Guidelines

### Component Organization
1. Each component should be in its own file
2. Use TypeScript for type safety
3. Follow the existing naming conventions
4. Export components as default exports

### Page Organization
1. Pages should be organized by feature or domain
2. Use the Next.js app router structure
3. Implement proper error handling
4. Follow accessibility guidelines

### API Routes
1. API routes should be organized by functionality
2. Use proper HTTP status codes
3. Implement error handling and logging
4. Validate input data

### Styling
1. Use Tailwind CSS utility classes
2. Follow the existing design system
3. Maintain responsive design principles
4. Use consistent spacing and typography

### Testing
1. Write unit tests for utility functions
2. Implement integration tests for API routes
3. Use end-to-end testing for critical user flows
4. Maintain test coverage above 80%