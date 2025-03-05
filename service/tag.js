// import { db } from "../database/db.js"
import dotenv from 'dotenv'
import { db } from "../database/dynamoDbClient.js"
import { QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"

dotenv.config()

export class TagService {

    /**
     * Assumes file and all tags exist in db already
     */
    async assignTag(tagData) {
        try {
            const { filename, tags } = tagData;
            
            // find id of file
            const { id: file_id } = await db('media').select('id').where("filename", filename).first();

            // find id of each tag
            const tag_ids = await db('tag').select('id').whereIn("name", tags);

            // insert a mapping bettween the file and each tag
            await db('media_tag_assignment').insert(tag_ids.map(({id}) => ({media_id: file_id, tag_id: id})))

            return tags
        } catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                throw new Error("Tag assignment already exists")
            } else {
                throw new Error(error.message)
            }
        }
    }

    async assignTagBatch(tagData) {
        try {
            const { filename, tags } = tagData;

            for (let t = 0; t < tags.length; t++) {
                // insert <filename, tags[t]> into db
                console.log(`INSERTING: <${filename}>, <${tags[t]}>`)
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
            console.log(error)
        }
    }

    /**
     * Retrieves all the tags associated with a single filename
     */
    async getFileTags(filename) {       
        try {
            console.log(`SELECTING: <${filename}>`)
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