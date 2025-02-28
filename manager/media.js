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
        // Add entry to <media> table
        const fileName = await mediaService.createMedia(req.body)

        // Add tags to <tag> table
        // (only add tags that don't already exist)
        const createdTagCount = await tagService.createTag(req.body)

        // Add many-to-many connection(s) to <media_tag_assignment>
        const assignmentCount = await tagService.assignTag(req.body)

        return {
            "filename": fileName,
            "createdTagCount": createdTagCount,
            "assignmentCount": assignmentCount
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