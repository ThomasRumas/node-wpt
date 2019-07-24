process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const args = require('minimist')(process.argv.slice(2)); 
const axios = require('axios'); 
const config = require('./bin/config'); 

var uri = null; 

if(!args['url']) {
    console.error('No url set, use --url parameter'); 
    process.exit(1);     
}

_launchTest(uri); 

function _launchTest(uri) {
    if(!args['mobile']) { 
        uri = `${config.webpagetest}/runtest.php?url=${args['url']}&${_serialize(config.parameters)}`; 
    } else {
        uri = `${config.webpagetest}/runtest.php?url=${args['url']}&${_serialize(config.parameters)}&${_serialize(config.mobileParameter)}`;
    }

    axios.get(uri)
    .then(response => {
        console.info(`You can see your result at this URL : ${response.data.data.userUrl}`);
        console.info(`Check if test ${response.data.data.testId} is finished`); 
        _checkTestStatus(response.data.data.testId); 
    })
    .catch(error => {
        console.error(error);
        process.exit(1); 
    });
}

function _checkTestStatus(prmTestId) {
    axios.get(`${config.webpagetest}/testStatus.php?f=json&test=${prmTestId}/`)
    .then(response => {
        if(response.data.statusCode !== 200) {
            console.info(`Test ${prmTestId} isn't finished, waiting...`); 
            setTimeout(() => {
                _checkTestStatus(prmTestId); 
            }, 10000); 
        } else {
            console.info(`Test ${prmTestId} is done, getting JSON result`); 
            _getJsonResult(prmTestId); 
        }
    })
    .catch(error => {
        console.error(error); 
    })
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
