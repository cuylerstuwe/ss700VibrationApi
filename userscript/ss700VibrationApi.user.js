// ==UserScript==
// @name         ss700VibrationApi
// @namespace    salembeats
// @version      1.00
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://www.facebook.com*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      localhost
// @connect      127.0.0.1
// @noframes
// ==/UserScript==

(function() {

    const ss700VibrationApi = (function() {

        let gameSenseIpAndPort;

        async function discoverGameSenseIpAndPort() {

            const discoveryServerPort = 8484;

            return new Promise((resolve) => {
                GM_xmlhttpRequest({
                    url: `http://localhost:${discoveryServerPort}`,
                    method: "GET",
                    onload: response => {
                        resolve(JSON.parse(response.responseText));
                    }
                });
            });
        }

        async function bindSinglePredefinedVibrationPattern(gameSenseIp, gameSensePort, eventName, vibrationPatternName) {

            const appName = "SALEM_TAMPERMONKEY";

            const bindResult = await new Promise((resolve) => {
                GM_xmlhttpRequest({
                    url: `http://${gameSenseIp}:${gameSensePort}/bind_game_event`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "game": appName,
                        "event": eventName,
                        "icon_id": 1,
                        "handlers": [{
                            "device-type": "tactile",
                            "zone": "one",
                            "mode": "vibrate",
                            "pattern": [{
                                "type": vibrationPatternName
                            }]

                        }]
                    }),
                    onload: response => {
                        resolve(response.responseText);
                    }
                });
            });

            return bindResult;
        }

        async function initApi(gameSenseIp, gameSensePort) {
            await bindSinglePredefinedVibrationPattern(gameSenseIp, gameSensePort, "STRONG_BUZZ", "ti_predefined_buzzalert750ms");
            await bindSinglePredefinedVibrationPattern(gameSenseIp, gameSensePort, "SOFT_BUMP", "ti_predefined_softbump_100");
        }

        async function sendGameEvent(eventName, eventData) {
            return new Promise((resolve) => {
                GM_xmlhttpRequest({
                    url: `http://${gameSenseIpAndPort.ip}:${gameSenseIpAndPort.port}/game_event`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "game": "SALEM_TAMPERMONKEY",
                        "event": eventName || "",
                        "data": eventData || {value: Math.random()}
                    }),
                    onload: response => {
                        resolve(response.responseText);
                    }
                });
            });
        }

        async function strongBuzz() {
            const strongVibeResult = await sendGameEvent("STRONG_VIBE");
            return strongVibeResult;
        }

        async function softBump() {
            const softBumpResult = await sendGameEvent("SOFT_BUMP");
            return softBumpResult;
        }

        async function main() {
            gameSenseIpAndPort = await discoverGameSenseIpAndPort();
            const {ip, port} = gameSenseIpAndPort;
            await initApi(ip, port);
            await strongBuzz();
        }

        main();

        return {
            strongBuzz,
            softBump
        }

    })();

    unsafeWindow.ss700VibrationApi = ss700VibrationApi;

})();