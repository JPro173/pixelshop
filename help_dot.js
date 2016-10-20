var help_dot = function(x_, y_){
    this.x = x_,
    this.y = y_;
}

var rect = function(x1, y1, x2, y2, color){
    var rect = new shape(x1, y1, x2, y1);
    rect.add('c b', x2, y2);
    rect.add('d c', x1, y2);
    rect.connect('d a');
    rect.color(color, color);
    return rect;
}

var circle = function(x, y, r, color){
    var sh = new shape(x, x-r, x, x+r);
    sh.curve('a b').b(r*Math.sqrt(2), -r, r*Math.sqrt(2), r);
    sh.add('c b', x, x-r).b(-r*Math.sqrt(2), -r, -r*Math.sqrt(2), r);
    sh.connect('a c');
    sh.color(color, color);
    return sh;
}
