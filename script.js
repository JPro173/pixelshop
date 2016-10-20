var width = document.getElementById('canv').width;
var height = document.getElementById('canv').height;
var g = document.getElementById('canv').getContext('2d');
var text = document.getElementById('text');
g.font="20px Georgia";
w = width;
h = height;
c = "#000";

var t = 0;

$(document).keyup(function (e) {
    if (e.keyCode == 27) onInput();
    console.log(123)
});
var tout;
function onInput(){
    try{
        defaultDraw();
        t = 0;
        eval(text.value);
    }catch(e){
        console.log(e);
    }
        //tout = window.setTimeout(animate, 20);
}

function defaultDraw(){
    g.fillStyle = '#FFF';
    g.fillRect(0,0,width, height);
    g.fillStyle = '#000';
}

function log(smt){
    console.log(smt);
}

function lerp(a, b, t){
    var l = t / (1 - t);
    return new p((a.x + l*b.x) / (1+l), (a.y + l*b.y) / (1+l));
}

function loadScript(url, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}
