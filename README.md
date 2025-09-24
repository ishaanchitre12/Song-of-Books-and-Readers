# 📚 Song of Books and Readers
A full-stack web application built with the PERN stack (PostgreSQL, Express.js, React.js, Node.js) that allows users to securely manage, organize, and review their book notes in one place.
- 🚀 Features
- 🔐 User Authentication – Sign up and log in securely to keep notes private.
- 📝 CRUD Notes – Create, read, update, and delete book notes.
- 📖 Book-Based Organization – Group notes by book for structured review.
- 🔍 Search & Filter – Quickly find notes by keyword or book title.
- 🎨 Custom Theming – Styled with a Song of Ice and Fire inspired design for an engaging UI.

<img width="1440" height="778" alt="image" src="https://github.com/user-attachments/assets/354148d3-68f9-4e4c-93da-1f12ef615eef" />


🛠️ Tech Stack
- Frontend: React.js, CSS/Bootstrap (or styled-components if applicable)
- Backend: Node.js, Express.js
- Database: PostgreSQL (with schema for books & notes)
- ORM/Queries: (Prisma, Sequelize, or raw SQL depending on your implementation)
- Authentication: JWT / bcrypt

<img width="1440" height="778" alt="image" src="https://github.com/user-attachments/assets/ea45dac6-c50a-4c6a-a4a3-90e78fc59280" />

⚡ Getting Started
1. Clone the repo
```bash
git clone https://github.com/your-username/book-notes-organizer.git
cd book-notes-organizer
```
2. Install dependencies
```bash
npm install
```
3. Setup environment variables
```bash
DATABASE_URL=postgres://username:password@localhost:5432/booknotes
JWT_SECRET=your_jwt_secret
PORT=5000
```
4. Run the database
```bash
psql -U username -d booknotes -f db/schema.sql
```
5. Start the app
```bash
cd server
nodemon index.js
cd client
npm start
```
Your app will be running at http://localhost:3000.

<img width="1440" height="778" alt="image" src="https://github.com/user-attachments/assets/ccb5adfc-d150-44ec-9ac8-c0b3c6ed975f" />


