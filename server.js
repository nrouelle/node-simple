var http = require('http');

var url = require("url");
var querystring = require('querystring');
var LINQ = require('node-linq').LINQ;

function getDatas() {
    var sampleDatas = [{id:1,title:'toto'}, {id:2,title:'tata'}];
    return sampleDatas;
}

var server = http.createServer( (req, res) => {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);

    var regexTask = new RegExp("\/task\/[0-9]*");
    
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
    else if(regexTask.test(page)) {
        var regexId = new RegExp("\/task\/([0-9]*)");
        var id = regexId.exec(page)[1];

        res.writeHead(200, {"Content-Type": "application/json"});
        var task = new LINQ(getDatas()).Where(function(item) { return item.id == id; })
                    .Single();
        
        res.write(task.title);
        res.end();
    }
    else if(page =='/task') {
        res.writeHead(200, {"Content-Type": "application/json"});

        var sample = {'id':1, 'title':'toto'};
        

        res.write(JSON.stringify(sampleDatas));
        res.end();
    }
    else
    {
        res.writeHead(404);
        res.write('Cette page n\'existe pas!');
    }
    res.end();
});
server.listen(8080);
