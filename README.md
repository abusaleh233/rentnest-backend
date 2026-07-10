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


# 👨‍💻 Admin Credentials

Email

```
tareqrahman@gamil.com
```

Password

```
123456
```
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

📦Authentication
--------------
#POST /api/users/register
#POST /api/auth/login
#GET  /api/users/me

📦Categories
--------------
#POST /api/categories
#GET  /api/categories

📦Properties
--------------
#POST   /api/properties
#GET    /api/properties
#GET    /api/properties/:id
#PUT    /api/properties/:id
#DELETE /api/properties/:id

📦Rentals
--------------
#POST /api/rentals
#GET  /api/rentals
#GET  /api/rentals/:id

📦Landlord
--------------
#GET   /api/landlord/requests
#PATCH /api/landlord/requests/:id

📦Payments
--------------
#POST /api/payments/create-intent
#POST /api/payments/confirm
#GET  /api/payments/history

📦Reviews
--------------
#POST /api/reviews
#GET  /api/reviews/property/:propertyId

📦Admin
--------------
#GET    /api/admin/users
#GET    /api/admin/properties
#GET    /api/admin/rentals
#DELETE /api/admin/users/:id
---



