# Car-robots team's social-network project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and styled with [Tailwind CSS](https://tailwindcss.com/).

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Project Description

"OurProject" is a modern web application built with Next.js and styled using Tailwind CSS. The project is designed to showcase best practices in web development, including component-based architecture, responsive design, and efficient state management.

## Features

- **Next.js**: Utilizes the latest features of Next.js for efficient routing, SSR, and SSG.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Responsive Design**: Ensures the application looks great on all devices, from mobile to desktop.
- **Pages Routes**: Provides backend functionality through Next.js API routes.
- **Customizable Components**: Easily extend and customize components to fit your needs.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation

1. Clone the repository:
  ```sh
    git clone https://github.com/Mechanics-cloud/OurProject.git
  ```
2. Navigate to the project directory:
  ```sh
    cd OurProject
  ```
3. Install dependencies:
  ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
 ```
4. Run the script to create a file with local environment variables
  ```sh
    cp .env.example .env.local
 ```
5. Run the script to create a file with environment variables for deploying the application (running is necessary when deploying the application to hosting)
  ```sh
    cp .env.example .env.production
 ```

### Usage
1. Start the development server:
 ```sh
    npm run dev
    # or
    yarn dev
    # or
    pnpm run
 ```
2. Open http://localhost:3000 with your browser to see the result.

3. You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Folder Structure
```
/OurProject
├── public/                 # Static files (images, fonts, etc.)
├── src/
│   └── common/             
│       ├── components      # Reusable React components
│       ├── enums           # Common enums
│       ├── form            # Wrappers for form elements
│       ├── HOC             # High order components
│       ├── hooks           # Common hooks
│       ├── layout          # Layouts for projects
│       ├── utils           # Common utils
│   ├── pages/              # Next.js pages
│   ├── styles/             # Global styles and Tailwind CSS configuration
│   ├── features/           # Project's features realization
│   └── ...
├── .gitignore              # Files and directories to ignore in git
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── tailwind.config.js      # Tailwind CSS configuration
```

