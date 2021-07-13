const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

///routes importing
const userRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const employeeRoutes = require("./routes/employee");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const inventoryRoutes = require("./routes/inventory");
const feedbackRoutes = require("./routes/feedback");
const purchaseRoutes = require("./routes/purchase");
const adminOrderRoutes = require("./routes/admin/order.routes");
const initialDataRoutes = require("./routes/admin/initialData");

//environment variables
env.config();

//connect mongodb
mongoose
  .connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected!");
  });

//middleware (to manupulate data in req)
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", employeeRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", adminOrderRoutes);
app.use("/api", initialDataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
