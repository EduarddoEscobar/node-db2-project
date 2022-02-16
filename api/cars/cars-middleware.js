const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  let car = await Cars.getById(req.params.id);
  if(car){
    req.car = car;
    next();
  }else{
    res.status(404).json({message: `car with id ${req.params.id} is not found`});
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body;
  if(vin && make && model && mileage){
    next();
  }else{
    let emptyFields = [(vin ? 'vin' : ''), (make ? 'make' : ''), (model ? 'model' : ''), (mileage ? 'mileage' : '')];
    emptyFields = emptyFields.filter(f => f.length > 0);
    res.status(400).json({message: `${emptyFields.join(', ')} is missing`});
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  let isValidVin = vinValidator.validate(req.body.vin);
  if(isValidVin){
    next();
  }else{
    res.status(400).json({message: `vin ${req.body.vin} is invalid`});
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  let vins = await Cars.getAll().map(car => car.vin);
  if(vins.includes(req.body.vin)){
    res.status(400).json({message: `vin ${req.body.vin} already exists`});
  }else{
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}