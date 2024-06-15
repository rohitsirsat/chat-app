import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "/.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("app errro in main index.js: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8080, () => {
      console.log(`⚙️ Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("connectDB error in main index.js: ", error);
  });
