// aim to make a smooth and reliable software tool like adobe illustrator
// globals
paper.install(window);
var artboard;
var path;
var group;
var selectGroup;
var changeTool;
var segment, path, handles;
var movePath = false;
var currentSegment, mode, type;
var shapeTrim1, shapeTrim2, shapeTrim3, shapeResult, combinedShape, combinedShape2, cloneCopy;
var newZoom, zoomStartPos, zoomEndPos, mousePosition, viewPosition;
var handToolPan, artboardMove, diffDelta, pathScaled;


// get the html element and add click function
document.getElementById('freePen').addEventListener("click", freePenFunction);
document.getElementById('moveTool').addEventListener("click", moveToolFunction);
document.getElementById('pathEdit').addEventListener("click", pathEditing);
document.getElementById('penTool').addEventListener("click", penTool);
document.getElementById('zoomTool').addEventListener("click", zoomTool);
document.getElementById('shapeTrimmer').addEventListener("click", shapeTrimmer);
document.getElementById('handTool').addEventListener("click", handTool);

var toolFreePen = document.getElementById('freePen');
var toolMove = document.getElementById('moveTool');
var toolPathEdit = document.getElementById('pathEdit');
var toolPen = document.getElementById('penTool');
var toolZoom = document.getElementById('zoomTool');
var toolShapeTrim = document.getElementById('shapeTrimmer');
var toolHand = document.getElementById('handTool');

// key down global
tool.onKeyDown = function (event) {
    // toolSwitch section from pen
    if (event.key == 'z') {
        return zoomTool();
    }
    if (event.key == 'p') {
        return penTool();
    }
    if (event.key == 'a') {
        return pathEditing();
    }
    if (event.key == 'h') {
        return handTool();
    }
    if (event.key == 's') {
        return shapeTrimmer();
    }
    if (event.key == 'n') {
        return freePenFunction();
    }
    if (event.key == 'v') {
        return moveToolFunction();
    }
}

// creating function for each element
function pathEditing() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.add("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");

    console.log('the template of shape trimmer is ', shapeTrim1, shapeTrim2, shapeTrim3);
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
        console.log('shapetrimmer template is successfully removed');
    }
    return changeTool = 'pathEdit';
}
function moveToolFunction() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.add("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");

    console.log('the template of shape trimmer is ', shapeTrim1, shapeTrim2, shapeTrim3);
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
        console.log('shapetrimmer template is successfully removed');
    }
    return changeTool = 'moveTool';
}
function freePenFunction() {
    toolFreePen.classList.add("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");

    console.log('the template of shape trimmer is ', shapeTrim1, shapeTrim2, shapeTrim3);
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
        console.log('shapetrimmer template is successfully removed');
    }
    return changeTool = 'pen';
}
function penTool() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.add("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");

    console.log('the template of shape trimmer is ', shapeTrim1, shapeTrim2, shapeTrim3);
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
        console.log('shapetrimmer template is successfully removed');
    }
    return changeTool = 'penTool';
}
function zoomTool() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.add("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");

    console.log('the template of shape trimmer is ', shapeTrim1, shapeTrim2, shapeTrim3);
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
        console.log('shapetrimmer template is successfully removed');
    }
    return changeTool = 'zoomTool';
}
function handTool() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.add("toolToggle");

    console.log('the template of shape trimmer is ', shapeTrim1, shapeTrim2, shapeTrim3);
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
        console.log('shapetrimmer template is successfully removed');
    }
    return changeTool = 'handTool';
}
function shapeTrimmer() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.add("toolToggle");
    toolHand.classList.remove("toolToggle");

    if (selectGroup.length > 2) return alert('sorry we cant operate more than 2 objects');
    // converts the array selectGroup into a group first
    selectGroup = new Group(selectGroup);
    // continue if selectGroup is not null or it has a value greater then 1
    if (selectGroup && selectGroup.children.length > 1) {
        console.log(selectGroup.children);
        selectGroup.children[0].bounds.selected = false;
        selectGroup.children[1].bounds.selected = false;
        shapeTrim1 = selectGroup.children[0].subtract(selectGroup.children[1]);
        shapeTrim2 = selectGroup.children[0].intersect(selectGroup.children[1]);
        shapeTrim3 = selectGroup.children[1].subtract(selectGroup.children[0]);
        shapeTrim1.bounds.selected = false;
        shapeTrim2.bounds.selected = false;
        shapeTrim3.bounds.selected = false;

        if (shapeTrim1 && shapeTrim1.segments != undefined && shapeTrim1.segments.length > 2) {
            shapeTrim1.selected = true;
            shapeTrim1.fillColor = { hue: 240, alpha: 0.01 };
            selectGroup.addChild(shapeTrim1);
            console.log('the shapetrim 1 success');
        } else {
            console.log('the shapetrim 1 is not added');
        }
        if (shapeTrim2 && shapeTrim2.segments != undefined && shapeTrim2.segments.length > 2) {
            shapeTrim2.selected = true;
            shapeTrim2.fillColor = { hue: 240, alpha: 0.01 };
            selectGroup.addChild(shapeTrim2);
            console.log('the shapetrim 2 success');
        } else {
            console.log('the shapetrim 2 is not added');
        }
        if (shapeTrim3 && shapeTrim3.segments != undefined && shapeTrim3.segments.length > 2) {
            shapeTrim3.selected = true;
            shapeTrim3.fillColor = { hue: 240, alpha: 0.01 };
            selectGroup.addChild(shapeTrim3);
            console.log('the shapetrim 3 success');
        } else {
            console.log('the shapetrim 3 is not added');
        }
    } else {
        console.log('selectGroup is not ready, because we dont operate with 1 value');
    }
    return changeTool = 'shapeTrimmer';
}

// some usefull objects
// var textItem = new PointText({
//     content: 'You can drag our tool box where ever you want',
//     point: new Point(20, 50),
//     fillColor: 'black',
// });

var rectangle = new Rectangle(new Point(0, 0), new Point(850, 1100));
artboard = new Path.Rectangle(rectangle);
artboard.position = paper.view.center;
artboard.fillColor = 'white';
artboard.locked = true;

var values = {
    paths: 50,
    minPoints: 5,
    maxPoints: 15,
    minRadius: 30,
    maxRadius: 90
};

var hitOptions = {
    segments: true,
    handles: true,
    stroke: true,
    fill: true,
    bounds: true,
    tolerance: 5
};

var hitOptionsDrag = {
    segments: true,
    handles: true,
    stroke: true,
    fill: true,
    bounds: true,
    tolerance: 20
};

// global functions
var types = ['point', 'handleIn', 'handleOut'];
function findHandle(point) {
    for (var i = 0, l = path.segments.length; i < l; i++) {
        for (var j = 0; j < 3; j++) {
            var type = types[j];
            var segment = path.segments[i];
            var segmentPoint = type == 'point'
                ? segment.point
                : segment.point + segment[type];
            var distance = (point - segmentPoint).length;
            if (distance < 3) {
                return {
                    type: type,
                    segment: segment
                };
            }
        }
    }
    return null;
}
// mouseDown section
function onMouseDown(event) {
    // freepen section
    if (changeTool === 'pen') {
        tool.onKeyDown = function (event) {
            // toolSwitch section from pen
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'a') {
                return pathEditing();
            }
            if (event.key == 'h') {
                return handTool();
            }
            if (event.key == 's') {
                return shapeTrimmer();
            }
            if (event.key == 'n') {
                return freePenFunction();
            }
            if (event.key == 'v') {
                return moveToolFunction();
            }
        }
        // If we produced a path before, deselect it:
        if (path) {
            path.selected = false;
        }

        // Create a new path and set its stroke color to black:
        path = new Path({
            segments: [event.point],
            strokeColor: 'black',
            // Select the path, so we can see its segment points:
            fullySelected: true
        });
    }
    // moveTool section
    if (changeTool === 'moveTool') {
        segment = path = handles = null;
        // move keyboard interaction
        tool.onKeyDown = function (event) {
            if (event.key == 'delete') {
                if (!path) {
                    alert('anong buburahin mo?');
                } else {
                    path.remove();
                    console.log('nabura na ang pangit na path idolo');
                    return false;
                }
            }

            if (event.key == '[') {
                if (selectGroup && selectGroup.length > 0) {
                    for (i = 0; i < selectGroup.length; i++) {
                        selectGroup[i].sendToBack();
                        artboard.sendToBack();
                    }
                } else {
                    console.log('the selectGroup is false or undefined');
                }
            }

            if (event.key == ']') {
                if (selectGroup && selectGroup.length > 0) {
                    for (i = 0; i < selectGroup.length; i++) {
                        selectGroup[i].bringToFront();
                        artboard.sendToBack();
                    }
                } else {
                    console.log('the selectGroup is false or undefined');
                }
            }

            if (event.key == '}') {
                if (selectGroup && selectGroup.length > 0) {
                    console.log('dapat aangat ang item');
                } else {
                    console.log('the selectGroup is false or undefined');
                }
            }

            if (event.key == '{') {
                if (selectGroup && selectGroup.length > 0) {
                    console.log('dapat bababa ang item');
                } else {
                    console.log('the selectGroup is false or undefined');
                }
            }

            // toolSwitch section
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'a') {
                return pathEditing();
            }
            if (event.key == 'h') {
                return handTool();
            }
            if (event.key == 's') {
                return shapeTrimmer();
            }
            if (event.key == 'n') {
                return freePenFunction();
            }
            if (event.key == 'v') {
                return moveToolFunction();
            }
        }

        // move hitest
        var hitResult = project.hitTest(event.point, hitOptions);
        if (hitResult && hitResult.type != 'bounds') {
            path = hitResult.item;
            path.selected = true;
            selectGroup = project.selectedItems;
            console.log(selectGroup);
            console.log('selectGroup length is ', selectGroup.length);

            if (selectGroup.length > 0) {
                for (i = 0; i < selectGroup.length; i++) {
                    selectGroup[i].bounds.selected = true;
                }
            }
            if (event.modifiers.alt) {
                if (selectGroup.length > 0) {
                    for (i = 0; i < selectGroup.length; i++) {
                        selectGroup[i].selected = false;
                        selectGroup[i].bounds.selected = false;
                        cloneCopy = selectGroup[i].clone();
                        cloneCopy.selected = true;
                    }
                };
                selectGroup.selected = false;
                return;
            }
            return selectGroup;
        }
        // if there is no hit
        if (!hitResult) {
            pathScaled = null;
            if (selectGroup) {
                for (i = 0; i < selectGroup.length; i++) {
                    selectGroup[i].bounds.selected = false;
                }
            } else {
                console.log('wala pang selection ang move tool');
            }
            project.activeLayer.selected = false;
            project.activeLayer.fullySelected = false;
            console.log(selectGroup);
            return selectGroup = [];
        }
    }
    // path editing section
    if (changeTool === 'pathEdit') {
        console.log('path Editing tool is working');
        segment = path = handles = null;
        tool.onKeyDown = function (event) {
            if (event.key == 'delete') {
                if (!path) {
                    alert('anong buburahin mo?');
                } else {
                    path.remove();
                    console.log('nabura na ang pangit na path idolo');
                    return false;
                }
            }
            // toolSwitch section from pen
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'a') {
                return pathEditing();
            }
            if (event.key == 'h') {
                return handTool();
            }
            if (event.key == 's') {
                return shapeTrimmer();
            }
            if (event.key == 'n') {
                return freePenFunction();
            }
            if (event.key == 'v') {
                return moveToolFunction();
            }
        }
        var hitResult = project.hitTest(event.point, hitOptions);
        if (!hitResult)
            return;
        // event modifiers section
        if (event.modifiers.alt) {
            if (hitResult.type == 'segment') {
                hitResult.segment.handleOut = null;
            };
            return;
        }

        if (event.modifiers.shift) {
            if (hitResult.type == 'segment') {
                if (hitResult.segment.handleIn != null) {
                    hitResult.segment.handleIn = null;
                } else {
                    console.log('walang handle in and segment');
                }
            };
            return;
        }
        if (event.modifiers.control) {
            if (hitResult.type == 'segment') {
                hitResult.segment.smooth();
            };
            return;
        }
        if (event.modifiers.capsLock) {
            if (hitResult.type == 'segment') {
                hitResult.segment.remove();
            };
            return;
        }

        if (hitResult) {
            path = hitResult.item;
            if (hitResult.type == 'segment') {
                segment = hitResult.segment;
            } else if (hitResult.type == 'handle-in') {
                handles = hitResult.segment;
                handlePoints = hitResult.type;
            } else if (hitResult.type == 'handle-out') {
                handles = hitResult.segment;
                handlePoints = hitResult.type;
            } else if (hitResult.type == 'stroke') {
                var location = hitResult.location;
                segment = path.insert(location.index + 1, event.point);
            }
        }

        movePath = hitResult.type == 'fill';
        if (movePath) {
            project.activeLayer.addChild(hitResult.item);
            path.fullySelected = true;
        }
    }
    // for penTool section
    if (changeTool === 'penTool') {
        if (currentSegment)
            currentSegment.selected = false;
        mode = type = currentSegment = null;

        if (!path) {
            path = new Path();
            path.fillColor = {
                hue: 360 * Math.random(),
                saturation: 1,
                brightness: 1,
                alpha: 0.5
            };
            path.strokeColor = 'black';
        }

        var result = findHandle(event.point);
        if (result) {
            currentSegment = result.segment;
            type = result.type;

            // check if this event is on the first array of segments and closed the path if ever
            if (path.segments.length > 1 && result.type == 'point'
                && result.segment.index == 0) {
                mode = 'close';
                path.closed = true;
                path.selected = false;
                path = null;
            }
        }
        // if the event.point is not in the first array point of the segment? then add segement
        if (mode != 'close') {
            mode = currentSegment ? 'move' : 'add';

            tool.onKeyDown = function (event) {
                if (event.key == 'x') {
                    if (!currentSegment) {
                        alert('wala kapa ngang path');
                    } else {
                        currentSegment.remove();
                        currentSegment = path.lastSegment;
                        console.log('tuloy mo lang');
                        return false;
                    }
                }
                // toolSwitch section from pen
                if (event.key == 'z') {
                    return zoomTool();
                }
                if (event.key == 'p') {
                    return penTool();
                }
                if (event.key == 'a') {
                    return pathEditing();
                }
                if (event.key == 'h') {
                    return handTool();
                }
                if (event.key == 's') {
                    return shapeTrimmer();
                }
                if (event.key == 'n') {
                    return freePenFunction();
                }
                if (event.key == 'v') {
                    return moveToolFunction();
                }
            }

            if (!currentSegment) {
                currentSegment = path.add(event.point);
            }

            if (event.modifiers.alt) {
                if (currentSegment) {
                    currentSegment.handleOut = null;
                };
                return currentSegment.selected = true;
            }
            if (event.modifiers.shift) {
                if (currentSegment) {
                    currentSegment.handleIn = null;
                };
                return currentSegment.selected = true;
            }
            if (event.modifiers.control) {
                if (currentSegment) {
                    currentSegment.remove();
                };
                return currentSegment.selected = true;
            }

            currentSegment.selected = true;
        }
    }
    // for shapeTrimmer section
    if (changeTool === 'shapeTrimmer') {
        tool.onKeyDown = function (event) {
            // toolSwitch section from pen
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'a') {
                return pathEditing();
            }
            if (event.key == 'h') {
                return handTool();
            }
            if (event.key == 's') {
                return shapeTrimmer();
            }
            if (event.key == 'n') {
                return freePenFunction();
            }
            if (event.key == 'v') {
                return moveToolFunction();
            }
        }
        var hitResult = project.hitTest(event.point, hitOptions);
        if (selectGroup === undefined) return console.log('wala pa tayong selection');
        if (selectGroup.children.length > 1) {
            if (hitResult && hitResult.item && hitResult.item == shapeTrim1) {
                console.log('you  hit the shapeTrim1');
                if (shapeTrim1.segments != undefined && shapeTrim1.segments.length > 2) {
                    shapeResult = selectGroup.children[0].subtract(selectGroup.children[1]);
                    combinedShape = selectGroup.children[1];
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                    selectGroup.addChild(combinedShape);
                } else {
                    shapeResult = selectGroup.children[0].subtract(selectGroup.children[1]);
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                }
                return selectGroup = selectGroup.children;
            }
            if (hitResult && hitResult.item && hitResult.item == shapeTrim2) {
                console.log('you  hit the shapeTrim2');
                if (shapeTrim2.segments.length > 2) {
                    shapeResult = selectGroup.children[0].intersect(selectGroup.children[1]);
                    combinedShape = selectGroup.children[0].subtract(selectGroup.children[1]);
                    combinedShape2 = selectGroup.children[1].subtract(selectGroup.children[0]);
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                    selectGroup.addChild(combinedShape);
                    selectGroup.addChild(combinedShape2);

                }
                return selectGroup = selectGroup.children;
            }
            if (hitResult && hitResult.item && hitResult.item == shapeTrim3) {
                console.log('you  hit the shapeTrim3');
                if (shapeTrim3.segments != undefined && shapeTrim3.segments.length > 2) {
                    shapeResult = selectGroup.children[1].subtract(selectGroup.children[0]);
                    combinedShape = selectGroup.children[0];
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                    selectGroup.addChild(combinedShape);
                } else {
                    shapeResult = selectGroup.children[1].subtract(selectGroup.children[0]);
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                }
                return selectGroup = selectGroup.children;
            }
        }
    }
    // zoom section
    if (changeTool === 'zoomTool') {
        console.log('we are on zoom tool');
        tool.onKeyDown = function (event) {
            // toolSwitch section from pen
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'a') {
                return pathEditing();
            }
            if (event.key == 'h') {
                return handTool();
            }
            if (event.key == 's') {
                return shapeTrimmer();
            }
            if (event.key == 'n') {
                return freePenFunction();
            }
            if (event.key == 'v') {
                return moveToolFunction();
            }
        }
        if (event.modifiers.shift) {
            newZoom = paper.view.zoom * 0.95;

        } else if (event.modifiers.control) {
            newZoom = paper.view.zoom * 2;

        } else if (event.modifiers.alt) {
            newZoom = paper.view.zoom = 1;

            // center everything in the canvas
            artboardMove = project.activeLayer.children;
            console.log(artboard.position);
            console.log(paper.view.center);
            diffDelta = new Point(paper.view.center.x - artboard.position.x, paper.view.center.y - artboard.position.y);
            console.log('the distance of artboard from the center is ', diffDelta);

            for (var i = 0; i < artboardMove.length; i++) {
                artboardMove[i].position += diffDelta;
            }

        } else if (event.modifiers.space) {
            console.log('handTool is working');
            handToolPan = project.activeLayer.children;

        } else {
            newZoom = paper.view.zoom * 1.05;
        }
        paper.view.zoom = newZoom;
        paper.view.draw();
    }
    // handTool section
    if (changeTool === 'handTool') {
        console.log('handTool is working');
        handToolPan = project.activeLayer.children;
        tool.onKeyDown = function (event) {
            // toolSwitch section from pen
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'a') {
                return pathEditing();
            }
            if (event.key == 'h') {
                return handTool();
            }
            if (event.key == 's') {
                return shapeTrimmer();
            }
            if (event.key == 'n') {
                return freePenFunction();
            }
            if (event.key == 'v') {
                return moveToolFunction();
            }
        }
    }
}
// mouseMove section
function onMouseMove(event) {
    if (changeTool === 'pathEdit') {
        var hitResult = project.hitTest(event.point, hitOptions);
        project.activeLayer.selected = false;
        if (hitResult && hitResult.item)
            hitResult.item.fullySelected = true;
    }
    if (changeTool === 'shapeTrimmer') {
        var hitResult = project.hitTest(event.point, hitOptions);
        project.activeLayer.selected = false;
        if (hitResult && hitResult.item) {
            hitResult.item.fullySelected = true;
        }
    }
}
// mouseDrag section
function onMouseDrag(event) {
    // freePen section
    if (changeTool === 'pen') {
        path.add(event.point);
        // Update the content of the text item to show how many
        // segments it has:
        // textItem.content = 'Segment count: ' + path.segments.length;
    }
    // moveTool section.
    if (changeTool === 'moveTool') {
        var hitResult = project.hitTest(event.point, hitOptionsDrag);
        if (hitResult && hitResult.type === 'bounds') {
            var scaleDelta = 0;
            pathScaled = hitResult.item;
            var scaleGap = new Point((pathScaled.bounds.bottomRight.x - event.point.x), (pathScaled.bounds.bottomRight.y - event.point.y));

            console.log('path position ', pathScaled.position);
            console.log('path bounds bottomRight', pathScaled.bounds.bottomRight)
            console.log('our mouse position', event.point);
            console.log('the gap is ', scaleGap);

            if (event.delta.x > 0 && event.delta.y > 0) {
                console.log(event.delta);
                pathScaled.position -= scaleGap;
                scaleDelta = 1.05;
            } else if (event.delta.x < 0 && event.delta.y < 0) {
                console.log(event.delta);
                pathScaled.position -= scaleGap;
                scaleDelta = 0.98;
            } else {
                pathScaled.position -= scaleGap;
                scaleDelta = 1;
            }
            pathScaled.scale(scaleDelta);
        }
        if (!hitResult) {
            pathScaled = null;
            console.log('no hit');
            return;
        }

        if (selectGroup && hitResult && hitResult.type != 'bounds') {
            for (i = 0; i < selectGroup.length; i++) {
                selectGroup[i].translate(event.delta);
            }
        }
        return;
    }
    // path editing section
    if (changeTool === 'pathEdit') {
        if (segment) {
            segment.point += event.delta;
            //path.smooth();
        } else if (handles) {
            if (handlePoints == 'handle-in') {
                handles.handleIn += event.delta;
            } else if (handlePoints == 'handle-out') {
                handles.handleOut += event.delta;
            }
        } else if (path) {
            path.position += event.delta;
        }
    }
    // penTool section
    if (changeTool === 'penTool') {
        if (mode == 'move' && type == 'point') {
            currentSegment.point = event.point;
        } else if (mode != 'close') {
            var delta = event.delta.clone();
            if (type == 'handleOut' || mode == 'add')
                delta = -delta;
            currentSegment.handleIn += delta;
            currentSegment.handleOut -= delta;
        }
    }
    // zoomTool section
    if (changeTool === 'zoomTool') {
        if (event.modifiers.space) {
            console.log('handTool drag is working');
            for (var i = 0; i < handToolPan.length; i++) {
                handToolPan[i].position += event.delta;
            }
        } else {
            zoomStartPos = new Point(event.delta);
            console.log(zoomStartPos);
            if (zoomStartPos.x > 0 && zoomStartPos.y > 0) {
                newZoom = paper.view.zoom * 1.05;
            } else {
                newZoom = paper.view.zoom * 0.95;
            }
            paper.view.zoom = newZoom;
            paper.view.draw();
        }
    }
    // handTool section for drag
    if (changeTool === 'handTool') {
        console.log('handTool drag is working');
        for (var i = 0; i < handToolPan.length; i++) {
            handToolPan[i].position += event.delta;
        }
    }
}
// mouseUp section
function onMouseUp(event) {
    if (changeTool === 'pen') {
        // var segmentCount = path.segments.length;

        // When the mouse is released, simplify it:
        path.simplify(10);

        // Select the path, so we can see its segments:
        path.fullySelected = true;

        // var newSegmentCount = path.segments.length;
        // var difference = segmentCount - newSegmentCount;
        // var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
        // textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
        path.fillColor = {
            hue: 360 * Math.random(),
            saturation: 1,
            brightness: 1,
            alpha: 0.5
        };
        path.closed = true;
    }
    // moveit section in mouse up event
    if (changeTool === 'pathEdit') {
        if (!path) {
            return;
        } else {
            path.fullySelected = true;
        }
    }
}

// jQuery section
$(function () {
    $("#toolContainer").draggable();
    $("#controlContainer").draggable();
});
