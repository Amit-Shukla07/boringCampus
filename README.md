# Boring Campus Management System

> **Note:** The `.db` file is directly pushed to git for demo purposes to ensure the application works immediately upon deployment. In a real production environment, database files isre not be committed to version control.

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


