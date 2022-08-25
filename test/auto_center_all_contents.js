var path1 = new Path.Circle({
    center: [150, 100],
    radius: 50,
    strokeColor: 'red'
});
path1.fillColor = 'green';
path1.selected = true;

var path2 = new Path.Circle({
    center: [100, 50],
    radius: 20,
    strokeColor: 'red'
});
path2.fillColor = 'red';

var rectangle = new Rectangle(new Point(250, 50), new Point(500, 150));
var path = new Path.Rectangle(rectangle);
path.fillColor = '#e9e9ff';
path.selected = true;

var boolResult = path1.subtract(path2);
boolResult.strokeWidth = 0;
boolResult.fullySelected = true;
boolResult.position = paper.view.center;

var movingContent = project.activeLayer.children;
var handGroup = new Group();

console.log(movingContent.length);
for (i = 0; i < movingContent.length; i++) {
    if (movingContent[i] == handGroup) {
        console.log('this item ', movingContent[i], 'is not added');
        break;
    }
    handGroup.addChild(movingContent[i]);
    console.log(handGroup.children);
}


function onMouseDown(event) {
    console.log(path1.position);
    console.log(paper.view.center);
    var newDelta = new Point(paper.view.center.x - handGroup.position.x, paper.view.center.y - handGroup.position.y);
    console.log('the distance of path1 from the center is ', newDelta);

    for (var i = 0; i < movingContent.length; i++) {
        movingContent[i].position += newDelta;
    }
    console.log(handGroup.position);
    handGroup.bounds.selected = true;
    console.log('after mouse down the group children is ', handGroup.children);
}

function onMouseDrag(event) {
    for (var i = 0; i < movingContent.length; i++) {
        movingContent[i].position += event.delta;
    }
}
