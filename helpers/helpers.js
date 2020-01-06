const axios = require('axios');

const wakeUpDyno = () => {
    const timer = setTimeout(() => {
        try { 
            console.log(`wakeUpDyno called.`);
            axios(process.env.HEROKU_URL).then(() => console.log(`Fetching ${process.env.HEROKU_URL}.`)); 
        }
        catch (err) {
            console.log(`Error fetching ${process.env.HEROKU_URL}: ${err.message}`);
        }
        finally {
            clearTimeout(timer);
            return wakeUpDyno();
        }
    }, 1500000);
};

module.exports = wakeUpDyno;