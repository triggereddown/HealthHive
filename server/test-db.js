const mongoose = require('mongoose');
const uri = "mongodb://deepmoitra1_db_user:gJuUWm@ac-lua4pfi-shard-00-00.ibmojbb.mongodb.net:27017,ac-lua4pfi-shard-00-01.ibmojbb.mongodb.net:27017,ac-lua4pfi-shard-00-02.ibmojbb.mongodb.net:27017/hrms_final_v1?ssl=true&replicaSet=atlas-li39i4-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("Connecting with CORRECTED Standard URI...");

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection error:", err);
    process.exit(1);
  });
