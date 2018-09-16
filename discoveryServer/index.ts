const ENVIRONMENT = {
    PORT: 8484
};

import http from 'http';
import fs from 'fs';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    const coreProps = JSON.parse(fs.readFileSync(`C:/ProgramData/SteelSeries/SteelSeries Engine 3/coreProps.json`).toString());
    const [ip, port] = coreProps.address.split(":");

    res.writeHead(200);
    res.write(JSON.stringify({
        ip,
        port
    }));
    res.end();

});

server.listen(ENVIRONMENT.PORT);