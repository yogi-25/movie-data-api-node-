// controllers/movieController.js

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

// Initialize AWS S3 and DynamoDB clients
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Example function to retrieve movies from DynamoDB
async function getMovies(req, res) {
    try {
        const params = {
            TableName: 'Movies', // Your DynamoDB table name
            // Define your query parameters here (e.g., year, title, cast, genre)
            // For simplicity, this example retrieves all movies
        };
        const data = await dynamodb.scan(params).promise();
        res.json(data.Items);
    } catch (error) {
        console.error('Error retrieving movies from DynamoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// controllers/movieController.js

async function getMoviesByYear(req, res) {
    try {
      
        const year = parseInt(req.params.year, 10);
        console.log(year)
        const params = {
            TableName: 'Movies',
            // Define query parameters to filter movies by year
            FilterExpression: '#yr = :yr', // Using expression attribute name
            ExpressionAttributeNames: { '#yr': 'year' }, // Mapping expression attribute name to actual attribute name
            ExpressionAttributeValues: { ':yr': year }
        };

        const data = await dynamodb.scan(params).promise();
        const moviesByYear = data.Items.filter(movie => movie.year === year);
        res.json(moviesByYear);
    } catch (error) {
        console.error('Error retrieving movies by year from DynamoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getMoviesByTitle(req, res) {
    try {
      const title = decodeURIComponent(req.params.title);
    
        // const title = req.params.title

        console.log('Search query:', title);

        const params = {
            TableName: 'Movies',
            FilterExpression: 'contains(#title, :title)',
            ExpressionAttributeNames: { '#title': 'title' },
            ExpressionAttributeValues: { ':title': title }
        };

        console.log('DynamoDB query params:', params);

        const data = await dynamodb.scan(params).promise();

        console.log('Retrieved data:', data.Items);

        res.json(data.Items);
    } catch (error) {
        console.error('Error retrieving movies by title from DynamoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




module.exports = {
    getMovies,
    getMoviesByYear,
    getMoviesByTitle,
    // Add other controller functions as needed
};
