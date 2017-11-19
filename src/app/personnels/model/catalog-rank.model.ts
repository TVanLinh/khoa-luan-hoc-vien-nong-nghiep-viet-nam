export  interface  CatalogRankModel {
  name: String,
  group: {
    name: String,
    listRank: [String],
    level: [
      {
        name: String,
        salary: number
      }]
  }
}
