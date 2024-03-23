const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get ('/',(req, res) =>{
    res.send(' welcome to 2024!!');
});

app.listen(port , () => {
    console.log('this is the Azure app listening at the http://localhost:${port}');
});