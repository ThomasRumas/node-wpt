const args = require('minimist')(process.argv.slice(2)); 
var axios = require('axios'); 
var config = require('./bin/config'); 
var uri = null; 

if(!args['url']) {
    console.error('No url set, use --url parameter'); 
    process.exit(1);     
}

if(!args['mobile']) { 
    uri = `${config.webpagetest}?url=${args['url']}&${serialize(config.parameters)}`; 
} else {
    uri = `${config.webpagetest}?url=${args['url']}&${serialize(config.parameters)}&${serialize(config.mobileParameter)}`;
}

axios.get(uri)
    .then(response => {
        console.log(`You can see your result at this URL : ${response.data.data.userUrl}`);
        process.exit(0); 
    })
    .catch(error => {
        console.log(error);
        process.exit(1); 
    });

function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}