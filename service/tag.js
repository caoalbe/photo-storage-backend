import dotenv from 'dotenv'
import { db } from "../database/dynamoDbClient.js"
import { QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"

dotenv.config()

export class TagService {
    async assignTagBatch(tagData) {
        try {
            const { filename, tags } = tagData;

            for (let t = 0; t < tags.length; t++) {
                // insert <filename, tags[t]> into db
                const params = {
                    TableName: process.env.AWS_DYNAMO_DB_TABLE,
                    Item: {
                        filename: { S: filename },
                        tag: { S: tags[t] }
                    }
                }

                await db.send(new PutItemCommand(params)) // todo: is await necessary?
            }

            return filename


        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getFileTags(filename) {       
        try {
            const params = {
                TableName: process.env.AWS_DYNAMO_DB_TABLE,
                KeyConditionExpression: "filename = :filename",
                ExpressionAttributeValues: {
                    ":filename": { S: filename },
                  },
            }

            const data = await db.send(new QueryCommand(params));
            return data.Items.map((item) => item.tag.S);

        } catch (error) {
            throw new Error(error.message)
        }
    }
}