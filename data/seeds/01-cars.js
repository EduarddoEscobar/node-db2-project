// STRETCH
exports.seed = async function(knex){
    await knex('cars').truncate();
    return knex('cars').insert([
        {vin: '1234', make: 'SuperCar', model:'car1', mileage:9000},
        {vin: '1235', make: 'SuperCar', model:'car2', mileage:0},
        {vin: '1236', make: 'NotSuperCar', model:'car3', mileage:1000000}
    ]);
};