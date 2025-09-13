// test-data.js

// Function to generate a random username of up to 8 characters
function generateUsername() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 8; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `user_${username}`; // prefix to keep it recognizable
}

// Function to return test data object
function getTestData() {
    return {
        username: generateUsername(),
        password: 'abc123'
    };
}

module.exports = { getTestData };
