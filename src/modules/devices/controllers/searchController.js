const Device = require("../models/Device");
const { filterKeys, rangeKeys } = require("../utils/queryHelpers");

const getYears = async () => {
  return Device.distinct("release_year");
};

const getBrands = async () => {
  return Device.distinct("brand");
};

const getRepairabilityScores = async () => {
  return Device.distinct("repairability_score");
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
  getSearchFilters,
};
