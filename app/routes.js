module.exports = function(app, streams) { 
  const locals = req => ({ 
    title: 'Project RTC', 
    header: 'WebRTC live streaming',
    username: 'Username',
    share: 'Share this link',
    footer: 'bernardojengwa@gmail.com',
    id: req.params.id
  });
  

  // GET streams as JSON
  var displayStreams = function(req, res) {
    var streamList = streams.getStreams();
    // JSON exploit to clone streamList.public
    var data = (JSON.parse(JSON.stringify(streamList))); 

    res.status(200).json(data);
  };

  app.get('/streams.json', displayStreams);
  app.get('/', function(req, res) {
    res.render('pages/stream.html', locals(req));
  });
  app.get('/:id', function(req, res) {
    res.render('pages/subscribers.html', locals(req));
  });
}