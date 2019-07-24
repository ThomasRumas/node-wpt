module.exports = {
    webpagetest: "https://webpagetest-server-apkhd5-qa.apps.op.acp.adeo.com/runtest.php", 
    parameters : {
        runs: 3, 
        f: "json", 
        cmdline: "--proxy-server=\"socks://webpagetest-proxy-desktop:8080\"", 
        fvonly: 1
    },
    mobileParameter : {
        mobile: 1, 
        mobileDevice: "iPhoneX"
    }
}