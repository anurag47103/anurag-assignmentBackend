import express from "express";
import contactRoutes from "./routes/contactRoutes";
import { port } from "./config/config";

const app = express();

app.use(express.json());

app.use("/api", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
