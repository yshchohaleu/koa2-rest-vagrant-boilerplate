'use strict';

import app from './server'
import { connectDatabase } from './server/db/connect'
import config from './server/config';

(async() => {
    try {
        const info = await connectDatabase(config.database);
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    } catch (error) {
        console.error('Unable to connect to database');
    }

    await app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
})();
