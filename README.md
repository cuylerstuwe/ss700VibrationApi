# ss700VibrationApi

Userscript / Local Server combo for triggering vibration on the SteelSeries Rival 700 from userscripts *(or other Internet sources)* on Windows *(other driver-compatible platforms can be easily supported by simply changing the OS-specific path for ```coreProps.json```)*.

## Discovery Server

Node app written in Typescript.

**Must be running** in order for the userscript to figure out where to send messages to -- The port for SteelSeries' Engine API potentially *(and usually!)* changes on each boot.

The discovery server itself currently runs on ```localhost``` at port ```8484```.

**Prerequisites:**

- [Recent version of Node](https://nodejs.org/en/download/) is installed.
- Typescript compiler is installed, either globally *(via ```npm i -g typescript``` in terminal after installing Node)* or locally.

**To start:** 

1. Open a terminal wherever the ```discoveryServer``` directory exists.  
2. Run ```tsc init``` in the terminal to transpile from Typescript to Javascript.
3. Run ```node index``` in the terminal. Keep it running in the background so that the userscript can use it to find the information that it needs.

## Userscript

Puts an ```ss700VibrationApi``` object on the ```Window``` object, which can then be used to send vibration events to the SteelSeries Rival 700 mouse from arbitrary Javascript, including *(but not limited to)* userscripts.

Currently, ```ss700VibrationApi``` exposes the following methods:

```javascript
ss700VibrationApi.strongBuzz(); // 750-ms long vibration, best-used for notifications.

// 60-ms long bump, best-used for tactile feedback
// (i.e., letting the user know that he successfully clicked a radio button rather than missing it).
ss700VibrationApi.softBump(); 
```

**Prerequisites:**

- A ```GM_```-compatible userscript manager *(i.e., [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))*

**To install:**

Either:
- Copy/paste the code in the ```.user.js``` file to a new userscript with your userscript manager, **OR**
- View the ```.user.js``` file in the browser and user profile where you'd like to install the userscript, then click the button labeled ```Raw```, **OR**
- Using the browser and user profile where you'd like to install the userscript, click [this shortcut](https://github.com/salembeats/ss700VibrationApi/raw/master/userscript/ss700VibrationApi.user.js)*.
