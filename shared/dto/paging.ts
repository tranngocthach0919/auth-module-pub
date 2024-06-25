export class Paging {
  constructor(
    readonly page: number,
    readonly total: number,
    readonly limit: number,
    readonly cursor?: string,
    readonly nextCursor?: string
  ) {}
}
