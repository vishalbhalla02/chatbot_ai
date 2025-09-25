# 🤖 CHATBOT AI

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<div align="center">
  <p><em>An intelligent chatbot interface similar to OpenAI's frontend, built with modern web technologies</em></p>
</div>

---

## 📋 Table of Contents

- [🔍 Overview](#-overview)
- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [⚡ Installation](#-installation)
  - [🏃‍♂️ Usage](#-usage)
- [🤝 Contributing](#-contributing)

---

## 🔍 Overview

**CHATBOT AI** is a modern, responsive chatbot interface that mimics the user experience of OpenAI's frontend. Built with Next.js and React, it provides a seamless chat experience with persistent conversation history and intelligent responses powered by free LLM APIs.

---

## ✨ Features

🗨️ **Chat History Management** - Remember and access previous conversations  
💾 **Data Storage** - Persistent storage using Prisma ORM  
➕ **New Chat Generation** - Create fresh conversations instantly  
🗑️ **Chat Deletion** - Remove unwanted conversation threads  
🆓 **Free API Integration** - Powered by free LLM APIs  
📱 **Responsive Design** - Works seamlessly across all devices  
⚡ **Real-time Responses** - Fast and efficient chat experience

---

## 📁 Project Structure

```
chatbot_ai/
├── 📄 README.md
├── 📁 app/
│   ├── 🔌 api/                 # API routes and endpoints
│   ├── 🖼️ favicon.ico          # Site favicon
│   ├── 🎨 globals.css          # Global styles
│   ├── 📋 layout.js            # Root layout component
│   ├── 🔧 leftSide.jsx         # Left sidebar component
│   ├── 🏠 page.jsx             # Main page component
│   └── 🔧 rightSide.jsx        # Right sidebar component
├── ⚙️ eslint.config.mjs        # ESLint configuration
├── 📋 jsconfig.json            # JavaScript configuration
├── 📁 lib/
│   └── 🔗 prisma.js            # Prisma client setup
├── ⚙️ next.config.mjs          # Next.js configuration
├── 📦 package-lock.json        # Dependency lock file
├── 📦 package.json             # Project dependencies
├── 🎨 postcss.config.mjs       # PostCSS configuration
├── 📁 prisma/
│   ├── 🔄 migrations/          # Database migrations
│   └── 📊 schema.prisma        # Database schema
└── 📁 utils/
    └── 📁 component/           # Utility components
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure your development environment has the following:

- **Node.js** `v18.0.0` or higher
- **npm** `v8.0.0` or higher
- **Database** PostgreSQL(if you need other databse chenged in prismsa/schema.prisma)

### ⚡ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vishalbhalla02/chatbot_ai.git
   ```

2. **Navigate to project directory**

   ```bash
   cd chatbot_ai
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file and add your database URL
   echo "DATABASE_URL=your_database_connection_string" > .env
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Set up database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### 🏃‍♂️ Usage

#### Development Mode

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application in development mode.

#### Production Build

```bash
npm run build
npm start
```

#### Database Management

```bash
# View database
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/vishalbhalla02">Vishal Bhalla</a></p>
  <p>⭐ Star this project if you found it helpful!</p>
</div>
