var ipc = require('electron').ipcMain;
var fs = require("fs");
//import PropertiesReader from "../utils/config-utils";


ipc.on('do-job-server', function(event, data){
    /*const notification = new Notification('Salut le code serveur !!!', {
        body: 'Le test est OK !!!'
    });*/
    console.log('Salut le code serveur !!!');
    console.log('Le user est ' + data.user);
    console.log('Le vieux mot de passe est ' + data.oldPwd);
    console.log('Le nouveau mot de passe est ' + data.newPwd);
    console.log('La confirmation du mot de passe est ' + data.newPwdConfirm);
    if (data.newPwd !== data.newPwdConfirm) {
        event.sender.send('controles-ko', {
            type: 'CONFIRMATION'
        })
    }
    //console.log(new Buffer(data.user + ':' + data.oldPwd).toString('base64'));
    var PropertiesReader = require('../utils/config-utils');
    var properties = PropertiesReader('/home/lynchmaniac/.npmrc');
    var currentValue = properties.get('authentification');
    var oldPwdBase64 = new Buffer(data.user + ':' + data.oldPwd).toString('base64');

    if (currentValue !== oldPwdBase64) {
        event.sender.send('controles-ko', {
            type: 'OLD'
        })
    }

    properties.set('authentification', new Buffer(data.user + ':' + data.newPwd).toString('base64'));
    //console.log(properties.get('authentification'));
    properties.save('/home/lynchmaniac/.npmrc', callbackFail);
    event.sender.send('controles-ok');

});

function callbackFail() {
    console.log('Echec de la sauvegarde du fichier de configuration de npm...')
}