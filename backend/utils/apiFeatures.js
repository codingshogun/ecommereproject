class ApiFeatures {
  constructor(dbQuery, urlQuery) {
    this.dbQuery = dbQuery;
    this.urlQuery = urlQuery;
  }
  search() {
    const search = this.urlQuery.search
      ? {
          name: {
            $regex: this.urlQuery.search,
            $options: "i",
          },
        }
      : {};
    this.dbQuery = this.dbQuery.find(search);
    return this;
  }
  filter() {
    let urlQueryCopy = { ...this.urlQuery };
    ["search", "page", "limit"].forEach((item) => {
      return delete urlQueryCopy[item];
    });
    urlQueryCopy = JSON.stringify(urlQueryCopy);
    urlQueryCopy = urlQueryCopy.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (item) => `$${item}`
    );
    this.dbQuery = this.dbQuery.find(JSON.parse(urlQueryCopy));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.urlQuery.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.dbQuery.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
