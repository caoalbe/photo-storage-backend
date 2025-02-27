import { TagService } from "../service/tag.js";

// SERVICES
const tagService = new TagService();

export class TagManager {
    async createTag(req, res) {
        try {
            const tagsAdded = await tagService.createTag(req.body);
            await tagService.assignTag(req.body);
            // res.status(201).json(tagsAdded);
        } catch (err) {
            console.log(err);
        }
    }

    async getFileTags(req, res) {
        try {
            const fileTags = await tagService.getFileTags(req.query.filename)
            res.status(201).json(fileTags)
        } catch (err) {
            console.log(err);
        }
    }
}