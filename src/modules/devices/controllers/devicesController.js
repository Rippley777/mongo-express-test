const Device = require("../models/Device");
const {
  applyNormalFilters,
  applyRangeFilters,
  applySorting,
  applyPagination,
} = require("../utils/queryHelpers");

const searchDevices = async (req, res) => {
  try {
    const filters = {};
    const sortOptions = {};

    // Normal filters
    applyNormalFilters(filters, req.query, [
      "type",
      "brand",
      "model_identifier",
      "in_stock",
      "for_sale",
      "recalled",
      "difficulty",
    ]);

    // Range filters
    applyRangeFilters(filters, req.query, [
      "release_year",
      "repairability_score",
    ]);

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

// const searchDevices = async (req, res) => {
//   try {
//     const filters = {};

//     // Apply filters from query parameters
//     if (req.query.type) filters.type = req.query.type;
//     if (req.query.model)
//       filters.model = { $regex: req.query.model, $options: "i" };
//     if (req.query.release_year)
//       filters.release_year = Number(req.query.release_year);
//     if (req.query.model_identifier)
//       filters.model_identifier = req.query.model_identifier;
//     if (req.query.repairability_score)
//       filters.repairability_score = {
//         $gte: Number(req.query.repairability_score),
//       };

//     const devices = await Device.find(filters);
//     res.status(200).json(devices);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getDevices = async (req, res) => {
  try {
    const devices = await Device.find().select(
      "model release_year model_identifier model_number repairability_score"
    );
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSimpleDeviceData = async (req, res) => {
  try {
    const devices = await Device.find().select(
      "model_identifier release_year repairability_score"
    );
    //   .populate({
    //     path: "images",
    //     match: { type: "device_image" },
    //     select: "url description",
    //   });

    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeviceAnalytics = async (req, res) => {
  try {
    const analytics = await Device.aggregate([
      {
        $group: {
          _id: "$type",
          averageRepairability: { $avg: "$repairability_score" },
        },
      },
    ]);
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  searchDevices,
  getDevices,
  getSimpleDeviceData,
  getDeviceAnalytics,
};
