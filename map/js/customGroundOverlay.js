
wwOverlay.prototype = new google.maps.OverlayView();

function wwOverlay(bounds, image, map, opacity,zindex) {

    // Now initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
    this.opacity_=opacity;
    this.zindex_=zindex;

    // We define a property to hold the image's div. We'll 
    // actually create this div upon receipt of the onAdd() 
    // method so we'll leave it null for now.
    this.div_ = null;
    

    // Explicitly call setMap on this overlay
    this.setMap(map);
  }

wwOverlay.prototype.onAdd = function() {

    // Note: an overlay's receipt of onAdd() indicates that
    // the map's panes are now available for attaching
    // the overlay to the map via the DOM.

    // Create the DIV and set some basic attributes.
    var div = document.createElement('DIV');
    div.style.borderStyle = "none";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";
    div.style.zIndex=this.zindex_;

    // Create an IMG element and attach it to the DIV.
    var img = document.createElement("img");
    img.src = this.image_;
    img.style.width = "100%";
    img.style.height = "100%";
    
    div.appendChild(img);

    // Set the overlay's div_ property to this DIV
    this.div_ = div;
    this.setDivOpacity(this.opacity_);
    // We add an overlay to a map via one of the map's panes.
    
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  }

wwOverlay.prototype.draw = function() {
    try{
    // Size and position the overlay. We use a southwest and northeast
    // position of the overlay to peg it to the correct position and size.
    // We need to retrieve the projection from this overlay to do this.
    var overlayProjection = this.getProjection();
    
    // Retrieve the southwest and northeast coordinates of this overlay
    // in latlngs and convert them to pixels coordinates.
    // We'll use these coordinates to resize the DIV.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    
    // Resize the image's DIV to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
    
    }
    catch(E){}
  }

wwOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }


wwOverlay.prototype.setDivOpacity=function(opacity){
    if (opacity < 0){
	opacity = 0 ;
    }
    if(opacity > 100){
	opacity = 100 ;
    }
    var c = opacity/100 ;
    if (typeof(this.div_.style.filter) =='string'){
	this.div_.style.filter = 'alpha(opacity:' + opacity + ')' ;
    }
    if (typeof(this.div_.style.KHTMLOpacity) == 'string' ){
	this.div_.style.KHTMLOpacity = c ;
    }
    if (typeof(this.div_.style.MozOpacity) == 'string'){
	this.div_.style.MozOpacity = c ;
    }
    if (typeof(this.div_.style.opacity) == 'string'){
	this.div_.style.opacity = c ;
    }
}

