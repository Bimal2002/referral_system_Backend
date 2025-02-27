
# Referral System Backend

This project provides a backend API for a referral system where users can register, log in, refer others, and track referral statistics. The system supports **JWT authentication**, **referral tracking**, and **password reset functionality**.

---

## Base URL

The base URL for the API is:

```
https://referral-system-backend-bimal-gayalis-projects.vercel.app/
```

---

## Authentication

Authentication is handled via **JWT (JSON Web Tokens)**. After a successful login, a token will be issued that needs to be included in the `Authorization` header as `Bearer <token>` for accessing protected routes.

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
```

#### **Response:**

```json
{
  "message": "User registered",
  "referralCode": "string",  // Generated referral code for the new user
  "referredBy": "string"     // Referral code of the user who referred (if applicable)
}
```

#### **Example Request:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "user_bimal",
  "email": "user_bimal@example.com",
  "password": "password123",
  "referralCode": "admin_user_ref"
}
```

---

### **2. User Login**

**POST** `/auth/login`

Login the user and return a JWT token.

#### **Request Body:**

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

#### **Response:**

```json
{
  "token": "string"  // JWT token used for authentication
}
```

---

### **3. Forgot Password**

**POST** `/auth/forgot-password`

Initiate the password reset process by sending a reset token to the user's email.

#### **Request Body:**

```json
{
  "email": "string"
}
```

#### **Response:**

```json
{
  "message": "Use this token for password reset",
  "resetToken": "string"  // Reset token sent for password reset
}
```

---

### **4. Reset Password**

**POST** `/auth/reset-password`

Reset the user's password using a reset token.

#### **Request Body:**

```json
{
  "token": "string",
  "newPassword": "string"
}
```

#### **Response:**

```json
{
  "message": "Password reset successful"
}
```

---

### **5. Get User Referrals**

**GET** `/referrals`

Fetch the list of referrals for the logged-in user.

#### **Headers:**
- `Authorization`: `Bearer <JWT_Token>`

#### **Response:**

```json
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
```

---

### **6. Get Referral Statistics**

**GET** `/stats`

Fetch the referral statistics for the logged-in user.

#### **Headers:**
- `Authorization`: `Bearer <JWT_Token>`

#### **Response:**

```json
{
  "totalReferrals": "integer",
  "successfulReferrals": "integer"
}
```

---

### **7. Get All Users (Admin Only)**

**GET** `/users`

Fetch a list of all users in the system. This endpoint is only accessible to admin users.

#### **Headers:**
- `Authorization`: `Bearer <admin_JWT_Token>`

#### **Response:**

```json
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
```

---

### **8. Update Referral Status (Admin Only)**

**PATCH** `/referrals/:referralId/status`

Update the status of a referral (e.g., mark as successful). This endpoint is for admin use only.

#### **Request Body:**

```json
{
  "status": "string"  // "successful" or "pending"
}
```

#### **Headers:**
- `Authorization`: `Bearer <admin_JWT_Token>`

#### **Response:**

```json
{
  "message": "Referral status updated successfully"
}
```

---

## Error Responses

All error responses follow the general format:

```json
{
  "message": "Error message"
}
```

- **400 Bad Request**: If the request is malformed or missing required data.
- **401 Unauthorized**: If the JWT token is missing or invalid.
- **404 Not Found**: If the requested resource does not exist.
- **500 Internal Server Error**: If there is an error on the server.

---

## How to Use

1. Clone this repository:
   ```bash
   git clone https://github.com/Bimal2002/referral_system_Backend.git
   cd referral-system-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. The API locally will be accessible at `http://localhost:3000` 

---


## Contact

For any questions or issues, feel free to reach out to `bimalgayali@gmail`.
