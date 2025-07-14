# 🔗 QuickURL.io - URL Shortener

QuickURL.io is a full-stack URL shortener application built with **Next.js**, **Express.js**, and **MongoDB**. It allows users to shorten long URLs and track click analytics easily via a minimal, responsive, and dark-themed interface.

## 🌐 Live Preview

- [Live](https://quickurl-eta.vercel.app)

---

## 🧰 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [React Hot Toast](https://react-hot-toast.com/)

### Backend
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nanoid](https://github.com/ai/nanoid)

---

## 🚀 Deployment

### 📦 Backend (Express.js)

1. Navigate to the backend folder:
    ```bash
   cd backend
    ````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=4000
   CORS_ORIGIN=http://localhost:3000
   BASE_URL=http://localhost:4000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:4000`.

---

### 💻 Frontend (Next.js)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

4. Run the frontend:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`.

---

## 🧪 Testing

### 🧠 Backend Test (Jest + Supertest)

> Located at `backend/tests/shorten.test.js`

To run the test:

```bash
cd backend
npm install
npm test
```

✅ Tests the `/api/shorten` POST route to ensure it returns a unique short code.

---

### 💡 Frontend Test (Jest + Testing Library)

> Located at `frontend/tests/Home.test.jsx`

To run the test:

```bash
cd frontend
npm install
npm run test:frontend
```

✅ Tests that entering a valid URL and clicking "Shorten It!" triggers an API call.

---

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── tests/               # ✅ Backend tests (Jest)
│   └── index.js             # 🚀 Express entry
├── frontend/
│   ├── src/app/page.js      # 💻 Main Next.js page
│   ├── tests/               # ✅ Frontend tests
│   └── public/
```

---

## 📝 License

This project is open-source and free to use. Contributions are welcome!

---

### ✨ Created with ❤️ by Shrikant Kshatriya
