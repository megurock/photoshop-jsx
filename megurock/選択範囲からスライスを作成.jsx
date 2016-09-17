/* 
<javascriptresource>
<name>選択範囲からスライスを作成</name>
<category>net.megrock.ps</category>
</javascriptresource>
*/

//@include "xlib/stdlib.js" 
//@include "MegurockUtil.js" 

/**
 *
 */
function init() {
	var doc = activeDocument;
		selection = doc.selection;

	try {
		var bounds = selection.bounds;
		MegurockUtil.slice(bounds);
	} catch (error) {
		alert("選択範囲が見つかりませんでした。");
	}
}

init();