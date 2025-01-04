const getAnalyticsModel = require("../modules/analytics/utils/getAnalyticsModel");

const eventHandlers = {
  logEvent: async (ws, data) => {
    const { siteId, userId, sessionId, event, metadata } = data;

    if (!siteId || !userId || !event || !sessionId) {
      ws.send(
        JSON.stringify({ success: false, message: "Missing required fields" })
      );
      return;
    }

    try {
      const Analytics = getAnalyticsModel(siteId);
      const newEvent = new Analytics({
        userId,
        sessionId,
        event,
        metadata,
        createdAt: new Date(),
      });

      await newEvent.save();
      ws.send(
        JSON.stringify({ success: true, message: "Event logged successfully" })
      );
    } catch (error) {
      console.error("Error saving event:", error);
      ws.send(
        JSON.stringify({ success: false, message: "Error logging event" })
      );
    }
  },

  queryEvents: async (ws, data) => {
    const { siteId, startDate, endDate } = data;

    if (!siteId) {
      ws.send(JSON.stringify({ success: false, message: "Missing siteId" }));
      return;
    }

    try {
      const Analytics = getAnalyticsModel(siteId);
      const filter = {};

      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
      }

      const events = await Analytics.find(filter);
      ws.send(JSON.stringify({ success: true, data: events }));
    } catch (error) {
      console.error("Error querying events:", error);
      ws.send(
        JSON.stringify({ success: false, message: "Error querying events" })
      );
    }
  },
};

module.exports = eventHandlers;
