const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.post('/',async(req,res)=>{
  try{
    const data = req.body
    const newMenuItem = new MenuItem(data);
    const newResponse = await newMenuItem.save();
    console.log('data saved')
    res.status(200).json(newResponse);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

router.get('/', async(req,res)=>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch{
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})


//This IS cooment check in git
module.exports = router;