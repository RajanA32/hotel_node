const express = require('express');
const router = express.Router();

const Person = require('./../models/person');
const {jwtAuthMiddlware,genrateToken} =require('./../jwt');


//POST route to add a person
router.post('/signup',async(req, res)=>{
  try{
    const data = req.body // Assuming the request body containes the person data

    //Create a new Person document using the mongoose model
    const newPerson= new Person(data);

    //Save the new person to the database

    const response = await newPerson.save();
    console.log('data saved')

    const payLoad = {
      id: response.id,
      username:response.username
    }
    console.log(JSON.stringify(payLoad));

    const token = genrateToken(payLoad);
    console.log("Token is :",token);

    res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

router.get('/', async(req,res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch{
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

router.get('/:workType',async(req,res)=>{
  try{
    const workType = req.params.workType
    if(workType == 'chef' || workType == 'manager' || workType == 'wiater'){
      const response = await Person.find({work: workType});
      console.log('respinse fetch');
      req.status(200).json(response);
    }else{
      res.status(404).json({error:'Invalid work type'});
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.put('/:id',async(req, res)=>{
  try{
    const personId = req.params.id; // Extract the id from Url parameters
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
      new: true, //Return the updated document
      runValidators: true, // Run mongoose validation
    })

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('Data updated')
    res.status(200).json(response);
  }
  catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});
  }
})

router.delete('/:id',async(req,res)=>{
  try{
     const personId = req.params.id;
     const response = await Person.findByIdAndDelete(personId);
     
     if(!response){
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('Data deleted succesfully')
    res.status(200).json({message: 'person deleted succesfully'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

module.exports = router;