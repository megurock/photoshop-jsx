/* 
<javascriptresource>
<name>レイヤーセットからスライスを作成</name>
<category>net.megrock.ps</category>
</javascriptresource>
*/

//@include "xlib/stdlib.js"
//@include "MegurockUtil.js" 
/**
 *
 */
function init() {
	var ssName,
		doc = activeDocument,
		activeLayer = doc.activeLayer;

	if (activeLayer.typename === 'LayerSet') {
		var mergedLayer,
			bounds;

		// merge layer set
		ssName = 'ss' + new Date().getTime() + Math.random();
		Stdlib.takeSnapshot(doc, ssName);
		try {
			mergedLayer = activeLayer.merge();
			bounds = mergedLayer.bounds.concat();
		} catch (error) {
			//
		}
		Stdlib.revertToSnapshot(doc, ssName);

		// slice
		try {
			MegurockUtil.slice(bounds);
		} catch (error) {
			//alert("no bounds found!");
		}
	} else {
		alert("レイヤーセットを選択してください。");
	}
}

init();