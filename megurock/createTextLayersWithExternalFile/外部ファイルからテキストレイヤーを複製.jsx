/* 
<javascriptresource>
<name>外部ファイルからテキストレイヤーを複製</name>
<category>net.megrock.ps</category>
</javascriptresource>
*/

//@include "../xlib/stdlib.js" 

var doc = activeDocument,
	res = "dialog { swf: FlashPlayer { preferredSize: [ 275, 100 ] } }",
	win = new Window(res, "外部ファイルからテキストレイヤーを複製"),
	result = null;


/**
 *
 */
win.onShow = function(event) {
	var myJSXPath = whereAmI(),
		mySWFFile = myJSXPath + "/createTextLayersWithExternalFile.swf",
		movieToPlay = new File(mySWFFile),
		swf = this.swf;
	try {
		swf.loadMovie(movieToPlay);
		swf.selectTextFile = selectTextFile;
		swf.createTextLayers = createTextLayers;
		swf.showAlert = showAlert;
		//swf.enableExeButton = enableExeButton;
		swf.exitApp = exitApp;
	} catch (error) {
		alert(mySWFFile + "の読込みに失敗しました。");
	}
};

/**
 *
 */
function exitApp() {
	try {
		win.close();
	} catch(error) {}
}

/**
 *
 */
function showAlert(msg) {
	alert(msg);
}

/**
 *
 */
function createTextLayers(loadedText, splitChar) {
	result = loadedText.split(splitChar);
	if (result && result.length) {	
		var textLayer = doc.activeLayer;
		if (textLayer.kind === LayerKind.TEXT) {
			var lastLayer = textLayer;
			for (var i = 0, len = result.length; i < len; i++) {
				lastLayer = textLayer.duplicate(lastLayer, ElementPlacement.PLACEBEFORE);
				lastLayer.textItem.contents = result[i];
			}
		} else {
			alert("テキストレイヤーを選択してください。");
		}
	} else {
		alert("無効なテキストファイルです。");
	}
	exitApp();
}

/**
 *
 */
function selectTextFile() {
	var file = Stdlib.selectFile("読込むテキストファイルを選択してください。", 'テキストファイル: *.txt');
	if (file) {
		var string = Stdlib.readFromFile(file);
		result = string.split(',');
	} 
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
	win.margins = [0,0,0,0];
	win.show();
}

init();