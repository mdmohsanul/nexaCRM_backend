const express = require("express");
const { initializeDB } = require("./config/db.connect");
const dotenv = require("dotenv");
const cors = require("cors");
const leadRoutes = require("./routes/leadsRoutes");
const salesAgentRoutes = require("./routes/salesAgents");
const commentRoutes = require("./routes/commentRoutes");

initializeDB();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  openSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/leads", leadRoutes);
app.use("/api/agents", salesAgentRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
});
