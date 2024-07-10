import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { httpServer } from "./app.js";

dotenv.config({
  path: "/.env",
});

connectDB()
  .then(() => {
    httpServer.on("error", (error) => {
      console.log("app errro in main index.js: ", error);
      throw error;
    });
    httpServer.listen(process.env.PORT || 8080, () => {
      console.log(`⚙️ Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("connectDB error in main index.js: ", error);
  });
