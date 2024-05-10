// controller.js
const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');

// file upload

const fs = require('fs');
const path = require('path');
const multer = require('multer');


// const User = require('../models/User.js');
const OTP = require('../models/Otp.js');
const User  = require('../models/User.js');
const { sequelize } = require('../database');
const { Op } = require('sequelize'); 
const UserRolesMaster=require("../models/userRoleMaster.js")
const CodeMaster=require("../models/codeMaster.js")

const ProcessDocumentDetails=require("../models/processDocumentDetail.js")

const DistributorBrokerage=require("../models/distributorBrokerage.js")
const DistributorMaster = require('../models/distributorMaster');
const StatusMaster=require("../models/statusMaster.js");
const ProcessStatusDetails=require("../models/processStatus.js");
const FundMaster=require("../models/fundMaster.js")



// Function to insert dummy rows in caes of distmaster
// async function insertDummyDistributors() {
//   try {
//     // Insert dummy distributors
//     await DistributorMaster.bulkCreate([
//       {
//         distributorName: 'Amey',
//         email:"mail@gmail.com",
//         distributorPAN: 'ABCDE1234F', // Dummy PAN
//         distributorARN: 'ARN12345',    // Dummy ARN
//         isActive: 1,                   // Active status
//         createdBy: 1,                  // Dummy created by ID
//         createdDate: new Date(),       // Current date as created date
//       },
//       {
//         distributorName: 'Vishu',
//         email:"j@gmail.com",
//         distributorPAN: 'FGHIJ6789K', // Dummy PAN
//         distributorARN: 'ARN67890',    // Dummy ARN
//         isActive: 1,                   // Active status
//         createdBy: 1,                  // Dummy created by ID
//         createdDate: new Date(),       // Current date as created date
//       },
//     ]);

//     console.log('Dummy distributors inserted successfully');
//   } catch (error) {
//     console.error('Error inserting dummy distributors:', error);
//   }
// }


// // fundmaster
// async function insertDummyData(FundMaster) {
//   const dummyData = [
//     { fundName: 'Alpha Fund' },
//     { fundName: 'Summit Fund' },
//     { fundName: 'Equity Fund' },
//   ];

//   try {
//     await FundMaster.bulkCreate(dummyData);
//     console.log('Dummy rows inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting dummy rows:', error);
//   }
// }

// ... (Your application code)

// insertDummyData(FundMaster)
//   .then(() => {
//     // Handle successful insertion (optional)
//   })
//   .catch((error) => {
//     console.error('Error in insertDummyData function:', error);
//   });

// Call the function to insert dummy distributors
// insertDummyDistributors();


// dummy users creation
// async function insertDummyUsers() {
//   try {
//     // Insert dummy users
//     await User.bulkCreate([
//       {
//         email: 'vishu@gmail.com',
//         username: null,
//         mobile_no: null,
//         logintype: null,
//         distributorid: 0,
//         loginfailcount: null,
//         isactive: null,
//         createdby: null,
//         createddate: null,
//         updatedby: null,
//         updateddate: null,
//       }
//       // },
//       // {
//       //   email: 'singh@gmail.com',
//       //   role: 'checker',
//       //   username: null,
//       //   mobile_no: null,
//       //   logintype: null,
//       //   distributorid: 0,
//       //   loginfailcount: null,
//       //   isactive: null,
//       //   createdby: null,
//       //   createddate: null,
//       //   updatedby: null,
//       //   updateddate: null,
//       // },
//       // {
//       //   email: 'mail1@gmail.com',
//       //   role: 'distributor',
//       //   username: "Amey",
//       //   mobile_no: null,
//       //   logintype: null,
//       //   distributorid:9,
//       //   loginfailcount: null,
//       //   isactive: null,        
//       //   createdby: null,
//       //   createddate: null,
//       //   updatedby: null,
//       //   updateddate: null,
//       // },
//     ]);

//     console.log('Dummy users inserted successfully');
//   } catch (error) {
//     console.error('Error inserting dummy users:', error);
//   }
// }
// Call the function to insert dummy users
// insertDummyUsers();

// insert status masters 

// const statusNames = [
//   { statusName: 'Draft', description1: 'Initial stage where the invoice is being created but not yet submitted.', isActive: 1 },
//   { statusName: 'Pending Approval', description1: 'Once prepared, the invoice awaits approval from the appropriate authority.', isActive: 1 },
//   { statusName: 'Pending from Distributor', description1: 'Distributor has the invoice and is attaching the invoice copy before submitting it back to the maker.', isActive: 1 },
//   { statusName: 'Received from Distributor', description1: 'The invoice with attached invoice copy has been received from the distributor and is awaiting further action.', isActive: 1 },
//   { statusName: 'Returned to Maker', description1: 'In case of any issues or modifications required, the invoice is sent back to the maker for adjustments.', isActive: 1 },
//   { statusName: 'Pending Account Verification', description1: 'After modifications (if any), the invoice awaits verification or validation from the accounting department.', isActive: 1 },
//   { statusName: 'Paid', description1: 'Final status indicating that the invoice has been successfully processed and payment has been made.', isActive: 1 },
//   { statusName: 'Rejected', description1: 'Rejected by the approver', isActive: 1 } // The description for 'Rejected' seems incomplete in your provided text
// ];

// (async () => {
//   try {
//     const createdStatuses = await StatusMaster.bulkCreate(statusNames);
//     console.log('Statuses inserted:', createdStatuses.length);
//   } catch (error) {
//     console.error('Error inserting statuses:', error);
//   }
// })();



// actual controller



function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Generate OTP function
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Check user existence function
async function findUser(email) {
  try {
    const lowercaseEmail = email.toLowerCase();
    const [user] = await sequelize.query(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(:email)',
      {
        replacements: { email: lowercaseEmail },
        type: QueryTypes.SELECT,
      }
    );
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}


// Retrieve user role function
async function getUserRole(id) {
    const role = await UserRolesMaster.findOne({ where: { userId:id } });
    return role ? role.roleCode : null;
}

// Send OTP via email function
async function sendOTP(email, otp) {
    // Configure nodemailer with your email provider
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Define email content
    let mailOptions = {
        from: 'devansh15091970@gmail.com',
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP is: ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
}


async function getDistributorID(name){
  const distributor = await DistributorMaster.findOne({ where: {distributorName: name  }});
  return distributor.id;
}

async function addStatusData(status){
  const statusMaster=await StatusMaster.findOne({where :{statusName:status}});
  return statusMaster.id;
}

async function getStatusName(statusId){
  const status=await StatusMaster.findOne({where:{id:statusId}});
  return status.statusName;
}

async function getFundName(fd){
  const mainid=parseInt(fd);
  console.log(mainid)
  const fund=await FundMaster.findOne({where:{id:mainid}});
  console.log(fund,"233")
  if(!fund){
  return "not found";  
  }
    return fund.fundName;
}

async function getBrokerageFile(id){
  const documentDetailsRow=await ProcessDocumentDetails.findOne({where:{distributorBrokerageId:id},
  
    order: [['id', 'DESC']]
  });
  if(!documentDetailsRow){ 
    return null;
  }
  return documentDetailsRow;
}

async function getUserRemarks(id){
  const row=await ProcessStatusDetails.findOne({where:{distributorBrokerageId:id},
    order: [['id', 'DESC']]
  });
  return row.userremarks;
}

async function modifyDetails(brokerageDetails,name) {
  // console.log(brokerageDetails, "239");
  const modifiedBrokerageDetails = await Promise.all(
    brokerageDetails.map(async (details) => {
      const statusName = await getStatusName(details.statusId);
      const fundName = await getFundName(details.fundId);
      // const brokerageDetails=await getBrokerageFile(details.id);
      const userremarks=await getUserRemarks(details.id);
  

      const brokerageFileRow = await getLatestBrokerageFile(details.id);
      const invoiceFileRow = await getLatestInvoiceFile(details.       id);
        if(statusName!=="Draft"){
      return {
        id: details.id,
        distributorName: name,
        fundName: fundName,
        statusName: statusName,
        invoiceMonth: details.invoiceMonth,
        basicAmount: details.basicAmount,
        totalAmount: details.totalAmount,
        gstCategoryCode: details.gstCategoryCode,
        tdcCategoryCode: details.tdcCategoryCode,
        feeTypeCode: details.feeTypeCode,
        isActive: details.isActive,
        createdBy: details.createdBy,
        createdDate: details.createdDate,
        updatedBy: details.updatedBy,
        updatedDate: details.updatedDate,
        createdAt: details.createdAt,
        updatedAt: details.updatedAt,
        brokerageFileRow,
        invoiceFileRow,
        userremarks

      };
    }
    return false;
    })
  );
  return modifiedBrokerageDetails;
}

async function getDistributorName(id){
  const row=await DistributorMaster.findOne({where:{id:id}});
  return row.distributorName;
}

const getLatestBrokerageFile = async (distributorBrokerageId) => {
  // Find the latest brokerage file for the given distributorBrokerageId
  const latestBrokerageFile = await ProcessDocumentDetails.findOne({
      where: {
          distributorBrokerageId: distributorBrokerageId,
          processId: 'BROKERAGE' // Assuming 'BROKERAGE' indicates a brokerage file
      },
      order: [['createdAt', 'DESC']] // Order by createdAt to get the latest file
  });
  return latestBrokerageFile;
};

const getLatestInvoiceFile = async (distributorBrokerageId) => {
  // Find the latest invoice file for the given distributorBrokerageId
  const latestInvoiceFile = await ProcessDocumentDetails.findOne({
      where: {
          distributorBrokerageId: distributorBrokerageId,
          processId: 'INVOICE' // Assuming 'INVOICE' indicates an invoice file
      },
      order: [['createdAt', 'DESC']] // Order by createdAt to get the latest file
  });
  return latestInvoiceFile;
};


// TODO1
async function enhanceDetails(details) {
  const enhancedDetails = await Promise.all(details.map(async (detail) => {
    
    // console.log(detail,"223");
      // find the brokerage row with detail.distbrokId

      const brokerageRow=await DistributorBrokerage.findOne({where:{id:detail.distributorBrokerageId}});

      console.log("361")

      const statusName=await getStatusName(brokerageRow.statusId);

      const fundName=await getFundName(brokerageRow.fundId);
      const distributorName=await getDistributorName(brokerageRow.distributorMasterId);

      const makerRemarks=detail.makerRemarks ?? null;
      const userremarks=detail.userremarks ?? null;

      const brokerageFileRow = await getLatestBrokerageFile(detail.distributorBrokerageId);
      const invoiceFileRow = await getLatestInvoiceFile(detail.       distributorBrokerageId);

      const checkerRemarks=detail.checkerRemarks;
      

      // Fetch distributorName from distributorMaster table using distributorMasterId
  

      return {
          ...brokerageRow.dataValues,
          distributorName,
          statusName,
          fundName,
          makerRemarks,
          checkerRemarks,
          brokerageFileRow,
          invoiceFileRow,
          userremarks
          
      };
  }));

  return enhancedDetails;
}


async function findFundId(name){
  const fund=await FundMaster.findOne({where:{fundName:name}});
  return fund.id;
}


// for generating OTP and sending it via email
module.exports.generateOTPMain = async (req, res) => {
    const { email } = req.body;
    console.log(email);

    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format', success: false });
    }

    try {
        // Check if user exists
        const user = await findUser(email);
        console.log(user);
      
        // console.log("121",userExists);
        if (!user) {
            return res.status(404).json({ error: 'User not found', success: false });
        }

        // Generate OTP
        const otp = generateOTP();
        console.log("otp genetated")

        // Create a new OTP record for the user
        console.log("239",otp)

        // // Delete any existing OTP record for the user
        // await OTP.destroy({ where: { user_id: user.id } });

        // Create a new OTP record for the user
        await OTP.create({ user_id: user.id, otp_code: otp });

        // Send OTP via email
        await sendOTP(email, otp);

        res.status(200).json({ message: 'OTP sent successfully', success: true });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP. Please try again.', success: false });
    }
}

// for verifying OTP
module.exports.validateOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await findUser(email);
      
        // console.log("121",userExists);
        if (!user) {
            return res.status(404).json({ error: 'User not found', success: false });
        }
        // Retrieve the saved OTP from the OTP table based on the user's email
        const otpRecord = await OTP.findOne({ where: { user_id: user.id },order: [['createdAt', 'DESC']] 
        });

        if (!otpRecord) {
            return res.status(400).json({ error: 'No OTP found for the user', success: false });
        }

        // Compare the entered OTP with the saved OTP
        if (otp == otpRecord.otp_code) {
            // Retrieve user role
            const role = await getUserRole(user.id);
            res.status(200).json({ role, success: true ,userId:user.id,distId:user.distributorid});
        } 
        else {
            res.status(400).json({ error: 'Invalid OTP', success: false });
        }

    }
     catch (error) {
        console.error('Error validating OTP:', error);
        res.status(500).json({ error: 'Failed to validate OTP. Please try again.', success: false });
    }
}



module.exports.distributorBrokerageSave=async(req,res)=>{
  try {
    console.log(req.body,"408");
    const {distributorName,fundName,invoiceMonth,brokerageFile,statusName,basicAmount,totalAmount,userId,distId,feeType,tdsCategory,gstCategory,distributorMasterId,remarksByUser}=req.body;

    if(!distributorName ){
      return res.status(404).json({error:"Null Distributor not allowed",success:false});
    }

    

    // save status in status tabke and get its id
    const statId=await addStatusData(statusName);

    // find fundId
    const fundId=await findFundId(fundName);

    console.log(statId);

  
     // Save data to the database
     const newDistributorBrokerage = await DistributorBrokerage.create({
      distributorMasterId:distributorMasterId,
      statusId:statId,
      fundId:fundId,
      invoiceMonth,
      brokerageFile,
      basicAmount:basicAmount,
      totalAmount:totalAmount,
      gstCategoryCode:gstCategory,
      tdcCategoryCode:tdsCategory,
      feeTypeCode:feeType,

      // Add more fields as needed
  });

     console.log(newDistributorBrokerage,"521");


  // find this user id
  // let user=await User.findOne({where :{id:userId}});
  // console.log(user);
   // save processstatus deatils
    await ProcessStatusDetails.create({
       makerId:userId,
       distributorBrokerageId:newDistributorBrokerage.id,
       processId:0,
       statusId:statId,
       userremarks:remarksByUser,
       userid:userId
    })
  // Send response
  res.status(201).json(newDistributorBrokerage);

  } 
  catch (error) {
      console.error('Error saving data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.updateDistributorBrokerage = async (req, res) => {
  const { brokerageId } = req.params;
  const { userId, distId, ...newContact } = req.body;
  console.log(req.body);


  let distributorId=await getDistributorID(newContact.distributorName);

  // save status in status tabke and get its id
  const statId=await addStatusData(newContact.statusName);

  // find fundId
  const fundId=await findFundId(newContact.fundName);

  try {
      // Update DistributorBrokerage details
      await DistributorBrokerage.update(
        {
            statusId: statId,
            fundId: fundId,
            distributorMasterId: distributorId,
            invoiceDate: newContact.invoiceDate,
            brokeragefile: newContact.brokerageFile,
            basicAmount: newContact.basicAmount,
            totalAmount: newContact.totalAmount
        },
        {
            where: { id: brokerageId }
        }
    );

      // Create a new entry in ProcessStatusDetails table
      await ProcessStatusDetails.create({
          distributorBrokerageId: brokerageId,
          makerId: userId,
          processId:0,
          statusId:statId,
          userremarks:newContact.remarksByUser,
          userid:userId
          // Add other fields as needed
      });

      res.status(200).json({ message: 'Distributor brokerage details updated successfully.' });
  } catch (error) {
      console.error('Error updating distributor brokerage details:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
};



// TODO2

module.exports.getDistributorBrokerageDetails = async (req, res) => {
  try {
      console.log(req.query);

      const { dist:distId,user } = req.query;
 
      if (user) {
        try {
            // Find all entries in ProcessStatusDetails for the given user
            const userProcessDetails = await ProcessStatusDetails.findAll({ where: { makerId: user }, order: [['id', 'DESC']] });
            
            if (!userProcessDetails || userProcessDetails.length === 0) {
                return res.status(404).json({ message: 'No process status details found for the user.' });
            }
    
            // Remove duplicate distributorBrokerageIds and keep only the latest one
            const uniqueDistributorBrokerageIds = {};
            userProcessDetails.forEach(detail => {
                const { distributorBrokerageId } = detail;
                if (!uniqueDistributorBrokerageIds[distributorBrokerageId] || uniqueDistributorBrokerageIds[distributorBrokerageId].id < detail.id) {
                    uniqueDistributorBrokerageIds[distributorBrokerageId] = detail;
                }
            });
    
            // Fetch status and distributorBrokerageId for each entry
            const userDetails = await Promise.all(Object.values(uniqueDistributorBrokerageIds).map(async (detail) => {
                const { statusId, distributorBrokerageId, makerRemarks ,checkerRemarks,userremarks} = detail;
                return { statusId, distributorBrokerageId, makerRemarks,checkerRemarks,userremarks };
            }));
            console.log(userDetails,"601")
    
            // Fetch distributorBrokerage details for each distributorBrokerageId
            // const distributorBrokerageDetails = await Promise.all(userDetails.map(async (detail) => {
            //     const { distributorBrokerageId,makerRemarks ,checkerRemarks,userremarks,statusId} = detail;
            //     // Fetch row from distributorBrokerage table corresponding to distributorBrokerageId
            //   const distributorBrokerageRow = await DistributorBrokerage.findByPk(distributorBrokerageId);
            //   const documentDetailsRow=await ProcessDocumentDetails.findOne({where:{distributorBrokerageId:distributorBrokerageId},order:[['id', 'DESC']]});
            //   const statusName=await StatusMaster.findOne({where:{id:statusId}});


            //   console.log(documentDetailsRow,"577")


            //   distributorBrokerageRow.makerRemarks = makerRemarks;
            //   distributorBrokerageRow.checkerRemarks = checkerRemarks;
            //   distributorBrokerageRow.userremarks = userremarks;
            //   distributorBrokerageRow.statusName = statusName;

            //   distributorBrokerageRow.brokerageFile = documentDetailsRow!==null ? documentDetailsRow.folderPath:undefined
            //   null;
            //   distributorBrokerageRow.brokerageFileName = documentDetailsRow!==null ? documentDetailsRow.fileName : null;

            //     return distributorBrokerageRow;
            // }));
    
            // console.log(distributorBrokerageDetails);
    
            if (userDetails) {
                const enhancedDetails = await enhanceDetails(userDetails);
                return res.status(200).json(enhancedDetails);
            }
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    

   
    console.log(distId,"569");
      // Fetch distributor master ID using 
      const distributor = await DistributorMaster.findOne({ where: { id:distId } });

      
      
      //not posible but also taken
      if (!distributor) {
          return res.status(404).json({ message: 'Distributor not found.' });
      }

      const name=distributor.distributorName;

      // Use distributor master ID to fetch brokerage details
      // const distributorMasterId = distributor.id;
      // console.log("316",distributorMasterId);

      const brokerageDetails = await DistributorBrokerage.findAll({ where: { distributorMasterId:distId } });

      // Extract only dataValues from each object
      const cleanBrokerageDetails = brokerageDetails.map(brokerage => brokerage.dataValues);

      console.log(cleanBrokerageDetails, "689");
      

      // needed fromat change
      const modifiedFromat=await modifyDetails(cleanBrokerageDetails,name);
      // console.log("347",modifiedFromat);
      

      return res.status(200).json(modifiedFromat);
  } catch (error) {
      console.error('Error fetching distributor brokerage details:', error);
      return res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports.distributorAction=async(req,res)=>{
  try {
    const { brokerageId, remarks, action ,userId} = req.body;

    // Get status ID based on action from StatusMaster table
    let statusId = null;
    let message=null;
    if (action === 'modify') {
        const returnedToMakerStatus = await StatusMaster.findOne({ where: { statusName: 'Returned to Maker from Distributor' } });
        statusId = returnedToMakerStatus.id;
        message="Returned to Maker from Distributor"
    } else if (action === 'submit') {
        const receivedFromDistributorStatus = await StatusMaster.findOne({ where: { statusName: 'Received from Distributor' } });
        statusId = receivedFromDistributorStatus.id;
        message="Received from Distributor"
    }

    // update the same 
    await DistributorBrokerage.update({ statusId: statusId }, { where: { id: brokerageId } });

    // find the makerId coresponding to brokerageID in prcesssdetails
    const processDetail = await ProcessStatusDetails.findOne({where:{distributorBrokerageId:brokerageId},
      order: [['id', 'DESC']] 
    })

    const makerId=processDetail.makerId;
    

     // insert ProcessStatusDetails table with the same status ID and maker remarks
     await ProcessStatusDetails.create({ statusId: statusId, userremarks: remarks, distributorBrokerageId: brokerageId ,makerId:makerId,userid:userId});

     return res.status(200).json({ message: 'Status updated successfully.',message });
  }
   catch (error) {
    console.error('Error modifying status:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    
  }
}


module.exports.getDistributorName = async (req, res) => {
  try {
    let { name } = req.query;
    name=name.toLowerCase();

    // console.log(name);
    
    // Query the distributorMaster table for names starting with the provided name
    const distributors = await DistributorMaster.findAll({
      where: {
        distributorName: { [Op.iLike]: `${name}%` } // Using Sequelize's like operator
      },
      attributes: ['distributorName','id'] // Only retrieve distributor names
    });

    console.log(distributors,"544");

    // Extract distributor names from the query result
    // const distributorNames = distributors.map(distributor => ({
    //   name: distributor.distributorName
    // }));
    // console.log(distributorNames);

    res.status(200).json(distributors); // Return the array of objects with distributor names
  } catch (error) {
    console.error('Error fetching distributor names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.getFundName = async (req, res) => {
  try {
    let { name } = req.query;
    name=name.toLowerCase();

    // console.log(name);
    
    // Query the distributorMaster table for names starting with the provided name
    const funds = await FundMaster.findAll({
      where: {
        fundName: { [Op.iLike]: `${name}%` } // Using Sequelize's like operator
      },
      attributes: ['fundName','id'] // Only retrieve distributor names
    });

    // console.log(distributors,"544");

    // Extract distributor names from the query result
    // const fundNames = funds.map(fund => ({
    //   name: fund.fundName
    // }));
    // console.log(distributorNames);

    res.status(200).json(funds); // Return the array of objects with distributor names
  } catch (error) {
    console.error('Error fetching distributor names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to fetch GST categories
module.exports.getGstCategories = async (req, res) => {
  try {
      const gstCategories = await CodeMaster.findAll({
          where: { Code: 'GST' } // Assuming 'GST' is the code for GST categories in CodeMaster table
      });

       // Extract the field values from gstCategories
      // Replace 'fieldName' with the actual field name you want to extract
      res.status(200).json(gstCategories);

  } catch (error) {
      console.error('Error fetching GST categories:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function to fetch fee types
module.exports.getFeeTypes = async (req, res) => {
  try {
    console.log("681")
      const feeTypes = await CodeMaster.findAll({
          where: { Code: 'FEETYPE' } // Assuming 'FEETYPE' is the code for fee types in CodeMaster table
      });
     // Replace 'fieldName' with the actual field name you want to extract
      res.status(200).json(feeTypes);
  } catch (error) {
      console.error('Error fetching fee types:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to fetch TDS categories
module.exports.getTdsCategories = async (req, res) => {
  try {
    console.log("681")
      const tdsCategories = await CodeMaster.findAll({
          where: { Code: 'TDS' } // Assuming 'TDS' is the code for TDS categories in CodeMaster table
      });
      console.log(tdsCategories,"684");
      // Extract the field values from gstCategories
      const tdsValues = tdsCategories.map(category => category.description1); // Replace 'fieldName' with the actual field name you want to extract
      console.log(tdsValues,"87");
      res.status(200).json(tdsCategories);
  } catch (error) {
      console.error('Error fetching TDS categories:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports.updateStatus=async(req,res)=>{
  try {
    console.log(req.body);
    const {rowId,userId,remarks}=req.body;

   

    // update in brokerage table
    await DistributorBrokerage.update(
      {
          statusId: 2,
      },
      {
          where: { id: rowId }
      }
  );
    
    // insert in processStatus detail
     // Create a new entry in ProcessStatusDetails table
     await ProcessStatusDetails.create({
      distributorBrokerageId: rowId,
      makerId: userId,
      processId:0,
      statusId:2,
      userid:userId,
      userremarks:remarks,
      statusId:2

      // Add other fields as needed
  });
  return res.status(200).json("Updated succesfully")

  } 
  catch (error) {
    console.error('Error Updating', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function enhanceDetailsNew(details) {
  const enhancedDetails = await Promise.all(details.map(async (detail) => {
    
    // console.log(detail,"223");
      // find the brokerage row with detail.distbrokId

      const brokerageRow=await DistributorBrokerage.findOne({where:{id:detail.id}});

      console.log("361")

      const statusName=await getStatusName(detail.statusId);

      const fundName=await getFundName(detail.fundId);
      const distributorName=await getDistributorName(detail.distributorMasterId);

      const userremarks=await getUserRemarks(detail.id);
      const makerRemarks=details.makerRemarks ?? null;
     

      const brokerageFileRow = await getLatestBrokerageFile(detail.id);
      const invoiceFileRow = await getLatestInvoiceFile(detail.       id);

      // const checkerRemarks=detail.checkerRemarks;
      

      // Fetch distributorName from distributorMaster table using distributorMasterId
  

      return {
          ...brokerageRow.dataValues,
          distributorName,
          statusName,
          fundName,
          makerRemarks,
          brokerageFileRow,
          invoiceFileRow,
          userremarks
          
      };
  }));

  return enhancedDetails;
}


module.exports.getBrokeragesChecker = async (req, res) => {
  try {
    // Assuming you're using a Sequelize model named Brokerage
    const brokerages = await DistributorBrokerage.findAll({
      where: {
        statusId: [2,6,7]
      }
    });

    console.log(brokerages);
    const cleanBrokerageDetails = brokerages.map(brokerage => brokerage.dataValues);

      console.log(cleanBrokerageDetails, "689");

    if (brokerages) {
      const enhancedDetails = await enhanceDetailsNew(cleanBrokerageDetails);
      return res.status(200).json(enhancedDetails);
  }

    // Send the fetched data as an array of objects
  
  } catch (error) {
    console.error('Error fetching distributor brokerage details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



module.exports.checkerAction=async(req,res)=>{
  try {
    const { brokerageId, remarks, action,userId } = req.body;

    // Get status ID based on action from StatusMaster table
    let statusId = null;
    let message=null;
    if (action === 'modify') {
        const returnedToMakerStatus = await StatusMaster.findOne({ where: { statusName: 'Returned to Maker from Checker' } });
        statusId = returnedToMakerStatus.id;
        message="Returned to Maker from Checker"
    } else if (action === 'approve') {
        const pendingAccountVerify = await StatusMaster.findOne({ where: { statusName: 'Pending Account Verification' } });
        statusId = pendingAccountVerify.id;
        message="Pending Account Verification"
    }
    else{
      const rejected = await StatusMaster.findOne({ where: { statusName: 'Rejected' } });
        statusId = rejected.id;
        message="Rejected"
    }

    // find the makerId coresponding to brokerageID in prcesssdetails
    const processDetail = await ProcessStatusDetails.findOne({where:{distributorBrokerageId:brokerageId}})

    const makerId=processDetail.makerId;

    // update the same 
    await DistributorBrokerage.update({ statusId: statusId }, { where: { id: brokerageId } });

     // insert ProcessStatusDetails table with the same status ID and maker remarks
     await ProcessStatusDetails.create({ statusId: statusId, checkerRemarks: remarks,checkerId:userId,makerId:makerId,distributorBrokerageId:brokerageId,userid:userId,userremarks:remarks});

     return res.status(200).json({ message: 'Status updated successfully.',message });
  }
   catch (error) {
    console.error('Error modifying status:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    
  }
}




// account

module.exports.getBrokeragesAccountUser = async (req, res) => {
  try {
    // Assuming you're using a Sequelize model named Brokerage
    const brokerages = await DistributorBrokerage.findAll({
      where: {
        statusId: [6,7,8]
      }
    });

    console.log(brokerages);

    const cleanBrokerageDetails = brokerages.map(brokerage => brokerage.dataValues);

    console.log(cleanBrokerageDetails, "689");

  if (brokerages) {
    const enhancedDetails = await enhanceDetailsNew(cleanBrokerageDetails);
    return res.status(200).json(enhancedDetails);
  }

    // Send the fetched data as an array of objects
  
  } catch (error) {
    console.error('Error fetching distributor brokerage details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports.accountUserAction=async(req,res)=>{
  try {
    let { brokerageId, remarks, action,userId,UTR} = req.body;


    if(UTR==="" && action==="submit"){
      return res.status(404).json({ message: 'UTR cant be null',message });
    }
    else if(UTR==="" && action==="modify"){
      UTR=null;
    }
    // Get status ID based on action from StatusMaster table
    console.log(remarks,"896");
    let statusId = null;
    let message=null;
    if (action === 'modify') {
        const returnedToMakerStatus = await StatusMaster.findOne({ where: { statusName: 'Returned to Maker from AccountUser' } });
        statusId = returnedToMakerStatus.id;
        message="Returned to Maker from AccountUser"
    } else if (action === 'submit') {
        const paiddetail = await StatusMaster.findOne({ where: { statusName: 'Paid' } });
        statusId = paiddetail.id;
        message="Paid"
    }
    console.log("meassaestaus1")

    // find the makerId coresponding to brokerageID in prcesssdetails
    const processDetail = await ProcessStatusDetails.findOne({where:{distributorBrokerageId:brokerageId},order: [['id', 'DESC']]})

    console.log("meassaestaus2")



    const makerId=processDetail.makerId;
    const checkerId=processDetail.checkerId;
   
    console.log(UTR,statusId,brokerageId);

    // update the same 
    await DistributorBrokerage.update({ statusId: statusId ,utrnumber:UTR}, { where: { id: brokerageId } });

     // insert ProcessStatusDetails table with the same status ID and maker remarks
     console.log("meassaestaus4")
     await ProcessStatusDetails.create({ statusId: statusId, distributorBrokerageId: brokerageId ,checkerId:checkerId,makerId:makerId,distributorBrokerageId:brokerageId,userid:userId,userremarks:remarks});
     console.log("meassaestausmlas5")

     return res.status(200).json({ message: 'Status updated successfully.',message });
  }
   catch (error) {
    console.error('Error modifying status:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    
  }
}


// handle file upload'

// defining base folders to store
const baseFolder = "A:\\Newel\\fileStorage"; // Provide the path to your base folder
const uploadDir = path.join(baseFolder, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Make sure to create directories recursively
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Temporarily store files in the uploadDir
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

module.exports.uploadBrokerageFile = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      try {
        if (err instanceof multer.MulterError) {
          console.error('Error uploading file (Multer Error):', err);
          return res.status(500).json({ error: 'File upload failed' });
        } else if (err) {
          console.error('Error uploading file (Other Error):', err);
          return res.status(500).json({ error: 'File upload failed' });
        }

        if (!req.file) {
          console.error('Error uploading file: No file received');
          return res.status(400).json({ error: 'No file received' });
        }

        const { distributorMasterId=null, brokerageId } = req.body;

        if ( !brokerageId) {
          console.error('distributorMasterId or brokerageId is missing in the request body');
          return res.status(400).json({ error: 'distributorMasterId or brokerageId is missing in the request body' });
        }

        const filePath = req.file.path;
        const fileName = path.basename(filePath);
        const fileExtension = path.extname(filePath);
        const currentTime = new Date().toISOString().slice(0, 10);

        const distFolder = path.join(uploadDir, `DistributorMasterId_${distributorMasterId}`);
        const timeFolder = path.join(distFolder, currentTime);

        fs.mkdirSync(distFolder, { recursive: true });
        fs.mkdirSync(timeFolder, { recursive: true });

        const newFilePath = path.join(timeFolder, fileName);
        fs.renameSync(filePath, newFilePath);

        const documentDetails = await ProcessDocumentDetails.create({
          distributorBrokerageId: brokerageId,
          folderPath: newFilePath,
          fileName,
          fileExtension,
          processId: "BROKERAGE"
        });

        console.log('Document details saved:', documentDetails);
        res.json({ message: 'File uploaded successfully', filePath: newFilePath });
      } catch (error) {
        console.error('Error saving document details:', error);
        res.status(500).json({ error: 'Error saving document details' });
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};



module.exports.uploadInvoiceFile = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      try {
        if (err instanceof multer.MulterError) {
          console.error('Error uploading file (Multer Error):', err);
          return res.status(500).json({ error: 'File upload failed' });
        } else if (err) {
          console.error('Error uploading file (Other Error):', err);
          return res.status(500).json({ error: 'File upload failed' });
        }

        if (!req.file) {
          console.error('Error uploading file: No file received');
          return res.status(400).json({ error: 'No file received' });
        }

        const { distributorMasterId, brokerageId } = req.body;

        if (!distributorMasterId || !brokerageId) {
          console.error('distributorMasterId or brokerageId is missing in the request body');
          return res.status(400).json({ error: 'distributorMasterId or brokerageId is missing in the request body' });
        }

        const filePath = req.file.path;
        const fileName = path.basename(filePath);
        const fileExtension = path.extname(filePath);
        const time=new Date();
        const currentTime = time.toISOString().slice(0, 10);

        const distFolder = path.join(uploadDir, `DistributorMasterId_${distributorMasterId}`);
        const timeFolder = path.join(distFolder, currentTime);

        fs.mkdirSync(distFolder, { recursive: true });
        fs.mkdirSync(timeFolder, { recursive: true });

        const newFilePath = path.join(timeFolder, fileName);
        fs.renameSync(filePath, newFilePath);

        const documentDetails = await ProcessDocumentDetails.create({
          distributorBrokerageId: brokerageId,
          folderPath: newFilePath,
          fileName,
          fileExtension,
          processId: "INVOICE",
          createdAt: time,
          updatedAt:time
        });

        console.log('Document details saved:', documentDetails);
        res.json({ message: 'Invoice uploaded successfully', filePath: newFilePath });
      } catch (error) {
        console.error('Error saving document details:', error);
        res.status(500).json({ error: 'Error saving document details' });
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};


module.exports.updateDistributorBrokerageAgainToDist=async(req,res)=>{

    const { brokerageId } = req.params;
  const { userId, distId, remarks ,distributorMasterId} = req.body;
  console.log(req.body);


  // let distributorId=await getDistributorID(newContact.distributorName);

  // save status in status tabke and get its

  try {
      // Update DistributorBrokerage details
      await DistributorBrokerage.update(
        {
            statusId: 3,
        },
        {
            where: { id: brokerageId }
        }
    );

      // Create a new entry in ProcessStatusDetails table
      await ProcessStatusDetails.create({
          distributorBrokerageId: brokerageId,
          makerId: userId,
          processId:0,
          statusId:3,
          userremarks:remarks,
          userid:userId
          // Add other fields as needed
      });

      res.status(200).json({ message: 'Distributor brokerage details updated successfully.'});
  }
  catch (error) {
    console.error('Error updating distributor brokerage details:', error);
    res.status(500).json({ message: 'Internal server error.' });
}
}


module.exports.downloadFile = async (req, res) => {
  try {
    const { user:userId, filePath } = req.query;

    console.log(req.query,"1291");

    if (!userId || !filePath) {
      console.error('userId or filePath is missing in the request query');
      return res.status(400).json({ error: 'userId or filePath is missing in the request query' });
    }

    // const fullPath = path.join(uploadDir, filePath);

    console.log(filePath);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate headers for file download
      res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
      res.setHeader('Content-Type', 'application/octet-stream');

      // Create a read stream from the file path
      const fileStream = fs.createReadStream(filePath);

      // Pipe the file stream to the response object
      fileStream.pipe(res);
    } else {
      // If the file does not exist, send a 404 Not Found response
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error downloading file' });
  }
};