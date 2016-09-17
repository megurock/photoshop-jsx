/* 
<javascriptresource>
<name>グリッドレイアウト</name>
<category>net.megrock.ps</category>
</javascriptresource>
*/

//@include "../xlib/stdlib.js" 
//@include "../MegurockUtil.js" 

var doc = activeDocument,
	activeLayer = doc.activeLayer,
	res = "dialog { swf: FlashPlayer { preferredSize: [ 430, 325 ] } }",
	win = new Window(res, "グリッドレイアウト"),
	result = null;

/**
 *
 */
win.onShow = function(event) {
	var myJSXPath = whereAmI(),
		mySWFFile = myJSXPath + "/AlignToGrid.swf",
		movieToPlay = new File(mySWFFile),
		swf = this.swf;

	try {
		swf.loadMovie(movieToPlay);

		var layers = activeLayer.layers,
			len = layers.length,
			maxWidth = 0,
			maxHeight = 0;

		for (var i = 0; i < len; i++) {
			var layer = layers[i],
				bounds = layer.bounds,
				x = bounds[0],
				y = bounds[1],
				width = bounds[2] - x,
				height = bounds[3] - y;

			maxWidth = Math.max(maxWidth, width);
			maxHeight = Math.max(maxHeight, height);
		}

		// set callbacks
		swf.exitApp = exitApp;
		swf.execute = execute;

		// set defalt values on ui
		swf.invokePlayerFunction('setBreakGridNum', len);
		swf.invokePlayerFunction('setMaxGridWidth', maxWidth);
		swf.invokePlayerFunction('setMaxGridHeight', maxHeight);
	} catch (error) {
		alert(mySWFFile + "の読込みに失敗しました。");
	}
};

/**
 * @param .isHorizontal:Boolean
 * @param .shouldBreakGrid:Boolean
 * @param .breakGridNum:int
 * @param .isFixWidth:Boolean
 * @param .isFixHeight:Boolean
 * @param .gridWidth:int
 * @param .gridHeight:int
 * @param .margins:Array // top, right, bottom, left
 * @param .shouldMakeGuide:Boolean
 * @param .shouldMakeSlice:Boolean
 * @param .useAscendingOrder:Boolean
 */
function execute(config) {
	var targetLayers = activeLayer.layers,
		layers = [],
		relativeObject = null,
		layer = null,
		minX = null,
		minY = null,
		bounds = null,
		column = 0,
		row = 0,
		x = 0,
		y = 0,
		width = 0,
		height = 0,
		totalWidth = 0,
		totalHeight = 0,
		gridWidth = 0,
		gridHeight = 0,
		tx = 0,
		ty = 0,
		i = 0,
		len = targetLayers.length,
		numBreak = config.shouldBreakGrid ? config.breakGridNum : len,
		xGrids = [],
		yGrids = [];

	// need to deselect the current selection
	doc.selection.deselect();

	// reverse layers if specified
	if (config.useAscendingOrder) {
		for (i = 0; i < len; i++) {
			layers.unshift(targetLayers[i]);
		}
	} else {
		layers = targetLayers;
	}

	relativeObject = layers[0];
	minX = relativeObject.bounds[0];
	minY = relativeObject.bounds[1];

	for (i = 0; i < len; i++) {
		column = config.isHorizontal ? i % numBreak : Math.floor(i / numBreak);
		row = config.isHorizontal ? Math.floor(i / numBreak) : i % numBreak;

		if (column === 0) {
			totalWidth = 0;
		}
		if (row === 0) {
			totalHeight = 0;
		}

		layer = layers[i];
		bounds = layer.bounds;
		x = bounds[0];
		y = bounds[1];
		width = bounds[2] - x;
		height = bounds[3] - y;
		gridWidth = config.isFixWidth ? config.gridWidth : width;
		gridHeight = config.isFixHeight ? config.gridHeight : height;

		if (config.isHorizontal) {
			tx = minX + totalWidth + (config.margins[1] * column);
			ty = minY + gridHeight * row + (config.margins[0] * row);
		} else {
			tx = minX + gridWidth * column + (config.margins[1] * column);
			ty = minY + totalHeight + (config.margins[0] * row);
		}
		layer.translate(tx - x, ty - y);
		totalWidth += gridWidth;
		totalHeight += gridHeight;

		// add x and y coordinates to the list
		if (config.shouldMakeGuide) {
			addGrid(xGrids, tx);
			addGrid(xGrids, tx + gridWidth);
			addGrid(yGrids, ty);
			addGrid(yGrids, ty + gridHeight);
		}

		// make slice
		if (config.shouldMakeSlice) {
			MegurockUtil.slice([ tx, ty, tx + gridWidth, ty + gridHeight ], layer.name);
		}
	}

	// make guides
	for (i = 0, len = xGrids.length; i < len; i++) {
		Stdlib.createVerticalGuide(doc, xGrids[i]);
	}
	for (i = 0, len = yGrids.length; i < len; i++) {
		Stdlib.createHorizontalGuide(doc, yGrids[i]);
	}
	exitApp();
}

/**
 * add value to the given list if it is not registered yet
 * @param list:Array list to which value will be added
 * @param value:int x or y coordinate
 */
function addGrid(list, value) {
	var hasValue = false;
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i] === value) {
			hasValue = true;
			break;
		}
	}
	if (!hasValue) {
		list.push(value);
	}
}

/**
 * close window
 */
function exitApp() {
	try {
		win.close();
	} catch(error) {}
}

/**
 *
 */
function whereAmI(){
	var where;
	try {
		app.documents.test();
	} catch (err){
		where = File(err.fileName);
	}
	return where.path;
}

/**
 * initialize
 */
function init(msg, defaultChars) {
	if (activeLayer.typename === 'LayerSet') {
		if (activeLayer.layers.length > 1) {
			win.margins = [0,0,0,0];
			win.show();
		} else {
			alert("レイヤーセット内にレイヤーが" + activeLayer.layers.length + "個しかありません。");
		}
	} else {
		alert("レイヤーセットを選択してください。");
	}
}

init();