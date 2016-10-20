shape
	+a
	+b
	+move(x, y);
	.curve($begin $end) - создает/выбирает или создает кривую
	.$ - выбирает точку

curve
	.point(t)
	.b(x1, y1, x2, y2)

point
	.conect(x, y) - создает кривую к {x, y};


о.т. - опорная точка
var a = new shape();
a.break({r:0.25, m:0.5, l:0.75});
a.point('r l').move(0, 50); //выбираем точки r,l и перемещаем
a.m.move(70); //выбираем точку m и перемещаем
a.curve('r m').base.rotate(30); //выбираем кривую r m и вращаем вокруг r
a.curve('m r').base.rotate(30); //выбираем кривую r m и вращаем вокруг m
//a.connect('r l').base.rotate(30); //создает линию от r до l вращаем вокруг r
a.curve('r l').base.move(30, 30);//перемещаем о.т. кривой r l точки r


