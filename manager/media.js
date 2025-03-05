import { MediaService } from "../service/media.js";
import { TagService } from "../service/tag.js";

// SERVICES
const mediaService = new MediaService();
const tagService = new TagService();

export class MediaManager {
    /**
     * Route: /media
     * Return Example: { "filename": "newfile", "createdTagCount": 1, "assignmentCount": 2 }
     */
    async media(req, res) {
        const filename = await tagService.assignTagBatch(req.body)

        return {
            "filename": filename
        }
    }

    /**
     * Route: /fetchMedia
     * Return Example: ['file1', 'file2', 'file3']
     */
    async fetchMedia(req, res) {
        const filenames = await mediaService.fetchMedia(req.body);
        // return {filenames: filenames};
        return filenames
    }
}