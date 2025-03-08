from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import uvicorn
from hashlib import sha256  # Use hashing for password security

# FastAPI app instance
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Chathumal@12",
        database="Project1"
    )

# Request model for login
class LoginRequest(BaseModel):
    username: str
    password: str

# Request model for registration
class SignupRequest(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

# Endpoint for login
# Endpoint for login
@app.post("/login")
async def login(request: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch user from DB
    cursor.execute("SELECT username, password FROM users WHERE username = %s", (request.username,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    # Hash the entered password and compare it with the stored hash
    hashed_input_password = sha256(request.password.encode()).hexdigest()

    if not user or user["password"] != hashed_input_password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "redirect_url": "/dashboard"}


# Endpoint for signup
@app.post("/signup")
async def signup(request: SignupRequest):
    # Check if passwords match
    if request.password != request.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Hash password before saving
    hashed_password = sha256(request.password.encode()).hexdigest()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Check if username already exists
    cursor.execute("SELECT username FROM users WHERE username = %s", (request.username,))
    existing_user = cursor.fetchone()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Insert new user into database
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (%s, %s)",
        (request.username, hashed_password)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User registered successfully"}
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
