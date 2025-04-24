const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medico', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Initialize collections if they don't exist
        const collections = ['users', 'appointments'];
        const db = mongoose.connection.db;
        
        for (const collectionName of collections) {
            const collections = await db.listCollections({ name: collectionName }).toArray();
            if (collections.length === 0) {
                await db.createCollection(collectionName);
                console.log(`Collection ${collectionName} created`);
            }
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 