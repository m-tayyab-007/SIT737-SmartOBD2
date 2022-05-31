process.env.CLOUDANT_URL =
  "https://apikey-v2-2wn4pcqtt8u2ww5x0vi538m8tcebrix7cql182fn60pc:026b1722aee50062aea93a95b993fc90@12af9018-711b-4298-b13e-a9455265267c-bluemix.cloudantnosqldb.appdomain.cloud";
process.env.CLOUDANT_APIKEY = "ptBLZHcNtWzSQH-Vxf3dSAdc4NU-Mx4tVnag22tMznwU";
// var dbConnect = mongoose.connection;
const { CloudantV1 } = require("@ibm-cloud/cloudant");
const cloudant = CloudantV1.newInstance({});
exports.cloudant = cloudant;
// exports.mongoose = mongoose;
