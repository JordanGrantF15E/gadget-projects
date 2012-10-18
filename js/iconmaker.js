/**
 * @name MapIconMaker
 * @version 1.1
 * @author Pamela Fox
 * @copyright (c) 2008 Pamela Fox
 * @fileoverview This gives you static functions for creating dynamically
 *     sized and colored marker icons using the Charts API marker output.
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

/**
 * @name MarkerIconOptions
 * @class This class represents optional arguments to {@link createMarkerIcon}, 
 *     {@link createFlatIcon}, or {@link createLabeledMarkerIcon}. Each of the
 *     functions use a subset of these arguments. See the function descriptions
 *     for the list of supported options.
 * @property {Number} [width=32] Specifies, in pixels, the width of the icon.
 *     The width may include some blank space on the side, depending on the
 *     height of the icon, as the icon will scale its shape proportionately.
 * @property {Number} [height=32] Specifies, in pixels, the height of the icon.
 * @property {String} [primaryColor="#ff0000"] Specifies, as a hexadecimal
 *     string, the color used for the majority of the icon body.
 * @property {String} [cornerColor="#ffffff"] Specifies, as a hexadecimal
 *     string, the color used for the top corner of the icon. If you'd like the
 *     icon to have a consistent color, make the this the same as the
 *     {@link primaryColor}.
 * @property {String} [strokeColor="#000000"] Specifies, as a hexadecimal
 *     string, the color used for the outside line (stroke) of the icon.
 * @property {String} [shadowColor="#000000"] Specifies, as a hexadecimal
 *     string, the color used for the shadow of the icon. 
 * @property {String} [label=""] Specifies a character or string to display
 *     inside the body of the icon. Generally, one or two characters looks best.
 * @property {String} [labelColor="#000000"] Specifies, as a hexadecimal 
 *     string, the color used for the label text.
 * @property {Number} [labelSize=0] Specifies, in pixels, the size of the label
 *     text. If set to 0, the text auto-sizes to fit the icon body.
 * @property {String} [shape="circle"] Specifies shape of the icon. Current
 *     options are "circle" for a circle or "roundrect" for a rounded rectangle.
 * @property {Boolean} [addStar = false] Specifies whether to add a star to the
 *     edge of the icon.
 * @property {String} [starPrimaryColor="#FFFF00"] Specifies, as a hexadecimal
 *     string, the color used for the star body.
 * @property {String} [starStrokeColor="#0000FF"] Specifies, as a hexadecimal
 *     string, the color used for the outside line (stroke) of the star.
 */

/**
 * This namespace contains functions that you can use to easily create
 *     dynamically sized, colored, and labeled icons.
 * @namespace
 */
var MapIconMaker = {};


/**
 * Creates a flat icon based on the specified options in the 
 *     {@link MarkerIconOptions} argument.
 *     Supported options are: width, height, primaryColor,
 *     shadowColor, label, labelColor, labelSize, and shape..
 * @param {MarkerIconOptions} [opts]
 * @return {GIcon}
 */
MapIconMaker.createFlatIcon = function (opts) {
  var width = opts.width || 32;
  var height = opts.height || 32;
  var primaryColor = opts.primaryColor || "#ff0000";
  var shadowColor = opts.shadowColor || "#000000";
  var label = MapIconMaker.escapeUserText_(opts.label) || "";
  var labelColor = opts.labelColor || "#000000";
  var labelSize = opts.labelSize || 0;
  var shape = opts.shape ||  "circle";
  var shapeCode = (shape === "circle") ? "it" : "itr";

  var baseUrl = "http://chart.apis.google.com/chart?cht=" + shapeCode;
  var iconUrl = baseUrl + "&chs=" + width + "x" + height + 
      "&chco=" + primaryColor.replace("#", "") + "," + 
      shadowColor.replace("#", "") + "ff,ffffff01" +
      "&chl=" + label + "&chx=" + labelColor.replace("#", "") + 
      "," + labelSize;
  
  
  
//  var icon = new GIcon(G_DEFAULT_ICON);
  
  return iconUrl + "&chf=bg,s,00000000" + "&ext=.png";

/*


  icon.image = iconUrl + "&chf=bg,s,00000000" + "&ext=.png";
  
  
  
  icon.iconSize = new GSize(width, height);
  icon.shadowSize = new GSize(0, 0);
  icon.iconAnchor = new GPoint(width / 2, height / 2);
  icon.infoWindowAnchor = new GPoint(width / 2, height / 2);
  icon.printImage = iconUrl + "&chof=gif";
  icon.mozPrintImage = iconUrl + "&chf=bg,s,ECECD8" + "&chof=gif";

  icon.shadow=TRANSPARENT_ICON_URL;
  icon.transparent = TRANSPARENT_ICON_36x15; //iconUrl + "&chf=a,s,ffffff01&ext=.png";
  //icon.transparent = iconUrl + "&chf=a,s,ffffff01&ext=.png";
  icon.printShadow=TRANSPARENT_ICON_URL;
  
  
  icon.imageMap = []; 
  if (shapeCode === "itr") {
    icon.imageMap = [0, 0, width, 0, width, height, 0, height];
  } else {
    var polyNumSides = 8;
    var polySideLength = 360 / polyNumSides;
    var polyRadius = Math.min(width, height) / 2;
    for (var a = 0; a < (polyNumSides + 1); a++) {
      var aRad = polySideLength * a * (Math.PI / 180);
      var pixelX = polyRadius + polyRadius * Math.cos(aRad);
      var pixelY = polyRadius + polyRadius * Math.sin(aRad);
      icon.imageMap.push(parseInt(pixelX), parseInt(pixelY));
    }
  }

  return icon;
 */
};


/**
 * Utility function for doing special chart API escaping first,
 *  and then typical URL escaping. Must be applied to user-supplied text.
 * @private
 */
MapIconMaker.escapeUserText_ = function (text) {
  if (text === undefined) {
    return null;
  }
  text = text.replace(/@/, "@@");
  text = text.replace(/\\/, "@\\");
  text = text.replace(/'/, "@'");
  text = text.replace(/\[/, "@[");
  text = text.replace(/\]/, "@]");
  return encodeURIComponent(text);
};


weatherWatcher.markers.cacheMarkerIcons=function(){
    var iconimage;
    var iconforeground;
    var iconOptions=iconOpt();
    for (var x=-20;x<=130;x++){
	    if (x<=32){
		    //Dark Blue
		    iconimage="#0000ff";
		    iconforeground="#ffffff";
	    }
	    else if(x>32&x<=40){
		    //Cyan
		    iconimage="#0099ff";
		    iconforeground="#ffffff";
	    }
	    else if(x>40&x<=55){
		    //Light Cyan
		    iconimage="#ccffff";
		    iconforeground="#000000";
	    }
	    else if(x>55&x<=70){
		    //White
		    iconimage="#ffffff";
		    iconforeground="#000000";
	    }
	    else if(x>70&x<=85){
		    //Yellow
		    iconimage="#ffff00";
		    iconforeground="#000000";
	    }
	    else if(x>85&x<=100){
		    //Red
		    iconimage="#ff0000";
		    iconforeground="#ffffff";
	    }
	    else if(x>100){
		    //Black
		    iconimage="#000000";
		    iconforeground="#ff0000";
	    }
    
	    //var iconOptions=iconOpt();
	    iconOptions.primaryColor=iconimage;
	    iconOptions.labelColor=iconforeground;
	    
	    iconOptions.label=roundto(x,0).toString() + "°F";
	    weatherWatcher.markers.arrays.temps[x]=MapIconMaker.createFlatIcon(iconOptions);
	    
    }
    
    var iconOptions=iconOpt();
    iconOptions.primaryColor="#cccccc";
    iconOptions.label="???";
    iconOptions.labelColor="#000000";
    weatherWatcher.markers.arrays.temps[-999]=MapIconMaker.createFlatIcon(iconOptions);
    
    
    for (var x=0;x<=130;x++){
	    if (x>=0&x<10){
		    //White
		    iconimage="#FFFFFF";
		    iconforeground="#000000";
	    }
	    else if(x>=10&x<=20){
		    //Yellow
		    iconimage="#FFFF00"
		    iconforeground="#000000";
	    }
	    else if(x>20&x<=30){
		    //Light Orange
		    iconimage="#FFcc00";
		    iconforeground="#000000";
	    }
	    else if(x>30&x<=40){
		    //Orange
		    iconimage="#FF9900";
		    iconforeground="#000000";
	    }
	    else if(x>40&x<=70){
		    //Red
		    iconimage="#FF0000";
		    iconforeground="#000000";
	    }
	    else if(x>70){
		    //Black with red lettering
		    iconimage="#000000";
		    iconforeground="#FF0000";
		    
	    }
	    iconOptions.primaryColor=iconimage;
	    iconOptions.labelColor=iconforeground;
	    iconOptions.label=x.toString() + "mph";
	    iconOptions.labelSize=9;
	    weatherWatcher.markers.arrays.wind[x]=MapIconMaker.createFlatIcon(iconOptions);
    
    }
    var iconOptions=iconOpt();
    iconOptions.primaryColor="#cccccc";
    iconOptions.label="???";
    iconOptions.labelColor="#000000";
    iconOptions.labelSize=11;
    weatherWatcher.markers.arrays.wind[-999]=MapIconMaker.createFlatIcon(iconOptions);


}

weatherWatcher.markers.createRainIcon=function(val){
    var iconOptions=iconOpt();
    iconOptions.primaryColor="#ffffff";
    iconOptions.label=val;
    iconOptions.labelColor="#000000";
    iconOptions.labelSize=9;
    iconOptions.width=40;
    return MapIconMaker.createFlatIcon(iconOptions);
}

function iconOpt(){
    var io={}

    io.width=36;
    io.height=15;
    io.labelSize=10;
    io.strokeColor="#000000";
    io.shape="roundrect";
    return io;
}
	
