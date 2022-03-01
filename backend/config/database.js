const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`database connected on server: ${data.connection.host}`);
    });
};
