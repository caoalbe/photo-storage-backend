import { MediaService } from "../service/media.js";

// SERVICES
const mediaService = new MediaService();

export class MediaManager {
    async createMedia(req, res) {
        try {
            const id = await mediaService.createMedia(req.body);
            res.status(201).json(id);
        } catch (err) {
            console.log(err);
        }
    }

    async fetchMedia(req, res) {
        try {
            const filenames = await mediaService.fetchMedia(req.body);
            res.status(201).json(filenames)
        } catch (err) {
            console.log(err)
        }
    }
}