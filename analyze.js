var fs = require("fs");
var execSync = require("child_process").execSync;
var mode = process.argv[2];
var path = process.argv[3];

var log = fs.readFileSync(path, "utf8");

var lines = log.split("\n");

var ips = lines.map(function(line) {
  return line.split(" ")[0];
});


function checkCountries(ips) {
  return ips.map(function(ip) {
    return execSync("./check_country " + ip).toString().replace("\n", "");    
  });
}

var torIps = fs.readFileSync("./tor-ips", "utf8").split("\n").filter(function(ip) { return ip != "" });


if (mode == "c") {
  var countries = checkCountries(ips);
  console.log(countries);
}
if (mode == "t") {
  var torAccess = ips.filter(function(ip) {
    return torIps.includes(ip);
  });
  console.log(torAccess);
}
