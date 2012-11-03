//google visualizations

weatherWatcher.FT={}

weatherWatcher.FT.getZones=function(pt){
    var ftquery=encodeURIComponent("SELECT CODE, NAME, TYPE FROM 449600 WHERE ST_INTERSECTS(SHAPE,CIRCLE(LATLNG(" + pt.lat() + "," + pt.lng() + "),5))");
    var query=new google.visualization.Query("http://www.google.com/fusiontables/gvizdata?tq="  + ftquery);
    query.send(weatherWatcher.FT.ftResponse);
}

weatherWatcher.FT.ftResponse=function(response){
    var datatable=response.getDataTable();
    debug.dir(response);
    var htmlout="Forecast Zones<br/>" 
    for (x=0;x<datatable.getNumberOfRows();x++){
	htmlout+=datatable.getValue(x,0) + "&nbsp;" + datatable.getValue(x,1) + " (" + datatable.getValue(x,2) + ")<br/>";
	
    }
    var IW=new google.maps.InfoWindow({content:htmlout,position:weatherWatcher.clickedAlertPoint.latLng});
    IW.open(map);
}