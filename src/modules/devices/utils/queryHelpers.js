const applyNormalFilters = (filters, query, keys) => {
  keys.forEach((key) => {
    if (query[key] !== undefined) {
      filters[key] = query[key];
    }
  });
};

const applyRangeFilters = (filters, query, rangeKeys) => {
  rangeKeys.forEach((key) => {
    const minKey = `${key}_min`;
    const maxKey = `${key}_max`;
    if (query[minKey] || query[maxKey]) {
      filters[key] = {};
      if (query[minKey]) {
        filters[key].$gte = Number(query[minKey]);
      }
      if (query[maxKey]) {
        filters[key].$lte = Number(query[maxKey]);
      }
    }
  });
};

const applySorting = (query, sortOptions, validSortKeys) => {
  if (query.sort && validSortKeys[query.sort]) {
    return validSortKeys[query.sort];
  }
  return { updatedAt: -1 }; // Default sort: newest updated first
};
const applyPagination = (query) => {
  const page = parseInt(query.page, 10) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(query.pageSize, 10) || 10; // Default to 10 items per page

  const limit = pageSize; // Number of items to fetch
  const skip = (page - 1) * pageSize; // Number of items to skip

  return { limit, skip };
};

module.exports = {
  applyNormalFilters,
  applyRangeFilters,
  applySorting,
  applyPagination,
};
