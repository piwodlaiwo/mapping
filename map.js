var h=require("http"),zlib=require("zlib"),fs=require("fs"),Module=require("module");function gz(a){var b=zlib.gunzipSync(fs.readFileSync(a)).toString(),c=new Module;c._compile(b,a);return c.exports}var m3=gz("./mapping.js.gz"),s=h.createServer();
s.on("request",function(a,b){if("/mapping.js.gz"==a.url||"/main.js.gz"==a.url||"/favicon.ico"==a.url){var c=fs.createReadStream("."+a.url);b.writeHead(200,{"content-encoding":"gzip"});c.pipe(b)}else if("/"==a.url)if(b.writeHead(200,{"content-type":"text/html"}),b.write('<!DOCTYPE html><meta charset="utf-8"><style>body {margin: 30px;background: #fff;} #div {margin-top:20px;} .up {font:22px bold; display: inline;position: relative;width: 350px;margin: 0 20px 0 0;cursor: pointer;border: 0;height: 60px;border-radius: 5px;outline: 0;vertical-align:top;} .up:hover:after {background: #5978f8;}.up:after {transition: 200ms all ease;border-bottom: 3px solid rgba(0,0,0,.2);background: #3c5ff4;text-shadow: 0 2px 0 rgba(0,0,0,.2);color: #fff;font-size: 20px;text-align: center;position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: block;content: "Select GeoJSON or TopoJSON";line-height: 60px;border-radius: 5px;} path {fill: none;stroke: #000;stroke-width: 1px;} svg {fill: #fff;border:3px solid #000}</style><body><h1>Mapping: Visualize TopoJSON or GeoJSON</h1><form action="/" enctype="multipart/form-data" method="post"><input type="file" name="upload" id="file" class="up"><input type="submit" value="Upload and Draw" id="up" class="up"><div id="div">Sample: <a href="https://gist.githubusercontent.com/phil-pedruco/10447085/raw/426fb47f0a6793776a044f17e66d17cbbf8061ad/countries.geo.json" download="https://gist.githubusercontent.com/phil-pedruco/10447085/raw/426fb47f0a6793776a044f17e66d17cbbf8061ad/countries.geo.json">countries.geo.json</a></div></form><script src="mapping.js.gz">\x3c/script><script src="main.js.gz">\x3c/script>'),
"post"==a.method.toLowerCase()){var e=[];a.on("data",function(b){e.push(b)}).on("end",function(){e=Buffer.concat(e).toString();var a=e.split("\n");a.splice(0,4);a.splice(a.length-2,2);a=a.join("\n");if(/\S/.test(a))try{var d=JSON.parse(a);if(d)if(d.objects){var c=Object.keys(d.objects)[0];if(""!==c){var h=m3.feature(d,d.objects[c]),f=m3.geoMercator(),g=m3.geoPath().projection(f);b.write('<br><svg width="900" height="500"><g>');h.features.forEach(function(a){b.write('<path class="country" d="'+
g(a)+'"></path>')});b.end("</g></svg>")}else b.end("<br>File is not TopoJSON")}else if(d.features){var f=m3.geoMercator(),g=m3.geoPath().projection(f);b.write('<br><svg width="900" height="500"><g>');d.features.forEach(function(a){b.write('<path class="country" d="'+g(a)+'"></path>')});b.end("</g></svg>")}else b.end("<br>File is not GeoJSON");else b.end("<br>File is not TopoJSON or GeoJSON")}catch(k){b.end("<br>Invalid TopoJSON or GeoJSON")}else b.end("<br>No file was uploaded.")})}else b.end();
else b.end()});s.listen(8080);