const electron = require('electron');
const path = require('path');
const ipc= electron.ipcRenderer;
const BrowerWindow = electron.remote.BrowserWindow 

// DOM variables
var setTime=document.getElementById('time');
var input=document.getElementById('input');
var color1=document.getElementById('color-1');
var color2=document.getElementById('color-2');
var color3=document.getElementById('color-3');
var color4=document.getElementById('color-4');
var git=document.getElementById('github');
var twit=document.getElementById('twitter');
var codpen=document.getElementById('codepen');


//set the colorPalettes
color1.style.backgroundColor="#ff00c8";
color2.style.backgroundColor="#17223b";
color3.style.backgroundColor="#ffbd39";
color4.style.backgroundColor="#8a00d4";

//Get the time and display it in the DOM
setInterval(function(){
var time=new Date().toLocaleTimeString(); 
setTime.innerHTML=time;
},1);



//Events
input.addEventListener('keypress',function(key){
      if(key.keyCode=="13")
    {   
      if(input.value!="")
      {
        key.preventDefault();
        setTime.style.color="#"+input.value;
        electron.shell.beep();
        input.value="";
      }
    }
});

setTime.addEventListener('click', function(){
  ipc.send('changeColor',this.style.color);
});

color1.addEventListener('click',function(){
  setTime.style.color=this.style.backgroundColor;
});

color2.addEventListener('click',function(){
  setTime.style.color=this.style.backgroundColor;
});

color3.addEventListener('click',function(){
  setTime.style.color=this.style.backgroundColor;
});

color4.addEventListener('click',function(){
  setTime.style.color=this.style.backgroundColor;
});

git.addEventListener('click', function(){
  electron.shell.openExternal('https://github.com/paanTom');
});

twit.addEventListener('click', function(){
  electron.shell.openExternal('https://twitter.com/1o1aqib');
});

codpen.addEventListener('click', function(){
  electron.shell.openExternal('https://codepen.io/paantom');
});
