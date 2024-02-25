import type { ChatPost} from "@/models/Activity";
import type { QueryOptions } from "@/models/auxillary/interfaces";

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

export abstract class QueryParams implements QueryOptions{
    public readonly queryNames: ReadonlyArray<string>;
    protected queries:Map<string, string>
        
    constructor(queryNames: string[]) {
        this.queryNames = queryNames
        this.queries = new Map()
    }

    getQueryValue(queryName: string): string | null {
        return this.queries.get(queryName) ?? null
    }

    setQuery(queryName: string, value: string): void {
        if (!this.queryNames.includes(queryName)) {
            return
        }

        this.queries.set(queryName, value)
    }

    deleteQueryValue(queryName: string): void {
        this.queries.delete(queryName)
    }

    getAllQueries(): [string, string][] {
        let values: [string, string][] = []
        this.queries.forEach((val, key) => {
            values.push([key, val])
        })

        return values
    }

    getUrlQueryString(): string {
        let queryString = ''
        this.queries.forEach((val, key) => {
            queryString += `${key}=${val}&`
        })

        return queryString === '' ? '' : queryString.substring(0, queryString.length - 1)
    }
}