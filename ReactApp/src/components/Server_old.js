const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

/*
var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
*/

// Declare app
const app = express();
const port = 5000;

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// default route for server
app.get('/', (req, res) => res.status(200).send({
    message: "Server is running..."
}));

const WriteTextToFileAsync = async (path, data) => {
    let filehandle = null;

    try {
        filehandle = await fs
            .promises.open(path, mode = 'w')
        // Write to file
        await filehandle.writeFile(data)
    } finally {
        if (filehandle) {
            // Close the file if it is opened.
            await filehandle.close();
        }
    }
    // The readFileSync() method reads
    // the contents of the file and 
    // returns the buffer form of the data
    const buff = fs.readFileSync(path)
    const content = buff.toString()
    console.log(`\nContents of the file :\n${content}`)

}


WriteTextToFileAsync('./src/data.json', contentToWrite)
    .catch(err => {
        console.log(`Error Occurs, Error code -> 
        ${err.code}, Error NO -> ${err.errno}`)
    })

// Declare post / write route to accept incoming request with data
app.post('/write', async (req, res, next) => {
    // take the body from incoming request by using req.body and convert it into string
    const requestContent = JSON.stringify(req.body);
    await WriteTextToFileAsync(requestContent)
});

// 404 route for server
app.use((req, res, next) => res.status(404).send({
    message: "Could not find specified route that was requested...!"
}));

// Run server
app.listen(port, () => {
    console.log(
        `
    !!! server is running
    !!! Listening for incoming requests on port ${port}
    !!! http://localhost:5000
    `
    )
});
