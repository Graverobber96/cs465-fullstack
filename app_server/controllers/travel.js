/* GET travel page */

// Retrieve trip data from the REST API
const travel = async (req, res, next) => {
    try {
        const response = await fetch('http://localhost:3000/api/trips');

        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }

        const trips = await response.json();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    travel
};