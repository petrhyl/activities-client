import type { PagedRequest, QueryOptions } from "@/models/auxillary/interfaces";
import { QueryParams } from "./auxillary";

export class ActivityListQuery extends QueryParams implements QueryOptions, PagedRequest {
    public pageSize: number;
    public pageNumber: number;

    constructor() {
        super(['hostedBy', 'joinedBy', 'dateFrom', 'dateTo', 'pageNumber', 'pageSize'])
        this.queries = new Map()
        this.pageSize = 10
        this.pageNumber = 1
    }    
}