import dotenv from 'dotenv'
import { db } from "../database/dynamoDbClient.js"
import { QueryCommand } from "@aws-sdk/client-dynamodb"

dotenv.config()

export class MediaService {
    async fetchMedia(tagData) {
        try {
            const { tags } = tagData;
            if (tags.length === 0) { return []; }

            let output = await this.mediaByTag(tags[0])
            for (let t = 1; t < tags.length; t++) {
                const subset = await this.mediaByTag(tags[t])
                output = output.filter(filename => subset.includes(filename))
            }

            return output
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async mediaByTag(tag) {
        try {
            const params = {
                TableName: process.env.AWS_DYNAMO_DB_TABLE,
                IndexName: "tag-filename-index",
                KeyConditionExpression: "tag = :tag",
                ExpressionAttributeValues: {
                  ":tag": { S: tag },
                },
              };
            
              const data = await db.send(new QueryCommand(params));
              return data.Items.map((item) => item.filename.S);
        } catch (error) {
            throw new Error(error.message)
        }
    }


}