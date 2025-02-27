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

Response:
{
  "message": "User registered",
  "referralCode": "string",  // Generated referral code for the new user
  "referredBy": "string"     // Referral code of the user who referred (if applicable)
}

Example Request:
POST /api/auth/register
Content-Type: application/json

{
  "username": "user_bimal",
  "email": "user_bimal@example.com",
  "password": "password123",
  "referralCode": "admin_user_ref"
}


2.User Login
POST /auth/login
Request Body:
{
  "email": "string",
  "username": "string",
  "password": "string"
}
Response:
{
  "token": "string"  // JWT token used for authentication
}

3. Forgot Password
POST /auth/forgot-password
Request Body:
{
  "email": "string"
}
Response:
{
  "message": "Use this token for password reset",
  "resetToken": "string"  // Reset token sent for password reset
}

4. Reset Password
POST /auth/reset-password
Request Body:
{
  "token": "string",
  "newPassword": "string"
}
Response:
{
  "message": "Password reset successful"
}

5. Get User Referrals
GET /referrals
Headers:
Authorization: Bearer <JWT_Token>
Response:
{
  "referrals": [
    {
      "_id": "string",
      "referredUserId": {
        "username": "string",
        "email": "string",
        "referralCode": "string"
      },
      "status": "string",
      "dateReferred": "ISODate"
    }
  ]
}

6. Get Referral Statistics
GET /stats

  Fetch the referral statistics for the logged-in user.

Headers:
 Authorization: Bearer <JWT_Token>
Response:
{
  "totalReferrals": "integer",
  "successfulReferrals": "integer"
}


7. Get All Users (Admin Only)
GET /users

Fetch a list of all users in the system. This endpoint is only accessible to admin users.

Headers:
Authorization: Bearer <admin_JWT_Token>
Response:
{
  "users": [
    {
      "_id": "string",
      "username": "string",
      "email": "string",
      "createdAt": "ISODate",
      "referralCode": "string",
      "referredBy": "string"
    }
  ]
}


