const WebSocket = require("ws");
const getAnalyticsModel = require("../modules/analytics/utils/getAnalyticsModel");

const websocketConfig = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);

        const { siteId, userId, sessionId, event, metadata } = data;
        if (!siteId || !userId || !event || !sessionId) {
          ws.send(
            JSON.stringify({
              success: false,
              message: "Missing required fields",
            })
          );
          return;
        }

        const Analytics = getAnalyticsModel(siteId);
        console.log("Analytics model:", Analytics);
        const newEvent = new Analytics({
          siteId,
          userId,
          sessionId,
          event,
          metadata,
          createdAt: new Date(),
        });
        console.log("newEvent:", newEvent);

        await newEvent.save();

        ws.send(
          JSON.stringify({
            success: true,
            message: "Event logged successfully",
          })
        );
      } catch (error) {
        console.error("Error handling WebSocket message:", error);
        ws.send(
          JSON.stringify({ success: false, message: "Error logging event" })
        );
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = websocketConfig;
