## 📖 Project Overview

RentNest is a rental property management platform where:

* **Tenants** can browse rental properties, submit rental requests, make payments, and leave reviews.
* **Landlords** can create and manage property listings, approve or reject rental requests, and manage property availability.
* **Admins** can manage users, properties, rental requests, and property categories.

This project is developed as a backend-only REST API.

---

# 🚀 Live API

```
https://your-live-api-url.com
```

---

# 📂 Backend Repository

```
https://github.com/abusaleh233/rentnest-backend.git
```

---

# 📄 API Documentation

Postman Collection 

```
https://drive.google.com/file/d/1FSvcmAQ10cjEELDJ3xpq008tkWhJx2DI/view?usp=sharing
```



---

# 🛠️ Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Bcrypt
* Stripe Payment Gateway
* Zod Validation

---

# ✨ Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Role Based Authorization

---

## Tenant Features

* Browse Properties
* Filter Properties
* View Property Details
* Submit Rental Requests
* View Rental Request History
* Stripe Payment
* Payment History
* Leave Reviews
* Manage Profile

---

## Landlord Features

* Create Property
* Update Property
* Delete Property
* Manage Availability
* View Rental Requests
* Approve Requests
* Reject Requests

---

## Admin Features

* View All Users
* Ban / Unban Users
* View All Properties
* View All Rental Requests
* Manage Categories

---

# 📦 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

---

## Properties

```
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id
```

---

## Categories

```
GET    /api/categories
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

---

## Rental Requests

```
POST   /api/rentals
GET    /api/rentals
GET    /api/rentals/:id
PATCH  /api/rentals/:id
```

---

## Payments

```
POST   /api/payments/create-intent
POST   /api/payments/confirm
GET    /api/payments/history
```

---

## Reviews

```
POST   /api/reviews
GET    /api/reviews
```

---

## Admin

```
GET    /api/admin/users
PATCH  /api/admin/users/:id
GET    /api/admin/properties
GET    /api/admin/rentals
```

---

# 🔐 User Roles

### Tenant

* Browse Properties
* Submit Rental Requests
* Make Payments
* Leave Reviews

### Landlord

* Manage Properties
* Approve Rental Requests
* Reject Rental Requests

### Admin

* Manage Users
* Manage Categories
* View All Listings
* View All Rental Requests

---

# 💳 Payment Gateway

Stripe Payment Integration

* Create Payment Intent
* Confirm Payment
* Payment History
* Payment Status Tracking

---

# 📁 Project Structure

```
src
│
├── app
│
├── config
│
├── errors
│
├── interfaces
│
├── lib
│
├── middlewares
│
├── modules
│   ├── auth
│   ├── user
│   ├── property
│   ├── category
│   ├── rental
│   ├── payment
│   ├── review
│   └── admin
│
├── routes
│
├── utils
│
├── app.ts
└── server.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/rentnest-backend.git
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=

PORT=5000

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES_IN=1d

JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=
```

Run Development Server

```bash
npm run dev
```

Build Project

```bash
npm run build
```

Start Production

```bash
npm start
```

---

# 🗄️ Database

Prisma ORM with PostgreSQL

```bash
npx prisma generate

npx prisma migrate dev

npx prisma studio
```

---

# 👨‍💻 Admin Credentials

Email

```
admin@rentnest.com
```

Password

```
admin123
```

---

# 👤 Author

Saleh Ahmad

GitHub

```
https://github.com/your-github-username
```

---

# 📜 License

This project is developed for educational purposes as part of the Programming Hero Backend Assignment.
