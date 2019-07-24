process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const args = require('minimist')(process.argv.slice(2)); 
const axios = require('axios'); 
const config = require('./bin/config'); 

var uri = null; 

if(!args['url']) {
    console.error('No url set, use --url parameter'); 
    process.exit(1);     
}

if(!args['mobile']) { 
    uri = `${config.webpagetest}?url=${args['url']}&${_serialize(config.parameters)}`; 
} else {
    uri = `${config.webpagetest}?url=${args['url']}&${_serialize(config.parameters)}&${_serialize(config.mobileParameter)}`;
}

function _launchTest(uri) {
    axios.get(uri)
    .then(response => {
        console.info(`You can see your result at this URL : ${response.data.data.userUrl}`);
        setTimeout(() => {
            _getJsonResult(response.data.data.testId);
        }, 5000); 
    })
    .catch(error => {
        console.error(error);
        process.exit(1); 
    });
}

function _getJsonResult(prmTestId) {
    axios.get(`${config.webpagetest}/xmlResult/${prmTestId}`)
    .then(response => {
        console.log(response.data); 
        process.exit(0); 
    })
    .catch(error => {
        console.error(error); 
        process.exit(1); 
    })
}

function _serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

_launchTest(uri); 