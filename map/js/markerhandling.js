
function wwMarker(weatherStation){
    this.data=weatherStation;
    this.id=weatherStation.id.toLowerCase();
    this.elevation=typeof(weatherStation.elev)!="undefined"?parseInt(weatherStation.elev):-999;
    var newDateUtc=makeDate3(weatherStation.dateutc);
    this.dateutc=newDateUtc; //new Date(newDateUtc.getFullYear(),newDateUtc.getMonth(),newDateUtc.getDate(),newDateUtc.getHours(),newDateUtc.getMinutes(),newDateUtc.getSeconds(),0);
    this.expired=false;
    this.updateAge();
    this.gLatLng=new google.maps.LatLng(this.data.lat,this.data.lon);
    //this.age=(datenow-this.dateutc)/1000/60;
    
    this.visible=false;
    return this;
}

wwMarker.prototype.addToMap=function(){
    //two cases: update only, add new
    
    if (typeof(this.gMarker)!="undefined"&&this.gMarker!=null){
	if (!this.onScreen(map.getBounds())){
	    //marker is not on screen
	    this.removeFromMap();
	}
	else
	{
	    //marker is on screen, so update marker image and infoWindow
	    if (this.infoWindow){
		google.maps.event.clearInstanceListeners(this.infoWindow);
		//this.infoWindow.close();
		this.infoWindow=null;
	    }
	    
	    google.maps.event.removeListener(this.clickHandler);
	    
	    
	    var iconURL=weatherWatcher.markers.selectIcon(this);
	    this.gMarker.setIcon(iconURL);
	    if (weatherWatcher.markers.currentElevationFilter<this.elevation){
		this.gMarker.setVisible(true);
	    }
	    var latlng=this.gLatLng;
	    
	    //reset the infoWindow
	    
	    var offset=new google.maps.Size(0,-12);
	    var thismarker=this;
	    var content=this.createInfoWindowContent();
	    this.clickHandler=google.maps.event.addListener(this.gMarker,"click",function(X1){
		var IW=new google.maps.InfoWindow({content:content,disableAutoPan:false,position:latlng,pixelOffset:offset});
		google.maps.event.addListenerOnce(IW,"closeclick",function(){thismarker.infoWindow=null;});
		IW.open(map);
		thismarker.infoWindow=IW;
	    });
	    
	    
	}
	debug.log("updated " + this.id);
	return true;

    }else{

	if (this.onScreen(map.getBounds())){
	
	    var iconURL=weatherWatcher.markers.selectIcon(this);
	    var markerTitle=this.createMarkerTitle();
	    var latlng=this.gLatLng;
	    var markerOptions={
		flat:true,
		map:map,
		icon:iconURL,
		position:latlng,
		title:markerTitle,
		visible:true
	    }
	    
	    if (weatherWatcher.markers.currentElevationFilter<this.elevation){
		markerOptions.visible=true;
		this.visible=true;
	    }
	    else
	    {
		markerOptions.visible=false;
		this.visible=false;
	    }

	    var gm=new google.maps.Marker(markerOptions);
	    this.gMarker=gm;
	    weatherWatcher.markers.arrays.gMarker.push(gm);
	    
	    var offset=new google.maps.Size(0,-12);
	    var thismarker=this;
	    var content=this.createInfoWindowContent();
	    this.clickHandler=google.maps.event.addListener(this.gMarker,"click",function(X1){
		var IW=new google.maps.InfoWindow({content:content,disableAutoPan:false,position:latlng,pixelOffset:offset});
		google.maps.event.addListenerOnce(IW,"closeclick",function(){thismarker.infoWindow=null;});
		IW.open(map);
		thismarker.infoWindow=IW;
	    });
	    debug.log("added " + this.id);
	}
	return true;
    }
    debug.log("addToMap did nothing on ", this.id);
}
wwMarker.prototype.onScreen=function(mapBounds){
    return mapBounds.contains(this.gLatLng);
}
wwMarker.prototype.createMarkerTitle=function(){
    var fullstationname,markertitle;
    if (this.data.adm1){
	fullstationname=this.data.adm1 + " " + this.data.adm2; 
	if (this.data.neighborhood){fullstationname+=" " + this.data.neighborhood;}
	markertitle=this.data.id + "\n" + fullstationname;
	if (this.elevation>0){markertitle+="\n(Elevation " + this.elevation.toString() + "ft)"}
	if (typeof(this.data.CAM)!="undefined"){markertitle+="\n WebCam!";}
	return markertitle;
    }
    else
    {
	return "";
    }
}

wwMarker.prototype.createInfoWindowContent=function(){
    //returns the info window HTML
    var iwTemplate=new Template(weatherWatcher.templates.INFO_WINDOW);
    var fullstationname,markertitle;
    if (this.data.adm1){
	fullstationname=this.data.adm1 + " " + this.data.adm2; 
	if (this.data.neighborhood){fullstationname+=" " + this.data.neighborhood;}
    
	markertitle=this.data.id + "\n" + fullstationname;
	if (this.elevation>0){markertitle+="\n(Elevation " + this.elevation.toString() + "ft)"}
        if (typeof(this.data.CAM)!="undefined"){markertitle+="\n WebCam!";}
    }
    
    var iwData={
	stationname:this.data.id,
	provider:this.data.type,
	stationinfo:"<br/><b>" + fullstationname + "</b>",
	VT:this.data.tempf,
	humidity:"&nbsp;&nbsp;&nbsp;<span class='att'>Humidity</span> <b>" + this.data.humidity + "%</b>",
	elev:this.elevation,
	source:"<a href='http://www.wunderground.com' target='_blank'>Weather Underground</a>",
	pointlon:this.data.lon,
	pointlat:this.data.lat,
	obtime:dateformat(this.dateutc)
    }
    
    
    
    if (this.data.type=="PWS"){
	iwData.stationlink="<a href='http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=" + this.data.id + "' target='_blank'>" + this.data.id + "</a>"
    }
    else
    {
	iwData.stationlink=this.data.id;
    }
    if (typeof(this.data.dailyrainin)!="undefined"){iwData.dailyrainin=this.data.dailyrainin.toString() + "in";}else{iwData.dailyrainin="Unknown";}
    if (typeof(this.data.CAM)!="undefined"){iwData.webcam="<div style='padding-top:5px;height:115px;'><a href='" + this.data.CAM + "' target='_blank'><img src='" + this.data.CAM + "' height='100' /></a></div>";}
    
    if (typeof(this.data.Road1Tempf)!="undefined"){
	    iwData.roadtemp="<br /><span class='att'>Road Temp</span> <b>" + this.data.Road1Tempf + "&deg;F</b>";
    }
    
    if (typeof(this.data.windspeedmph)!="undefined"&&this.data.windspeedmph>=0){
	    iwData.wind="<br /><span class='att'>Wind</span> <b>" + this.data.windspeedmph + "mph</b>"
	    if (this.data.windgustmph){iwData.wind+=" <span class='att'>gusts to</span> <b>" + this.data.windgustmph + "mph</b>";}
	    if (this.data.winddir){
		    iwData.wind+="<span class='att'> from</span> <b>" + lookupWindString(parseInt(this.data.winddir)) + " (" + this.data.winddir + "&deg;)</b>";
	    }
	    
    }

    return iwTemplate.evaluate(iwData);
    
}

wwMarker.prototype.removeFromMap=function(){
    //remove the marker, clear the handlers, close the infowindow, set the object to null
    if(typeof(this.gMarker)!="undefined"&&this.gMarker!=null){
	if (this.infoWindow){
	    google.maps.event.clearInstanceListeners(this.infoWindow);
	    this.infoWindow.close();
	    this.infoWindow=null;
	}
	this.gMarker.setMap(null);
	google.maps.event.clearInstanceListeners(this.gMarker);
	this.clickHandler=null;
	this.gMarker=null;
	this.visible=false;
	debug.log("removed " + this.id);
    }
    
}


wwMarker.prototype.hide=function(){
    //used for hiding a marker that is not within the elevation requirements
    
    if (typeof(this.gMarker)!="undefined"&&this.gMarker!=null){
	this.gMarker.setVisible(false);
	debug.log(this.id,"setVisible(false)");
	
    }else{debug.log(this.id,"no marker object");}
    this.visible=false;
}

wwMarker.prototype.show=function(){
    //used for showing a marker that has become within the elevation requirements
    if (typeof(this.gMarker)!="undefined"&&this.gMarker!=null){
	this.gMarker.setVisible(true);
	this.visible=true;
    }
}


wwMarker.prototype.changeIcon=function(){
    if (typeof(this.gMarker)!="undefined"&&this.gMarker!=null){
	var newIconURL=weatherWatcher.markers.selectIcon(this);
	this.gMarker.setIcon(newIconURL);
    }
}

wwMarker.prototype.updateData=function(newdata){

    this.previousUpdate=this.dateutc;
    var newDateUtc=makeDate3(newdata.dateutc); //get a new date object from the date in the data
    //var dt=new Date(newDateUtc.getFullYear(),newDateUtc.getMonth(),newDateUtc.getDate(),newDateUtc.getHours(),newDateUtc.getMinutes(),newDateUtc.getSeconds(),0);

    if (this.dateutc-newDateUtc==0){return true} //the data hasn't been updated since the last time
    //debug.log("updating ",this.id,this.previousUpdate-newDateUtc);
    this.data=newdata;
    this.dateutc=newDateUtc;
    this.updateAge();
    
    return true;
}

wwMarker.prototype.updateAge=function(){
    var dateNow=new Date();
	this.age=(dateNow-this.dateutc)/1000/60; //minutes
	if (this.age>weatherWatcher.markers.expiration){
		this.expired=true;
	}
    
}

weatherWatcher.markers={};
weatherWatcher.markers.arrays={};
weatherWatcher.markers.arrays.wind=[];
weatherWatcher.markers.arrays.temps=[];
weatherWatcher.markers.arrays.gMarker=[];
weatherWatcher.markers.activeType="temps";
weatherWatcher.markers.currentElevationFilter=-9999;
weatherWatcher.markers.reset=function(){
    weatherWatcher.markers.hideAll();
    weatherWatcher.markers.startRetrieve();
}

weatherWatcher.markers.elevationFilterChange=function(filter){
    //hides markers below the filter elevation. filter=0 shows all of them
    
    weatherWatcher.markers.all.each(function(item){
	if (filter>0&&item.elevation<filter){
	    item.hide();
	}
	else
	{
	    item.show();
	} 
	});
    
}

weatherWatcher.markers.selectIcon=function(marker){
    var selectedIcon="";
    switch (weatherWatcher.markers.activeType){
    case "temps":
	selectedIcon=weatherWatcher.markers.arrays.temps[marker.data.tempf>=-20&&marker.data.tempf<=130?roundto(marker.data.tempf,0):-999];
	break;
    case "wind":
	selectedIcon=weatherWatcher.markers.arrays.wind[typeof(marker.data.windspeedmph)!="undefined"&&marker.data.windspeedmph<130&&marker.data.windspeedmph>=0?roundto(marker.data.windspeedmph,0):-999];
	break;
    case "gusts":
	selectedIcon=weatherWatcher.markers.arrays.wind[typeof(marker.data.windgustmph)!="undefined"&&marker.data.windgustmph<130&&marker.data.windgustmph>=0?roundto(marker.data.windgustmph,0):-999];
	break;
    case "rain":
	selectedIcon=weatherWatcher.markers.createRainIcon(typeof(marker.data.dailyrainin)!="undefined"&&marker.data.dailyrainin>=0?marker.data.dailyrainin.toString() + "in.":"???");
	break;
    }
    return selectedIcon;
}
weatherWatcher.markers.expiration=10; //expire markers that are older than X minutes

weatherWatcher.markers.updateAges=function(){
    
    weatherWatcher.markers.all.each(function(item){item.updateAge();});
    
}

weatherWatcher.markers.hideAll=function(){
    
    weatherWatcher.markers.all.each(function(item){item.removeFromMap();});

}

weatherWatcher.markers.showAll=function(){
    
    weatherWatcher.markers.all.each(function(item){item.show();});

}

weatherWatcher.markers.changeMarkerType=function(){

    weatherWatcher.markers.all.each(function(item){item.changeIcon();});

}


weatherWatcher.markers.all=[]; //this will be an array of marker objects
weatherWatcher.markers.startRetrieve=function(){
    debug.log("START RETRIEVE");
    if (!$("chkMarkers").checked){debug.log("marker checkbox is unchecked.");return}
    var rectBounds=map.getBounds();
    var urlTemplate= new Template(weatherWatcher.templates.STATION_DATA);
    var templateData={maxlat:rectBounds.getNorthEast().lat(),minlat:rectBounds.getSouthWest().lat(),maxlon:rectBounds.getNorthEast().lng(),minlon:rectBounds.getSouthWest().lng(),r:parseInt(1000*Math.random()).toString()};
    var url=urlTemplate.evaluate(templateData);
    currentTagId="wuStations";

    var scriptTag=new Element("script",{type:"text/javascript",async:"",src:url,id:currentTagId});
    $("scriptplaceholder").insert({bottom:scriptTag});
    
}

weatherWatcher.markers.showHide=function(){
    if ($("chkMarkers").checked){
	weatherWatcher.markers.startRetrieve();
	return;
    }
    else
    {
	weatherWatcher.markers.hideAll();
    }
}

weatherWatcher.markers.updateMap=function(){
    //process the marker array and add/remove markers as appropriate
    //first, update the aging on all markers
    //alert(weatherWatcher.markers.all.length);
    
    var noUpdateCount=0;
    weatherWatcher.markers.updateAges();
    //loop through the markers looking for expired and not expired markers
    
    weatherWatcher.markers.all.each(function(item){
	if (item.expired){
	    item.removeFromMap();
	}
	else
	{
	    if (item.previousUpdate){
		if(item.previousUpdate-item.dateutc!=0){
		    item.addToMap();
		}
		else
		{
		    noUpdateCount++;
		}
	    }
	    else
	    {
		item.addToMap();
	    }
	}
	});
    
    debug.log("noUpdateCount=" + noUpdateCount.toString());
    //delete expired and non-visible markers
    weatherWatcher.markers.shrinkMarkerArray();
}

weatherWatcher.markers.shrinkMarkerArray=function(){
    
    
    var newArray=[];
    var x=0;
    
    weatherWatcher.markers.all.each(function(theitem){
	x++;
	if(typeof(theitem.gMarker)!="undefined"&&theitem.gMarker!=null){
	    newArray.push(theitem);
	}
    });
    debug.log("Starting marker count=" + x.toString());
    weatherWatcher.markers.all=newArray.sortBy(function(item){return item.id});
    debug.log("Ending marker count=" + weatherWatcher.markers.all.length.toString());
    newArray=null;
    return true;
    
}


weatherWatcher.markers.removeOffScreenMarkers=function(){
    var removedCount=0;
    var mapBounds=map.getBounds();
    
    weatherWatcher.markers.all.each(function(item){
	if (!item.onScreen(mapBounds)){
	    item.removeFromMap();
	    removedCount++;
	}
    });
    
    debug.log("removed:" + removedCount.toString());
    weatherWatcher.markers.shrinkMarkerArray();
    weatherWatcher.markers.startRetrieve();
    
}

weatherWatcher.markers.process=function(stationData){
    
    try{$("wuStations").remove();} //remove the script tag we added dynamically
    catch(e){debug.dir(e);}
    try{
	
	var d=new Date();
	var updateCount=0;
	var newCount=0;
	stationData.each(function(item){
	    var newmarker=new wwMarker(item); //create a marker object
	    if (!newmarker.expired){
		var lookupResult=weatherWatcher.markers.lookupID(newmarker.id);
		//debug.dir(lookupResult);
		
		if (lookupResult){
		    
		    if (lookupResult.id!=newmarker.id){debug.log("inconsistency!");}
		    
		    lookupResult.updateData(item);
		    newmarker=null;
		    updateCount++;
		}else
		{
		    //the station ID was not found, so it must be a new marker
		    weatherWatcher.markers.all.push(newmarker); //assign marker to the array

		    newmarker=null;
		    newCount++;
		}
	    }
	    
	});
	
	
	weatherStations=null;
	t=null;
    }
    catch(e){
	debug.dir(e);
    }

    debug.log("updated: " + updateCount.toString());
    debug.log("new: " + newCount.toString());

    weatherWatcher.markers.updateMap();
}

weatherWatcher.markers.lookupID=function(id1){
    var returnvalue=null;
    var x=0;
    returnvalue=weatherWatcher.markers.all.detect(function(item){
	x++;
	if (item.id==id1){
	    return true;
	}else{
	    return false;
	}
    });

    debug.log("found in " + x.toString() + " iterations");
    return returnvalue;
}

function MapCallback(ws){
    weatherWatcher.markers.process(ws);
}
	
	

function makedate2(x){
	/*
	Converts date in this format: 2005-01-05T13:57:04-05:00
	to a javascript date in local timezone which we can then sort upon
	*/

	var dt;
	var tmp=new Date();
	var timezoneoffset=(tmp.getTimezoneOffset())*60*1000;
	var strDate;
	var strTime;
	var timeoffset;
	var re=/[+-][0123456789]{2}/;
	var ar1=x.split("T");

	strDate=ar1[0];
	strTime=ar1[1];
	
	var result=strTime.match(re);

	if (result!=null){
		strTime=strTime.substr(0,8);
		timeoffset=result.toString();
		}
		else
		{timeoffset="-00";}
	
	dt=Date.parse(strDate.substr(5,2)+"/"+strDate.substr(8,2)+"/"+strDate.substr(0,4)+" "+strTime);
	var tmp1=parseInt(timeoffset,10);

	dt=-1*(tmp1*60*60*1000)+dt;
	dt=dt-timezoneoffset;
	
	var dt2=new Date(dt);

	return(dt2);

}

function makeDate3(datestr){
    try{
	var d=new Date();
	var a=datestr.split(" ");
	var utcDate=a[0].split("-");
	var utcTime=a[1].split(":");
	var utcMon=utcDate[1]-1;
	
	d.setUTCFullYear(utcDate[0],utcMon,utcDate[2]);
	d.setUTCHours(utcTime[0],utcTime[1],utcTime[2]);
	d.setMilliseconds(0);
    }
    catch(e){
	debug.dir(e);
    }
    return d;
}
function roundto(n,p){
	if(isNaN(n)){return "0"}
	var t=n*Math.pow(10,p);
	t=Math.round(t)/Math.pow(10,p);
	return t.toString();
}	
function lookupWindString(n){
    var s="-";

    if (n > 360) n = n%360;

    if (n >= 0 && n < 11.25 ) s="N";
    else if (n >= 11.25  && n < 33.75 ) s="NNE";
    else if (n >= 33.75  && n < 56.25 ) s="NE";
    else if (n >= 56.25   && n < 78.75 ) s="ENE";
    else if (n >= 78.75  && n < 101.25) s="E";
    else if (n >= 101.25 && n < 123.75) s="ESE";
    else if (n >= 123.75 && n < 146.25) s="SE";
    else if (n >= 146.25  && n < 168.75) s="SSE";
    else if (n >= 168.75 && n < 191.25) s="S";
    else if (n >= 191.25 && n < 213.75) s="SSW";
    else if (n >= 213.75 && n < 236.25) s="SW";
    else if (n >= 236.25 && n < 258.75) s="WSW";
    else if (n >= 258.75 && n < 281.25) s="W";
    else if (n >= 281.25 && n < 303.75) s="WNW";
    else if (n >= 303.75 && n < 326.25) s="NW";
    else if (n >= 326.25 && n < 348.75) s="NNW";
    else if (n >= 348.75) s="N";

    return s;
}
function dateformat(dt){
    var s = (dt.getMonth() + 1) + "/";
    s += dt.getDate() + "/";
    s += dt.getFullYear(); //getYear is depreciated
    s +=" " + dt.getHours() + ":";
    if (dt.getMinutes()<10){s += "0" + dt.getMinutes()}else{s += dt.getMinutes()}
    s+=":" + (dt.getSeconds()<10?"0"+dt.getSeconds().toString():dt.getSeconds().toString());
    s+="." + dt.getMilliseconds().toString();
    return s
}


var debug={};

debug.dir=function(thing){
    if (weatherWatcher.constants.DEBUG_ENABLED&&typeof(console)!="undefined"){
	try{
	    console.dir(thing)
	}
	catch(E){}
    }
}

debug.log=function(thing1,thing2,thing3,thing4){
    if (weatherWatcher.constants.DEBUG_ENABLED&&typeof(console)!="undefined"){
	try{
	    console.log(thing1,typeof(thing2)!="undefined"?thing2:"",typeof(thing3)!="undefined"?thing3:"",typeof(thing4)!="undefined"?thing4:"");
	}
	catch(E){}
    }
}
