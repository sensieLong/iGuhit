// aim to make a smooth and reliable software tool like adobe illustrator

// jQuery section main function
var theDivcolor;
$(function () {
    // move the focus of input fields after pressing enter
    var inputs = $(':input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var nextInput = inputs.get(inputs.index(this) + 1);
            if (nextInput) {
                nextInput.focus();
            }
        }
    });

    $("#toolContainer").draggable();
    $("#controlContainer").draggable();
    $("#toolProperties").draggable();

    $("#layerContainer").draggable();
    $("#layerContainer").resizable();

    // toggle all section
    $("#toggleAllContainer").draggable();
    $("#toggleAllContainer").click(function () {
        $("#toolContainer").toggle();
        $("#controlContainer").toggle();
        $("#toolPropertiesContainer").toggle();
        $("#layerContainer").toggle();
    });

    // file menu jquery section
    $("#fileMenuLabel").click(function () {
        $("#fileContainer").toggle();
    });

    // edit menu jquery section
    $("#EditMenuLabel").click(function () {
        $("#editContainer").toggle();
    });

    // Window menu jquery section
    $("#WindowMenuLabel").click(function () {
        $("#windowContainer").toggle();
    });
    $("#toolWindow").click(function () {
        $("#toolContainer").toggle();
        $("#windowContainer").toggle();
    });
    $("#canvasWindow").click(function () {
        $("#controlContainer").toggle();
        $("#windowContainer").toggle();
    });
    $("#controlWindow").click(function () {
        $("#toolPropertiesContainer").toggle();
        $("#windowContainer").toggle();
    });
    $("#layerWindow").click(function () {
        $("#layerContainer").toggle();
        $("#windowContainer").toggle();
    });

    // fill color click event
    $("#colorPickPreview").click(function () {
        var current_color = $(this).css("background-color");
        $("#current-color-text").text(current_color);
        return theDivcolor = document.getElementById('current-color-text').innerHTML, itemChangeColor();
    });
});
// end of jquery

// paper section
paper.install(window);
var raster, rasterColorHolder;
var pathFillToggle = false;
var item, colorPickValue, itemColorToDiv;
var myPalette;
var spiokoks;
var artboard, raster;
var itemOldWidth, itemOldHeight;
var group;
var selectGroup = [], shapeHit = [];
var changeTool;
var segment, path, handles;
var movePath = false;
var currentSegment, mode, type;
var shapeTrim1, shapeTrim2, shapeTrim3, shapeResult, combinedShape, combinedShape2, cloneCopy;
var newZoom, zoomStartPos, zoomEndPos, mousePosition, viewPosition;
var handToolPan, artboardMove, diffDelta, pathScaled, itemScaledH, itemScaledY, moveDrag;
var colorGroup;


// variables for artboard
var artboardWidth = document.getElementById('controlWidth').value * 300;
var artboardHeight = document.getElementById('controlHeight').value * 300;

// tool click event
document.getElementById('freePen').addEventListener("click", freePenFunction);
document.getElementById('moveTool').addEventListener("click", moveToolFunction);
document.getElementById('pathEdit').addEventListener("click", pathEditing);
document.getElementById('penTool').addEventListener("click", penTool);
document.getElementById('zoomTool').addEventListener("click", zoomTool);
document.getElementById('shapeTrimmer').addEventListener("click", shapeTrimmer);
document.getElementById('handTool').addEventListener("click", handTool);
document.getElementById('eyedropper').addEventListener("click", eyeDropper);

// control click event
document.getElementById('canvasUpdateButton').addEventListener("click", canvasResizedWH);
document.getElementById('toolPropertiesLabelBtn').addEventListener("click", toolPropertiesLabelBtn);
document.getElementById('download-to-svg').addEventListener("click", downloadSVG);
document.getElementById('canvasUpdateScaleDown').addEventListener("click", scaleCanvasDown);
document.getElementById('canvasUpdateScaleUp').addEventListener("click", scaleCanvasUp);
document.getElementById('myItemFill').addEventListener("click", removeFill);

var toolFreePen = document.getElementById('freePen');
var toolMove = document.getElementById('moveTool');
var toolPathEdit = document.getElementById('pathEdit');
var toolPen = document.getElementById('penTool');
var toolZoom = document.getElementById('zoomTool');
var toolShapeTrim = document.getElementById('shapeTrimmer');
var toolHand = document.getElementById('handTool');
var toolEyedropper = document.getElementById('eyedropper');



// key down global switching tools
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
    if (event.key == 'i') {
        return eyeDropper();
    }
}

// function for resizing canvas
function canvasResizedWH() {
    artboard.bounds.width = document.getElementById('controlWidth').value * 300;
    artboard.bounds.height = document.getElementById('controlHeight').value * 300;
    return artboard;
}

// function for scaling canvas
function scaleCanvasDown() {
    for (i = 0; i < project.activeLayer.children.length; i++) {
        project.activeLayer.children[i].scale(0.60);
    }
    return false;
}
function scaleCanvasUp() {
    for (i = 0; i < project.activeLayer.children.length; i++) {
        project.activeLayer.children[i].scale(1.4);
    }
    return false;
}

// function for resizing items using input fields
function toolPropertiesLabelBtn() {
    item.bounds.width = document.getElementById('itemWidth').value * 300;
    item.bounds.height = document.getElementById('itemHeight').value * 300;
    item.position = view.center;
    //item.position.x = document.getElementById('itemXlocation').value * 300;
    //item.position.y = document.getElementById('itemYlocation').value * 300;
    return item;
}


// input interactions section

// Get the input field for width
var itemWidth = document.getElementById("itemWidth");
// Execute a function when the user presses a key on the keyboard
itemWidth.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // execute your code here
        item.bounds.width = document.getElementById('itemWidth').value * 300;
        var itemNewWidth = item.bounds.width;
        var scaleFactor = (itemOldWidth / 300) / (itemNewWidth / 300);
        item.bounds.height = item.bounds.height / scaleFactor;
        var newHeigthsize = item.bounds.height;
        item.position = view.center;
        return document.getElementById('itemHeight').value = newHeigthsize / 300;
    }
});

// Get the input field for height
var itemHeight = document.getElementById("itemHeight");
// Execute a function when the user presses a key on the keyboard
itemHeight.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // execute your code here
        item.bounds.height = document.getElementById('itemHeight').value * 300;
        var itemNewHeight = item.bounds.height;
        var scaleFactorHeight = (itemOldHeight / 300) / (itemNewHeight / 300);
        item.bounds.width = item.bounds.width / scaleFactorHeight;
        var newWidthSize = item.bounds.width;
        item.position = view.center;
        return document.getElementById('itemWidth').value = newWidthSize / 300;
    }
});


// Get the input field for colorPicker
var inputColorPicker = document.getElementById("inputColor");
// Execute a function when the user presses a key on the keyboard
inputColorPicker.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();

        // execute your code here
        colorPickValue = document.getElementById('inputColor').value;
        if (item) {
            item.fillColor = colorPickValue;
        }
        return document.getElementById('colorPickPreview').style.backgroundColor = colorPickValue;
    }
});

// Get the div color to path
function itemChangeColor() {
    item.fillColor = theDivcolor;
}

// Get the input field for colorPickerStroke
var inputColorPickerStroke = document.getElementById("inputColorStroke");
// Execute a function when the user presses a key on the keyboard
inputColorPickerStroke.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // execute your code here
        item.strokeColor = document.getElementById('inputColorStroke').value;
        document.getElementById('colorPickPreviewStroke').style.backgroundColor = document.getElementById('inputColorStroke').value;
    }
});

// Get the input field for strokeThickness
var strokeThickness = document.getElementById("strokeThickness");
// Execute a function when the user presses a key on the keyboard
strokeThickness.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // execute your code here
        item.strokeWidth = document.getElementById('strokeThickness').value;
    }
});

// Get the input field for pathOpacity
var pathOpacity = document.getElementById("pathOpacity");
// Execute a function when the user presses a key on the keyboard
pathOpacity.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // execute your code here
        item.opacity = document.getElementById('pathOpacity').value / 100;
    }
});

// ARTBOARD SECTION
var rectangle = new Rectangle(new Point(0, 0), artboardWidth, artboardHeight);
artboard = new Path.Rectangle(rectangle);
artboard.position = paper.view.center;
artboard.fillColor = 'white';
artboard.locked = true;



// color pallet section
// var myUrl = 'palette.jpg';
// var palettePosition = new Point(500, 200);
// myPalette = new Raster({ source: myUrl, position: palettePosition });

// myPalette.onLoad = function () {
//    console.log('palette loaded');
// };
// myPalette.selected = true;


// import section
var imageUpload = document.getElementById('imageUpload');
imageUpload.onchange = function () {
    const [file] = imageUpload.files
    if (file) {
        myImageUrl = URL.createObjectURL(file);
    }
    raster = new Raster({ source: myImageUrl, position: view.center });
    raster.onLoad = function () {
        console.log('Successfully loaded image!');
    };
    return raster;
}
// put it somewhere 
// // color picker test
// myCircle.fillColor = raster.getAverageColor(event.point);

// export section
function downloadSVG() {
    artboard.visible = false;
    var fileName = "iGuhit.svg"
    // var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({ asString: true }));
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({ asString: true }));
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
    alert('file saved successfully');
    artboard.visible = true;
}

// removefill function section
function removeFill() {
    var fillToggle = document.getElementById("myItemFill");
    if (fillToggle.style.color === "red") {
        fillToggle.style.color = "antiquewhite";
        var colorBackAgain = document.getElementById('colorPickPreview').style.backgroundColor;

        if (path) {
            path.fillColor = colorBackAgain;
        }
        if (selectGroup) {
            for (i = 0; i < selectGroup.length; i++) {
                item = selectGroup[i];
                item.fillColor = colorBackAgain;
            }
        }
        if (item) {
            var inputColorValue = item.fillColor.toCSS(true);
            return document.getElementById('inputColor').value = inputColorValue;
        } else if (path) {
            var inputColorValue = path.fillColor.toCSS(true);
            return document.getElementById('inputColor').value = inputColorValue;
        } else {
            return;
        }

    } else {
        fillToggle.style.color = "red";

        // if (item && item.className == 'Path') { item.fillColor = null; }
        if (path) {
            path.fillColor = null;
        }
        if (selectGroup) {
            for (i = 0; i < selectGroup.length; i++) {
                item = selectGroup[i];
                item.fillColor = null;
            }
        }
        return document.getElementById('inputColor').value = "";
    }
}

// functions tools toggle and value set
function pathEditing() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.add("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");
    toolEyedropper.classList.remove("toolToggle");
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
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
    toolEyedropper.classList.remove("toolToggle");
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
    }
    // show tool properties for move tool
    document.getElementById('myItemFill').style.display = 'block';
    document.getElementById('colorPickPreview').style.display = 'block';
    document.getElementById('inputColor').style.display = 'block';
    document.getElementById('strokeLabel').style.display = 'block';
    document.getElementById('colorPickPreviewStroke').style.display = 'block';
    document.getElementById('inputColorStroke').style.display = 'block';
    document.getElementById('strokeThickness').style.display = 'block';
    document.getElementById('itemOpacity').style.display = 'block';
    document.getElementById('pathOpacity').style.display = 'block';
    document.getElementById('labelAlign').style.display = 'block';

    document.getElementById('alignLeft').style.display = 'block';
    document.getElementById('alignCenter').style.display = 'block';
    document.getElementById('alignRight').style.display = 'block';
    document.getElementById('---').style.display = 'block';
    document.getElementById('alignTop').style.display = 'block';
    document.getElementById('alignVerticalCenter').style.display = 'block';
    document.getElementById('alignBot').style.display = 'block';
    document.getElementById('xPos').style.display = 'block';
    document.getElementById('itemXlocation').style.display = 'block';
    document.getElementById('yPos').style.display = 'block';
    document.getElementById('itemYlocation').style.display = 'block';
    document.getElementById('widthLabel').style.display = 'block';
    document.getElementById('itemWidth').style.display = 'block';
    document.getElementById('heightLabel').style.display = 'block';
    document.getElementById('itemHeight').style.display = 'block';
    document.getElementById('toolPropertiesLabelBtn').style.display = 'block';

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
    toolEyedropper.classList.remove("toolToggle");

    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
    }
    // show tool properties for free pen tool
    document.getElementById('myItemFill').style.display = 'block';
    document.getElementById('colorPickPreview').style.display = 'block';
    document.getElementById('inputColor').style.display = 'block';
    document.getElementById('strokeLabel').style.display = 'block';
    document.getElementById('colorPickPreviewStroke').style.display = 'block';
    document.getElementById('inputColorStroke').style.display = 'block';
    document.getElementById('strokeThickness').style.display = 'block';
    document.getElementById('itemOpacity').style.display = 'block';
    document.getElementById('pathOpacity').style.display = 'block';
    document.getElementById('labelAlign').style.display = 'block';

    document.getElementById('alignLeft').style.display = 'none';
    document.getElementById('alignCenter').style.display = 'none';
    document.getElementById('alignRight').style.display = 'none';
    document.getElementById('---').style.display = 'none';
    document.getElementById('alignTop').style.display = 'none';
    document.getElementById('alignVerticalCenter').style.display = 'none';
    document.getElementById('alignBot').style.display = 'none';
    document.getElementById('xPos').style.display = 'none';
    document.getElementById('itemXlocation').style.display = 'none';
    document.getElementById('yPos').style.display = 'none';
    document.getElementById('itemYlocation').style.display = 'none';
    document.getElementById('widthLabel').style.display = 'none';
    document.getElementById('itemWidth').style.display = 'none';
    document.getElementById('heightLabel').style.display = 'none';
    document.getElementById('itemHeight').style.display = 'none';
    document.getElementById('toolPropertiesLabelBtn').style.display = 'none';

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
    toolEyedropper.classList.remove("toolToggle");

    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
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
    toolEyedropper.classList.remove("toolToggle");
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
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
    toolEyedropper.classList.remove("toolToggle");
    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
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
    toolEyedropper.classList.remove("toolToggle");

    if (selectGroup == undefined || selectGroup.length === 0 || selectGroup.length != 2) return alert('dapat 2 objects and selected');
    // converts the array selectGroup into a group first
    selectGroup = new Group(selectGroup);
    // continue if selectGroup is not null or it has a value greater then 1
    if (selectGroup && selectGroup.children.length > 1) {
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
        }
        if (shapeTrim2 && shapeTrim2.segments != undefined && shapeTrim2.segments.length > 2) {
            shapeTrim2.selected = true;
            shapeTrim2.fillColor = { hue: 240, alpha: 0.01 };
            selectGroup.addChild(shapeTrim2);
        }
        if (shapeTrim3 && shapeTrim3.segments != undefined && shapeTrim3.segments.length > 2) {
            shapeTrim3.selected = true;
            shapeTrim3.fillColor = { hue: 240, alpha: 0.01 };
            selectGroup.addChild(shapeTrim3);
        }
    } else {
        return;
    }
    return changeTool = 'shapeTrimmer';
}
function eyeDropper() {
    toolFreePen.classList.remove("toolToggle");
    toolMove.classList.remove("toolToggle");
    toolPathEdit.classList.remove("toolToggle");
    toolPen.classList.remove("toolToggle");
    toolZoom.classList.remove("toolToggle");
    toolShapeTrim.classList.remove("toolToggle");
    toolHand.classList.remove("toolToggle");
    toolEyedropper.classList.add("toolToggle");

    if (shapeTrim1, shapeTrim2, shapeTrim3) {
        shapeTrim1.remove();
        shapeTrim2.remove();
        shapeTrim3.remove();
    }
    return changeTool = 'eyedropper';
}


// VIP variables
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
var hitOptionsMove = {
    fill: true,
    bounds: true,
    stroke: true,
    tolerance: 10
};
var hitOptionsDrag = {
    segments: true,
    handles: true,
    stroke: true,
    fill: true,
    bounds: true,
    tolerance: 10
};


// function for internet connection
function checkInternetConnection() {
    var isOnLine = navigator.onLine;
    if (isOnLine) {
        //alert('we have internet');
        return;
    } else {
        alert('Check your internet connection!');
        return location.reload();
    }
}

// security set up domain may 28, 2025
var headCheck = window.location.href;
var headCheckString = headCheck.toString();
var headCheckSimplify = headCheckString.substring(0, 20);
// var headCheckSafari = headCheckString.substring(0, 19);
var pass = 'https://www.iguhitko';
var safari = 'http://www.iguhitko.';

// check internet connection first
checkInternetConnection();
// check if the app is not in other domain, alert app not genuin if so
if (headCheckSimplify == pass || headCheckSimplify == safari) {
    alert('Thank you for using enums.org');
} else {
    alert('app not genuin '), alert(headCheckSimplify), location.reload();
};
// end of verification

// MOUSE EVENTS SECTION
// main function for path edit
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
            // toolSwitch section from eyedropper
            if (event.key == 'delete') {
                if (!path.selected) {
                    alert('anong buburahin mo?');
                } else {
                    path.remove();
                    return false;
                }
            }

            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
        }
        // If we produced a path before, deselect it:
        // we reset the selected items
        selectGroup = null;

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
            // toolSwitch section from eyedropper
            if (event.key == 'delete') {
                if (!item.selected) {
                    alert('anong buburahin mo?');
                } else {
                    // check natin kung may laman ang selectgroup
                    // kung mayron selected item yun ang mabura
                    for (i = 0; i < selectGroup.length; i++) {
                        item = selectGroup[i];
                        item.remove();
                    }
                    return false;
                }
            }
            
            // key quick swith while in move tool
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
            if (event.key == ']') {
                if (selectGroup && selectGroup.length > 0) {
                    item.insertAbove(item.nextSibling);
                    artboard.sendToBack();
                }
            }

            if (event.key == '[') {
                if (selectGroup && selectGroup.length > 0) {
                    item.insertBelow(item.previousSibling);
                    artboard.sendToBack();
                }
            }
            if (event.key == '{') {
                if (selectGroup && selectGroup.length > 0) {
                    item.sendToBack();
                    artboard.sendToBack();
                }
            }
            if (event.key == '}') {
                if (selectGroup && selectGroup.length > 0) {
                    item.bringToFront();
                    artboard.sendToBack();
                }
            }
        }

        // move hitest
        if (event.modifiers.space) {
            handToolPan = project.activeLayer.children;
        }
        if (event.modifiers.shift) {
            var hitResult = project.hitTest(event.point, hitOptionsMove);
            if (hitResult) {
                item = hitResult.item;
                item.selected = false;
                item.bounds.selected = false;
                selectGroup = project.selectedItems;
            }
        } else {
            var hitResult = project.hitTest(event.point, hitOptionsMove);
            // if the hit is fill then proceed
            if (hitResult && hitResult.type != 'bounds' && hitResult.item.className != 'CompoundPath') {
                item = hitResult.item;
                item.selected = true;
                selectGroup = project.selectedItems;

                // set the size of the item in input field
                document.getElementById('itemXlocation').value = (Math.floor(item.position.x)) / 300;
                document.getElementById('itemYlocation').value = (Math.floor(item.position.y)) / 300;
                document.getElementById('itemWidth').value = (Math.floor(item.bounds.width)) / 300;
                document.getElementById('itemHeight').value = (Math.floor(item.bounds.height)) / 300;
                itemOldWidth = document.getElementById('itemWidth').value * 300;
                itemOldHeight = document.getElementById('itemHeight').value * 300;


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
                    moveDrag = 'ready';
                    selectGroup.selected = false;
                    return;
                }
                moveDrag = 'ready';
                return selectGroup;
            }

            // if the hit is compoundPath then proceed
            if (hitResult && hitResult.type === 'fill' && hitResult.item.className == 'CompoundPath') {
                item = hitResult.item;
                item.selected = true;
                selectGroup = project.selectedItems;

                // set the size of the item in input field
                document.getElementById('itemXlocation').value = (Math.floor(item.position.x)) / 300;
                document.getElementById('itemYlocation').value = (Math.floor(item.position.y)) / 300;
                document.getElementById('itemWidth').value = (Math.floor(item.bounds.width)) / 300;
                document.getElementById('itemHeight').value = (Math.floor(item.bounds.height)) / 300;
                itemOldWidth = document.getElementById('itemWidth').value * 300;
                itemOldHeight = document.getElementById('itemHeight').value * 300;


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
                    moveDrag = 'ready';
                    selectGroup.selected = false;
                    return;
                }
                moveDrag = 'ready';
                return selectGroup;
            }

            // if the hit is bounds then proceed
            if (hitResult && hitResult.type === 'bounds') {
                tool.onKeyDown = function (event) {
                    if (event.key == ']') {
                        if (selectGroup && selectGroup.length > 0) {
                            item.insertAbove(item.nextSibling);
                            artboard.sendToBack();
                        }
                    }

                    if (event.key == '[') {
                        if (selectGroup && selectGroup.length > 0) {
                            item.insertBelow(item.previousSibling);
                            artboard.sendToBack();
                        }
                    }
                    if (event.key == '{') {
                        if (selectGroup && selectGroup.length > 0) {
                            item.sendToBack();
                            artboard.sendToBack();
                        }
                    }
                    if (event.key == '}') {
                        if (selectGroup && selectGroup.length > 0) {
                            item.bringToFront();
                            artboard.sendToBack();
                        }
                    }
                    // group the selected item when pressing key g
                    if (event.key == 'g') {
                        group = new Group(selectGroup);
                    }
                }
                item = hitResult.item;
                pathScaled = 'ready';
            }
            // if there is no hit
            if (!hitResult) {
                pathScaled = item = null;
                if (selectGroup) {
                    for (i = 0; i < selectGroup.length; i++) {
                        selectGroup[i].bounds.selected = false;
                    }
                }
                project.activeLayer.bounds.selected = false;
                project.activeLayer.selected = false;
                project.activeLayer.fullySelected = false;
                return selectGroup = null;
            }
        }
    }
    // path editing section
    if (changeTool === 'pathEdit') {
        segment = path = handles = null;
        tool.onKeyDown = function (event) {
            // toolSwitch section from eyedropper
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
        }
        var hitResult = project.hitTest(event.point, hitOptions);
        if (!hitResult)
            return;
        // event modifiers section
        if (event.modifiers.space) {
            handToolPan = project.activeLayer.children;
        }

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
                    return;
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
            // path.fillColor = document.getElementById('inputColor').value;
            // path.fillColor = {
            //    hue: 360 * Math.random(),
            //    saturation: 1,
            //    brightness: 1,
            // };
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
                // toolSwitch section from eyedropper
                if (event.key == 'z') {
                    return zoomTool();
                }
                if (event.key == 'p') {
                    return penTool();
                }
                if (event.key == 'e') {
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
                if (event.key == 'i') {
                    return eyeDropper();
                }
            }

            if (!currentSegment) {
                currentSegment = path.add(event.point);
            }
            if (event.modifiers.space) {
                handToolPan = project.activeLayer.children;
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
            // toolSwitch section from eyedropper
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
        }
        var hitResult = project.hitTest(event.point, hitOptions);
        if (selectGroup == undefined) return console.log('wala pa tayong selection');
        // if the selection is more than 1 then do this
        if (selectGroup.children.length > 1) {
            // if you hit the shapeTrim1
            if (hitResult && hitResult.item && hitResult.item == shapeTrim1) {
                //  add the shapetrim1 to array shapeHit
                shapeHit.push(shapeTrim1);

                if (shapeTrim1.segments != undefined && shapeTrim1.segments.length > 2) {
                    shapeResult = selectGroup.children[0].subtract(selectGroup.children[1]);
                    combinedShape = selectGroup.children[1];
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                    selectGroup.addChild(combinedShape);
                } else {
                    // if the shape is inside the other shape this should create a compound path
                    shapeResult = selectGroup.children[0].subtract(selectGroup.children[1]);
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                }
                return selectGroup = selectGroup.children;
            }
            // if you hit the shapeTrim2
            if (hitResult && hitResult.item && hitResult.item == shapeTrim2) {
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
            // if you hit the shapeTrim3
            if (hitResult && hitResult.item && hitResult.item == shapeTrim3) {
                if (shapeTrim3.segments != undefined && shapeTrim3.segments.length > 2) {
                    shapeResult = selectGroup.children[1].subtract(selectGroup.children[0]);
                    combinedShape = selectGroup.children[0];
                    selectGroup.removeChildren();
                    selectGroup.addChild(shapeResult);
                    selectGroup.addChild(combinedShape);
                } else {
                    // if the shape is inside the other shape this should create a compound path
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
        tool.onKeyDown = function (event) {
            // toolSwitch section from eyedropper
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
        }
        if (event.modifiers.shift) {
            newZoom = paper.view.zoom * 0.95;

        } else if (event.modifiers.control) {
            newZoom = paper.view.zoom * 0.5;

        } else if (event.modifiers.alt) {
            newZoom = paper.view.zoom = 1;

            // center everything in the canvas
            artboardMove = project.activeLayer.children;
            diffDelta = new Point(paper.view.center.x - artboard.position.x, paper.view.center.y - artboard.position.y);

            for (var i = 0; i < artboardMove.length; i++) {
                artboardMove[i].position += diffDelta;
            }

        } else if (event.modifiers.space) {
            handToolPan = project.activeLayer.children;
        } else {
            newZoom = paper.view.zoom * 1.05;
        }
        paper.view.zoom = newZoom;
        paper.view.draw();
    }
    // handTool section
    if (changeTool === 'handTool') {
        handToolPan = project.activeLayer.children;
        tool.onKeyDown = function (event) {
            // toolSwitch section from eyedropper
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
        }
    }
    if (changeTool === 'eyedropper') {
        tool.onKeyDown = function (event) {
            // toolSwitch section from eyedropper
            if (event.key == 'z') {
                return zoomTool();
            }
            if (event.key == 'p') {
                return penTool();
            }
            if (event.key == 'e') {
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
            if (event.key == 'i') {
                return eyeDropper();
            }
        }

        // bring back the original color of the fill: from red to antiquewhite
        document.getElementById("myItemFill").style.color = 'antiquewhite';

        // if there is a path selected, change its color
        if (path) {
            path.fillColor = raster.getAverageColor(event.point);
        }
        if (item && item.className != 'Raster') {
            // we perform hitest if there is a selected item
            var hitResult = project.hitTest(event.point, hitOptionsMove);

            if (hitResult && hitResult.type != 'bounds' && hitResult.item.className != 'Raster') {
                var recoloritem = hitResult.item;
                item.fillColor = recoloritem.fillColor;

                // change the background color of fill after item hit
                itemColorToDiv = item.fillColor.toCSS(true);
                document.getElementById('colorPickPreview').style.backgroundColor = itemColorToDiv;
                return document.getElementById('inputColor').value = itemColorToDiv;

            } else if (hitResult && hitResult.type != 'bounds' && hitResult.item.className == 'Raster') {
                raster = hitResult.item;
                selectGroup = project.selectedItems;
                for (i = 0; i < selectGroup.length; i++) {
                    item = selectGroup[i];
                    item.fillColor = raster.getAverageColor(event.point);
                }

                // change the background color of fill after item hit
                itemColorToDiv = item.fillColor.toCSS(true);
                document.getElementById('colorPickPreview').style.backgroundColor = itemColorToDiv;
                return document.getElementById('inputColor').value = itemColorToDiv;

            } else {
                alert('itama mo naman idolo, buti pa ako may tama');
                return false;
            }
        } else {
            // if there is no selected path, just simply re color the div and the input color value
            var hitResult = project.hitTest(event.point, hitOptionsMove);

            if (hitResult && hitResult.type != 'bounds' && hitResult.item.className != 'Raster') {
                var recoloritem = hitResult.item;

                // change the background color of fill after item hit
                itemColorToDiv = recoloritem.fillColor.toCSS(true);
                document.getElementById('colorPickPreview').style.backgroundColor = itemColorToDiv;
                return document.getElementById('inputColor').value = itemColorToDiv;

            } else if (hitResult && hitResult.type != 'bounds' && hitResult.item.className == 'Raster') {
                raster = hitResult.item;
                rasterColorHolder = raster.getAverageColor(event.point);

                // change the background color of fill after item hit
                itemColorToDiv = rasterColorHolder.toCSS(true);
                document.getElementById('colorPickPreview').style.backgroundColor = itemColorToDiv;
                return document.getElementById('inputColor').value = itemColorToDiv;
            } else {
                alert('itama mo naman idolo, buti pa ako may tama');
                return false;
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
    }
    // moveTool section.
    if (changeTool === 'moveTool') {
        if (event.modifiers.space) {
            for (var i = 0; i < handToolPan.length; i++) {
                handToolPan[i].position += event.delta;
            }
        } else {
            if (pathScaled === 'ready') {
                document.getElementById('itemXlocation').value = (Math.floor(item.position.x)) / 300;
                document.getElementById('itemYlocation').value = (Math.floor(item.position.y)) / 300;
                document.getElementById('itemWidth').value = (Math.floor(item.bounds.width)) / 300;
                document.getElementById('itemHeight').value = (Math.floor(item.bounds.height)) / 300;
                if (event.modifiers.shift) {
                    item.bounds.width = (event.point.x - item.bounds.topLeft.x);
                } else if (event.modifiers.alt) {
                    item.bounds.height = (event.point.y - item.bounds.topLeft.y);
                } else if (event.modifiers.control) {
                    item.bounds.width = (event.point.x - item.bounds.topLeft.x);
                    item.bounds.height = (event.point.y - item.bounds.topLeft.y);
                } else {
                    var constraintsScale = item.bounds.width;
                    item.bounds.width = (event.point.x - item.bounds.topLeft.x);
                    var heightConstraints = item.bounds.width / constraintsScale;
                    item.bounds.height = item.bounds.height * heightConstraints;
                }
            } else if (selectGroup && moveDrag === 'ready') {
                document.getElementById('itemXlocation').value = (Math.floor(item.position.x)) / 300;
                document.getElementById('itemYlocation').value = (Math.floor(item.position.y)) / 300;
                document.getElementById('itemWidth').value = (Math.floor(item.bounds.width)) / 300;
                document.getElementById('itemHeight').value = (Math.floor(item.bounds.height)) / 300;
                for (i = 0; i < selectGroup.length; i++) {
                    item = selectGroup[i];
                    item.translate(event.delta);
                }
                return;
            } else {
                // if nothing is selected using drag, select everything in its way
                var hitResult = project.hitTest(event.point, hitOptionsMove);
                if (hitResult) {
                    item = hitResult.item;
                    item.selected = true;
                    selectGroup = project.selectedItems;
                }
            }
        } 
    }
    // path editing section
    if (changeTool === 'pathEdit') {
        if (event.modifiers.space) {
            for (var i = 0; i < handToolPan.length; i++) {
                handToolPan[i].position += event.delta;
            }
        } else if (segment) {
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
        if (event.modifiers.space) {
            for (var i = 0; i < handToolPan.length; i++) {
                handToolPan[i].position += event.delta;
            }
        } else if (mode == 'move' && type == 'point') {
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
            ;
            for (var i = 0; i < handToolPan.length; i++) {
                handToolPan[i].position += event.delta;
            }
        } else {
            zoomStartPos = new Point(event.delta);
            if (zoomStartPos.x > 0 && zoomStartPos.y > 0) {
                newZoom = paper.view.zoom * 1.02;
            } else if (zoomStartPos.x > 0 && zoomStartPos.y < 0 || zoomStartPos.x < 0 && zoomStartPos.y > 0) {
                newZoom = paper.view.zoom * 1;
            } else {
                newZoom = paper.view.zoom * 0.98;
            }
            paper.view.zoom = newZoom;
            paper.view.draw();
        }
    }
    // handTool section for drag
    if (changeTool === 'handTool') {
        for (var i = 0; i < handToolPan.length; i++) {
            handToolPan[i].position += event.delta;
        }
    }
    if (changeTool === 'eyedropper') {
        if (raster) {
            rasterColorHolder = raster.getAverageColor(event.point);
            // change the background color of fill after item hit
            itemColorToDiv = rasterColorHolder.toCSS(true);
            document.getElementById('colorPickPreview').style.backgroundColor = itemColorToDiv;
            document.getElementById('inputColor').value = itemColorToDiv;
            if (path) {
                path.fillColor = raster.getAverageColor(event.point);
            }
            if (item && item.className != 'Raster') {
                item.fillColor = raster.getAverageColor(event.point);
                if (selectGroup) {
                    for (i = 0; i < selectGroup.length; i++) {
                        item = selectGroup[i];
                        item.fillColor = raster.getAverageColor(event.point);
                    }
                }
            }
        }
    }
}
// mouseUp section
function onMouseUp() {
    // freePen section
    if (changeTool === 'pen') {

        // create layer label
        if (path.segments.length > 2) {
            var para = document.createElement("p");
            para.innerHTML = "Path";
            document.getElementById("layerContainer").appendChild(para);
        }

        // var segmentCount = path.segments.length;

        // When the mouse is released, simplify it:
        path.simplify(10);

        // Select the path, so we can see its segments:
        path.fullySelected = true;
        if (document.getElementById('inputColor').value == "") {
            return colorPickValue = '#ffffff';
        } else {
            path.fillColor = document.getElementById('inputColor').value;
            return colorPickValue = document.getElementById('inputColor').value;
        };

        // return all
        return document.getElementById('colorPickPreview').style.backgroundColor = colorPickValue, item = path;
    }
    // pathEdit section in mouse up event
    if (changeTool === 'pathEdit') {
        if (!path) {
            return;
        } else {
            path.fullySelected = true;
        }
    }
    // moveTool section in up
    if (changeTool === 'moveTool') {
        pathScaled = moveDrag = null;
    }
    if (changeTool === 'eyedropper') {
        return;
    }
}
