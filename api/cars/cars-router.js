// DO YOUR MAGIC
const {Router} = require('express');
const Cars = require('./cars-model');
const router = Router();

router.get('/', async (req, res, next) => {
    try{
        let cars = await Cars.getAll();
        res.status(200).json(cars);
    }catch(e){
        next(e);
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'There was an error with the database',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
