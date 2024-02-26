import type { PagedRequest, QueryOptions } from "@/models/auxillary/interfaces";
import { QueryParams } from "./auxillary";

export class ActivityListQuery extends QueryParams implements QueryOptions, PagedRequest {
    public pageSize: number;
    public pageNumber: number;

    constructor(pageSize: number = 20, pageNumber: number = 1) {
        super(['hostedBy', 'joinedBy', 'dateFrom', 'dateTo', 'pageNumber', 'pageSize'],
            new Map([['pageNumber', `${pageNumber}`], ['pageSize', `${pageSize}`]]))
        this.pageSize = pageSize
        this.pageNumber = pageNumber
    }
}