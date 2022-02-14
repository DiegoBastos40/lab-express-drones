const express = require('express');
const Drone =require('../models/Drone.model')
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
  .then((dronesFromDb)=>{
    console.log(dronesFromDb);
      res.render('drones/list',{dronesFromDb});
  })
  .catch((err)=>{
      next(err);
  })
 
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const {name,propellers,maxSpeed}= req.body;

    Drone.create({name,propellers,maxSpeed})
    .then((createDrones)=>{
        console.log('Drone created',createDrones)
        res.redirect('/drones')
}) .catch((err)=>{
  next(err);
})
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
       .then(droneFromDB =>{
         console.log(droneFromDB);
         res.render("drones/update-form", {drone: droneFromDB } )
       } )
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { name,propellers, maxSpeed } = req.body;
   Drone.findByIdAndUpdate(req.params.id, {name, propellers , maxSpeed })
       .then(resDroneUpdated => {
         console.log(resDroneUpdated);
         res.redirect(`/drones`);
       })
       .catch((err)=>{
        next(err);
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id} = req.params;
   
    Drone.findByIdAndDelete(id)
    .then(()=>{
       // console.log(allBooks);
        res.redirect('/drones');
    })
    .catch((err)=>{
        next(err);
    })
   
});

module.exports = router;
