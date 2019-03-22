const app = require('/app');

app.get('/', function (req, res) {
   console.log('Client connected');

   res.status('200').json({
      message : 'SeeLight',
   });
});


app.listen(3000, function () {
    console.log('Server Started!');
});