import express from "express";
import "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { userAuthRoute } from "./route/userAuthRoute.js";
import { categoryRoute } from "./route/categoryRoute.js";
import { productRoute } from "./route/productRoute.js";
import { orderRoute } from "./route/orderRoute.js";
import { galleryRoute } from "./route/galleryRoute.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// regular middleware
app.use(express.json());
app.use(express.static(__dirname+'/uploads'))
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);


// API ROUTE
app.use("/api/v1", userAuthRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", galleryRoute);

app.get("/", (req, res) => {
  res.send("server running");
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
