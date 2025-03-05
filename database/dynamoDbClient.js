import dotenv from 'dotenv'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()

export const db = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });