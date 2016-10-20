function shape(x1, y1, x2, y2){
    this.a = new p(x1, y1),
    this.b = new p(x2, y2),
    this.c1 = '', this.c2 = '',
    this.color = function(c1, c2){
        this.c1 = c1;
        this.c2 = c2;
    }
    this.move = function(x, y){
        for (c in this){
            if (c != 'undefined' && this[c].x !== undefined){
                this[c].x += x;
                this[c].y += y;
            }
        }
        for (i in this._curves){
            if (this._curves[i].b1_ !== undefined){
                this._curves[i].b1_.x += x;
                this._curves[i].b1_.y += y;
                this._curves[i].b2_.x += x;
                this._curves[i].b2_.y += y;
            }
        }
    }
    this.pos = function(x, y){
        for (i in this._curves){
            if (this._curves[i].b1_ !== undefined){
                this._curves[i].b1_.x = this._curves[i].b1_.x - this._curves[i].p1_.x + x;
                this._curves[i].b1_.y = this._curves[i].b1_.y - this._curves[i].p1_.y + y;;
                this._curves[i].b2_.x = this._curves[i].b2_.x - this._curves[i].p2_.x + x;;
                this._curves[i].b2_.y = this._curves[i].b2_.y - this._curves[i].p2_.y + y;;
            }
        }
        for (c in this){
            if (c != 'undefined' && this[c].x !== undefined){
                this[c].x = x;
                this[c].y = y;
            }
        }
    }
    this._help_dots = [];
    this.dot = function(x, y){
        this._help_dots.push(new help_dot(x, y));
    }
    this._curves = [new curve(this.a, this.b, this)];
    this.curve = function(s){
        var s1 = s.split(' ')[0];
        var s2 = s.split(' ')[1];
        for (i in this._curves){
            if ((this._curves[i].p1_ == this[s1] &&
                this._curves[i].p2_ == this[s2]) ||
                (this._curves[i].p1_ == this[s2] &&
                this._curves[i].p2_ == this[s1]))
                return this._curves[i];
        }
    }
    this.draw = function(help){
        g.strokeStyle = this.c1;
        g.fillStyle = this.c2;
        g.beginPath();
        help = help || '';
        if (1+help.indexOf('f')){
            this.fill_();
        }else{
            for (i in this._curves){
                if (this._curves[i].stroke != undefined)
                    this._curves[i].stroke();
            }
            g.stroke();
        }
        if (1+help.indexOf('b')){
            for (i in this._curves){
                if (this._curves[i].stroke != undefined)
                    this._curves[i].drawHelp(1+help.indexOf('b'));
            }
        }
        if (1+help.indexOf('c')){
            var fColor = g.fillStyle;
            g.fillStyle = 'green';
            for (i in this){
                if (i != 'undefined' && this[i].x != undefined){
                    this[i].offset = {x: 0, y: 0};
                    g.fillText(i,this[i].x + this[i].offset.x,this[i].y-10 + this[i].offset.y)
                }
            }
            g.fillStyle = fColor;
        }
        for (dot of this._help_dots){
            var fColor = g.fillStyle;
            g.fillStyle = 'yellow';
            g.beginPath();
            g.arc(dot.x, dot.y, 3, 0, 2*Math.PI);
            g.fill();
            g.fillStyle = fColor;
        }
    }
    this.fill_ = function(){
        var lastP2 = 0;
        var used = [];
        for (var j = 0; j < this._curves.length; j++){
            for (i in this._curves){
                if (this._curves[i].stroke == undefined) continue;
                if (used.indexOf(''+i) >= 0) continue;
                if (lastP2 == 0 || lastP2 == this._curves[i].p1_){
                    used.push(i);
                    if (lastP2 == 0) g.moveTo(this._curves[i].offset.x + this._curves[i].p1_.x, this._curves[i].offset.y + this._curves[i].p1_.y)
                    this._curves[i].draw();
                    lastP2 = this._curves[i].p2_;
                }
                else if (lastP2 == 0 || (lastP2.x == this._curves[i].p2_.x && lastP2.y == this._curves[i].p2_.y)){
                    used.push(i);
                    if (lastP2 == 0) g.moveTo(this._curves[i].p2_.x, this._curves[i].p2_.y)
                    this._curves[i].draw2();
                    lastP2 = this._curves[i].p1_;
                }
            }
        }
        g.fill();
    }
    this.connect = function(s){
        s = s.split(' ');
        var cur = new curve(this[s[0]], this[s[1]], this);
        this._curves.push(cur);
        return cur;
    }
    this.add = function(s, x, y){
        if (typeof(x) == 'string'){
            //De Casteljau's algorithm
            var s1 = s.split(' ')[0];
            var s2 = s.split(' ')[1];
            var t = y;
            if (t == 1 || t == 0) return;
            var oldP2 = this[s1];
            var new_curves = divideBezierCurve(this.curve(s).points(), t);
            this[x] = new_curves[0][3]//this.curve(s).get(t);
            this.curve(s).b1_ = new_curves[1][2];
            this.curve(s).b2_ = new_curves[1][1];
            var popCurve = new curve(this[x], oldP2, this);
            popCurve.b1_ = new_curves[0][2];
            popCurve.b2_ = new_curves[0][1];
            this._curves.push(popCurve);
            this.curve(s).p1_ = this[x];
            return popCurve;
        }
        s = s.split(' ');
        this[s[0]] = new p(x, y);
        var cur = new curve(this[s[0]], this[s[1]], this);
        this._curves.push(cur);
        return cur;
    }
    this.link = function(p2){
        for (i in this._curves)
            if (this._curves[i].offset != undefined)
                this._curves[i].offset = p2;
    }
}
function divideBezierCurve (points, t, bezierA, bezierB) {
    bezierA = bezierA || [];
    bezierB = bezierB || [];

    bezierA.push(points[0]);
    bezierB.push(points[points.length - 1]);

    if (points.length === 1) {
        return [bezierA, bezierB];
    }

    var calculatedPoints = [];

    for (var i = 1, len = points.length; i < len; i++) {
        calculatedPoints.push(calculatePoints([points[i - 1], points[i]], t));
    }

    return divideBezierCurve(calculatedPoints, t, bezierA, bezierB);
}


function calculatePoints (points, t) {
    var p1X = points[0]['x'], //x coord of first point
        p1Y = points[0]['y'], //y coord of first point
        p2X = points[1]['x'], //x coord of second point
        p2Y = points[1]['y']; //y coord of second point

    var pInterX = p1X + (p2X - p1X) * t,
        pInterY = p1Y + (p2Y - p1Y) * t;

    return {'x':pInterX, 'y':pInterY};
}

