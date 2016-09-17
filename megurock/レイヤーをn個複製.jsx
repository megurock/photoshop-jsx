/* <javascriptresource><name>レイヤーをn個複製</name><category>net.megrock.ps</category></javascriptresource>*///@include "xlib/stdlib.js" /**  * */function formatNumber(num, digits, fillChar) {	var numStr = num.toString();	for (var i = numStr.length; i < digits; i++) {		numStr = fillChar + numStr;	}	return numStr;}/** * initialize */function init() {	var NUM_DEFAULT_DUPLICATION = 2,		NUM_MIN_DIGITS = 2,		doc = activeDocument,		selectedLayers = Stdlib.getSelectedLayers(doc),		len = selectedLayers.length;	if (!len) {		alert("複製するレイヤーを選択してください。");	} else {		var num = Number(prompt("いくつ複製しますか？", NUM_DEFAULT_DUPLICATION)),			digits = num.toString().length;		if (digits < NUM_MIN_DIGITS) {			digits = NUM_MIN_DIGITS;		}		if (num) {			for (var i = 0; i < len; i++) {				var layer = selectedLayers[i],					lastLayer = layer;				// [Bug Fix?]				// need to deselect the selected layer when multi-layers are selected, 				// or layers will be duplicated one more than specified.				if (len >= 2) {					var index = Stdlib.getLayerIndex(doc, layer);					Stdlib.deselectLayerByIndex(doc, index);				}				// duplicate selected layer underneath				for (var j = 1; j <= num; j++) {					lastLayer = layer.duplicate(lastLayer, ElementPlacement.PLACEBEFORE);					lastLayer.name = layer.name + '_' + formatNumber(j, digits, "0");				}			}			Stdlib.selectLayers(doc, selectedLayers);		}	}}init();