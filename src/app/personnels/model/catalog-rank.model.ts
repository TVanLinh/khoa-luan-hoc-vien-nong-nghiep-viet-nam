export interface CatalogRankModel {
  name: string,
  group: [
    {
      name: string,
      listRank: [string],
      level: [
        {
          name: string,
          salary: number
        }]
    }
    ]
}
