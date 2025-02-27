# Referral System Backend

This project provides a backend API for a referral system where users can register, log in, refer others, and track referral statistics. The system supports JWT authentication, referral tracking, and password reset functionality.

## Base URL

The base URL for the API is:   https://referral-system-backend-bimal-gayalis-projects.vercel.app/



---

## Authentication

Authentication is handled via JWT (JSON Web Tokens). After a successful login, a token will be issued that needs to be included in the `Authorization` header as `Bearer <token>` for accessing protected routes.

---

## API Endpoints

### **1. User Registration**

**POST** `/auth/register`

Register a new user. Users can optionally provide a referral code to be referred by an existing user.

#### **Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "referralCode": "string" (optional)
}


