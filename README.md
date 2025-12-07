# Boring Campus Management System

A modern, responsive web application for managing Boring Campus's daily operations, student records, attendance, and communication.

## 🚀 Features

- **User Authentication** - Secure login for admin and student roles
- **Dashboard** - Overview of key metrics and quick actions
- **Student Management** - Add, view, and manage student records
- **Attendance Tracking** - Mark and monitor student attendance
- **Announcements** - Post and view important notices
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with dark mode support

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 19, TypeScript, Tailwind CSS
- **Styling**: CSS Modules, PostCSS, Autoprefixer
- **State Management**: React Context API
- **Database**: SQLite with better-sqlite3
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form
- **Icons**: React Icons
- **Linting & Formatting**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/boring-campus.git
   cd boring-campus
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Update the `.env.local` file with your configuration.

4. Initialize the database:
   ```bash
   npm run db:init
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
/boring-campus
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
├── pages/           # Application pages and API routes
│   ├── api/         # API routes
│   ├── admin/       # Admin dashboard and management pages
│   └── student/     # Student portal pages
├── public/          # Static files
├── styles/          # Global styles and CSS modules
└── types/           # TypeScript type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://reactjs.org/)

---

<div align="center">
  Made with ❤️ for Boring Campus
</div>

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
