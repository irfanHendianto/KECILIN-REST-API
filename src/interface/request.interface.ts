export interface QueryParams {
    page: number
    pageSize: number
    sortBy?: string
    sortDirection: 'asc' | 'desc'
    q?: string
    [key: string]: unknown
}