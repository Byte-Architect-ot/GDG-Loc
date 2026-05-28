# 🚀 GDG Website — Local Development Setup Guide

This guide walks you through running the GDG Website (Server + Admin Panel + Client Website) on your local machine.

## 📋 Prerequisites

| Tool | Minimum Version | Check Command |
|---|---|---|
| **Node.js** | v18+ | `node -v` |
| **npm** | v9+ | `npm -v` |
| **Docker** _(optional)_ | v20+ | `docker -v` |
| **Docker Compose** _(optional)_ | v2+ | `docker compose version` |

---

## 🏗️ Project Architecture

```
GDG_Website/
├── Server/           → Express + TypeScript + Mongoose (port 3000)
├── Client_admin/     → Vite + React admin panel (port 5173)
├── Client_main/      → Vite + React + shadcn/ui client site (port 8080)
├── runadmin.sh       → Script to run Server + Client_admin
├── runclient.sh      → Script to run Server + Client_main
└── docker-compose.local.yml → Local MongoDB with replica set
```

---

## ⚡ Quick Start (Recommended)

### Step 1: Start Local MongoDB

MongoDB is required. The server uses transactions, which require a **replica set**.

```bash
# Start MongoDB container with replica set
docker compose -f docker-compose.local.yml up -d

# Verify it's running
docker ps | grep gdg_local_mongo
```

### Step 2: Run the Admin Interface

```bash
chmod +x runadmin.sh
./runadmin.sh
```

This will:
- Create `.env` files if they don't exist (from `.env.example`)
- Install npm dependencies if missing
- Build the TypeScript server
- Start the **Express server** on `http://localhost:3000`
- Start **Client_admin** on `http://localhost:5173`

### Step 3: Run the Client Interface (instead of Step 2)

```bash
chmod +x runclient.sh
./runclient.sh
```

This starts the **Server** + **Client_main** on `http://localhost:8080`.

> ⚠️ **Note**: Both scripts start the same server. Run only **one at a time** unless you change the server port.

### Step 4: Verify

```bash
# Health check
curl http://localhost:3000/health
# Expected: "Hello world server is healthy"

# Create test admin account
curl -X POST http://localhost:3000/admin/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gdg.local", "password": "admin123"}'
```

---

## 🐳 Method A — Docker for MongoDB Only

This is the **recommended approach** for local development.

```bash
# 1. Start MongoDB
docker compose -f docker-compose.local.yml up -d

# 2. Run admin or client
./runadmin.sh    # OR ./runclient.sh

# 3. To stop MongoDB
docker compose -f docker-compose.local.yml down

# 4. To stop MongoDB AND delete data
docker compose -f docker-compose.local.yml down -v
```

---

## 🖥️ Method B — No Docker (Local MongoDB)

If you have MongoDB installed natively:

### 1. Start MongoDB with Replica Set

```bash
# Create data directory
mkdir -p ~/data/gdg_mongo

# Start mongod with replica set
mongod --dbpath ~/data/gdg_mongo --replSet rs0 --port 27017

# In another terminal, initialize the replica set
mongosh --eval 'rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] })'
```

### 2. Update Server `.env`

Ensure `MONGO_URI` points to your local MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/gdg_db?replicaSet=rs0
```

### 3. Run the Application

```bash
./runadmin.sh    # OR ./runclient.sh
```

---

## 🐋 Method C — Full Docker Compose

Use the existing `docker-compose.yml` to run everything in containers:

```bash
# Build and run all services
docker compose up --build

# Access via Nginx at http://localhost:80
```

> **Note**: This uses Nginx as a reverse proxy. The individual service ports may not be directly accessible.

---

## 🔧 Manual Setup (Step-by-Step)

If you prefer to run everything manually without the bash scripts:

```bash
# 1. Install dependencies
cd Server && npm install && cd ..
cd Client_admin && npm install && cd ..
cd Client_main && npm install && cd ..

# 2. Create .env files
cp Server/.env.example Server/.env
cp Client_admin/.env.example Client_admin/.env
cp Client_main/.env.example Client_main/.env

# 3. Build the server
cd Server && npm run build && cd ..

# 4. Start the server (terminal 1)
cd Server && npm run start

# 5. Start admin client (terminal 2)
cd Client_admin && npm run dev

# 6. Start main client (terminal 3, optional)
cd Client_main && npm run dev
```

---

## 🌍 Environment Variables Reference

### Server (`Server/.env`)

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `local` | Set to `local` for local dev (uses filesystem instead of S3) |
| `PORT` | `3000` | Server port |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/gdg_db?replicaSet=rs0` | MongoDB connection string |
| `JWT_SECRET` | `local_dev_jwt_secret_key_2024` | JWT signing secret |
| `AWS_REGION` | — | AWS region (ignored when `NODE_ENV=local`) |
| `AWS_ACCESS_KEY_ID` | — | AWS access key (ignored when `NODE_ENV=local`) |
| `AWS_SECRET_ACCESS_KEY` | — | AWS secret key (ignored when `NODE_ENV=local`) |
| `S3_BUCKET_NAME` | — | S3 bucket name (ignored when `NODE_ENV=local`) |

### Client_admin (`Client_admin/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3000` | Server API URL |
| `VITE_APP_NAME` | `GDG_Admin` | Application name |
| `VITE_PUBLIC_S3_URL` | `http://localhost:3000/uploads` | Image base URL |

### Client_main (`Client_main/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3000` | Server API URL |
| `VITE_PUBLIC_S3_URL` | `http://localhost:3000/uploads` | Image base URL |

---

## 🔄 How Local Storage Fallback Works

When `NODE_ENV=local`:

1. **Image uploads** are saved to `Server/uploads/images/` on disk (instead of AWS S3)
2. **Image URLs** are served via `http://localhost:3000/uploads/images/...`
3. **Image deletions** remove files from local disk (instead of S3)
4. **The original S3 code is completely preserved** — switch to production by setting `NODE_ENV=production` and providing valid AWS credentials

---

## 🐛 Troubleshooting

### MongoDB connection refused
```
Error connecting to MongoDB: MongoServerError
```
**Fix**: Ensure MongoDB is running with replica set:
```bash
docker compose -f docker-compose.local.yml up -d
# Wait ~10 seconds for replica set initialization
```

### Transaction errors
```
MongoServerError: Transaction numbers are only allowed on a replica set
```
**Fix**: MongoDB must be running as a replica set. Use the provided `docker-compose.local.yml` or start `mongod` with `--replSet rs0`.

### Port already in use
```bash
# Find and kill the process using the port
lsof -ti:3000 | xargs kill -9    # Server
lsof -ti:5173 | xargs kill -9    # Client_admin
lsof -ti:8080 | xargs kill -9    # Client_main
```

### TypeScript build errors
```bash
cd Server && npx tsc --noEmit    # Check for errors without building
```

### Node modules issues
```bash
# Clean reinstall
rm -rf Server/node_modules Client_admin/node_modules Client_main/node_modules
rm -f Server/package-lock.json Client_admin/package-lock.json Client_main/package-lock.json
# Then run the script again — it will reinstall
./runadmin.sh
```

---

## 📖 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | | Health check |
| `POST` | `/admin/signup` | | Create admin account |
| `POST` | `/admin/login` | | Login, returns JWT |
| `POST` | `/admin/addyear` | | Add year group |
| `POST` | `/admin/addevent` | | Add event |
| `POST` | `/admin/addmembers` | | Add members (bulk) |
| `GET` | `/public/years` | | List all years |
| `GET` | `/public/events/:yearId` | | Events by year |
| `GET` | `/public/members/:yearId` | | Members by year |
