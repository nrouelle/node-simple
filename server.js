var http = require('http');

var url = require("url");
var querystring = require('querystring');

var server = http.createServer( (req, res) => {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/html"});
    if(page =='/') {
        res.write('Vous êtes à l\'accueil');
        console.log(params['nom']);
    }
    else if(page =='/sous-sol') {
        res.write('Vous êtes au sous-sol\n');
        res.write(params['nom']);
    }
    else if(page =='/etage/1/chambre') {
        res.write('C\'est privé !');
    }
    else if(page =='/task') {
        res.writeHead(200, {"Content-Type": "application/json"});

        var sample = {'id':1, 'title':'toto'};
        var sampleDatas = [{'id':1, 'title':'toto'}, {'id':2, 'title':'tata'}];

        res.write(JSON.stringify(sampleDatas));
        res.end();
        // res.write("Id = " + sample.id);
        // res.write("Titre = " + sample.title);
        // res.write("Id = " + sampleDatas[1].id);
    }
    else
    {
        res.writeHead(404);
        res.write('Cette page n\'existe pas!');
    }
    res.end();
});
server.listen(8080);
