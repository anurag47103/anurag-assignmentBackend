import express from "express";
import contactRoutes from "./routes/contactRoutes";

const port = process.env.PORT ? process.env.PORT : 3000;

const app = express();

app.use(express.json());

app.use("/api", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
