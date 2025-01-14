# API Documentation

## Endpoints

### 1. Register User

**Endpoint:** `/register`  
**Method:** `POST`  
**Description:** Registers a new user.

**Required Data:**
- `fullname.firstname` (string, min 3 characters)
- `fullname.lastname` (string, optional, min 3 characters)
- `email` (string, valid email, min 11 characters)
- `password` (string, min 5 characters)

**Request:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Responses:**
- **201 Created:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Validation errors",
    "errors": [ ... ]
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal Server Error",
    "error": "error_message"
  }
  ```

### 2. Login User

**Endpoint:** `/login`  
**Method:** `POST`  
**Description:** Logs in an existing user.

**Required Data:**
- `email` (string, valid email, min 11 characters)
- `password` (string, min 5 characters)

**Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Responses:**
- **200 OK:**
  ```json
  {
    "message": "User login successfully",
    "user": {
      "id": "user_id",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Validation errors",
    "errors": [ ... ]
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal Server Error",
    "error": "error_message"
  }
  ```

### 3. Get User Profile

**Endpoint:** `/profile`  
**Method:** `GET`  
**Description:** Retrieves the profile of the logged-in user.

**Required Headers:**
- `Authorization: Bearer jwt_token`

**Responses:**
- **200 OK:**
  ```json
  {
    "data": {
      "id": "user_id",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "message": "You are not authorized"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal server error",
    "error": "error_message"
  }
  ```

### 4. Logout User

**Endpoint:** `/logout`  
**Method:** `POST`  
**Description:** Logs out the logged-in user.

**Required Headers:**
- `Authorization: Bearer jwt_token`

**Responses:**
- **200 OK:**
  ```json
  {
    "message": "User logout successfully"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "message": "You are not authorized"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal server error",
    "error": "error_message"
  }
  ```

### 5. Register Captain

**Endpoint:** `/captin/register`  
**Method:** `POST`  
**Description:** Registers a new captain.

**Required Data:**
- `fullname.firstname` (string, min 3 characters)
- `fullname.lastname` (string, optional, min 3 characters)
- `email` (string, valid email, min 11 characters)
- `password` (string, min 5 characters)
- `location.coordinates.latitude` (number, between -90 and 90)
- `location.coordinates.longitude` (number, between -180 and 180)
- `vehicle.color` (string, min 3 characters)
- `vehicle.type` (string, one of 'car', 'motorcycle', 'auto')
- `vehicle.vehicle_no` (string, min 3 characters)
- `vehicle.capacity` (integer, greater than 0)
- `isAvailable` (boolean)

**Request:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "location": {
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  },
  "vehicle": {
    "color": "red",
    "type": "car",
    "vehicle_no": "ABC123",
    "capacity": 4
  },
  "isAvailable": true
}
```

**Responses:**
- **201 Created:**
  ```json
  {
    "message": "Captin created successfully",
    "data": {
      "id": "captin_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "location": {
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.0060
        }
      },
      "vehicle": {
        "color": "red",
        "type": "car",
        "vehicle_no": "ABC123",
        "capacity": 4
      },
      "isAvailable": true
    }
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Validation errors",
    "errors": [ ... ]
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal Server Error",
    "error": "error_message"
  }
  ```

### 6. Login Captain

**Endpoint:** `/captin/login`  
**Method:** `POST`  
**Description:** Logs in an existing captain.

**Required Data:**
- `email` (string, valid email, min 11 characters)
- `password` (string, min 5 characters)

**Request:**
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

**Responses:**
- **200 OK:**
  ```json
  {
    "message": "Captin logged in successfully",
    "data": {
      "id": "captin_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Validation errors",
    "errors": [ ... ]
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal Server Error",
    "error": "error_message"
  }
  ```

### 7. Get Captain Profile

**Endpoint:** `/captin/profile`  
**Method:** `POST`  
**Description:** Retrieves the profile of the logged-in captain.

**Required Headers:**
- `Authorization: Bearer jwt_token`

**Responses:**
- **200 OK:**
  ```json
  {
    "message": "Profile Details",
    "data": {
      "id": "captin_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "location": {
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.0060
        }
      },
      "vehicle": {
        "color": "red",
        "type": "car",
        "vehicle_no": "ABC123",
        "capacity": 4
      },
      "isAvailable": true
    }
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Unauthorised Access"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal server error",
    "error": "error_message"
  }
  ```

### 8. Logout Captain

**Endpoint:** `/captin/logout`  
**Method:** `POST`  
**Description:** Logs out the logged-in captain.

**Required Headers:**
- `Authorization: Bearer jwt_token`

**Responses:**
- **200 OK:**
  ```json
  {
    "message": "Captin logged out successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Unauthorised access"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Internal server error",
    "error": "error_message"
  }
  ```