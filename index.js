const schedule = require('node-schedule');
const { Client } = require('tplink-smarthome-api');
const client = new Client();

// todo: make this configurable
let deviceIP = '192.168.0.83';
let alarms = [];

const defaultOptions = {
    transitionTime: 30000,
    colorTemp: 2700,
    brightness: 50
}


let CSRule = new schedule.RecurrenceRule();
CSRule.hour = 7;
CSRule.minute = 0;
CSRule.dayOfWeek = [1, 3, 5];

let latinRule = new schedule.RecurrenceRule();
latinRule.hour = 8;
latinRule.minute = 15;
latinRule.dayOfWeek = [2, 4];

schedule.scheduleJob(CSRule, startAlarm);
schedule.scheduleJob(latinRule, startAlarm);


function startAlarm(){
    console.log('starting alarm');
    client.getDevice({host: deviceIP}).then(device => {
        console.log('got device');
        sunriseAlarm(device, defaultOptions);
    });
}


function sunriseAlarm(device, {brightness, transitionTime, colorTemp}) {
    device.lighting.setLightState({
        on_off: true,
		brightness: brightness,
		transition_period: transitionTime,
		color_temp: colorTemp
	})
}
