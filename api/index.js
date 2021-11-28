const config = require('config');
const customExpress = require('./custom/customExpress');

const port = config.get('api.port');
const app = customExpress();

 

app.listen(port, () => console.log(`server run port ${port}`));