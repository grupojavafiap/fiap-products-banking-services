import { Injectable } from "@nestjs/common";

Injectable()
export class PaginateService 
{

    /**
     * 
     * @param pageSize 
     * @param totalRecords 
     * @returns 
     */
    public createMeta(pageSize: number, totalRecords: number) : IResponseMeta
    {
        let totalPages = 0;
        
        if(totalRecords && pageSize)
        {   
            totalPages = Math.ceil(totalRecords / pageSize)
        }

        return {
            totalRecords: totalRecords || 0,
            totalPages: totalPages,
            requestDateTime: new Date().toISOString()
        };
    }
    

    /**
     * 
     * @param url 
     * @param page 
     * @param pageSize 
     * @param totalRecords 
     * @returns 
     */
    public createLink(url: string, page: number, pageSize: number, totalRecords: number) : IResponseLink
    {
        const hasPage = (page > 1);
        const hasNextPage = (Math.ceil(totalRecords/pageSize) > page);
        const separatorParam = url.includes("?") ? "&" : "?";
        
        return {
            self: `${url}${separatorParam}page=${page}`,
            ...(hasPage) && {first:  `${url}${separatorParam}page=1`},
            ...(hasPage) && {prev:  `${url}${separatorParam}page=${(page - 1)}`},
            ...(hasNextPage) && {next: `${url}${separatorParam}page=${Number(page)+1}`},
            ...(hasNextPage) && {last: `${url}${separatorParam}page=${Math.ceil(totalRecords/pageSize)}`}
        }

    }

    /**
     * 
     * @param path 
     * @param items 
     * @param page 
     * @param pageSize 
     * @param totalRecords 
     * @returns 
     */
    public async createResponse(path:string, items:Array<any>, page: number, pageSize: number, totalRecords: number) : Promise<IResponse>
    {
        const url = `${process.env.API_HOST}${path}`;

        return {
            data: items,
            links: this.createLink(url, page, pageSize, totalRecords),
            meta: this.createMeta(pageSize, totalRecords)
        }
    }

    
}

export interface IResponseMeta {
    totalRecords: number,
    totalPages: number,
    requestDateTime: string
}

export interface IResponseLink {
    self: string,
    first: string,
    prev: string
    next: string
    last: string
}

export interface IResponse
{
    data:any,
    links: IResponseLink, 
    meta: IResponseMeta
}