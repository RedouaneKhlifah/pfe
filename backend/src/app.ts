import express from "express";
import cors from "cors";
import connectDB from "./config/db";
// import utiles
import "./utils/index";

// imported routes
import router from "./routes";
// imported error middlewares
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

// import utiles
import "./utils/index";

// connect to database
connectDB();

const app = express();

app.use(cors());

// handel data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use("/api/v1", router);

// use error Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
