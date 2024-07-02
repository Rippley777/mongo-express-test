// tracing.js
const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { ParentBasedSampler } = require("@opentelemetry/sdk-trace-base");
const { TraceIdRatioBasedSampler } = require("@opentelemetry/sdk-trace-base");

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces", // Ensure this is correct for your setup
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  sampler: new ParentBasedSampler({
    root: new TraceIdRatioBasedSampler(0.5), // 50% sampling rate
  }),
});

sdk.start();

console.log("Tracing initialized");
