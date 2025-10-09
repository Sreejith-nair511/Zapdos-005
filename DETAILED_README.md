# Digital Sarpanch - AI-Driven Rural Governance Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)

Digital Sarpanch is an innovative AI-powered platform designed to revolutionize rural governance in India. This Progressive Web App (PWA) provides citizens with easy access to government services, information, and assistance through voice interaction, chat, and intelligent automation.

## 🌟 Key Features

### 🗣️ Voice-Activated Citizen Services
- **Multilingual Voice Recognition**: Supports English and regional languages (Hindi, Kannada, Tamil, Malayalam)
- **Speech-to-Text & Text-to-Speech**: Seamless voice interaction
- **AI-Powered Response System**: Intelligent responses to citizen queries
- **Translation Services**: Real-time translation between languages

### 🤖 Intelligent AI Agents
- **Specialized Domain Agents**: Farm, Water, Power, Welfare, Education, Market, and Coordinator agents
- **Rule-Based Decision Making**: Transparent AI decision processes
- **Multi-Agent Coordination**: Complex problem-solving through agent collaboration
- **Explainable AI**: Clear explanations of AI decisions and actions

### 📊 Real-Time Monitoring & Analytics
- **Live Data Feeds**: Real-time updates on various sectors
- **Interactive Dashboards**: Visual representation of rural development metrics
- **Predictive Analytics**: AI-driven forecasting for better planning
- **Performance Tracking**: Monitor service delivery and impact

### 📱 Accessible Design
- **Progressive Web App**: Works on any device with a web browser
- **Offline Capabilities**: Core functionality available without internet
- **Accessibility Features**: High contrast, screen reader support, keyboard navigation
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🎨 Customizable Appearance
- **Multiple Color Themes**: Default, Vibrant, Ocean, Sunset, and Indian Tricolor themes
- **Light/Dark Mode**: System-aware theme switching
- **Animation Controls**: Enable/disable UI animations
- **Accessibility Options**: Font size adjustments, high contrast mode

## 🚀 Technology Stack

- **Frontend**: Next.js 15.2.4, TypeScript, Tailwind CSS, Framer Motion
- **AI Services**: Mistral AI, Google Generative AI
- **Voice Processing**: Web Speech API
- **State Management**: React Hooks
- **UI Components**: Custom component library with shadcn/ui
- **Deployment**: Vercel

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.x or later
- pnpm package manager
- Git

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sreejith-nair511/Zapdos-005.git
   cd digital-sarpanch
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Mistral AI API Key
   MISTRAL_API_KEY=your_mistral_api_key
   
   # Google Generative AI API Key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Build for production**:
   ```bash
   pnpm build
   ```

6. **Start production server**:
   ```bash
   pnpm start
   ```

## 📁 Project Structure

```
digital-sarpanch/
├── app/                    # Next.js app router pages
│   ├── agents/            # Specialized AI agent dashboards
│   ├── api/               # API routes
│   ├── citizen/           # Citizen-facing interfaces
│   ├── officer/           # Panchayat officer dashboards
│   └── ...
├── components/             # Reusable UI components
├── lib/                   # Utility functions and services
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🌐 API Endpoints

### AI Services

#### Mistral AI API
- **Endpoint**: `/api/mistral`
- **Method**: POST
- **Description**: Processes natural language queries using Mistral AI
- **Request Body**:
  ```json
  {
    "prompt": "User query or instruction"
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI-generated response",
    "confidence": 95,
    "agent": "Digital Sarpanch AI",
    "explanation": {
      "input": "User query",
      "agent": "Agent name",
      "ruleEngine": "Rule engine version",
      "confidence": 95,
      "decision": "AI decision",
      "humanVerification": "Verification details"
    }
  }
  ```

#### Google Generative AI API
- **Endpoint**: `/api/gemini`
- **Method**: POST
- **Description**: Processes natural language queries using Google Gemini
- **Request Body**:
  ```json
  {
    "prompt": "User query or instruction"
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI-generated response",
    "confidence": 90,
    "agent": "Digital Sarpanch AI"
  }
  ```

### Translation Services

#### Translation API
- **Endpoint**: `/api/translate`
- **Method**: POST
- **Description**: Translates text between supported languages
- **Request Body**:
  ```json
  {
    "text": "Text to translate",
    "sourceLang": "Source language code (en, hi, kn, ta, ml)",
    "targetLang": "Target language code (en, hi, kn, ta, ml)"
  }
  ```
- **Response**:
  ```json
  {
    "translatedText": "Translated text",
    "sourceLang": "Source language code",
    "targetLang": "Target language code"
  }
  ```

### Analytics & Metrics

#### Analytics API
- **Endpoint**: `/api/analytics/dashboard`
- **Method**: GET
- **Description**: Retrieves dashboard analytics data
- **Response**:
  ```json
  {
    "totalCitizens": 12500,
    "activeUsers": 3420,
    "resolvedIssues": 876,
    "pendingIssues": 124,
    "serviceUptime": 99.8,
    "recentActivity": [...]
  }
  ```

#### Metrics API
- **Endpoint**: `/api/metrics/system`
- **Method**: GET
- **Description**: Retrieves system performance metrics
- **Response**:
  ```json
  {
    "cpuUsage": 45.2,
    "memoryUsage": 67.8,
    "diskUsage": 34.1,
    "networkLatency": 120,
    "activeConnections": 156
  }
  ```

### Community & Sentiment

#### Community Feedback API
- **Endpoint**: `/api/community/feedback`
- **Method**: GET
- **Description**: Retrieves community feedback and sentiment data
- **Response**:
  ```json
  {
    "totalFeedback": 1240,
    "positiveSentiment": 78.5,
    "neutralSentiment": 15.2,
    "negativeSentiment": 6.3,
    "recentFeedback": [...]
  }
  ```

#### Sentiment Analysis API
- **Endpoint**: `/api/sentiment/analyze`
- **Method**: POST
- **Description**: Analyzes sentiment of provided text
- **Request Body**:
  ```json
  {
    "text": "Text to analyze for sentiment"
  }
  ```
- **Response**:
  ```json
  {
    "sentiment": "positive|neutral|negative",
    "confidence": 92.5
  }
  ```

### Alerts & Notifications

#### Alerts API
- **Endpoint**: `/api/alerts/system`
- **Method**: GET
- **Description**: Retrieves system alerts and notifications
- **Response**:
  ```json
  {
    "activeAlerts": 3,
    "criticalAlerts": 1,
    "warningAlerts": 2,
    "infoAlerts": 0,
    "alerts": [...]
  }
  ```

### Schemes & Welfare

#### Welfare Schemes API
- **Endpoint**: `/api/schemes/list`
- **Method**: GET
- **Description**: Retrieves list of available welfare schemes
- **Response**:
  ```json
  {
    "schemes": [
      {
        "id": "scheme1",
        "name": "Farmers' Subsidy Scheme",
        "description": "Financial assistance for farmers",
        "eligibility": "All registered farmers",
        "benefits": "Up to ₹50,000 per hectare",
        "applicationLink": "/schemes/farmers-subsidy"
      },
      ...
    ]
  }
  ```

### Technicians & Maintenance

#### Technicians API
- **Endpoint**: `/api/technicians/list`
- **Method**: GET
- **Description**: Retrieves list of available technicians
- **Response**:
  ```json
  {
    "technicians": [
      {
        "id": "tech1",
        "name": "Rajesh Kumar",
        "specialization": "Electrical",
        "availability": "Available",
        "rating": 4.8,
        "contact": "+91-9876543210"
      },
      ...
    ]
  }
  ```

## 🎨 UI Components

### Settings Components

The application includes a comprehensive settings system with the following components:

1. **Appearance Settings**
   - Theme selection (Light/Dark mode)
   - Color theme selection (Default, Vibrant, Ocean, Sunset, Indian Tricolor)
   - Animation controls

2. **Language Settings**
   - Language selection (English, Hindi, Kannada, Tamil, Malayalam)
   - Voice language preferences

3. **Notification Settings**
   - Alert preferences
   - Notification channels (SMS, Email, In-app)

4. **Accessibility Settings**
   - High contrast mode
   - Font size adjustments
   - Animation speed controls
   - Focus outline options

5. **Privacy Settings**
   - Data collection preferences
   - Location sharing settings
   - Analytics opt-out

6. **Profile Settings**
   - User profile management
   - Account preferences

### Specialized Components

1. **Chatbot Component**
   - Multilingual conversational interface
   - Voice input/output capabilities
   - Translation services

2. **Accessibility Suite**
   - Floating accessibility controls
   - Screen reader integration
   - Keyboard navigation enhancements

3. **Agent Control Console**
   - AI agent management
   - Performance monitoring
   - Decision explanation interface

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for mobile devices with:

- Touch-friendly interface elements
- Adaptive layouts for different screen sizes
- Mobile-specific navigation patterns
- Optimized performance on low-end devices

## 🔧 Customization Options

### Color Themes

The application supports multiple color themes that can be selected in the appearance settings:

1. **Default**: Standard application theme
2. **Vibrant**: Bright and energetic color scheme
3. **Ocean**: Calming blue and teal tones
4. **Sunset**: Warm orange and red hues
5. **Indian Tricolor**: Inspired by the Indian national flag with saffron, white, and green

### Accessibility Features

1. **High Contrast Mode**: Enhanced contrast for visually impaired users
2. **Font Scaling**: Adjustable text sizes (Small, Large, Extra Large)
3. **Animation Controls**: Options to disable or slow down animations
4. **Focus Indicators**: Customizable focus outlines for keyboard navigation
5. **Screen Reader Support**: Full compatibility with screen readers

## 🤝 Contributing

We welcome contributions to Digital Sarpanch! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built by Jugggad.exe team at Cambridge Institute of Technology
- Developed for Hackathon 2025
- Inspired by the vision of Digital India and inclusive governance

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

*Digital Sarpanch - Bridging the Digital Divide in Rural India*