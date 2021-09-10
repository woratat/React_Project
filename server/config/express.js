const express = require('express');

// config app
const app = express();

module.exports = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        return res.status(200).json({
            name: 'Project React',
            message: 'movie content',
            develop: {
                people_1: 'Woratat Kumklam',
                people_2: 'Ratchapol Thongta',
                people_3: 'Kasira Khyoai'
            }
        });
    });

    const listen = (port) => {
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    }

    return { listen };
}