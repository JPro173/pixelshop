function p(x, y){
    this.x = x;
    this.y = y;
};

function curve(p1, p2, shp){
    this.p1_ = p1;
    this.p2_ = p2;
    this.b1_ = new p((this.p1_.x + this.p2_.x) / 2, (this.p1_.y + this.p2_.y) / 2);
    this.b2_ = new p((this.p1_.x + this.p2_.x) / 2, (this.p1_.y + this.p2_.y) / 2);
    this.offset = new p (0, 0);
    var shp = shp;
    this.stroke = function(){
        g.moveTo(this.offset.x + this.p1_.x, this.offset.y + this.p1_.y);
        g.bezierCurveTo(this.offset.x + this.b1_.x, this.offset.y + this.b1_.y, this.offset.x + this.b2_.x, this.offset.y + this.b2_.y, this.offset.x + this.p2_.x, this.offset.y + this.p2_.y);
    };
    this.draw = function(){
        g.bezierCurveTo(this.offset.x + this.b1_.x, this.offset.y + this.b1_.y, this.offset.x + this.b2_.x, this.offset.y + this.b2_.y, this.offset.x + this.p2_.x, this.offset.y + this.p2_.y);
    };
    this.draw2 = function(){
        g.bezierCurveTo(this.offset.x + this.b2_.x, this.offset.y + this.b2_.y, this.offset.x + this.b1_.x, this.offset.y + this.b1_.y, this.offset.x + this.p1_.x, this.offset.y + this.p1_.y);
    }
    this.drawHelp = function(){
        //help line 1
        g.beginPath();
        var fColor = g.strokeStyle;
        g.strokeStyle = 'green';
        g.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        g.moveTo(this.p1_.x+this.offset.x, this.p1_.y+this.offset.y);
        g.lineTo(this.b1_.x+this.offset.x, this.b1_.y+this.offset.y);
        g.stroke();
        //help line 2
        g.beginPath();
        g.moveTo(this.p2_.x+this.offset.x, this.p2_.y+this.offset.y);
        g.lineTo(this.b2_.x+this.offset.x, this.b2_.y+this.offset.y);
        g.strokeStyle = 'rgba(0, 0, 255, 0.3)';
        g.stroke();
        g.beginPath()
        g.stroke()
        g.strokeStyle = fColor;
    }
    this.b = function(x1, y1, x2, y2, b){
        if (b){
            this.b1_ = new p(x1, y1);
            this.b2_ = new p(x1, y1);
            return;
        }
        this.b1_.x += x1;
        this.b1_.y += y1;
        this.b2_.x += x2;
        this.b2_.y += y2;
    };
    this.b1 = function(x1, y1, b){
        if (b){
            this.b1_ = new p(x1, y1);
            return;
        }
        this.b1_.x += x1;
        this.b1_.y += y1;
    };
    this.b2 = function(x1, y1, b){
        if (b){
            this.b2_ = new p(x1, y1);
            return;
        }
        this.b2_.x += x1;
        this.b2_.y += y1;
    };

    this.p1 = function(x, y){
        this.p1_ = new p(x, y);
    }

    this.p2 = function(x, y){
        this.p2_ = new p(x, y);
    }
    this.points = function(){
        return [this.p1_,
                this.b1_,
                this.b2_,
                this.p2_]
    }
    this.p = function(x, y, x2, y2){
        this.p1_ = new p(x, y);
        this.p2_ = new p(x2, y2);
    }

    this.m1 = function(x, y){
        this.p1_.x += x;
        this.p1_.y += y;
        this.b1_.x += x;
        this.b1_.y += y;
    }

    this.m2 = function(x, y){
        this.p2_.x += x;
        this.p2_.y += y;
        this.b2_.x += x;
        this.b2_.y += y;
    }

    this.m = function(x1, y1, x2, y2){
        this.p1_.x += x1;
        this.p1_.y += y1;
        this.p2_.x += x2;
        this.p2_.y += y2;
        this.b1_.x += x;
        this.b1_.y += y;
        this.b2_.x += x;
        this.b2_.y += y;
    }

    this.get = function(t){
        var c0 = (1 - t) * (1 - t) * (1 - t);
        var c1 = (1 - t) * (1 - t) * 3 * t;
        var c2 = (1 - t) * t * 3 * t;
        var c3 = t * t * t;
        var x = c0 * this.p1_.x + c1 * this.b1_.x + c2 * this.b2_.x + c3 * this.p2_.x;
        var y = c0 * this.p1_.y + c1 * this.b1_.y + c2 * this.b2_.y + c3 * this.p2_.y;
        return new p(x, y);
    };
};
