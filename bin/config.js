module.exports = {
    webpagetest: "http://localhost:4000/runtest.php", 
    parameters : {
        runs: 3, 
        f: "json", 
        cmdline: "--proxy-server=\"socks://172.17.0.3:1080\"", 
        fvonly: 1
    },
    mobileParameter : {
        mobile: 1, 
        mobileDevice: "iPhoneX"
    }
}