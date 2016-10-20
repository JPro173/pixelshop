var anim_text = document.getElementById('anim_text');
t = 0;
maxT = 100;
function animate(){
	defaultDraw();
	t++;
	if (!t) t = 0;
	eval(anim_text.value);
	if (t < maxT) window.setTimeout(animate, 20);
}