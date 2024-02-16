const express=require('express')
const router=express.Router();

const {totalSubscriptions,getRatio,totalSub}=require('./subscription.controller')



router.post('/totalSubs',totalSubscriptions)
router.post('/total',totalSub)
router.get('/ratio',getRatio)
// router.post('/totalSubByRatio',totalpercentageSubscription)


module.exports=router;