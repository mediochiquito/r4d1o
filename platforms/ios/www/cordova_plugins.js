cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.nypr.cordova.playerhaterplugin/www/audioplayer.js",
        "id": "org.nypr.cordova.playerhaterplugin.AudioPlayer",
        "pluginId": "org.nypr.cordova.playerhaterplugin",
        "clobbers": [
            "audioplayer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "org.nypr.cordova.playerhaterplugin": "0.1.0"
}
// BOTTOM OF METADATA
});