import express from 'express'
import { generateUploadURL } from './s3.js'
import { MediaManager } from './manager/media.js'
import { TagManager } from './manager/tag.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

// MANAGERS
const mediaManager = new MediaManager();
const tagManager = new TagManager();

// ROUTES
// Creates upload URL to S3
app.get('/s3Url', async (req, res) => {
    await generateUploadURL(req, res)
})

// Upload media metadata
app.post('/media', async (req, res) => {
    await mediaManager.createMedia(req, res);
    await tagManager.createTag(req, res);
})

// Fetch s3 urls for media
app.post('/fetchmedia', async (req, res) => {
    await mediaManager.fetchMedia(req, res);
})

// Fetch tags of file
app.get('/fileTags', async (req, res) => {
    await tagManager.getFileTags(req, res)
})

// Add tags to an existing media
app.post('/tagMedia', async (req, res) => {
    await tagManager.createTag(req, res)
})

app.get('/', (req, res) => {res.send('hello world!'); console.log('root pinged')})

app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
