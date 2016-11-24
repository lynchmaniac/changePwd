//const {ipcRenderer, remote} = require('electron');
var ipcRenderer = require('electron').ipcRenderer;
var btnChangePwd = document.getElementById('changePwd');

btnChangePwd.onclick = () => {
/*    const notification = new Notification('Salut !!!', {
        body: 'Le test est OK !!!'
    });*/
  ipcRenderer.send('do-job-server', {
      user: document.getElementById('username').value,
      oldPwd: document.getElementById('oldPwd').value,
      newPwd: document.getElementById('newPwd').value,
      newPwdConfirm: document.getElementById('newPwdConfirm').value
  });

}

ipcRenderer.on('controles-ko', (e, data) => {
    var message = '';
    if (data.type === 'CONFIRMATION') {
        message = 'Le mot de passe et sa confirmation ne coincide pas';
    }
    if (data.type === 'OLD') {
        message = "L'ancien mot de passe Lotus ou l'utilisateur sont érronés";
    }
    const notification = new Notification('Echec du changement de mot de passe...', {
        body: message
    });
});

ipcRenderer.on('controles-ok', (e) => {
    document.getElementById('winner').style.display = 'block';
    document.getElementById("username").style.display = 'none';
    document.getElementById("oldPwd").style.display = 'none';
    document.getElementById("newPwd").style.display = 'none';
    document.getElementById("newPwdConfirm").style.display = 'none';

    const notification = new Notification('Changement de mot de passe OK...', {
        body: 'Le changement de mot de passe NPM a été réalisé avec succès'
    });
});

/*document.getElementById('save').onclick = () => {
  ipcRenderer.send('save-meme', {
    title: document.getElementById('title').value,
    texts: textareas.map((t) => {
      return {
        isTop: t.isTop,
        text: t.text
      }
    })
  })
}*/