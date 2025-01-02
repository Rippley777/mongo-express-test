const filterKeys = [
  "type",
  "brand",
  "model_identifier",
  "model_number",
  "hardware_details.memory",
  "hardware_details.memory_connector",
  "hardware_details.max_ram",
  "hardware_details.storage",
  "hardware_details.storage_connector",
  "hardware_details.max_storage",
  "hardware_details.processor",
  "hardware_details.processor_socket",
  "hardware_details.gpu_model",
  "hardware_details.gpu_connector",
  "hardware_details.screen_size",
  "hardware_details.resolution",
  "hardware_details.port_types",
  "hardware_details.wireless",
  "hardware_details.bluetooth_version",
  "repair_difficulty",
  "difficulty",
  "for_sale",
  "in_stock",
  "processor",
  "recalled",
  "storage_capacity",
  "type",
];

const rangeKeys = ["release_year", "repairability_score"];

// const sortKeys = {
const applyNormalFilters = (filters, query) => {
  filterKeys.forEach((key) => {
    if (query[key] !== undefined) {
      filters[key] = query[key];
    }
  });
};

const applyRangeFilters = (filters, query) => {
  console.log("rangeKeys", rangeKeys);
  console.log("query", query);
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
    } else if (query[key]) {
      filters[key] = Number(query[key]);
    }
  });
};

const applySorting = (query, sortOptions, validSortKeys) => {
  if (query.sort && validSortKeys[query.sort]) {
    return validSortKeys[query.sort];
  }
  return { updatedAt: -1 };
};

const applyPagination = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const pageSize = parseInt(query.pageSize, 10) || 10;

  const limit = pageSize;
  const skip = (page - 1) * pageSize;

  return { limit, skip };
};

module.exports = {
  applyNormalFilters,
  applyRangeFilters,
  applySorting,
  applyPagination,
  filterKeys,
  rangeKeys,
  // sortKeys,
};
