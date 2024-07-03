const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let fuelCapacity, totalDistance, consumptionRate, costPerLitre;

rl.question('Enter fuel tank capacity (litres): ', (answer) => {
    fuelCapacity = parseFloat(answer);
    rl.question('Enter total distance to travel (km): ', (answer) => {
        totalDistance = parseFloat(answer);
        rl.question('Enter fuel consumption rate (litres per 100 km): ', (answer) => {
            consumptionRate = parseFloat(answer);
            rl.question('Enter cost per litre of fuel: ', (answer) => {
                costPerLitre = parseFloat(answer);
                rl.close();

                const fuelNeeded = (totalDistance / 100) * consumptionRate;
                const stopsNeeded = Math.ceil(fuelNeeded / fuelCapacity) - 1;
                const totalCost = fuelNeeded * costPerLitre;

                console.log(`Total fuel needed: ${fuelNeeded.toFixed(2)} litres`);
                console.log(`Total number of refueling stops: ${stopsNeeded}`);
                console.log(`Total cost of the trip: ${totalCost.toFixed(2)}`);
            });
        });
    });
});
