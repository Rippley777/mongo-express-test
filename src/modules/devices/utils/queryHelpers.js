const filterKeys = [
  "type",
  "brand",
  "model_identifier",
  "model_number",
  "release_date",
  "discontinued_date",
  "repairability_score",
  "hardware_details.memory.format",
  "hardware_details.memory.available_sizes",
  "hardware_details.memory.ecc",
  "hardware_details.memory.soldered",
  "hardware_details.memory.channels",
  "hardware_details.storage.type",
  "hardware_details.storage.connector",
  "hardware_details.storage.removable",
  "hardware_details.storage.raid_support",
  "hardware_details.processor.model",
  "hardware_details.processor.socket",
  "hardware_details.processor.architecture",
  "hardware_details.processor.cores",
  "hardware_details.processor.threads",
  "hardware_details.processor.cache",
  "hardware_details.processor.integrated_graphics",
  "hardware_details.processor.removable",
  "hardware_details.gpu.model",
  "hardware_details.gpu.type",
  "hardware_details.gpu.connector",
  "hardware_details.gpu.removable",
  "hardware_details.gpu.cooling_type",
  "hardware_details.gpu.supported_technologies",
  "hardware_details.screen.resolution",
  "hardware_details.screen.aspect_ratio",
  "hardware_details.screen.panel_type",
  "hardware_details.screen.touch_support",
  "hardware_details.screen.hdr_support",
  "hardware_details.port_types.type",
  "hardware_details.port_types.version",
  "hardware_details.port_types.quantity",
  "hardware_details.port_types.features",
  "hardware_details.wireless.wifi.standard",
  "hardware_details.wireless.wifi.frequency_bands",
  "hardware_details.wireless.wifi.mimo_support",
  "hardware_details.wireless.bluetooth.version",
  "hardware_details.wireless.bluetooth.low_energy",
  "hardware_details.wireless.cellular.supported",
  "hardware_details.wireless.cellular.technology",
  "hardware_details.wireless.nfc",
  "hardware_details.wireless.gps",
  "hardware_details.bluetooth.version",
  "hardware_details.bluetooth.profiles",
  "hardware_details.bluetooth.codecs",
  "hardware_details.bluetooth.range",
  "hardware_details.bluetooth.low_energy",
  "hardware_details.bluetooth.multipoint",
  "hardware_details.bluetooth.class",
  "optical.drive_type",
  "optical.dual_layer_support",
  "optical.removable",
  "repairability_insights.tools_required",
  "repairability_insights.battery.accessibility",
  "repairability_insights.battery.replacement_cost",
  "repairability_insights.battery.removable",
  "repairability_insights.ram_storage.accessibility",
  "repairability_insights.ram_storage.soldered",
  "repairability_insights.adhesive_level",
  "repairability_insights.cooling_system",
  "repair_difficulty",
  "disassembly_steps",
  "disassembly_tool_count",
  "known_issues",
  "replacement_part_availability",
  "estimated_repair_cost.battery",
  "estimated_repair_cost.screen",
  "estimated_repair_cost.keyboard",
  "repair_guide_availability",
  "community_score",
  "recyclability",
  "images",
  "version",
];
const rangeKeys = [
  "hardware_details.memory.max_ram",
  "hardware_details.memory.speed",
  "hardware_details.storage.capacity",
  "hardware_details.storage.max_capacity",
  "hardware_details.storage.speed",
  "hardware_details.processor.base_clock",
  "hardware_details.processor.boost_clock",
  "hardware_details.processor.cores",
  "hardware_details.processor.threads",
  "hardware_details.processor.tdp",
  "hardware_details.gpu.memory",
  "hardware_details.gpu.tdp",
  "hardware_details.screen.size",
  "hardware_details.screen.refresh_rate",
  "hardware_details.screen.brightness",
  "hardware_details.wireless.wifi.max_speed",
  "hardware_details.bluetooth.range",
  "optical.write_speed",
  "optical.read_speed",
  "repairability_insights.ram_storage.max_upgradable",
];
// const sortKeys = {
const applyNormalFilters = (filters, query) => {
  filterKeys.forEach((key) => {
    if (query[key] !== undefined) {
      if (key === "model_identifier" && typeof query[key] === "string") {
        filters[key] = query[key].split(",");
      } else {
        filters[key] = query[key];
      }
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
