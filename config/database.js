const mongoose = require("mongoose");

// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.DB_LOCAL_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((con) => {
//       console.log(`MongoDB Database connected to HOST: ${con.connection.host}`);
//     });
// };

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((result) => {
      console.log("Server Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
