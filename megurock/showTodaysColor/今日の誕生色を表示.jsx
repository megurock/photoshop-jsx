/* 
<javascriptresource>
<name>今日の誕生色を表示</name>
<category>net.megrock.ps</category>
</javascriptresource>
*/

//@include "../xlib/stdlib.js" 

var res = "dialog { swf: FlashPlayer { preferredSize: [ 430, 300 ] } }",
	win = new Window(res, "今日の誕生色"),
	result = null;


/**
 *
 */
win.onShow = function(event) {
	var myJSXPath = whereAmI(),
		mySWFFile = myJSXPath + "/showTodaysColor.swf",
		movieToPlay = new File(mySWFFile),
		swf = this.swf;
	try {
		swf.loadMovie(movieToPlay);
		swf.exitApp = exitApp;

		// set color to foregroundColor
		var data = swf.invokePlayerFunction('getData'),
			color = data.colorValue,
			foregroundColor = new SolidColor();
		foregroundColor.rgb.hexValue = color.replace('#', "");
		app.foregroundColor = foregroundColor;
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