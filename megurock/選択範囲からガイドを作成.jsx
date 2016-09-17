/* 
<javascriptresource>
<name>選択範囲からガイドを作成</name>
<category>net.megrock.ps</category>
</javascriptresource>
*/

//@include "xlib/stdlib.js" 

/**
 *
 */
function init() {
	var doc = activeDocument;
		selection = doc.selection;

	try {
		var bounds = selection.bounds;
		var minX = bounds[0],
			minY = bounds[1],
			maxX = bounds[2],
			maxY = bounds[3];
		Stdlib.createVerticalGuide(doc, minX);
		Stdlib.createVerticalGuide(doc, maxX);
		Stdlib.createHorizontalGuide(doc, minY);
		Stdlib.createHorizontalGuide(doc, maxY);
	} catch (error) {
		alert("選択範囲が見つかりませんでした。");
	}
}

init();