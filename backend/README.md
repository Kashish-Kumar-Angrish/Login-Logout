# Login and signup API

## Run locally

1. Make sure MongoDB is running.
2. Add these settings to `backend/.env` (keep that file private):

   ```env
   PORT=8080
   MONGO_URI=mongodb://127.0.0.1:27017/LoginLogout
   JWT_SECRET=your-own-long-random-secret
   FRONTEND_URL=http://localhost:5173
   ```

3. From the `backend` folder, run `npm start`.

The database and collection are created by MongoDB after the first successful signup.

## Endpoints

All request bodies use JSON. Passwords must be at least 8 characters.

### `POST /auth/signup`

```json
{
  "name": "Kashish",
  "email": "kashish@example.com",
  "password": "practice123"
}
```

Returns the new user (without their password) and a one-day JWT.

### `POST /auth/login`

```json
{
  "email": "kashish@example.com",
  "password": "practice123"
}
```

Returns the user and a one-day JWT. Save the token in the frontend and send it as
`Authorization: Bearer <token>` when calling protected endpoints.

### `GET /auth/me`

Requires the bearer token. Returns the signed-in user's profile.

### `POST /auth/logout`

Requires the bearer token. JWTs are stateless, so the frontend must remove its
saved token when logging out. A token remains usable until it expires.
