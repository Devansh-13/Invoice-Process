const express = require('express');
const router = express.Router();
const { generateOTPMain, validateOTP,distributorBrokerageSave ,getDistributorBrokerageDetails,distributorAction,getDistributorName,getFundName,getGstCategories,getTdsCategories,getFeeTypes,updateDistributorBrokerage,updateStatus,getBrokeragesChecker,checkerAction,getBrokeragesAccountUser,accountUserAction,uploadBrokerageFile,uploadInvoiceFile,updateDistributorBrokerageAgainToDist,downloadFile} = require('../controller/Controller');


// distributorlogin get
router.get('/', getDistributorBrokerageDetails);

router.post('/generate-otp', generateOTPMain);
router.post('/validate-otp', validateOTP);

router.post('/distributor-brokerage',distributorBrokerageSave );


router.put('/distributor-brokerage-again-to-dist/:brokerageId', updateDistributorBrokerageAgainToDist);

router.put('/distributor-brokerage/:brokerageId', updateDistributorBrokerage);


router.post('/distributor-action', distributorAction);

router.post('/checker-action', checkerAction);

router.post('/account-action', accountUserAction);

router.post("/upload-brokeragefile", uploadBrokerageFile)
router.post("/upload-invoicefile", uploadInvoiceFile)

router.get("/download-file",downloadFile);


router.get('/distributor-details', getDistributorName);

router.get('/fund-details', getFundName);

router.get("/get-brokerages-for-app",getBrokeragesChecker)

router.get("/get-brokerages-for-account",getBrokeragesAccountUser)


router.get('/fee-types', getFeeTypes);
router.get('/tds-categories', getTdsCategories);
router.get('/gst-categories', getGstCategories);

// checker
router.post('/send-to-checker', updateStatus);

// router.post("/distributorbrokerage", )

module.exports = router;