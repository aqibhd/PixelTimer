const electron = require('electron');
const path = require('path');
const ipc= electron.ipcRenderer;
const BrowerWindow = electron.remote.BrowserWindow 

//DOM variables
var setTimeSecondary=document.getElementById('hello');

//Get the time and display it in the DOM
setInterval(function(){
    var time=new Date().toLocaleTimeString(); 
    setTimeSecondary.innerHTML=time;
    },1);

//Events
ipc.on('color',function(event,arg){
    console.log(arg);
    setTimeSecondary.style.color=arg;
});