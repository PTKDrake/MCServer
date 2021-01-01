const util = global.nodemodule['minecraft-server-util'];
function bedrock(type, data){
    let args = data.args;
    args.shift();
    let port = 19132;
    if (args.length > 1 && !isNaN(args[1])) port = parseInt(args[1]);
    let ip = args[0];
    util.statusBedrock(ip, {port: port, enableSRV: true, timeout: 5000}).then(res => {
        let msg = `Thông tin về server ${ip}:${port}:`;
        msg += `\nMotd: "${res.motdLine1.descriptionText.replace(/§[0-9a-z]{1}/g, '')}"`;
        msg += `\nVersion: "${res.version}"`;
        msg += `\nPlayers: ${res.onlinePlayers}/${res.maxPlayers}`;
        data.return({
            handler: 'internal',
            data: msg
        });
    }).catch(e => {
        data.return({
            handler: 'internal',
            data: `Server ${ip}:${port} hiện không online.`
        });
    })
}

function java(type, data){
    let args = data.args;
    args.shift();
    let port = 25565;
    if (args.length > 1 && !isNaN(args[1])) parseInt(args[1]);
    let ip = args[0];
    util.status(ip, {port: port, enableSRV: true, timeout: 5000}).then(res => {
        let msg = `Thông tin về server ${ip}:${port}:`;
        msg += `\nMotd: "${res.description.descriptionText.replace(/§[0-9a-z]{1}/g, '')}"`;
        msg += `\nVersion: "${res.version}"`;
        msg += `\nPlayers: ${res.onlinePlayers}/${res.maxPlayers}`;
        data.return({
            handler: 'internal',
            data: msg
        });
    }).catch(e => {
        data.return({
            handler: 'internal',
            data: `Server ${ip}:${port} hiện không online.`
        });
    })
}

module.exports = {
    bedrock, java
};
