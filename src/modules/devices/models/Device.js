// MA090LL/A
// MD035LL/A
// MD318LL/A
// MGX72LL/A
// MJLT2LL/A
// MPXV2LL/A
// MVVL2LL/A

const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model_identifier: { type: String, required: true },
    // TODO i think i want think true once the data is cleaned up
    model_description: { type: String },
    release_date: { type: String, required: true },
    discontinued_date: { type: String },
    model_number: { type: String, required: true, unique: true },
    repairability_score: { type: Number, required: true },
    hardware_details: {
      memory: {
        format: {
          type: String,
          required: true,
          enum: [
            "DDR2",
            "DDR3",
            "DDR3L",
            "DDR4",
            "DDR5",
            "LPDDR3",
            "LPDDR4",
            "LPDDR5",
            "GDDR6",
            "HBM2",
            "Unified Memory",
            "Other",
          ],
        },
        available_sizes: [
          {
            type: String,
            required: true,
          },
        ],
        max_ram: {
          type: String,
        },
        speed: {
          type: String,
        },
        ecc: {
          type: Boolean,
          default: false,
        },
        soldered: {
          type: Boolean,
          default: false,
        },
        channels: {
          type: Number,
        },
      },
      storage: {
        type: [
          {
            type: {
              type: String,
              required: true,
              enum: ["HDD", "SSD", "NVMe", "eMMC", "Hybrid", "Other"],
            },
            capacity: {
              type: String,
              required: true,
            },
            connector: {
              type: String,
              required: true,
              enum: [
                "SATA",
                "PCIe",
                "M.2",
                "USB",
                "Proprietary",
                "Proprietary PCIe",
                "Onboard",
                "Soldered (Integrated)",
                "Other",
              ],
            },
            max_capacity: {
              type: String,
            },
            speed: {
              type: String,
            },
            removable: {
              type: Boolean,
              default: false,
            },
            raid_support: {
              type: Boolean,
              default: false,
            },
          },
        ],
        required: true,
      },
      processor: {
        model: {
          type: String,
          required: true,
        },
        socket: {
          type: String,
          required: true,
        },
        architecture: {
          type: String,
        },
        cores: {
          type: Number,
        },
        threads: {
          type: Number,
        },
        base_clock: {
          type: String,
        },
        boost_clock: {
          type: String,
        },
        cache: {
          type: String,
        },
        tdp: {
          type: String,
        },
        integrated_graphics: {
          type: String,
        },
        removable: {
          type: Boolean,
          default: false,
        },
      },
      gpu: {
        model: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["Integrated", "Dedicated", "External"],
          required: true,
        },
        memory: {
          type: String,
        },
        connector: {
          type: String,
          enum: ["PCIe", "M.2", "Thunderbolt", "USB-C", "N/A", "Other"],
        },
        tdp: {
          type: String,
        },
        removable: {
          type: Boolean,
          default: false,
        },
        cooling_type: {
          type: String,
          enum: ["Passive", "Active", "Liquid"],
        },
        supported_technologies: {
          type: [String],
        },
      },
      screen: {
        size: {
          type: String,
          required: true,
        },
        resolution: {
          type: String,
          required: true,
        },
        aspect_ratio: {
          type: String,
        },
        refresh_rate: {
          type: Number,
        },
        panel_type: {
          type: String,
          enum: [
            "TN",
            "IPS",
            "OLED",
            "AMOLED",
            "VA",
            "Retina Display (IPS)",
            "Liquid Retina XDR",
            "Liquid Retina XDR (Mini-LED)",
            "Other",
          ],
        },
        brightness: {
          type: String,
        },
        touch_support: {
          type: Boolean,
          default: false,
        },
        hdr_support: {
          type: Boolean,
          default: false,
        },
      },
      port_types: [
        {
          type: {
            type: String,
            required: true,
            enum: [
              "USB-A",
              "USB-C",
              "HDMI",
              "DisplayPort",
              "Mini DisplayPort",
              "DVI",
              "VGA",
              "FireWire",
              "Thunderbolt",
              "Thunderbolt 5",
              "Thunderbolt 4",
              "Thunderbolt 3",
              "Thunderbolt 2",
              "Ethernet",
              "Audio Jack",
              "SD Card Slot",
              "SDXC Card Slot",
              "ExpressCard Slot",
              "ExpressCard/34 Slot",
              "Power Connector",
              "MagSafe 3",
              "MagSafe 2",
              "Other",
            ],
          },
          version: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
          features: [
            {
              type: String,
              enum: [
                "Power Delivery",
                "Video Output",
                "Fast Charging",
                "Data Only",
                "Audio Support",
                "Other",
              ],
            },
          ],
        },
      ],
      wireless: {
        wifi: {
          standard: {
            type: String,
            required: true,
            enum: [
              "802.11a",
              "802.11b",
              "802.11g",
              "802.11n",
              "802.11ac",
              "802.11ax (Wi-Fi 6E)",
              "802.11abg",
              "802.11abgn",
            ],
          },
          frequency_bands: [
            {
              type: String,
              enum: ["2.4GHz", "5GHz", "6GHz"],
            },
          ],
          mimo_support: {
            type: Boolean,
            default: false,
          },
          max_speed: {
            type: String,
          },
        },
        bluetooth: {
          version: {
            type: String,
          },
          low_energy: {
            type: Boolean,
            default: true,
          },
        },
        cellular: {
          supported: {
            type: Boolean,
            default: false,
          },
          technology: {
            type: String,
            enum: ["4G LTE", "5G", "3G", "Other"],
          },
        },
        nfc: {
          type: Boolean,
          default: false,
        },
        gps: {
          type: Boolean,
          default: false,
        },
      },
      bluetooth: {
        version: {
          type: String,
        },
        profiles: [
          {
            type: String,
            enum: ["A2DP", "HFP", "HSP", "HID", "PAN", "PBAP", "MAP", "Other"],
          },
        ],
        codecs: [
          {
            type: String,
            enum: ["SBC", "AAC", "aptX", "aptX HD", "LDAC", "Other"],
          },
        ],
        range: {
          type: String,
        },
        low_energy: {
          type: Boolean,
        },
        multipoint: {
          type: Boolean,
        },
        class: {
          type: String,
          enum: ["Class 1", "Class 2", "Class 3", "Other"],
        },
      },
    },
    optical: {
      drive_type: {
        type: String,
        required: true,
        enum: [
          "SuperDrive",
          "Combo Drive",
          "Blu-ray",
          "DVD-RW",
          "CD-RW",
          "None",
          "Other",
        ],
      },
      write_speed: {
        type: String, // Example: "8x"
      },
      read_speed: {
        type: String, // Example: "24x"
      },
      dual_layer_support: {
        type: Boolean,
        default: false,
      },
      removable: {
        type: Boolean,
        default: false,
      },
    },
    repairability_insights: {
      tools_required: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tool",
          required: true,
        },
      ],
      battery: {
        accessibility: {
          type: String,
          required: true,
          enum: ["Easy", "Moderate", "Difficult"],
        },
        replacement_cost: {
          type: String,
        },
        removable: {
          type: Boolean,
          default: false,
        },
      },
      ram_storage: {
        accessibility: {
          type: String,
          required: true,
          enum: ["Not Upgradeable", "Easy", "Moderate", "Difficult"],
        },
        soldered: {
          type: Boolean,
          default: false,
        },
        max_upgradable: {
          type: String,
        },
      },
      adhesive_level: {
        type: String,
        enum: ["Low", "Medium", "High"],
      },
      cooling_system: {
        type: String,
      },
    },

    repair_difficulty: { type: String },
    disassembly_steps: { type: Number },
    disassembly_tool_count: { type: Number },
    known_issues: { type: [String], required: true },
    replacement_part_availability: { type: String },
    estimated_repair_cost: {
      battery: { type: String },
      screen: { type: String },
      keyboard: { type: String },
    },
    repair_guide_availability: { type: String },
    community_score: { type: Number },
    recyclability: { type: String },

    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "DeviceImage" }],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
