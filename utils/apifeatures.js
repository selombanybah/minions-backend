class APIFeatures {
  constructor(query, filter) {
    this.query = query;
    this.queryStr = filter;
    console.log("filter", filter);
  }

  search(search) {
    console.log({ search });
    const keyword = search
      ? {
          name: {
            $regex: search,
            // $options: "i ",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  pagination(pageData) {
    console.log({ pageData });
    const currentPage = Number(pageData.currentPage) || 1;
    const skip = pageData.resPerPage * (currentPage - 1);

    this.query = this.query.limit(pageData.resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
