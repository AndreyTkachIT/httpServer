const net = require('net');

const server = net.createServer((socket) => {
    let buffer = "";
    let parsedRequest = new Map();
    socket.on('data', function(data){
        buffer += data;
        if(isDataEnd(buffer)){
             parsedRequest = parseDataToMap(buffer);
             console.log(parsedRequest);
        }
        console.log(data.toString('utf-8'));
    });

    socket.on('error', (err) => {
        // handle errors here
        throw err;})
});

server.listen(process.env.PORT || 3000);

function isDataEnd(data) {
    return data.endsWith('\r\n\r\n');
}

function parseDataToMap(data) {
    let map = new Map();
    data.split('\r\n').forEach((line, index) => {
        if (index !== 0 && line !== '') {
        let keyVal = line.split(':',2);
        map.set(keyVal[0], keyVal[1]);
        }
    });

    return map;
}