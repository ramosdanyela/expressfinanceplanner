# Financial Transaction Management API

A REST API for managing personal financial transactions, built with Node.js, Express, and MongoDB. This API provides comprehensive functionality for user authentication, transaction management, categorization, and file uploads.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Transaction Management**: CRUD operations for financial transactions
- **Categorization System**: Hierarchical category and subcategory management
- **File Upload**: Cloudinary integration for profile image uploads
- **Security**: Password hashing, JWT tokens, and middleware protection
- **Database**: MongoDB with Mongoose ODM

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Development](#development)
- [Contributing](#contributing)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account (for image uploads)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd express2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   TOKEN_SIGN_SECRET=your-jwt-secret-key
   CLOUDINARY_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_SECRET=your-cloudinary-secret
   ```

4. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:4000`

## Environment Variables

| Variable             | Description               | Required |
| -------------------- | ------------------------- | -------- |
| `PORT`               | Server port number        | Yes      |
| `MONGODB_URI`        | MongoDB connection string | Yes      |
| `TOKEN_SIGN_SECRET`  | JWT signing secret        | Yes      |
| `CLOUDINARY_NAME`    | Cloudinary cloud name     | Yes      |
| `CLOUDINARY_API_KEY` | Cloudinary API key        | Yes      |
| `CLOUDINARY_SECRET`  | Cloudinary API secret     | Yes      |

## API Documentation

### Base URL

```
http://localhost:4000
```

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Management

#### Register User

```http
POST /user/sign-up
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "USER"
}
```

**Password Requirements:**

- Minimum 8 caracters
- At least 1 digit
- At least 1 lowercase letter
- At least 1 uppercase letter
- At least 1 special character ($\*&@#)

**Response:**

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "profileImage": "default-image-url"
}
```

#### Login User

```http
POST /user/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "profileImage": "default-image-url"
  },
  "token": "jwt-token"
}
```

#### Get User Profile

```http
GET /user/profile
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "profileImage": "image-url",
  "transactions": ["transaction-ids"]
}
```

#### Update User Profile

```http
PUT /user/editprofile
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

### Transaction Management

#### Create Transaction

```http
POST /transaction/create-transaction
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "bank": "nubank",
  "date": "2024-01-15T10:00.0Z",
  "value": 150.5,
  "description": "Grocery shopping",
  "location": "Supermarket",
  "year_mont_due": "2024-01",
  "notes_comments": "Weekly groceries",
  "transac_macrotype": "outcome",
  "transac_subtype": "debitcard",
  "category": "category-id",
  "subcategory": "subcategory-id"
}
```

**Bank Options:** `nubank`, `itau pf`, `itau pj`

**Transaction Macrotypes:** `income`, `outcome`, `transfer between accounts`, `onhold/investimentos`

**Transaction Subtypes:** `income transference/pix`, `cash receiving`, `credit card`, `debit card`, `outcome transference/Pix`, `boleto`, `account taxes`, `saque`, `credit card payment`, `transference between accounts`, `locked money`, `lended money`

#### Get All Transactions

```http
GET /transaction/all-transactions
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
[
  {
    "_id": "transaction-id",
    "bank": "nubank",
    "date": "2024-01-15T00:00:00.000Z",
    "value": 150.5,
    "description": "Grocery shopping",
    "category": {
      "_id": "category-id",
      "name": "Food"
    },
    "subcategory": {
      "_id": "subcategory-id",
      "name": "Groceries"
    }
  }
]
```

#### Get Single Transaction

```http
GET /transaction/:id
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

#### Update Transaction

```http
PUT /transaction/edit/:id
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:** Same as create transaction

#### Delete Transaction

```http
DELETE /transaction/delete/:id
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

### Category Management

#### Create Category

```http
POST /category/create-category
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "Food"
}
```

#### Get All Categories

```http
GET /category/all-categories
```

#### Get Single Category

```http
GET /category/:id
```

#### Update Category

```http
PUT /category/edit/:id
```

#### Delete Category

```http
DELETE /category/delete/:id
```

### Subcategory Management

#### Create Subcategory

```http
POST /subcategory/create-subcategory
```

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "Groceries"
}
```

#### Get All Subcategories

```http
GET /subcategory/all-subcategories
```

#### Get Single Subcategory

```http
GET /subcategory/:id
```

#### Update Subcategory

```http
PUT /subcategory/edit/:id
```

#### Delete Subcategory

```http
DELETE /subcategory/delete/:id
```

### File Upload

#### Upload Image

```http
POST /upload-image
```

**Headers:**

```
Content-Type: multipart/form-data
```

**Request Body:**

```
picture: [file]
```

**Supported Formats:** jpg, png, jpeg

**Response:**

```json
{
  "url": "cloudinary-image-url"
}
```

## Database Schema

### User Model

```javascript
{
  "email": String (required, unique, email format),
  "passwordHash": String (required),
  "role": String (enum: USER ADMIN],default: "USER),
  "transactions": [ObjectId] (ref:Transaction),
  "name": String (required),
  "profileImage": String (default: default-image-url)
}
```

### Transaction Model

```javascript
{
  "bank": String (enum: [nubank", itau pf", "itau pj"]),
  "date": Date (required),
  "value": Number (required),
  "description": String,
  "location": String,
  "year_mont_due": String,
  "notes_comments": String,
  "transac_macrotype": String (enum: [income", "outcome",transfer between accounts", "onhold/investimentos]),
  "transac_subtype": String (enum: various subtypes),
  "category": ObjectId (ref: Category),
  "subcategory": ObjectId (ref:Subcategory"),
  "userId": ObjectId (ref: User
```

### Category Model

```javascript
{
  "name": String(required);
}
```

### Subcategory Model

```javascript
{
  "name": String(required);
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Token Generation**: Tokens are generated upon successful login
2. **Token Validation**: Middleware validates tokens on protected routes3 **User Context**: Current user information is attached to request object
3. **Token Expiration**: Tokens expire after 12 hours

### Protected Routes

All routes except `/user/sign-up`, `/user/login`, and `/welcome` require authentication.

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Project Structure

```
├── config/           # Configuration files
│   ├── db.config.js      # Database connection
│   ├── jwt.config.js     # JWT configuration
│   └── cloudinary.config.js # Cloudinary setup
├── middlewares/      # Custom middleware
│   ├── isAuth.js         # JWT authentication
│   └── attachCurrentUser.js # User context
├── models/          # Database models
│   ├── user.models.js
│   ├── transaction.models.js
│   ├── category.models.js
│   └── subcategory.models.js
├── routes/          # API routes
│   ├── user.router.js
│   ├── transaction.router.js
│   ├── category.router.js
│   ├── subcategory.router.js
│   └── upload.router.js
├── index.js         # Main application file
└── package.json     # Dependencies and scripts
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented)

### Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT handling
- **express-jwt** - JWT middleware
- **cloudinary** - Image upload service
- **multer** - File upload middleware
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature`)
   4.Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Support

For support and questions, please contact ramos.danyela@gmail.com
