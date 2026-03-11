const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const uploadRoutes = require("./routes/uploadroutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req,res)=>{
    res.send("Sales Insight Automator API Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});
