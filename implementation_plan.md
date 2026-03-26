# GDG Website — Local Development Setup

Set up the GDG Website project (Server + Client_admin + Client_main) to run locally via [./runadmin.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runadmin.sh) and [./runclient.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runclient.sh) with a local MongoDB fallback and local file storage for S3.

## Tech Stack

| Component | Stack |
|---|---|
| **Server** | Express 5, TypeScript, Mongoose 9, AWS S3, JWT |
| **Client_admin** | Vite 7, React 19, TailwindCSS v4, Axios |
| **Client_main** | Vite 7, React 18, TailwindCSS v3, shadcn/ui, TypeScript |

## User Review Required

> [!IMPORTANT]
> The server uses **MongoDB transactions** (`mongoose.startSession()`) in event, member, and year CRUD controllers. Transactions require a **MongoDB replica set**. The `docker-compose.local.yml` will start MongoDB as a single-node replica set to support this. If you prefer to skip Docker entirely, you'll need to run `mongod` with `--replSet rs0` and initialize it.

> [!WARNING]
> S3 image uploads will be replaced with **local filesystem storage** when `NODE_ENV=local`. Uploaded files will go to `Server/uploads/`. The original S3 code is fully preserved and used when `NODE_ENV` is not `local`.

---

## Proposed Changes

### Environment Files

#### [MODIFY] [.env.example](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/.env.example)
Add `NODE_ENV=local` and `JWT_SECRET` to the Server example env.

#### [NEW] [Server/.env](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/.env)
```env
NODE_ENV=local
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gdg_db?replicaSet=rs0
JWT_SECRET=local_dev_jwt_secret_key_2024
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket_name
```

#### [NEW] [Client_admin/.env](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Client_admin/.env)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=GDG_Admin
VITE_PUBLIC_S3_URL=http://localhost:3000/uploads
```

#### [NEW] [Client_main/.env](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Client_main/.env)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_PUBLIC_S3_URL=http://localhost:3000/uploads
```

---

### Server — Local DB & Storage Fallback

#### [MODIFY] [index.ts](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/index.ts)
- Add `NODE_ENV` conditional for DB URI: when `local`, default to `mongodb://127.0.0.1:27017/gdg_db?replicaSet=rs0`
- Add `express.static` serving of `uploads/` directory when `NODE_ENV=local` (so clients can fetch images at `/uploads/...`)

#### [MODIFY] [uploadtoS3.ts](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/controllers/uploadtoS3.ts)
- Add conditional: if `NODE_ENV === 'local'`, save files to `Server/uploads/images/` on disk and return the local key
- Keep **all existing S3 code intact** for production

#### [MODIFY] [s3client.ts](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/utils/s3client.ts)
- Guard S3Client initialization: only create the S3 client if `NODE_ENV !== 'local'` (export `null` otherwise)

#### [MODIFY] [thumbnailimageControllers.ts](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/controllers/thumbnailimageControllers.ts)
- In [deleteThumbnail](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/controllers/thumbnailimageControllers.ts#48-87): add local file deletion fallback when `NODE_ENV=local`

#### [MODIFY] [memberImages.ts](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/controllers/memberImages.ts)
- In [deleteMemberImage](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/controllers/memberImages.ts#50-88): add local file deletion fallback when `NODE_ENV=local`

#### [MODIFY] [env.d.ts](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/types/env.d.ts)
- Add `NODE_ENV` and `JWT_SECRET` to the [ProcessEnv](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/src/types/env.d.ts#2-11) interface

#### [MODIFY] [.env.example](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Server/.env.example)
- Add `NODE_ENV=local` entry

#### [MODIFY] [Client_admin/.env.example](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Client_admin/.env.example)
- Update `VITE_PUBLIC_S3_URL` to use local uploads URL

#### [MODIFY] [Client_main/.env.example](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/Client_main/.env.example)
- Update `VITE_PUBLIC_S3_URL` to use local uploads URL

---

### Docker Compose for Local MongoDB

#### [NEW] [docker-compose.local.yml](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/docker-compose.local.yml)
- Spin up a MongoDB 7 container as a single-node replica set on port 27017
- Persistent volume for data

---

### Run Scripts

#### [MODIFY] [runadmin.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runadmin.sh)
- Add `set -e` for safety
- Add Node.js / npm version check
- Create `Server/uploads/images/` directory if missing (for local file storage)

#### [MODIFY] [runclient.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runclient.sh)
- Same improvements as [runadmin.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runadmin.sh)

---

### Documentation

#### [NEW] [LOCAL_SETUP_GUIDE.md](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/LOCAL_SETUP_GUIDE.md)
Comprehensive guide covering:
1. **Method A**: Docker Compose (MongoDB container) + run scripts
2. **Method B**: No Docker — local `mongod --replSet rs0` + run scripts
3. **Method C**: Full Docker Compose for everything
4. Env var reference table, troubleshooting, and testing instructions

---

## Verification Plan

### Automated Tests
No existing tests in the project. We will verify by:

1. **TypeScript compilation**:
   ```bash
   cd Server && npm run build
   ```
   Expect: clean exit code 0, no errors

2. **Server health check**:
   ```bash
   curl http://localhost:3000/health
   ```
   Expect: `Hello world server is healthy`

### Manual Verification
1. Run `docker compose -f docker-compose.local.yml up -d` and confirm MongoDB starts
2. Run [./runadmin.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runadmin.sh) — confirm Server + Client_admin both start
3. Open `http://localhost:5173` in browser — confirm Client_admin loads
4. Run [./runclient.sh](file:///home/shreyashh/Project/gdg%20wce/GDG_Website/runclient.sh) — confirm Server + Client_main both start
5. Open `http://localhost:8080` in browser — confirm Client_main loads
6. Test admin signup/login via curl to `POST /admin/signup` and `POST /admin/login`
