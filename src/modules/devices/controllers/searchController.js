const Device = require("../models/Device");
const {
  filterKeys,
  rangeKeys,
  applyNormalFilters,
  applyRangeFilters,
  applySorting,
  // applyPagination,
} = require("../utils/queryHelpers");

const getYears = async () => {
  return Device.distinct("release_year");
};

const getBrands = async () => {
  return Device.distinct("brand");
};

const getRepairabilityScores = async () => {
  return Device.distinct("repairability_score");
};

const searchDevices = async (req, res) => {
  try {
    const filters = {};
    const sortOptions = {};

    // Normal filters
    applyNormalFilters(filters, req.query, filterKeys);

    // Range filters
    applyRangeFilters(filters, req.query);

    // Sorting logic
    const validSortKeys = {
      last_updated_newest: { updatedAt: -1 },
      last_updated_oldest: { updatedAt: 1 },
      price_low_to_high: { "estimated_repair_cost.battery": 1 },
      price_high_to_low: { "estimated_repair_cost.battery": -1 },
      units_sold_most: { units_sold: -1 },
      units_sold_least: { units_sold: 1 },
      revenue_highest: { revenue: -1 },
      revenue_lowest: { revenue: 1 },
      repairability_high_to_low: { repairability_score: -1 },
      repairability_low_to_high: { repairability_score: 1 },
      year_newest_to_oldest: { release_year: -1 },
      year_oldest_to_newest: { release_year: 1 },
    };
    const sort = applySorting(req.query, sortOptions, validSortKeys);

    // Pagination logic
    // const { limit, skip } = applyPagination(req.query);
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Query the database with filters, sorting, and pagination
    const devices = await Device.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Total count of matching documents (without pagination)
    const total = await Device.countDocuments(filters);

    // Respond with devices and pagination metadata
    res.status(200).json({
      devices,
      total,
      page: Math.ceil(skip / limit) + 1,
      pages: Math.ceil(total / limit),
    });

    // res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSearchFilters = async (req, res) => {
  try {
    const brands = await getBrands();
    const years = await getYears();
    const repairabilityScores = await getRepairabilityScores();

    const filterValues = {};
    const filterPromises = filterKeys.map(async (key) => {
      filterValues[key] = await Device.distinct(key);
    });

    // Wait for all filter values to be fetched
    await Promise.all(filterPromises);

    console.log("orig", {
      filterValues: {
        brands,
        years,
        repairability_scores: repairabilityScores,
      },
    });
    await filterKeys.forEach(async (key) => {
      filterValues[key] = await Device.distinct(key);
    });
    console.log("new", filterValues);
    res.json({
      filterKeys: filterKeys,
      rangeKeys: rangeKeys,
      sortKeys: [
        "last_updated",
        "price",
        "units_sold",
        "revenue",
        "repairability",
        "year",
      ],
      filterValues,
      rangeValues: {},
      sortValues: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch available filters" });
  }
};

// const getSearchFiltersWithProperties = async (req, res) => {
//   const properties = {
//     years: "years",
//     brands: "brand",
//     repairability_scores: "repairability_score",
//   };

//   const filters = {};

//   for (const [key, field] of Object.entries(properties)) {
//     filters[key] = await Device.distinct(field);
//   }

//   return {
//     filters,
//     properties: Object.keys(properties),
//   };
// };

module.exports = {
  searchDevices,
  getSearchFilters,
};
