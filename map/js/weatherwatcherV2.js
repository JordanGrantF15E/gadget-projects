
var weatherWatcher = {};
var map = {};
weatherWatcher.constants = {DEBUG_ENABLED: false,DEFAULT_ZOOM: 8,LOCATION_DOT_ENABLED: false,COUNTY_MAP_SERVICE_URL: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer",OPACITY_DROPDOWN: [10, 20, 30, 40, 50, 60, 70, 80, 90],MARKER_REFRESH: 180000,LOCATION_REFRESH: 120000,NO_ALERT_TEXT: "No weather alerts found.",XYZZY: "%6d%61%70%2e%77%61%79%6e%65%73%77%65%61%74%68%65%72%77%61%74%63%68%65%72%2e%63%6f%6d",RE: /esweat|ts4y|bnut/};
weatherWatcher.queryString = [];
weatherWatcher.queryString.prepare = function() {
    var tmpquerystring = window.location.search;
    tmpquerystring = tmpquerystring.substring(1);
    if (tmpquerystring.length > 0) {
        var splitit = tmpquerystring.split("&");
        for (var z = 0; z < splitit.length; z++) {
            var namevalue = splitit[z].split("=");
            weatherWatcher.queryString[namevalue[0].toLowerCase()] = decodeURIComponent(namevalue[1]).toLowerCase();
        }
    }
}
weatherWatcher.templates = {RADAR_STATIC: "http://radblast.wunderground.com/cgi-bin/radar/WUNIDS_composite?maxlat=#{maxlat}&maxlon=#{maxlon}&minlat=#{minlat}&minlon=#{minlon}&type=N0R&frame=0&num=1&delay=25&width=#{width}&height=#{height}&png=0&smooth=1&min=0&noclutter=0&rainsnow=1&nodebug=0&theext=.gif&timelabel=1&timelabel.x=200&timelabel.y=12&brand=wundermap&reproj.automerc=1",RADAR_ANIMATED: "http://radblast.wunderground.com/cgi-bin/radar/WUNIDS_composite?maxlat=#{maxlat}&maxlon=#{maxlon}&minlat=#{minlat}&minlon=#{minlon}&type=N0R&frame=0&num=7&delay=25&width=#{width}&height=#{height}&png=0&smooth=1&min=0&noclutter=0&rainsnow=1&nodebug=0&theext=.gif&merge=elev&reproj.automerc=1&timelabel=1&timelabel.x=200&timelabel.y=12&brand=wundermap",IR_SATELLITE: "http://wublast.wunderground.com/cgi-bin/WUBLAST?maxlat=#{maxlat}&maxlon=#{maxlon}&minlat=#{minlat}&minlon=#{minlon}&gtt=109&num=6&key=sat_ir4&delay=25&width=#{width}&height=#{height}",VIS_SATELLITE: "http://wublast.wunderground.com/cgi-bin/WUBLAST?maxlat=#{maxlat}&maxlon=#{maxlon}&minlat=#{minlat}&minlon=#{minlon}&gtt=109&num=6&key=sat_vis&delay=25&width=#{width}&height=#{height}",WARNINGS: "http://wumaps.wunderground.com/cgi-bin/mapgen?theme=severe&stdout=1&size=#{width}x#{height}&minlat=#{minlat}&minlon=#{minlon}&maxlat=#{maxlat}&maxlon=#{maxlon}&proj=automerc&format=gif&alpha=1",STATION_DATA: "http://stationdata.wunderground.com/cgi-bin/stationdata?maxlat=#{maxlat}&minlat=#{minlat}&maxlon=#{maxlon}&minlon=#{minlon}&rand=#{r}",ALERT_DATA: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fapi.wunderground.com%2Fauto%2Fwui%2Fgeo%2FAlertsXML%2Findex.xml%3Fquery%3D#{lat}%2C#{lng}%22&format=json&callback=weatherWatcher.alertCallBack",INFO_WINDOW: "<div class='IWdiv'><b>Station #{stationlink}</b> <span class='fontsize10'>(#{provider})</span>#{stationinfo}<br /><span class='IWatttribute'>Temp</span> <b>#{VT}&deg;F</b>#{humidity}#{roadtemp}#{wind}<br /><span class='IWatttribute'>Rain Today</span> <b>#{dailyrainin}</b>&nbsp;&nbsp;&nbsp;<span class='IWatttribute'>Elevation</span> <b>#{elev}ft</b><br /><span class='IWatttribute'>Last reading: #{obtime}</span><br /><span class='IWatttribute'>Data via #{source}</span><div style='text-align:center'><a href='http://forecast.weather.gov/MapClick.php?lat=#{pointlat}&lon=#{pointlon}&site=pqr&smap=1&marine=0&unit=0&lg=en' target='_blank'>NWS Forecast</a><br />#{webcam}</div></div>",HURRICANE_INFO: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa?service=wms&version=1.1.1&request=GetMap&format=png&TRANSPARENT=TRUE&bgcolor=0xCCCCFE&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:102113&width=#{width}&height=#{height}&Layers=NHC_TRACK_POLY,NHC_TRACK_LIN,NHC_TRACK_PT_72DATE,NHC_TRACK_PT_0NAMEDATE,NHC_TRACK_PT_72WLBL,NHC_TRACK_PT,NHC_TRACK_PT_72CAT",SHORT_TERM_WARNINGS: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa?service=wms&version=1.1.1&request=GetMap&format=png&TRANSPARENT=TRUE&bgcolor=0xCCCCFE&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:102113&width=#{width}&height=#{height}&Layers=WARN_SHORT_EWW,WARN_SHORT_FFW,WARN_SHORT_FLW,WARN_SHORT_SVR,WARN_SHORT_TOR,WARN_SHORT_SMW",ALT_RADAR: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?service=wms&version=1.1.1&request=GetMap&format=png&TRANSPARENT=TRUE&bgcolor=0xCCCCFE&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:900913&width=#{width}&height=#{height}&Layers=nexrad-n0r-900913",NOAA_COUNTIES: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa?service=wms&version=1.1.1&request=GetMap&format=png&TRANSPARENT=TRUE&bgcolor=0xCCCCFE&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:900913&width=#{width}&height=#{height}&Layers=counties",NWS_WARNINGS: "http://gis.srh.noaa.gov/arcgis/services/watchWarn/MapServer/WMSServer?request=GetMap&service=WMS&version=1.1.1&format=png&TRANSPARENT=TRUE&bgcolor=0x000000&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:102113&width=#{width}&height=#{height}&Layers=0&styles=default",ALT_RADAR2: "http://gis.srh.noaa.gov/arcgis/services/Radar_warnings/MapServer/WMSServer?request=GetMap&service=WMS&version=1.1.1&format=png&TRANSPARENT=TRUE&bgcolor=0x000000&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:102113&width=#{width}&height=#{height}&Layers=0&styles=default",NOAA_TEMPS: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs?service=wms&version=1.1.1&request=GetMap&format=png&TRANSPARENT=TRUE&bgcolor=0xCCCCFE&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:102113&width=#{width}&height=#{height}&Layers=OBS_MET_TEMP,OBS_MET_WIND,OBS_MET_ID",NOAA_WARNINGS_QUERY: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fgis.srh.noaa.gov%2Farcgis%2Fservices%2FwatchWarn%2FMapServer%2FWMSServer%3Frequest%3DGetFeatureInfo%26service%3DWMS%26version%3D1.1.1%26format%3Dpng%26TRANSPARENT%3DTRUE%26bgcolor%3D0x000000%26SRS%3DEPSG%3A102113%26width%3D#{width}%26height%3D#{height}%26Layers%3D0%26styles%3Ddefault%26query_layers%3D0%26info_format%3Dxml%26feature_count%3D50%26BBOX%3D#{minlon}%2C#{minlat}%2C#{maxlon}%2C#{maxlat}%26x%3D#{pixelx}%26y%3D#{pixely}%22&format=json&callback=weatherWatcher.alert.queryLayer",NWS_WARNING_URL: "http://www.srh.noaa.gov/showpolywx.php?lc=#{location}&prodtype=#{producttype}&event=#{eventid}",NOWCOAST_SEVERE_WARNINGS_QUERY: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fnowcoast.noaa.gov%2Fwms%2Fcom.esri.wms.Esrimap%2Fwwa%3Fservice%3Dwms%26version%3D1.1.1%26request%3DGetFeatureInfo%26format%3Dpng%26TRANSPARENT%3DTRUE%26bgcolor%3D0xCCCCFE%26BBOX%3D#{minlon}%2C#{minlat}%2C#{maxlon}%2C#{maxlat}%26SRS%3DEPSG%3A102113%26width%3D#{width}%26height%3D#{height}%26Layers%3DWARN_SHORT_EWW%2CWARN_SHORT_FFW%2CWARN_SHORT_FLW%2CWARN_SHORT_SVR%2CWARN_SHORT_TOR%26query_layers%3DWARN_SHORT_EWW%2CWARN_SHORT_FFW%2CWARN_SHORT_FLW%2CWARN_SHORT_SVR%2CWARN_SHORT_TOR%26info_format%3Dxml%26feature_count%3D50%26X%3D#{pixelx}%26Y%3D#{pixely}%22&format=json&callback=weatherWatcher.alert.queryLayer2",NOWCOAST_RADAR: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs?service=wms&version=1.1.1&request=GetMap&format=png&TRANSPARENT=TRUE&bgcolor=0xCCCCFE&BBOX=#{minlon},#{minlat},#{maxlon},#{maxlat}&SRS=EPSG:102113&width=#{width}&height=#{height}&Layers=RAS_RIDGE_NEXRAD",ALERTS: "http://alerts.waynesweatherwatcher.com/alertlayer/alertLayer.aspx?size=#{width}x#{height}&minlat=#{minlat}&minlon=#{minlon}&maxlat=#{maxlat}&maxlon=#{maxlon}&zoom=#{mapzoom}&severe=0",ALERTS_SEVERE: "http://alerts.waynesweatherwatcher.com/alertlayer/alertLayer.aspx?size=#{width}x#{height}&minlat=#{minlat}&minlon=#{minlon}&maxlat=#{maxlat}&maxlon=#{maxlon}&zoom=#{mapzoom}&severe=1"}
weatherWatcher.resetCookies = function() {
    try {
        for (var x in weatherWatcher.Layers) {
            cookieLibrary.killCookie(x);
        }
        weatherWatcher.displayBottomMessage("Preferences cleared.");
        cookieLibrary.killCookie("markers");
    } 
    catch (E) {
        alert(E.message);
    }
}
weatherWatcher.setCookies = function() {
    try {
        for (var x in weatherWatcher.Layers) {
            if (weatherWatcher.Layers[x].currentValue) {
                cookieLibrary.setCookie(x, weatherWatcher.Layers[x].defaultOpacity, 10000);
            } 
            else 
            {
                cookieLibrary.setCookie(x, 0, 10000);
            }
        }
        cookieLibrary.setCookie("markers", $("chkMarkers").checked, 10000);
        weatherWatcher.displayBottomMessage("Preferences saved.");
    } 
    catch (E) {
        alert(E.message);
    }
}
weatherWatcher.loadScript = function(scriptURL) {
    var e = document.createElement("script");
    e.src = scriptURL;
    e.type = "text/javascript";
    var allScripts = document.getElementsByTagName("head")[0];
    return allScripts.appendChild(e);
}
weatherWatcher.generateMenu = function() {
    var sortArray = [];
    for (var x in weatherWatcher.Layers) {
        var oneLayer = weatherWatcher.Layers[x];
        sortArray.push([oneLayer.sortOrder, oneLayer.name]);
        var currentCookie = cookieLibrary.readCookie(x);
        if (currentCookie) {
            weatherWatcher.Layers[x].currentValue = parseInt(currentCookie) > 0 ? true : false;
            weatherWatcher.Layers[x].defaultOpacity = parseInt(currentCookie) > 0 ? parseInt(currentCookie) : weatherWatcher.Layers[x].defaultOpacity;
        }
    }
    var sortedArray = sortArray.sort();
    sortArray = null;
    for (var x = 0; x < sortedArray.length; x++) {
        var oneLayer = weatherWatcher.Layers[sortedArray[x][1]];
        var chkBox = new Element("INPUT", {type: "checkbox",id: oneLayer.id,title: oneLayer.title});
        var parentSpan = new Element("div", {className: "layerspan"});
        parentSpan.insert({bottom: chkBox});
        parentSpan.insert({bottom: oneLayer.name});
        $("layerlist").insert({bottom: parentSpan});
        $(oneLayer.id).checked = oneLayer.currentValue;
        $(oneLayer.id).observe("click", weatherWatcher.layerChanged);
    }
    sortedArray = null;
    var currentCookie = cookieLibrary.readCookie("markers");
    if (currentCookie) {
        $("chkMarkers").checked = currentCookie == "true" ? true : false;
    }
}
weatherWatcher.layerChanged = function(E) {
    var element = Event.findElement(E);
    var layer = weatherWatcher.findLayerByID(element.id);
    if (element.checked != layer.currentValue) {
        layer.currentValue = !layer.currentValue;
    }
    if (layer.name == 'Radar' || layer.name == "Animated Radar") {
        weatherWatcher.showHideRadar()
    } 
    else 
    {
        if (layer.currentValue) {
            layer.add(map.getBounds(), map.getDiv());
        } 
        else 
        {
            layer.remove();
        }
    }
    return;
}
weatherWatcher.findLayerByID = function(layerID) {
    for (var L in weatherWatcher.Layers) {
        if (layerID == weatherWatcher.Layers[L].id) {
            return weatherWatcher.Layers[L];
        }
    }
    return null;
}
weatherWatcher.showHideRadar = function() {
    var lStaticRadar = weatherWatcher.Layers["Radar"];
    var lAnimatedRadar = weatherWatcher.Layers["Animated Radar"];
    lStaticRadar.remove();
    lAnimatedRadar.remove();
    if (lStaticRadar.currentValue && lAnimatedRadar.currentValue) {
        lAnimatedRadar.add(map.getBounds(), map.getDiv());
    }
    if (lStaticRadar.currentValue && !lAnimatedRadar.currentValue) {
        lStaticRadar.add(map.getBounds(), map.getDiv());
    }
}
weatherWatcher.initialLocation = {};
weatherWatcher.initialZoom = weatherWatcher.constants.DEFAULT_ZOOM;
weatherWatcher.refreshLocation = function() {
    if (navigator.geolocation && weatherWatcher.LOCATION_DOT_ENABLED) {
        navigator.geolocation.getCurrentPosition(function(position) {
            debug.log("navigator.geolocation.getCurrentPosition");
            weatherWatcher.initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            weatherWatcher.locationDot.setPosition(weatherWatcher.initialLocation);
        }, function() {
            weatherWatcher.LOCATION_DOT_ENABLED = false;
            weatherWatcher.locationDot.setVisible(false);
        });
    }
}
weatherWatcher.getClientLocationFromGoogle = function() {
    try {
        weatherWatcher.initialLocation = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
    } 
    catch (E) {
        weatherWatcher.initialLocation = new google.maps.LatLng(39.0, -98.66);
        weatherWatcher.initialZoom = 4;
    }
}
weatherWatcher.getLocation = function() {
    debug.log("getLocation()");
    weatherWatcher.initialZoom = weatherWatcher.constants.DEFAULT_ZOOM;
  //  weatherWatcher.getClientLocationFromGoogle();
    weatherWatcher.initialLocation = new google.maps.LatLng(37.0, -115.75);
    weatherWatcher.initializeMap();
    weatherWatcher.locationDot = {};
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                debug.log("navigator.geolocation.getCurrentPosition");
                weatherWatcher.initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                weatherWatcher.LOCATION_DOT_ENABLED = true;
                weatherWatcher.locationDot = new google.maps.Marker({title: "Your Location",clickable: false,flat: true,icon: "images/bluedot.png",map: map,visible: true,position: weatherWatcher.initialLocation});
                if (!weatherWatcher.queryString["location"]) {
                    try {
                        map.setCenter(weatherWatcher.initialLocation);
                        if (weatherWatcher.queryString["zoom"]) {
                            if (!isNaN(parseInt(weatherWatcher.queryString["zoom"], 10))) {
                                weatherWatcher.overrideZoom = parseInt(weatherWatcher.queryString["zoom"], 10);
                                map.setZoom(weatherWatcher.overrideZoom);
                                weatherWatcher.overrideZoom = 0;
                                weatherWatcher.test();
                            }
                        } 
                        else {
                            weatherWatcher.initialZoom = weatherWatcher.constants.DEFAULT_ZOOM;
                            map.setZoom(weatherWatcher.initialZoom);
                        }
                        weatherWatcher.initialGeoCode();
                        debug.log("used navigator.geolocation for location");
                    } 
                    catch (E1) {
                        window.setTimeout("map.setCenter(weatherWatcher.initialLocation);map.setCenter(weatherWatcher.constants.DEFAULT_ZOOM);", 250);
                        debug.log("used navigator.geolocation for location (delayed)");
                    }
                }
            }, function() {
                debug.log("navigator.geolocation.getCurrentPosition returned an error (likely denied access to user's location)");
            });
        }
    } 
    catch (e) {
        debug.log("Error in getLocation = ", e.description);
    }
}
weatherWatcher.initializeMap = function() {
    weatherWatcher.test();
    weatherWatcher.queryString.prepare();
    weatherWatcher.markers.cacheMarkerIcons();
    weatherWatcher.generateMenu();
    weatherWatcher.mapResize();
    var selOpacity = $("opacitylayerlist");
    for (var x in weatherWatcher.Layers) {
        var oneLayer = weatherWatcher.Layers[x];
        if (oneLayer.defaultOpacity) {
            var op = new Element("OPTION", {value: x});
            op.insert({bottom: x});
            selOpacity.insert({bottom: op});
        }
    }
    var myOptions = {zoom: weatherWatcher.initialZoom,center: weatherWatcher.initialLocation,disableDefaultUI: false,mapTypeId: google.maps.MapTypeId.TERRAIN};
    try {
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    } 
    catch (E) {
        debug.dir(E);
        myOptions.center = new google.maps.LatLng(39.0, -98.66);
        myOptions.zoom = 4;
        weatherWatcher.initialLocation = new google.maps.LatLng(39.0, -98.66);
        weatherWatcher.initialZoom = 4;
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    }
    google.maps.event.addListenerOnce(map, "tilesloaded", weatherWatcher.showDefaultLayers);
    weatherWatcher.loadKeyDragZoom();
    selOpacity.childNodes[0].selected = true;
    var selOpacityValues = $("opacityvalues");
    weatherWatcher.constants.OPACITY_DROPDOWN.each(function(val, i) {
        var od = new Element("OPTION", {value: val});
        od.insert({bottom: val.toString() + "\%"});
        var newOption = selOpacityValues.insert({bottom: od});
    });
    selOpacityValues.childNodes[0].selected = true;
    weatherWatcher.changeLayerOpacitySelection();
    weatherWatcher.autoRefresh();
    Event.observe("txtzip", "keypress", function(E) {
        if (E.keyCode == Event.KEY_RETURN) {
            weatherWatcher.goGeocode();
        }
    });
    Event.observe("txtzip", "focus", function(E) {
        Event.element(E).select();
    });
    Event.observe("txtzip", "click", function(E) {
        Event.element(E).select();
    });
    $("chkTraffic").checked = false;
    Event.observe("chkTraffic", "click", weatherWatcher.toggleTraffic);
    google.maps.event.addListener(map, "dragend", weatherWatcher.initialGeoCode);
    Event.observe(window, "resize", weatherWatcher.mapResize);
    if (weatherWatcher.queryString["zoom"] && !isNaN(parseInt(weatherWatcher.queryString["zoom"], 10))) {
        weatherWatcher.overrideZoom = parseInt(weatherWatcher.queryString["zoom"]);
    } 
    else 
    {
        weatherWatcher.overrideZoom = 0;
    }
    if (weatherWatcher.queryString["location"]) {
        $("txtzip").value = weatherWatcher.queryString["location"];
        weatherWatcher.goGeocode();
    } else {
        weatherWatcher.initialGeoCode();
    }
    weatherWatcher.updateStats();
    google.maps.event.addListenerOnce(map, "tilesloaded", weatherWatcher.markers.startRetrieve);
    weatherWatcher.mapClickChanged();
    map.setOptions({draggableCursor: "default"});
    window.setInterval(weatherWatcher.markers.startRetrieve, weatherWatcher.constants.MARKER_REFRESH);
    window.setInterval(weatherWatcher.refreshLocation, weatherWatcher.constants.LOCATION_REFRESH);
}
weatherWatcher.alertInfoWindow = new google.maps.InfoWindow();
weatherWatcher.alertCallBack = function(a) {
    try {
        weatherWatcher.displayBottomMessage("Alert data retrieved successfully.");
        weatherWatcher.alertInfoWindow.close();
        var alertTemplate = new Template("<div class='fontsize12' style='padding:2px;border:1px solid #00f;'><span style='font-size:16px;font-weight:bold;color:#00f;'>#{description}</span><span style='font-weight:bold'><br />Effective #{date}<br />Expires #{expires}<br /></span><span style='font-size:10px'>#{message}</span></div>");
        var alertTemplateData = {};
        var alerts = a.query.results.alerts;
        switch (alerts.alert.count) {
            case "0":
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: weatherWatcher.constants.NO_ALERT_TEXT,position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                weatherWatcher.alert.getNWS2(weatherWatcher.clickedAlertPoint);
                break;
            case "1":
                alertTemplateData = {description: alerts.alert.AlertItem.description,date: alerts.alert.AlertItem.date.content,expires: alerts.alert.AlertItem.expires.content,message: alerts.alert.AlertItem.message};
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: "<div class='IWalertdiv'>" + alertTemplate.evaluate(alertTemplateData) + "</div>",position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                break;
            default:
                var tabs = "<div>";
                alerts.alert.AlertItem.each(function(al) {
                    alertTemplateData = {description: al.description,date: al.date.content,expires: al.expires.content,message: al.message};
                    tabs += alertTemplate.evaluate(alertTemplateData) + "<br/>";
                });
                tabs += "</div>";
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: "<div class='IWalertdiv'>" + tabs + "</div>",position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                break;
        }
        weatherWatcher.alert.getNWS(weatherWatcher.clickedAlertPoint);
    } 
    catch (e) {
        debug.log(e.message);
    }
    try {
        $("wuAlerts").remove();
    } catch (E2) {
    }
}
weatherWatcher.refreshLayers = function() {
    weatherWatcher.removeAllLayers();
    weatherWatcher.showLayers();
}
weatherWatcher.loadKeyDragZoom = function() {
    map.enableKeyDragZoom({boxStyle: {border: "2px solid #F00"},visualEnabled: true,veilStyle: {opacity: 0}});
}
weatherWatcher.Layers = {"NWS Alerts": new wwLayer({name: "NWS Alerts",id: "chkAlerts",layerType: "wms",url: weatherWatcher.templates.ALERTS,zindex: 91,currentValue: true,defaultOptions: null,defaultOpacity: 30,autoRefresh: true,refreshMinutes: 5,sortOrder: 95,title: "Alerts from waynesweatherwatcher.com"}),"Radar": new wwLayer({name: "Radar",id: "chkRadar",layerType: "radar",url: weatherWatcher.templates.RADAR_STATIC,zindex: 20,currentValue: true,defaultOptions: null,defaultOpacity: 60,autoRefresh: true,refreshMinutes: 2,sortOrder: 10,title: "Standard current radar (source: wunderground.com)"}),"Radar (nowCoast)": new wwLayer({name: "Radar (nowCoast)",id: "chknowcoastradar",layerType: "wms",url: weatherWatcher.templates.NOWCOAST_RADAR,zindex: 20,currentValue: false,defaultOptions: null,defaultOpacity: 60,autoRefresh: true,refreshMinutes: 5,sortOrder: 21,title: "RIDGE Radar from nowCoast"}),"Animated Radar": new wwLayer({name: "Animated Radar",id: "chkAnimatedRadar",layerType: "radar",url: weatherWatcher.templates.RADAR_ANIMATED,zindex: 20,currentValue: false,defaultOptions: null,defaultOpacity: 60,autoRefresh: true,refreshMinutes: 2,sortOrder: 20,title: "Animated radar (source: wunderground.com)"}),"IR Satellite": new wwLayer({name: "IR Satellite",id: "chkIRSatellite",layerType: "wu",url: weatherWatcher.templates.IR_SATELLITE,zindex: 40,currentValue: false,defaultOptions: null,defaultOpacity: 60,autoRefresh: true,refreshMinutes: 10,sortOrder: 30,title: "IR satellite photos, 7 image loop (source: wunderground.com)"}),"Visible Satellite": new wwLayer({name: "Visible Satellite",id: "chkVisSatellite",layerType: "wu",url: weatherWatcher.templates.VIS_SATELLITE,zindex: 50,currentValue: false,defaultOptions: null,defaultOpacity: 60,autoRefresh: true,refreshMinutes: 10,sortOrder: 30,title: "Visible satellite photos, 7 image loop (source: wunderground.com)"}),"Trop. Cyclone Tracks": new wwLayer({name: "Trop. Cyclone Tracks",id: "chkHurricane",layerType: "wms",url: weatherWatcher.templates.HURRICANE_INFO,zindex: 70,currentValue: false,defaultOptions: null,defaultOpacity: 80,autoRefresh: true,refreshMinutes: 10,sortOrder: 70,title: "Hurricane and tropical storm tracks/predictions (source: nowCOAST.NOAA.gov)"}),"Severe Weather Alerts": new wwLayer({name: "Severe Weather Alerts",id: "chkShortTerm",layerType: "wms",url: weatherWatcher.templates.ALERTS_SEVERE,zindex: 100,currentValue: true,defaultOptions: null,defaultOpacity: 70,autoRefresh: true,refreshMinutes: 1.5,sortOrder: 50,title: "Short term severe weather warnings, such as tornados/severe thunderstorms (source: waynesweatherwatcher)"}),"All Weather Alerts": new wwLayer({name: "All Weather Alerts",id: "chkWUWarnings",layerType: "wu",url: weatherWatcher.templates.WARNINGS,zindex: 90,currentValue: false,defaultOptions: null,defaultOpacity: 30,autoRefresh: true,refreshMinutes: 5,sortOrder: 60,title: "Long term watches and warnings (source: gis.srh.noaa.gov)"})};
weatherWatcher.mapDiv = {width: 0,height: 0};
weatherWatcher.mapResize = function() {
    var layout = $("map_canvas").getLayout();
    weatherWatcher.mapDiv.height = layout.get("height");
    weatherWatcher.mapDiv.width = layout.get("width");
}
weatherWatcher.trafficLayer = new google.maps.TrafficLayer();
weatherWatcher.toggleTraffic = function() {
    if ($("chkTraffic").checked) {
        weatherWatcher.trafficLayer.setMap(map);
    } 
    else 
    {
        weatherWatcher.trafficLayer.setMap(null);
    }
}
weatherWatcher.loadWULayer = function(mapBounds, mapDiv, oneLayer) {
    try {
        var urlTemplate = new Template(oneLayer.URL + "&rand=#{rand}");
        var templateData = {minlon: mapBounds.getSouthWest().lng(),maxlon: mapBounds.getNorthEast().lng(),minlat: mapBounds.getSouthWest().lat(),maxlat: mapBounds.getNorthEast().lat(),rand: parseInt(10000 * Math.random()).toString(),height: weatherWatcher.mapDiv.height.toString(),width: weatherWatcher.mapDiv.width.toString()};
        var url = urlTemplate.evaluate(templateData);
        var O = new wwOverlay(mapBounds, url, map, oneLayer.defaultOpacity, oneLayer.z);
        return O;
    } 
    catch (E) {
        alert(E.message)
    }
    ;
    return null;
}
weatherWatcher.loadWMSLayer = function(mapBounds, mapDiv, oneLayer) {
    try {
        var bottomleft = mapBounds.getSouthWest();
        var topright = mapBounds.getNorthEast();
        var mercBottomLeft = weatherWatcher.convertLatLngToMercator(bottomleft);
        var mercTopRight = weatherWatcher.convertLatLngToMercator(topright);
        var urlTemplate = new Template(oneLayer.URL + "&rand=#{rand}");
        var templateData = {minlon: mercBottomLeft[0],maxlon: mercTopRight[0],minlat: mercBottomLeft[1],maxlat: mercTopRight[1],rand: parseInt(10000 * Math.random()).toString(),height: weatherWatcher.mapDiv.height.toString(),width: weatherWatcher.mapDiv.width.toString(),mapzoom: map.getZoom()};
        var url = urlTemplate.evaluate(templateData);
        var O = new wwOverlay(mapBounds, url, map, oneLayer.defaultOpacity, oneLayer.z);
        return O;
    } 
    catch (E) {
        alert(E.message)
    }
    ;
    return null;
}
weatherWatcher.convertLatLngToMercator = function(latLng) {
    var sm = new gmaps.ags.SphereMercator({wkid: 102113,semi_major: 6378137.0,central_meridian: 0,unit: 1});
    var arrayPoint1 = sm.forward([latLng.lng(), latLng.lat()]);
    sm = null;
    return arrayPoint1;
}
weatherWatcher.loadArcGISLayer = function(oneLayer) {
    try {
        if (oneLayer.overlay.length == 0) {
            try {
                var O = new gmaps.ags.MapOverlay(oneLayer.URL, {exportOptions: oneLayer.defaultOptions,opacity: oneLayer.defaultOpacity / 100});
                O.setMap(map);
                return O;
            } 
            catch (E) {
                alert("loadArcGISLayer Error: " + E.description)
            }
        } 
        else {
            return oneLayer.overlay[0];
        }
    } 
    catch (E) {
        alert("Error loading ArcGIS Layer: " + E.message);
    }
}
weatherWatcher.showDefaultLayers = function() {
    weatherWatcher.showLayers();
    weatherWatcher.startEvents();
    return;
}
weatherWatcher.startEvents = function() {
    var useEvent = "idle";
    google.maps.event.addListener(map, useEvent, weatherWatcher.refreshLayers);
    google.maps.event.addListener(map, useEvent, weatherWatcher.updateStats);
    google.maps.event.addListener(map, useEvent, weatherWatcher.markers.removeOffScreenMarkers);
    weatherWatcher.test();
}
weatherWatcher.updateStats = function() {
    var z = $("stats");
    z.style.top = (document.viewport.getHeight() - 23).toString() + "px";
    z.innerHTML = "Zoom: " + map.getZoom().toString() + "&nbsp;&nbsp;Center: " + (parseInt(map.getCenter().lat() * 10000) / 10000).toString() + ", " + (parseInt(map.getCenter().lng() * 10000) / 10000).toString() + "&nbsp;&nbsp;API v" + google.maps.version;
}
weatherWatcher.removeAllLayers = function() {
    try {
        for (var x in weatherWatcher.Layers) {
            var oneLayer = weatherWatcher.Layers[x];
            if (oneLayer.layerType == "arcgis" && oneLayer.currentValue == false) {
                oneLayer.remove();
            }
            if (oneLayer.layerType != "arcgis") {
                oneLayer.remove();
            }
        }
    } 
    catch (E) {
        alert(E.message);
    }
}
weatherWatcher.showLayers = function() {
    try {
        var mapBounds = map.getBounds();
        var mapDiv = map.getDiv();
        for (var x in weatherWatcher.Layers) {
            var oneLayer = weatherWatcher.Layers[x];
            oneLayer.add(mapBounds, mapDiv);
        }
    } 
    catch (E) {
        alert('showlayers:' + E.message);
    }
}
weatherWatcher.changeLayerOpacitySelection = function() {
    var selOpacity = $("opacitylayerlist");
    var layerSelected = weatherWatcher.Layers[selOpacity.value];
    var opacityList = $("opacityvalues").getElementsByTagName("OPTION");
    for (var x = 0; x < opacityList.length; x++) {
        if (opacityList[x].value.toString() == layerSelected.defaultOpacity.toString()) {
            opacityList[x].selected = true;
        }
    }
}
weatherWatcher.changeLayerOpacity = function() {
    var selOpacity = $F("opacitylayerlist");
    var layerSelected = weatherWatcher.Layers[selOpacity];
    var newOpacity = parseInt($F("opacityvalues"));
    layerSelected.changeOpacity(newOpacity);
}
weatherWatcher.autoRefresh = function() {
    for (var x in weatherWatcher.Layers) {
        if (weatherWatcher.Layers[x].autoRefresh) {
            weatherWatcher.Layers[x].setRefreshInterval(weatherWatcher.Layers[x].refreshMinutes * 60);
        }
    }
}
weatherWatcher.goGeocode = function() {
    var theaddress = $F("txtzip");
    var G = new google.maps.Geocoder();
    G.geocode({address: theaddress}, weatherWatcher.doneGeoCoding);
}
weatherWatcher.doneGeoCoding = function(georesult, state) {
    if (state == "OK") {
        debug.dir(georesult);
        map.setCenter(georesult[0].geometry.location);
        if (weatherWatcher.overrideZoom != 0) {
            map.setZoom(weatherWatcher.overrideZoom)
            weatherWatcher.overrideZoom = 0;
        } 
        else 
        {
            map.fitBounds(georesult[0].geometry.viewport);
        }
        weatherWatcher.displayBottomMessage(georesult[0].formatted_address)
    } 
    else 
    {
        alert("Sorry, your geocoding request could not be processed. Please try again.");
    }
}
weatherWatcher.initialGeoCode = function() {
    var theaddress = map.getCenter();
    var G = new google.maps.Geocoder();
    G.geocode({location: theaddress}, function(georesult, state) {
        if (state == "OK") {
            weatherWatcher.displayBottomMessage("Centered at: " + georesult[0].formatted_address)
        }
    });
}
weatherWatcher.displayBottomMessage = function(message) {
    if (weatherWatcher.bottomFadeEffect) {
        weatherWatcher.bottomFadeEffect.cancel();
        weatherWatcher.bottomFadeEffect = null;
    }
    var z = $("bmessage");
    z.style.left = (parseInt(document.viewport.getWidth() / 2) - 100).toString() + "px";
    z.style.top = "10px";
    z.innerHTML = message;
    Effect.Appear(z, {queue: {position: 'start',scope: 'bmessage'}});
    weatherWatcher.bottomFadeEffect = new Effect.Fade(z, {duration: 3,delay: 5,queue: {position: 'end',scope: 'bmessage'},afterFinish: function() {
            weatherWatcher.bottomFadeEffect = null;
        }});
}
weatherWatcher.displayCenterMessage = function(message) {
    if (weatherWatcher.centerFadeEffect) {
        weatherWatcher.centerFadeEffect.cancel();
        weatherWatcher.centerFadeEffect = null;
    }
    var z = $("cmessage");
    z.style.left = (parseInt(document.viewport.getWidth() / 2) - 100).toString() + "px";
    z.style.top = "200px";
    z.innerHTML = message;
    Effect.Appear(z, {queue: {position: 'start',scope: 'bmessage'}});
    weatherWatcher.centerFadeEffect = new Effect.Fade(z, {duration: 3,delay: 15,queue: {position: 'end',scope: 'cmessage'},afterFinish: function() {
            weatherWatcher.centerFadeEffect = null;
        }});
}
weatherWatcher.bottomFadeEffect = null;
weatherWatcher.alertClickListener = null;
weatherWatcher.forecast = {};
weatherWatcher.forecast.eventListeners = [];
weatherWatcher.mapClickChanged = function() {
    google.maps.event.clearListeners(map, "click");
    var mapClickMode = $F("selmapclick");
    switch (mapClickMode) {
        case "forecast":
            weatherWatcher.zones.deactivate();
            weatherWatcher.alert.deactivate();
            weatherWatcher.forecast.activate();
            weatherWatcher.wwAlerts.deactivate();
            break;
        case "warnings":
            weatherWatcher.forecast.deactivate();
            weatherWatcher.zones.deactivate();
            weatherWatcher.alert.activate();
            weatherWatcher.wwAlerts.deactivate();
            break;
        case "zones":
            weatherWatcher.forecast.deactivate();
            weatherWatcher.alert.deactivate();
            weatherWatcher.zones.activate();
            weatherWatcher.wwAlerts.deactivate();
            break;
        case "wwAlerts":
            weatherWatcher.forecast.deactivate();
            weatherWatcher.alert.deactivate();
            weatherWatcher.zones.deactivate();
            weatherWatcher.wwAlerts.activate();
            break;
    }
}
weatherWatcher.wwAlerts = {};
weatherWatcher.alert = {};
weatherWatcher.zones = {};
weatherWatcher.alert.eventListeners = [];
weatherWatcher.zones.eventListeners = [];
weatherWatcher.wwAlerts.eventListeners = [];
weatherWatcher.alert.activate = function(E) {
    weatherWatcher.alert.eventListeners.push(google.maps.event.addListener(map, "click", weatherWatcher.alert.get));
}
weatherWatcher.alert.deactivate = function() {
    weatherWatcher.alert.eventListeners.each(function(X) {
        google.maps.event.removeListener(X)
    });
    weatherWatcher.alert.eventListeners = [];
}
weatherWatcher.clickedAlertPoint = {};
weatherWatcher.test = function() {
    //if (!weatherWatcher.constants.RE.test(window.location.href.toString())) {
     //   window.location.href = "http://" + decodeURI(weatherWatcher.constants.XYZZY);
    //    return;
    //}
}
weatherWatcher.alert.getNWS = function(locationClicked) {
    var mapBounds = map.getBounds();
    var mapDiv = map.getDiv();
    try {
        var bottomleft = mapBounds.getSouthWest();
        var topright = mapBounds.getNorthEast();
        var mercBottomLeft = weatherWatcher.convertLatLngToMercator(bottomleft);
        var mercTopRight = weatherWatcher.convertLatLngToMercator(topright);
        var templateData = {minlon: mercBottomLeft[0],maxlon: mercTopRight[0],minlat: mercBottomLeft[1],maxlat: mercTopRight[1],rand: parseInt(10000 * Math.random()).toString(),height: mapDiv.clientHeight.toString(),width: mapDiv.clientWidth.toString(),pixelx: locationClicked.pixel.x,pixely: locationClicked.pixel.y};
        try {
            $("wuAlertsQuery2").remove();
        } 
        catch (E2) {
        }
        var urlTemplate = new Template(weatherWatcher.templates.NOWCOAST_SEVERE_WARNINGS_QUERY);
        var url = urlTemplate.evaluate(templateData);
        var scriptTag = new Element("script", {type: "text/javascript",async: "",src: url,id: "wuAlertsQuery2"});
        $("scriptplaceholder").insert({bottom: scriptTag});
    } 
    catch (E) {
        debug.dir(E);
    }
}
weatherWatcher.alert.getNWS2 = function(locationClicked) {
    var mapBounds = map.getBounds();
    var mapDiv = map.getDiv();
    try {
        var bottomleft = mapBounds.getSouthWest();
        var topright = mapBounds.getNorthEast();
        var mercBottomLeft = weatherWatcher.convertLatLngToMercator(bottomleft);
        var mercTopRight = weatherWatcher.convertLatLngToMercator(topright);
        var templateData = {minlon: mercBottomLeft[0],maxlon: mercTopRight[0],minlat: mercBottomLeft[1],maxlat: mercTopRight[1],rand: parseInt(10000 * Math.random()).toString(),height: mapDiv.clientHeight.toString(),width: mapDiv.clientWidth.toString(),pixelx: locationClicked.pixel.x,pixely: locationClicked.pixel.y};
        try {
            $("wuAlertsQuery").remove();
        } catch (E2) {
        }
        var urlTemplate = new Template(weatherWatcher.templates.NOAA_WARNINGS_QUERY);
        var url = urlTemplate.evaluate(templateData);
        var scriptTag = new Element("script", {id: "wuAlertsQuery",type: "text/javascript",async: "",src: url});
        $("scriptplaceholder").insert({bottom: scriptTag});
    } 
    catch (E) {
        debug.dir(E);
    }
}
weatherWatcher.alert.queryLayer2 = function(serverResponse) {
    debug.dir(serverResponse);
    if (serverResponse.error || serverResponse.query.results == null) {
        try {
            $("wuAlertsQuery2").remove();
        } catch (E2) {
        }
        return;
    }
    if (serverResponse.query.results.FeatureInfoResponse && serverResponse.query.results.FeatureInfoResponse.FIELDS) {
        debug.log("returned", serverResponse.query.results.FeatureInfoResponse.FIELDS.length, "results");
        var responses = serverResponse.query.results.FeatureInfoResponse.FIELDS;
        var content = "";
        var filteredResponses = [];
        var responseIndex = [];
        var X = 0;
        var R = [];
        responses.each(function(Z) {
            if (typeof (responseIndex[Z["NOWCOAST.NWS_WARN_SHORT.PRODTYPE"]]) == "undefined") {
                responseIndex[Z["NOWCOAST.NWS_WARN_SHORT.PRODTYPE"]] = X;
                filteredResponses[X] = [];
                filteredResponses[X][0] = Z["NOWCOAST.NWS_WARN_SHORT.PRODTYPE"];
                filteredResponses[X][1] = [];
                X++;
            }
            var urlTemplate = new Template(weatherWatcher.templates.NWS_WARNING_URL);
            var templateData = {location: Z["NOWCOAST.NWS_WARN_SHORT.LOCATION"],producttype: Z["NOWCOAST.NWS_WARN_SHORT.PRODTYPE"],eventid: Z["NOWCOAST.NWS_WARN_SHORT.event"]};
            var url = Z["NOWCOAST.NWS_WARN_SHORT.URL"];
            filteredResponses[responseIndex[Z["NOWCOAST.NWS_WARN_SHORT.PRODTYPE"]]][1].push(Z["NOWCOAST.NWS_WARN_SHORT.LOCATION"] + "|" + url);
        });
        filteredResponses.each(function(Z) {
            var alertCount = 1;
            var alertName = Z[0];
            content += "<div class='IWalertsummary fontsize10' ><div class='IWalertnamediv fontsize14'>" + alertName + "</div>Areas: ";
            var uniqueURLs = Z[1].uniq();
            uniqueURLs.each(function(X) {
                var s = X.split("|");
                var temp = "<a href='" + s[1] + "' target='_blank'>" + s[0] + "</a>";
                content += temp + " ";
                alertCount++;
            });
            content += "</div>";
        });
        var oldcontent = weatherWatcher.alertInfoWindow.getContent();
        if (oldcontent == weatherWatcher.constants.NO_ALERT_TEXT) {
            weatherWatcher.alertInfoWindow.setContent(content);
        } 
        else 
        {
            content = oldcontent + content;
            weatherWatcher.alertInfoWindow.setContent(content);
        }
    } 
    else 
    {
        debug.log("no results")
    }
    try {
        $("wuAlertsQuery2").remove();
    } catch (E2) {
    }
}
weatherWatcher.alert.queryLayer = function(serverResponse) {
    debug.dir(serverResponse);
    if (serverResponse.error || serverResponse.query.results == null) {
        try {
            $("wuAlertsQuery").remove();
        } catch (E2) {
        }
        return;
    }
    var content = "";
    if (serverResponse.query.results && serverResponse.query.results.FeatureInfoResponse.FIELDS) {
        var responses = serverResponse.query.results.FeatureInfoResponse.FIELDS;
        if (responses.descriptio) {
            debug.log("one response");
            var urlTemplate = new Template(weatherWatcher.templates.NWS_WARNING_URL);
            var useThisDescription = "";
            switch (responses.descriptio) {
                case "Small Craft for Winds Advisory":
                    useThisDescription = "Small Craft Advisory";
                    break;
                case "Small Craft for Hazardous Seas Advisory":
                    useThisDescription = "Small Craft Advisory";
                    break;
                case "Areal Flood Advisory":
                    useThisDescription = "Flood Advisory";
                    break;
                case "Fire Weather Warning":
                    useThisDescription = "Red Flag Warning";
                    break;
                default:
                    useThisDescription = responses.descriptio;
                    break;
            }
            var templateData = {location: responses.location,producttype: useThisDescription,eventid: responses.event};
            var url = urlTemplate.evaluate(templateData);
            content = "<div class='IWalertsummary fontsize10' ><div class='IWalertnamediv fontsize14'>" + responses.descriptio + "</div>Area: <a href='" + url + "' target='_blank'>" + responses.location + "</a></div>";
        } 
        else 
        {
            var filteredResponses = [];
            var responseIndex = [];
            var X = 0;
            var R = [];
            responses.each(function(Z) {
                if (typeof (responseIndex[Z.descriptio]) == "undefined") {
                    responseIndex[Z.descriptio] = X;
                    filteredResponses[X] = [];
                    filteredResponses[X][0] = Z.descriptio;
                    filteredResponses[X][1] = [];
                    X++;
                }
                var useThisDescription = "";
                switch (Z.descriptio) {
                    case "Small Craft for Winds Advisory":
                        useThisDescription = "Small Craft Advisory";
                        break;
                    case "Small Craft for Hazardous Seas Advisory":
                        useThisDescription = "Small Craft Advisory";
                        break;
                    case "Areal Flood Advisory":
                        useThisDescription = "Flood Advisory";
                        break;
                    case "Fire Weather Warning":
                        useThisDescription = "Red Flag Warning";
                        break;
                    default:
                        useThisDescription = Z.descriptio;
                        break;
                }
                var urlTemplate = new Template(weatherWatcher.templates.NWS_WARNING_URL);
                var templateData = {location: Z.location,producttype: useThisDescription,eventid: Z.event};
                var url = urlTemplate.evaluate(templateData);
                filteredResponses[responseIndex[Z.descriptio]][1].push("<a href='" + url + "' target='_blank'>" + Z.location + "</a>");
            });
            debug.dir(filteredResponses);
            filteredResponses.each(function(Z) {
                var alertName = Z[0];
                content += "<div class='IWalertsummary fontsize10' ><div class='IWalertnamediv fontsize14'>" + alertName + "</div> Areas: ";
                Z[1].each(function(X) {
                    content += X + " ";
                });
                content += "</div>";
            });
        }
        var oldcontent = weatherWatcher.alertInfoWindow.getContent();
        if (oldcontent == weatherWatcher.constants.NO_ALERT_TEXT) {
            weatherWatcher.alertInfoWindow.setContent(content);
        } 
        else 
        {
            content = oldcontent + content;
            weatherWatcher.alertInfoWindow.setContent(content);
        }
    }
    $("wuAlertsQuery").remove();
}
weatherWatcher.alert.get = function(locationClicked) {
    weatherWatcher.clickedAlertPoint = locationClicked;
    var lat = locationClicked.latLng.lat();
    var lng = locationClicked.latLng.lng();
    var urlTemplate = new Template(weatherWatcher.templates.ALERT_DATA);
    var templateData = {lat: lat,lng: lng};
    var url = urlTemplate.evaluate(templateData);
    try {
        $("wuAlerts").remove();
    } catch (E2) {
    }
    var scriptTag = new Element("script", {id: "wuAlerts",async: "",src: url,type: "text/javascript"});
    $("scriptplaceholder").insert({bottom: scriptTag});
    weatherWatcher.displayBottomMessage("Fetching alert data...");
}
weatherWatcher.forecast.activate = function() {
    weatherWatcher.forecast.eventListeners.push(google.maps.event.addListener(map, "click", weatherWatcher.forecast.get));
}
weatherWatcher.forecast.deactivate = function() {
    weatherWatcher.forecast.eventListeners.each(function(X) {
        google.maps.event.removeListener(X)
    });
    weatherWatcher.forecast.eventListeners = [];
}
weatherWatcher.zones.activate = function() {
    weatherWatcher.zones.eventListeners.push(google.maps.event.addListener(map, "click", weatherWatcher.zones.get));
}
weatherWatcher.zones.get = function(locationClicked) {
    weatherWatcher.clickedAlertPoint = locationClicked;
    weatherWatcher.FT.getZones(locationClicked.latLng);
}
weatherWatcher.zones.deactivate = function() {
    weatherWatcher.zones.eventListeners.each(function(X) {
        google.maps.event.removeListener(X)
    });
    weatherWatcher.zones.eventListeners = [];
}
weatherWatcher.wwAlerts.activate = function() {
    weatherWatcher.zones.eventListeners.push(google.maps.event.addListener(map, "click", weatherWatcher.wwAlerts.get));
}
weatherWatcher.wwAlerts.get = function(locationClicked) {
    try {
        weatherWatcher.clickedAlertPoint = locationClicked;
        var url = "http://alerts.waynesweatherwatcher.com/alerttext/getalerts.aspx?lat=" + locationClicked.latLng.lat().toString() + "&lng=" + locationClicked.latLng.lng().toString();
        var scriptTag = new Element("script", {type: "text/javascript",async: "",src: url,id: "wwAlerts"});
        $("scriptplaceholder").insert({bottom: scriptTag});
    } 
    catch (e) {
        debug.dir(e);
    }
}
weatherWatcher.wwAlerts.deactivate = function() {
    weatherWatcher.wwAlerts.eventListeners.each(function(X) {
        google.maps.event.removeListener(X)
    });
    weatherWatcher.wwAlerts.eventListeners = [];
}
weatherWatcher.forecast.get = function(pt) {
    var templ = new Template("http://forecast.weather.gov/MapClick.php?lat=#{pointlat}&lon=#{pointlon}&site=pqr&smap=1&marine=0&unit=0&lg=en");
    var templFill = {pointlon: pt.latLng.lng(),pointlat: pt.latLng.lat()};
    window.open(templ.evaluate(templFill), "_blank");
}
weatherWatcher.wwActiveAlerts = function(resultdata) {
    try {
        weatherWatcher.displayBottomMessage("Alert data retrieved successfully.");
        debug.dir(resultdata);
        weatherWatcher.alertInfoWindow.close();
        var alertTemplate = new Template("<div class='fontsize12' style='padding:2px;border:1px solid #00f;'><span style='font-size:16px;font-weight:bold;color:#00f;'>#{description}</span><span style='font-weight:bold'><br />Effective #{date}<br />Expires #{expires}<br /></span><span style='font-size:10px'>#{message}<br/><br/>#{instruction}<br/><br/>Areas Impacted: #{areadesc}<div style='line-height:1em'><a href='#{id}' target='_blank'>#{headline}</a></span></div></div>");
        var alertTemplateData = {};
        var alerts = resultdata.result;
        switch (resultdata.result.count) {
            case -1:
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: weatherWatcher.constants.NO_ALERT_TEXT + " (error)",position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                weatherWatcher.alert.getNWS(weatherWatcher.clickedAlertPoint);
                break;
            case 0:
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: weatherWatcher.constants.NO_ALERT_TEXT,position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                weatherWatcher.alert.getNWS(weatherWatcher.clickedAlertPoint);
                break;
            case 1:
                alertTemplateData = {id: alerts.data[0].id,headline: alerts.data[0].headline,description: alerts.data[0].event,date: makedate2(alerts.data[0].effective).toLocaleDateString() + " " + makedate2(alerts.data[0].effective).toLocaleTimeString(),expires: makedate2(alerts.data[0].expires).toLocaleDateString() + " " + makedate2(alerts.data[0].expires).toLocaleTimeString(),message: alerts.data[0].description,instruction: alerts.data[0].instruction,areadesc: alerts.data[0].areadesc};
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: "<div style='font-size:10px'>" + resultdata.result.count.toString() + " weather alert(s) found.</div><div class='IWalertdiv'>" + alertTemplate.evaluate(alertTemplateData) + "</div>",position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                break;
            default:
                var tabs = "<div>";
                alerts.data.each(function(al) {
                    alertTemplateData = {id: al.id,headline: al.headline,description: al.event,date: makedate2(al.effective).toLocaleDateString() + " " + makedate2(al.effective).toLocaleTimeString(),expires: makedate2(al.expires).toLocaleDateString() + " " + makedate2(al.expires).toLocaleTimeString(),message: al.description,instruction: al.instruction,areadesc: al.areadesc};
                    tabs += alertTemplate.evaluate(alertTemplateData) + "<br/>";
                });
                tabs += "</div>";
                weatherWatcher.alertInfoWindow = new google.maps.InfoWindow({content: "<div style='font-size:10px'>" + resultdata.result.count.toString() + " weather alert(s) found.</div><div class='IWalertdiv'>" + tabs + "</div>",position: weatherWatcher.clickedAlertPoint.latLng});
                weatherWatcher.alertInfoWindow.open(map);
                break;
        }
    } 
    catch (E1) {
        debug.dir(E1);
    }
    try {
        $("wwAlerts").remove();
    } 
    catch (E2) {
        debug.dir(E1);
    }
}
function wwLayer(layerOptions) {
    this.URL = layerOptions.url;
    this.name = layerOptions.name;
    this.id = layerOptions.id;
    this.layerType = layerOptions.layerType;
    this.z = layerOptions.zindex;
    this.currentValue = layerOptions.currentValue;
    this.defaultOptions = layerOptions.defaultOptions;
    this.autoRefresh = layerOptions.autoRefresh;
    this.sortOrder = layerOptions.sortOrder;
    this.defaultOpacity = layerOptions.defaultOpacity;
    this.overlay = [];
    this.title = layerOptions.title || "";
    this.refreshMinutes = layerOptions.refreshMinutes;
}
wwLayer.prototype.setRefreshInterval = function(interval) {
    var z = this;
    new PeriodicalExecuter(function() {
        z.refresh()
    }, interval);
}
wwLayer.prototype.add = function(mapBounds, mapDiv) {
    try {
        if (this.currentValue) {
            switch (this.layerType) {
                case "radar":
                    if (this.name == "Radar" && weatherWatcher.Layers["Animated Radar"].currentValue == false) {
                        if (this.overlay.length == 0) {
                            this.overlay.push(weatherWatcher.loadWULayer(mapBounds, mapDiv, this));
                        }
                    }
                    if (this.name == "Radar" && weatherWatcher.Layers["Animated Radar"].currentValue == true) {
                        if (weatherWatcher.Layers["Animated Radar"].overlay.length == 0) {
                            weatherWatcher.Layers["Animated Radar"].overlay.push(weatherWatcher.loadWULayer(mapBounds, mapDiv, weatherWatcher.Layers["Animated Radar"]));
                        }
                    }
                    if (this.name == "Animated Radar" && weatherWatcher.Layers["Radar"].currentValue == true) 
                    {
                        if (this.overlay.length == 0) {
                            this.overlay.push(weatherWatcher.loadWULayer(mapBounds, mapDiv, this));
                        }
                    }
                    break;
                case "wu":
                    this.overlay.push(weatherWatcher.loadWULayer(mapBounds, mapDiv, this));
                    break;
                case "arcgis":
                    this.overlay.push(weatherWatcher.loadArcGISLayer(this));
                    break;
                case "wms":
                    this.overlay.push(weatherWatcher.loadWMSLayer(mapBounds, mapDiv, this));
                    break;
                case "google":
                    break;
                case "marker":
                    break;
            }
        }
    } 
    catch (E) {
        console.dir(E);
    }
}
wwLayer.prototype.remove = function() {
    if (this.overlay.length == 0) {
        return
    }
    try {
        switch (this.layerType) {
            case "arcgis":
                this.overlay.each(function(O) {
                    O.setMap(null);
                })
                this.overlay = [];
                break;
            case "wu":
                this.overlay.each(function(O) {
                    O.setMap(null);
                })
                this.overlay = [];
                break;
            case "radar":
                this.overlay.each(function(O) {
                    O.setMap(null);
                })
                this.overlay = [];
                break;
            case "wms":
                this.overlay.each(function(O) {
                    O.setMap(null);
                })
                this.overlay = [];
                break;
            case "marker":
                break;
            case "google":
                break;
        }
    } 
    catch (E) {
        alert(".remove() error: " + E.message)
    }
}
wwLayer.prototype.changeOpacity = function(newOpacity) {
    if (newOpacity < 0) {
        newOpacity = 0;
    }
    if (newOpacity > 100) {
        newOpacity = 100;
    }
    var c = newOpacity / 100;
    this.defaultOpacity = newOpacity;
    if (this.overlay[0]) {
        if (this.layerType == "arcgis") {
            this.overlay[0].setOpacity(c);
        } 
        else 
        {
            var theDiv = this.overlay[0].div_;
            if (typeof (theDiv.style.filter) == 'string') {
                theDiv.style.filter = 'alpha(opacity:' + newOpacity + ')';
            }
            if (typeof (theDiv.style.KHTMLOpacity) == 'string') {
                theDiv.style.KHTMLOpacity = c;
            }
            if (typeof (theDiv.style.MozOpacity) == 'string') {
                theDiv.style.MozOpacity = c;
            }
            if (typeof (theDiv.style.opacity) == 'string') {
                theDiv.style.opacity = c;
            }
        }
        return this.defaultOpacity
    }
}
wwLayer.prototype.refresh = function() {
    var d = new Date();
    this.remove();
    this.add(map.getBounds(), map.getDiv());
}
weatherWatcher.showChangeLog = function() {
    var c = $("changelog");
    c.style.left = parseInt(document.viewport.getWidth() / 2 - 300) + "px";
    c.style.top = parseInt(document.viewport.getHeight() / 2 - 100) + "px";
    new Effect.toggle(c, 'appear');
}
weatherWatcher.hideChangeLog = function() {
    var c = $("changelog");
    new Effect.Fade(c);
}
