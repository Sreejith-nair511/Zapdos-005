# Digital Sarpanch - AI-Driven Rural Governance Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)

Digital Sarpanch is an innovative AI-powered platform designed to revolutionize rural governance in India. This Progressive Web App (PWA) provides citizens with easy access to government services, information, and assistance through voice interaction, chat, and intelligent automation.

## 🌟 Key Features

### 🗣️ Voice-Activated Citizen Services
- **Multilingual Voice Recognition**: Supports English and regional languages
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
   git clone https://github.com/your-username/digital-sarpanch.git
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