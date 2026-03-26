declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV?: string
        PORT : string
        MONGO_URI:string
        JWT_SECRET?:string
        AWS_REGION:string
        AWS_ACCESS_KEY_ID:string
        AWS_SECRET_ACCESS_KEY:string
        S3_BUCKET_NAME:string
    }
  }