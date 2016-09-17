//@include "xlib/stdlib.js"

var MegurockUtil = {};

/**
 *
 */
MegurockUtil.nameSliceSelected = function(name) {
	var ref = new ActionReference(),
		descA = new ActionDescriptor(),
		descB = new ActionDescriptor(),

		idsetd = charIDToTypeID("setd"),
		idnull = charIDToTypeID("null"),
		idslice = stringIDToTypeID("slice"),
		idOrdn = charIDToTypeID("Ordn"),
		idTrgt = charIDToTypeID("Trgt"),
		idT = charIDToTypeID("T   "),
		idNm = charIDToTypeID("Nm  "),
		idsliceImageType = stringIDToTypeID("sliceImageType"),
		idImg = charIDToTypeID("Img ");

    ref.putEnumerated(idslice, idOrdn, idTrgt);
    descA.putReference(idnull, ref);
    descB.putString(idNm, name);
    descB.putEnumerated(idsliceImageType, idsliceImageType, idImg);
    descA.putObject(idT, idslice, descB);
	executeAction(idsetd, descA, DialogModes.NO);
};

/**
 * slice
 */
MegurockUtil.slice = function(bounds, name) {
	var left = bounds[0],
		top = bounds[1],
		right = bounds[2],
		bottom = bounds[3],

		ref = new ActionReference(),
		descA = new ActionDescriptor(),
		descB = new ActionDescriptor(),
		descC = new ActionDescriptor(),

		idMk = charIDToTypeID("Mk  "),
		idnull = charIDToTypeID("null"),
		idslice = stringIDToTypeID("slice"),
		idTop = charIDToTypeID("Top "),
		idLeft = charIDToTypeID("Left"),
		idBtom = charIDToTypeID("Btom"),
		idRght = charIDToTypeID("Rght"),
		idRctn = charIDToTypeID("Rctn"),
		idPxl = charIDToTypeID("#Pxl"),
		idType = charIDToTypeID("Type"),
		idsliceType = stringIDToTypeID("sliceType"),
		iduser = stringIDToTypeID("user"),
		idUsng = charIDToTypeID("Usng"),
		idAt = charIDToTypeID("At  ");

	// 
    ref.putClass(idslice);
    descA.putReference(idnull, ref);
    descB.putEnumerated(idType, idsliceType, iduser);
	descC.putUnitDouble(idTop, idPxl, top);
	descC.putUnitDouble(idLeft, idPxl, left);
	descC.putUnitDouble(idBtom, idPxl, bottom);
    descC.putUnitDouble(idRght, idPxl, right);
    descB.putObject(idAt, idRctn, descC);
    descA.putObject(idUsng, idslice, descB);
	executeAction(idMk, descA, DialogModes.NO);

	if (name !== undefined) {
		MegurockUtil.nameSliceSelected(name);
	}
};

