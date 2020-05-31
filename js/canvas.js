/**
 * Two-dimensional point
 */
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    scale(scaling) {
        return new Vector(this.x * scaling.x, this.y * scaling.y);
    }
    translate(translation) {
        return new Vector(this.x + translation.x, this.y + translation.y);
    }
}

/**
 * Two two-dimensional points, representing a rectangle's bottom left corner, and dimensions
 */
class Rectangle {
    constructor(point, dimensions) {
        this.point = point;
        this.dimensions = dimensions;
    }
    get x() {
        return this.point.x;
    }
    get y() {
        return this.point.y;
    }
    get height() {
        return this.dimensions.y;
    }
    get width() {
        return this.dimensions.x;
    }
    get area() {
        return this.width * this.height;
    }
    asShape(fill, stroke) {
        var points = [
            new Vector(this.x, this.y),
            new Vector(this.x, this.y + this.height),
            new Vector(this.x + this.width, this.y + this.height),
            new Vector(this.x + this.width, this.y),
        ];
        return new Shape(points, fill, stroke);
    }
}

class Line {
    constructor(tail, head) {
        this.tail = tail;
        this.head = head;
        this.width = 1/4;
    }
    asShape() {
        var points = [
            new Vector(this.tail.x - this.width/2, this.tail.y - this.width/2),
            new Vector(this.head.x - this.width/2, this.head.y + this.width/2),
            new Vector(this.head.x + this.width/2, this.head.y + this.width/2),
            new Vector(this.tail.x + this.width/2, this.tail.y - this.width/2),
        ];
        return new Shape(points);
    }
    static fromTailVector(tail, vector) {
        return new Line(tail, tail.translate(vector));
    }
}

/**
 * Set of bounding points, with fill and stroke colors
 */
class Shape {
    constructor(points, fill, stroke) {
        this.points = points;
        this.fill = fill || "black";
        this.stroke = stroke || this.fill;
    }
}
