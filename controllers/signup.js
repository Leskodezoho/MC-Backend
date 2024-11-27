const mongoose = require("mongoose");
const VerifyUser = require("../models/verifyusers");
const newUser = require("../models/user");
const { exportfun } = require("../controllers/export");
const { SendMail } = require("./sendmail");
const bcrypt = require('bcryptjs');
const analyticsClient = require("../AnalyticsClient");
const dotenv = require("dotenv");
dotenv.config();
var jwt = require("jsonwebtoken");
async function InsertVerifyUser(name, email, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email+password);
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    const refreshtoken =process.env.refreshtoken;
    const orgId = process.env.orgId;
    const workspaceId = process.env.workspaceId;
    const viewId = process.env.viewId;
  

var ac = new analyticsClient(clientId, clientSecret, refreshtoken);

var columnValues = {};
columnValues['Email'] = email;
columnValues['Password'] = hashedPassword;
columnValues["Token"] = token;

var config = {};
var criteria = "\"Email\"='"+email+"'";
var view = ac.getViewInstance(orgId, workspaceId, viewId);
view.updateRow(columnValues, criteria, config).then((response) => {
    console.log(response);
    

}).catch((error) => {
    console.log('errorCode : '+error.errorCode);
    console.log('errorMessage : '+error.errorMessage);
});
var eportDate=await exportfun();
// var config = {};
// // config['dateFormat'] = 'dd/MM/yyyy';
// var view = ac.getViewInstance(orgId, workspaceId, viewId);
// view.addRow(columnValues, config).then((response) => {
//     console.log(response);

// }).catch((error) => {
//     console.log('errorCode : '+error.errorCode);
//     console.log('errorMessage : '+error.errorMessage);
// });
   /* const newUser = new VerifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });
    await newUser.save();
    const activationlink = process.env.signupurl + token;

    const { verification_content } = require("../pages/verification_email");
    const content = await verification_content(activationlink);

    SendMail(email, "verify user", content);*/
  } catch (e) {
    console.log(e);
  }
}
function generateToken(email) {
  const token = jwt.sign(email, process.env.secretKey);
  return token;
}
// async function InsertUser(token) {
//   try {
//     const usersVerify = await VerifyUser.findOne({ token: token });
//     if (usersVerify) {
//       const user = new newUser({
//         name: usersVerify.name,
//         email: usersVerify.email,
//         password: usersVerify.password,
//         forgetpassword: {},
//       });
//       await user.save();
//       let res = await VerifyUser.deleteMany({ token: token });
//       const content = require("../pages/reg_success");
//       SendMail(user.email, "Registration sucessfully", content);
//       return content;
//     } else {
//       const content = require("../pages/reg_failed");
//       return content;
//     }
//   } catch (error) {
//     console.log(error);
//     const content = require("../pages/server_fails");
//     return content;
//   }
// }
module.exports = { InsertVerifyUser };
