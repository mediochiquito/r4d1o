cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-nowplaying/www/NowPlaying.js",
        "id": "cordova-plugin-nowplaying.NowPlaying",
        "clobbers": [
            "window.NowPlaying"
        ]
    },
    {
        "file": "plugins/cordova-plugin-remotecommand/www/RemoteCommand.js",
        "id": "cordova-plugin-remotecommand.RemoteCommand",
        "clobbers": [
            "window.RemoteCommand"
        ]
    },
    {
        "file": "plugins/com.keosu.cordova.stream/www/Stream.js",
        "id": "com.keosu.cordova.stream.Stream",
        "clobbers": [
            "window.Stream"
        ]
    },
    {
        "file": "plugins/cordova-plugin-streaming/www/radio.js",
        "id": "cordova-plugin-streaming.RADIO",
        "clobbers": [
            "navigator.RADIO"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "id": "cordova-plugin-x-toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "id": "cordova-plugin-x-toast.tests"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-plugin-nowplaying": "1.0.0",
    "cordova-plugin-remotecommand": "1.0.0",
    "com.keosu.cordova.stream": "0.1",
    "cordova-plugin-streaming": "1.3.0",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-network-information": "1.2.0",
    "cordova-plugin-splashscreen": "3.1.0",
    "cordova-plugin-vibration": "2.1.0",
    "cordova-plugin-statusbar": "2.1.2",
    "cordova-plugin-x-toast": "2.5.0"
};
// BOTTOM OF METADATA
});