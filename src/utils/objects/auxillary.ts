import type { ChatPost} from "@/models/Activity";

export class ChatPostObject implements ChatPost {
    id: number;
    content: string;
    createdAt: Date;
    username: string;
    displayName: string;
    userImage: string;

    constructor() {        
        this.id = -1
        this.content = ''
        this.createdAt = new Date(0)
        this.username = ''
        this.displayName = ''
        this.userImage = ''
    }
}