var airspacer = {};

airspacer.test = function() {
	var DesertMOA = [
	new google.maps.LatLng(37.8833,-116.1842),
	new google.maps.LatLng(37.9997,-114.7017),
	new google.maps.LatLng(38.0167,-114.5008),
	new google.maps.LatLng(38.0167,-114.2000),
	new google.maps.LatLng(37.8956,-113.7008),
	new google.maps.LatLng(37.8236,-113.7003),
	new google.maps.LatLng(36.7167,-114.6008),
	new google.maps.LatLng(36.7167,-115.0508),
	new google.maps.LatLng(36.4333,-115.3008),
	new google.maps.LatLng(37.2833,-115.3008),
	new google.maps.LatLng(37.2833,-115.5842),
	new google.maps.LatLng(37.4667,-115.5842),
	new google.maps.LatLng(37.4667,-115.8008),
	new google.maps.LatLng(37.5500,-115.8008),
	new google.maps.LatLng(37.5500,-115.8842),
	new google.maps.LatLng(37.7000,-115.8842),
	new google.maps.LatLng(37.7000,-116.1842)
	  ];

	var R4808B_Points = [
	 new google.maps.LatLng(37.26667, -116.00083), 
	 new google.maps.LatLng(37.10000, -116.00083), 
	 new google.maps.LatLng(37.10000, -115.93417), 
	 new google.maps.LatLng(37.00000, -115.93417), 
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.26667, -116.00083)
	 ];


	var R4808C_Points = [
	 new google.maps.LatLng(37.00000, -115.93417), 
	 new google.maps.LatLng(36.85000, -115.93418), 
	 new google.maps.LatLng(36.75005, -115.93417), 
	 new google.maps.LatLng(36.68333, -115.93417), 
	 new google.maps.LatLng(36.68341, -116.01763), 
	 new google.maps.LatLng(36.83333, -116.25083), 
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(37.00000, -115.93417)
	 ];


	var R4808D_Points = [
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(37.13334, -116.45084), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.26674, -116.25083)
	 ];


	var R4808E_Points = [
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(36.83333, -116.25083), 
	 new google.maps.LatLng(36.68341, -116.01763), 
	 new google.maps.LatLng(36.68334, -116.24667), 
	 new google.maps.LatLng(36.76667, -116.44250), 
	 new google.maps.LatLng(36.85000, -116.44250), 
	 new google.maps.LatLng(36.85000, -116.55917), 
	 new google.maps.LatLng(36.91667, -116.55917), 
	 new google.maps.LatLng(36.91667, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.25084)
	 ];

	var R4809A_Points = [
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.66667, -116.66750), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.78333, -116.91750), 
	 new google.maps.LatLng(37.88334, -116.91750), 
	 new google.maps.LatLng(37.88347, -116.83341), 
	 new google.maps.LatLng(37.88358, -116.66750)];

	var R71N_Points = [
	 new google.maps.LatLng(37.66667, -117.09472), 
	 new google.maps.LatLng(37.88334, -117.09472), 
	 new google.maps.LatLng(37.88334, -116.91750), 
	 new google.maps.LatLng(37.78333, -116.91750), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.66669, -117.07300), 
	 new google.maps.LatLng(37.66667, -117.09402), 
	 new google.maps.LatLng(37.66667, -117.09472)];

	var R71S_Points = [
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.55003, -117.07288), 
	 new google.maps.LatLng(37.55000, -117.09395), 
	 new google.maps.LatLng(37.55000, -117.09472), 
	 new google.maps.LatLng(37.66667, -117.09472), 
	 new google.maps.LatLng(37.66667, -117.09402), 
	 new google.maps.LatLng(37.66669, -117.07300), 
	 new google.maps.LatLng(37.66667, -116.81750)];

	var R74C_Points = [
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.63259, -116.02463), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.53333, -116.28333), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.70000, -115.88423)];

	var R75E_Points = [
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.55000, -116.31680), 
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.38334, -116.36750), 
	 new google.maps.LatLng(37.35000, -116.45084), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.55000, -116.43417)];

	var R75W_Points = [
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.33340, -116.61747), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.37537, -116.69927), 
	 new google.maps.LatLng(37.37534, -116.70836), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.55000, -116.43417)];

	var R76_Points = [
	 new google.maps.LatLng(37.26667, -116.92197), 
	 new google.maps.LatLng(37.44167, -117.07584), 
	 new google.maps.LatLng(37.55000, -117.09472), 
	 new google.maps.LatLng(37.55000, -117.09395), 
	 new google.maps.LatLng(37.55003, -117.07288), 
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.37534, -116.70836), 
	 new google.maps.LatLng(37.37537, -116.69927), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.33334, -116.82514), 
	 new google.maps.LatLng(37.33333, -116.83417), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.26671, -116.89807), 
	 new google.maps.LatLng(37.26667, -116.92197)];

	var ECE_Points = [
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.55000, -116.31680), 
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.70187, -116.43417), 
	 new google.maps.LatLng(37.75185, -116.43417), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.53333, -116.28333), 
	 new google.maps.LatLng(37.53335, -116.31683)];

	var ECS_Points = [
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.13334, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(36.91667, -116.45084), 
	 new google.maps.LatLng(36.91667, -116.55917), 
	 new google.maps.LatLng(36.85000, -116.55917), 
	 new google.maps.LatLng(37.26667, -116.92197), 
	 new google.maps.LatLng(37.26671, -116.89807), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.26667, -116.51750)];

	var ECW_Points = [
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.66667, -116.66750), 
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.75185, -116.43417), 
	 new google.maps.LatLng(37.70187, -116.43417), 
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.55000, -116.71668)];

	var ELG_Points = [
	 new google.maps.LatLng(37.46500, -114.57844), 
	 new google.maps.LatLng(37.45039, -114.00776), 
	 new google.maps.LatLng(36.71667, -114.60083), 
	 new google.maps.LatLng(36.71688, -114.84528), 
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.46500, -114.57844)];

	var PAHA_Points = [
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.38334, -116.28416), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.38334, -116.30083)];

	var PAHB_Points = [
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.35000, -116.45084), 
	 new google.maps.LatLng(37.38334, -116.36750), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.38334, -116.30083)];

	var REVN_Points = [
	 new google.maps.LatLng(37.99929, -116.66696), 
	 new google.maps.LatLng(38.23335, -116.31443), 
	 new google.maps.LatLng(38.23333, -115.00000), 
	 new google.maps.LatLng(38.01667, -114.20001), 
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(37.99929, -116.66696)];

	var REVS_Points = [
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(37.97964, -115.00083), 
	 new google.maps.LatLng(37.95643, -115.30012), 
	 new google.maps.LatLng(37.90892, -115.88396), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.88347, -116.83341), 
	 new google.maps.LatLng(37.99929, -116.66696), 
	 new google.maps.LatLng(38.00416, -114.57598)];

	var TPECR_Points = [
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.33333, -116.83417), 
	 new google.maps.LatLng(37.33334, -116.82514), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.33340, -116.61747), 
	 new google.maps.LatLng(37.35000, -116.56750)];

	var R74A_Points = [
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.46685, -115.80083), 
	 new google.maps.LatLng(37.46667, -116.00084), 
	 new google.maps.LatLng(37.26667, -116.00083), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.55000, -116.01399), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.55072, -115.80083)];

	var R74B_Points = [
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.55000, -116.01399), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.38334, -116.28416), 
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.63259, -116.02463), 
	 new google.maps.LatLng(37.63225, -115.88416)];

	var CALA_Points = [
	 new google.maps.LatLng(37.98861, -114.84531), 
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.28333, -115.00083), 
	 new google.maps.LatLng(37.28339, -115.11751), 
	 new google.maps.LatLng(37.97059, -115.11751), 
	 new google.maps.LatLng(37.97964, -115.00083), 
	 new google.maps.LatLng(37.98861, -114.84531)];

	var CALB_Points = [
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(37.46500, -114.57844), 
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.98861, -114.84531), 
	 new google.maps.LatLng(38.00416, -114.57598)];

	var CALC_Points = [
	 new google.maps.LatLng(38.01667, -114.20001), 
	 new google.maps.LatLng(37.89561, -113.70099), 
	 new google.maps.LatLng(37.82370, -113.70032), 
	 new google.maps.LatLng(37.45039, -114.00776), 
	 new google.maps.LatLng(37.45041, -114.00854), 
	 new google.maps.LatLng(37.45109, -114.03297), 
	 new google.maps.LatLng(37.46440, -114.55266), 
	 new google.maps.LatLng(37.46500, -114.57844), 
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(38.01667, -114.20001)];

	var COYB_Points = [
	 new google.maps.LatLng(37.97059, -115.11751), 
	 new google.maps.LatLng(37.28339, -115.11751), 
	 new google.maps.LatLng(37.20000, -115.11751), 
	 new google.maps.LatLng(37.28342, -115.18431), 
	 new google.maps.LatLng(37.28333, -115.30083), 
	 new google.maps.LatLng(37.28342, -115.43425), 
	 new google.maps.LatLng(37.50000, -115.43356), 
	 new google.maps.LatLng(37.55116, -115.43340), 
	 new google.maps.LatLng(37.94558, -115.43340), 
	 new google.maps.LatLng(37.95643, -115.30012), 
	 new google.maps.LatLng(37.97059, -115.11751)];

	var COYC_Points = [
	 new google.maps.LatLng(37.94558, -115.43340), 
	 new google.maps.LatLng(37.55116, -115.43340), 
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.90892, -115.88396), 
	 new google.maps.LatLng(37.94558, -115.43340)];

	var COYA_Points = [
	 new google.maps.LatLng(37.55116, -115.43340), 
	 new google.maps.LatLng(37.28342, -115.43425), 
	 new google.maps.LatLng(37.28333, -115.58417), 
	 new google.maps.LatLng(37.46667, -115.58417), 
	 new google.maps.LatLng(37.46685, -115.80083), 
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.55116, -115.43340)];

	var COYD_Points = [
	 new google.maps.LatLng(37.90892, -115.88396), 
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.90892, -115.88396)];

	var A914_Layer_Points = [
	 new google.maps.LatLng(37.26667, -116.00083), 
	 new google.maps.LatLng(37.10000, -116.00083), 
	 new google.maps.LatLng(37.10000, -115.93417), 
	 new google.maps.LatLng(37.00000, -115.93417), 
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.26667, -116.00083)];


	var A915_Layer_Points = [
	 new google.maps.LatLng(37.00000, -115.93417), 
	 new google.maps.LatLng(36.85000, -115.93418), 
	 new google.maps.LatLng(36.75005, -115.93417), 
	 new google.maps.LatLng(36.68333, -115.93417), 
	 new google.maps.LatLng(36.68341, -116.01763), 
	 new google.maps.LatLng(36.83333, -116.25083), 
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(37.00000, -115.93417)];


	var A916_Layer_Points = [
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(37.13334, -116.45084), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.26674, -116.25083)];


	var A917_Layer_Points = [
	 new google.maps.LatLng(37.00000, -116.25084), 
	 new google.maps.LatLng(36.83333, -116.25083), 
	 new google.maps.LatLng(36.68341, -116.01763), 
	 new google.maps.LatLng(36.68334, -116.24667), 
	 new google.maps.LatLng(36.76667, -116.44250), 
	 new google.maps.LatLng(36.85000, -116.44250), 
	 new google.maps.LatLng(36.85000, -116.55917), 
	 new google.maps.LatLng(36.91667, -116.55917), 
	 new google.maps.LatLng(36.91667, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.25084)];


	var A919_Layer_Points = [
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.66667, -116.66750), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.78333, -116.91750), 
	 new google.maps.LatLng(37.88334, -116.91750), 
	 new google.maps.LatLng(37.88347, -116.83341), 
	 new google.maps.LatLng(37.88358, -116.66750)];

	var R61A_Points = [
	 new google.maps.LatLng(37.28342, -115.43425), 
	 new google.maps.LatLng(37.00007, -115.43436), 
	 new google.maps.LatLng(37.00000, -115.55083), 
	 new google.maps.LatLng(37.10000, -115.58417), 
	 new google.maps.LatLng(37.28333, -115.58417), 
	 new google.maps.LatLng(37.28342, -115.43425)];

	var R61B_Points = [
	 new google.maps.LatLng(37.28333, -115.30083), 
	 new google.maps.LatLng(37.00000, -115.30088), 
	 new google.maps.LatLng(37.00007, -115.43436), 
	 new google.maps.LatLng(37.28342, -115.43425), 
	 new google.maps.LatLng(37.28333, -115.30083)];

	var R62A_Points = [
	 new google.maps.LatLng(37.00000, -115.30088), 
	 new google.maps.LatLng(36.85000, -115.30088), 
	 new google.maps.LatLng(36.85000, -115.55083), 
	 new google.maps.LatLng(37.00000, -115.55083), 
	 new google.maps.LatLng(37.00007, -115.43436), 
	 new google.maps.LatLng(37.00000, -115.30088)];

	var R62B_Points = [
	 new google.maps.LatLng(36.85000, -115.30088), 
	 new google.maps.LatLng(36.71667, -115.30088), 
	 new google.maps.LatLng(36.71673, -115.42499), 
	 new google.maps.LatLng(36.75019, -115.42448), 
	 new google.maps.LatLng(36.75003, -115.49064), 
	 new google.maps.LatLng(36.71672, -115.49069), 
	 new google.maps.LatLng(36.71667, -115.55083), 
	 new google.maps.LatLng(36.85000, -115.55083), 
	 new google.maps.LatLng(36.85000, -115.30088)];

	var R63A_Points = [
	 new google.maps.LatLng(36.71672, -115.49069), 
	 new google.maps.LatLng(36.75003, -115.49064), 
	 new google.maps.LatLng(36.75019, -115.42448), 
	 new google.maps.LatLng(36.71673, -115.42499), 
	 new google.maps.LatLng(36.71672, -115.49069)];

	var R63B_Points = [
	 new google.maps.LatLng(36.71667, -115.30088), 
	 new google.maps.LatLng(36.63334, -115.30087), 
	 new google.maps.LatLng(36.53358, -115.30085), 
	 new google.maps.LatLng(36.53341, -115.43417), 
	 new google.maps.LatLng(36.53333, -115.49250), 
	 new google.maps.LatLng(36.50311, -115.49250), 
	 new google.maps.LatLng(36.55723, -115.57678), 
	 new google.maps.LatLng(36.58458, -115.57234), 
	 new google.maps.LatLng(36.59999, -115.56983), 
	 new google.maps.LatLng(36.60611, -115.56884), 
	 new google.maps.LatLng(36.61308, -115.56770), 
	 new google.maps.LatLng(36.61667, -115.56712), 
	 new google.maps.LatLng(36.62500, -115.56576), 
	 new google.maps.LatLng(36.62694, -115.56545), 
	 new google.maps.LatLng(36.67301, -115.55795), 
	 new google.maps.LatLng(36.71667, -115.55083), 
	 new google.maps.LatLng(36.71672, -115.49069), 
	 new google.maps.LatLng(36.71673, -115.42499), 
	 new google.maps.LatLng(36.71667, -115.30088)];

	var R63C_Points = [
	 new google.maps.LatLng(36.53341, -115.43417), 
	 new google.maps.LatLng(36.53358, -115.30085), 
	 new google.maps.LatLng(36.43333, -115.30083), 
	 new google.maps.LatLng(36.43334, -115.38416), 
	 new google.maps.LatLng(36.46576, -115.43447), 
	 new google.maps.LatLng(36.50311, -115.49250), 
	 new google.maps.LatLng(36.53333, -115.49250), 
	 new google.maps.LatLng(36.53341, -115.43417)];

	var R64A_Points = [
	 new google.maps.LatLng(37.00000, -115.55083), 
	 new google.maps.LatLng(36.85000, -115.55083), 
	 new google.maps.LatLng(36.85015, -115.71750), 
	 new google.maps.LatLng(37.00015, -115.71662), 
	 new google.maps.LatLng(37.00013, -115.66617), 
	 new google.maps.LatLng(37.00000, -115.55083)];

	var R64B_Points = [
	 new google.maps.LatLng(36.85000, -115.55083), 
	 new google.maps.LatLng(36.71667, -115.55083), 
	 new google.maps.LatLng(36.71645, -115.67494), 
	 new google.maps.LatLng(36.71635, -115.71750), 
	 new google.maps.LatLng(36.85015, -115.71750), 
	 new google.maps.LatLng(36.85000, -115.55083)];

	var R64C_Points = [
	 new google.maps.LatLng(36.71667, -115.55083), 
	 new google.maps.LatLng(36.67301, -115.55795), 
	 new google.maps.LatLng(36.64363, -115.56273), 
	 new google.maps.LatLng(36.62694, -115.56545), 
	 new google.maps.LatLng(36.62500, -115.56576), 
	 new google.maps.LatLng(36.61667, -115.56712), 
	 new google.maps.LatLng(36.61308, -115.56770), 
	 new google.maps.LatLng(36.60611, -115.56884), 
	 new google.maps.LatLng(36.60615, -115.61702), 
	 new google.maps.LatLng(36.62615, -115.63724), 
	 new google.maps.LatLng(36.64892, -115.63467), 
	 new google.maps.LatLng(36.65170, -115.64574), 
	 new google.maps.LatLng(36.65174, -115.65470), 
	 new google.maps.LatLng(36.64917, -115.66575), 
	 new google.maps.LatLng(36.62701, -115.66800), 
	 new google.maps.LatLng(36.62699, -115.76154), 
	 new google.maps.LatLng(36.62695, -115.81521), 
	 new google.maps.LatLng(36.67250, -115.85589), 
	 new google.maps.LatLng(36.67283, -115.71750), 
	 new google.maps.LatLng(36.71635, -115.71750), 
	 new google.maps.LatLng(36.71645, -115.67494), 
	 new google.maps.LatLng(36.71667, -115.55083)];

	var R64D_Points = [
	 new google.maps.LatLng(36.62701, -115.66800), 
	 new google.maps.LatLng(36.62553, -115.66815), 
	 new google.maps.LatLng(36.62443, -115.66826), 
	 new google.maps.LatLng(36.60616, -115.67012), 
	 new google.maps.LatLng(36.60611, -115.79662), 
	 new google.maps.LatLng(36.61308, -115.80284), 
	 new google.maps.LatLng(36.61667, -115.80604), 
	 new google.maps.LatLng(36.62499, -115.81346), 
	 new google.maps.LatLng(36.62695, -115.81521), 
	 new google.maps.LatLng(36.62699, -115.76154), 
	 new google.maps.LatLng(36.62701, -115.66800)];

	var R64E_Points = [
	 new google.maps.LatLng(36.62701, -115.66800), 
	 new google.maps.LatLng(36.64917, -115.66575), 
	 new google.maps.LatLng(36.65174, -115.65470), 
	 new google.maps.LatLng(36.65170, -115.64574), 
	 new google.maps.LatLng(36.64892, -115.63467), 
	 new google.maps.LatLng(36.62615, -115.63724), 
	 new google.maps.LatLng(36.60615, -115.61702), 
	 new google.maps.LatLng(36.60616, -115.67012), 
	 new google.maps.LatLng(36.62443, -115.66826), 
	 new google.maps.LatLng(36.62553, -115.66815), 
	 new google.maps.LatLng(36.62701, -115.66800)];

	var R64F_Points = [
	 new google.maps.LatLng(36.60611, -115.56884), 
	 new google.maps.LatLng(36.59999, -115.56983), 
	 new google.maps.LatLng(36.58458, -115.57234), 
	 new google.maps.LatLng(36.57344, -115.57415), 
	 new google.maps.LatLng(36.55723, -115.57678), 
	 new google.maps.LatLng(36.57641, -115.60671), 
	 new google.maps.LatLng(36.58333, -115.61750), 
	 new google.maps.LatLng(36.60615, -115.61702), 
	 new google.maps.LatLng(36.60611, -115.56884)];

	var R65A_Points = [
	 new google.maps.LatLng(37.10000, -115.58417), 
	 new google.maps.LatLng(37.00000, -115.55083), 
	 new google.maps.LatLng(37.00013, -115.66617), 
	 new google.maps.LatLng(37.00015, -115.71662), 
	 new google.maps.LatLng(37.00000, -115.93417), 
	 new google.maps.LatLng(37.10000, -115.93417), 
	 new google.maps.LatLng(37.10001, -115.92556), 
	 new google.maps.LatLng(37.10012, -115.71643), 
	 new google.maps.LatLng(37.10000, -115.58417)];

	var R65B_Points = [
	 new google.maps.LatLng(37.00015, -115.71662), 
	 new google.maps.LatLng(36.85015, -115.71750), 
	 new google.maps.LatLng(36.85000, -115.93418), 
	 new google.maps.LatLng(37.00000, -115.93417), 
	 new google.maps.LatLng(37.00015, -115.71662)];

	var R65C_Points = [
	 new google.maps.LatLng(36.85015, -115.71750), 
	 new google.maps.LatLng(36.71635, -115.71750), 
	 new google.maps.LatLng(36.67283, -115.71750), 
	 new google.maps.LatLng(36.67250, -115.85589), 
	 new google.maps.LatLng(36.75005, -115.93417), 
	 new google.maps.LatLng(36.85000, -115.93418), 
	 new google.maps.LatLng(36.85015, -115.71750)];

	var R65D_Points = [
	 new google.maps.LatLng(36.75005, -115.93417), 
	 new google.maps.LatLng(36.67250, -115.85589), 
	 new google.maps.LatLng(36.62695, -115.81521), 
	 new google.maps.LatLng(36.62499, -115.81346), 
	 new google.maps.LatLng(36.61667, -115.80604), 
	 new google.maps.LatLng(36.61308, -115.80284), 
	 new google.maps.LatLng(36.60611, -115.79662), 
	 new google.maps.LatLng(36.59998, -115.79116), 
	 new google.maps.LatLng(36.58340, -115.77637), 
	 new google.maps.LatLng(36.58333, -115.88416), 
	 new google.maps.LatLng(36.60000, -115.93417), 
	 new google.maps.LatLng(36.68333, -115.93417), 
	 new google.maps.LatLng(36.75005, -115.93417)];

	var A1241_Layer_Points = [
	 new google.maps.LatLng(36.75005, -115.93417), 
	 new google.maps.LatLng(36.67250, -115.85589), 
	 new google.maps.LatLng(36.62695, -115.81521), 
	 new google.maps.LatLng(36.62499, -115.81346), 
	 new google.maps.LatLng(36.61667, -115.80604), 
	 new google.maps.LatLng(36.61308, -115.80284), 
	 new google.maps.LatLng(36.60611, -115.79662), 
	 new google.maps.LatLng(36.59998, -115.79116), 
	 new google.maps.LatLng(36.58340, -115.77637), 
	 new google.maps.LatLng(36.58333, -115.88416), 
	 new google.maps.LatLng(36.60000, -115.93417), 
	 new google.maps.LatLng(36.68333, -115.93417), 
	 new google.maps.LatLng(36.75005, -115.93417)];


	var A1347_Layer_Points = [
	 new google.maps.LatLng(37.66667, -117.09472), 
	 new google.maps.LatLng(37.88334, -117.09472), 
	 new google.maps.LatLng(37.88334, -116.91750), 
	 new google.maps.LatLng(37.78333, -116.91750), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.66669, -117.07300), 
	 new google.maps.LatLng(37.66667, -117.09402), 
	 new google.maps.LatLng(37.66667, -117.09472)];


	var A934_Layer_Points = [
	 new google.maps.LatLng(37.66667, -117.09472), 
	 new google.maps.LatLng(37.88334, -117.09472), 
	 new google.maps.LatLng(37.88334, -116.91750), 
	 new google.maps.LatLng(37.78333, -116.91750), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.66669, -117.07300), 
	 new google.maps.LatLng(37.66667, -117.09402), 
	 new google.maps.LatLng(37.66667, -117.09472)];


	var A1348_Layer_Points = [
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.55003, -117.07288), 
	 new google.maps.LatLng(37.55000, -117.09395), 
	 new google.maps.LatLng(37.55000, -117.09472), 
	 new google.maps.LatLng(37.66667, -117.09472), 
	 new google.maps.LatLng(37.66667, -117.09402), 
	 new google.maps.LatLng(37.66669, -117.07300), 
	 new google.maps.LatLng(37.66667, -116.81750)];


	var A935_Layer_Points = [
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.55003, -117.07288), 
	 new google.maps.LatLng(37.55000, -117.09395), 
	 new google.maps.LatLng(37.55000, -117.09472), 
	 new google.maps.LatLng(37.66667, -117.09472), 
	 new google.maps.LatLng(37.66667, -117.09402), 
	 new google.maps.LatLng(37.66669, -117.07300), 
	 new google.maps.LatLng(37.66667, -116.81750)];


	var A1350_Layer_Points = [
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.46685, -115.80083), 
	 new google.maps.LatLng(37.46667, -116.00084), 
	 new google.maps.LatLng(37.26667, -116.00083), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.55000, -116.01399), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.55072, -115.80083)];


	var A963_Layer_Points = [
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.46685, -115.80083), 
	 new google.maps.LatLng(37.46667, -116.00084), 
	 new google.maps.LatLng(37.26667, -116.00083), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.55000, -116.01399), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.55072, -115.80083)];


	var A1351_Layer_Points = [
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.55000, -116.01399), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.38334, -116.28416), 
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.63259, -116.02463), 
	 new google.maps.LatLng(37.63225, -115.88416)];


	var A964_Layer_Points = [
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.55000, -116.01399), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.38334, -116.28416), 
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.63259, -116.02463), 
	 new google.maps.LatLng(37.63225, -115.88416)];


	var A1352_Layer_Points = [
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.63259, -116.02463), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.53333, -116.28333), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.70000, -115.88423)];


	var A936_Layer_Points = [
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.63259, -116.02463), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.53333, -116.28333), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.70000, -115.88423)];


	var A1354_Layer_Points = [
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.55000, -116.31680), 
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.38334, -116.36750), 
	 new google.maps.LatLng(37.35000, -116.45084), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.55000, -116.43417)];


	var A937_Layer_Points = [
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.55000, -116.31680), 
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.38334, -116.36750), 
	 new google.maps.LatLng(37.35000, -116.45084), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.55000, -116.43417)];


	var A1355_Layer_Points = [
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.33340, -116.61747), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.37537, -116.69927), 
	 new google.maps.LatLng(37.37534, -116.70836), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.55000, -116.43417)];


	var A938_Layer_Points = [
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.33340, -116.61747), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.37537, -116.69927), 
	 new google.maps.LatLng(37.37534, -116.70836), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.55000, -116.43417)];


	var A939_Layer_Points = [
	 new google.maps.LatLng(37.26667, -116.92197), 
	 new google.maps.LatLng(37.44167, -117.07584), 
	 new google.maps.LatLng(37.55000, -117.09472), 
	 new google.maps.LatLng(37.55000, -117.09395), 
	 new google.maps.LatLng(37.55003, -117.07288), 
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.37534, -116.70836), 
	 new google.maps.LatLng(37.37537, -116.69927), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.33334, -116.82514), 
	 new google.maps.LatLng(37.33333, -116.83417), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.26671, -116.89807), 
	 new google.maps.LatLng(37.26667, -116.92197)];


	var ALAA_Points = [
	 new google.maps.LatLng(37.28342, -115.18431), 
	 new google.maps.LatLng(37.20000, -115.11751), 
	 new google.maps.LatLng(37.00000, -115.11750), 
	 new google.maps.LatLng(37.00000, -115.30088), 
	 new google.maps.LatLng(37.28333, -115.30083), 
	 new google.maps.LatLng(37.28342, -115.18431)];

	var ALAB_Points = [
	 new google.maps.LatLng(37.00000, -115.11750), 
	 new google.maps.LatLng(36.85000, -115.11750), 
	 new google.maps.LatLng(36.85000, -115.30088), 
	 new google.maps.LatLng(37.00000, -115.30088), 
	 new google.maps.LatLng(37.00000, -115.11750)];

	var ALAC_Points = [
	 new google.maps.LatLng(36.85000, -115.11750), 
	 new google.maps.LatLng(36.80000, -115.11778), 
	 new google.maps.LatLng(36.63334, -115.30087), 
	 new google.maps.LatLng(36.71667, -115.30088), 
	 new google.maps.LatLng(36.85000, -115.30088), 
	 new google.maps.LatLng(36.85000, -115.11750)];


	var A1572_Layer_Points = [
	 new google.maps.LatLng(37.98861, -114.84531), 
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.28333, -115.00083), 
	 new google.maps.LatLng(37.28339, -115.11751), 
	 new google.maps.LatLng(37.97059, -115.11751), 
	 new google.maps.LatLng(37.97964, -115.00083), 
	 new google.maps.LatLng(37.98861, -114.84531)];


	var A1573_Layer_Points = [
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(37.46500, -114.57844), 
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.98861, -114.84531), 
	 new google.maps.LatLng(38.00416, -114.57598)];


	var A1574_Layer_Points = [
	 new google.maps.LatLng(38.01667, -114.20001), 
	 new google.maps.LatLng(37.89561, -113.70099), 
	 new google.maps.LatLng(37.82370, -113.70032), 
	 new google.maps.LatLng(37.45039, -114.00776), 
	 new google.maps.LatLng(37.45041, -114.00854), 
	 new google.maps.LatLng(37.45109, -114.03297), 
	 new google.maps.LatLng(37.46440, -114.55266), 
	 new google.maps.LatLng(37.46500, -114.57844), 
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(38.01667, -114.20001)];


	var A1578_Layer_Points = [
	 new google.maps.LatLng(37.55116, -115.43340), 
	 new google.maps.LatLng(37.28342, -115.43425), 
	 new google.maps.LatLng(37.28333, -115.58417), 
	 new google.maps.LatLng(37.46667, -115.58417), 
	 new google.maps.LatLng(37.46685, -115.80083), 
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.55116, -115.43340)];


	var A1576_Layer_Points = [
	 new google.maps.LatLng(37.97059, -115.11751), 
	 new google.maps.LatLng(37.28339, -115.11751), 
	 new google.maps.LatLng(37.20000, -115.11751), 
	 new google.maps.LatLng(37.28342, -115.18431), 
	 new google.maps.LatLng(37.28333, -115.30083), 
	 new google.maps.LatLng(37.28342, -115.43425), 
	 new google.maps.LatLng(37.50000, -115.43356), 
	 new google.maps.LatLng(37.55116, -115.43340), 
	 new google.maps.LatLng(37.94558, -115.43340), 
	 new google.maps.LatLng(37.95643, -115.30012), 
	 new google.maps.LatLng(37.97059, -115.11751)];


	var A1577_Layer_Points = [
	 new google.maps.LatLng(37.94558, -115.43340), 
	 new google.maps.LatLng(37.55116, -115.43340), 
	 new google.maps.LatLng(37.55072, -115.80083), 
	 new google.maps.LatLng(37.55047, -115.88416), 
	 new google.maps.LatLng(37.63225, -115.88416), 
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.90892, -115.88396), 
	 new google.maps.LatLng(37.94558, -115.43340)];


	var A1579_Layer_Points = [
	 new google.maps.LatLng(37.90892, -115.88396), 
	 new google.maps.LatLng(37.70000, -115.88423), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.90892, -115.88396)];


	var A1459_Layer_Points = [
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.55000, -116.31680), 
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.70187, -116.43417), 
	 new google.maps.LatLng(37.75185, -116.43417), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.53333, -116.28333), 
	 new google.maps.LatLng(37.53335, -116.31683)];


	var A949_Layer_Points = [
	 new google.maps.LatLng(37.53335, -116.31683), 
	 new google.maps.LatLng(37.55000, -116.31680), 
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.70187, -116.43417), 
	 new google.maps.LatLng(37.75185, -116.43417), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.70000, -116.18417), 
	 new google.maps.LatLng(37.53333, -116.28333), 
	 new google.maps.LatLng(37.53335, -116.31683)];


	var A1461_Layer_Points = [
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.13334, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(36.91667, -116.45084), 
	 new google.maps.LatLng(36.91667, -116.55917), 
	 new google.maps.LatLng(36.85000, -116.55917), 
	 new google.maps.LatLng(37.26667, -116.92197), 
	 new google.maps.LatLng(37.26671, -116.89807), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.26667, -116.51750)];


	var A950_Layer_Points = [
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.13334, -116.45084), 
	 new google.maps.LatLng(37.00000, -116.45084), 
	 new google.maps.LatLng(36.91667, -116.45084), 
	 new google.maps.LatLng(36.91667, -116.55917), 
	 new google.maps.LatLng(36.85000, -116.55917), 
	 new google.maps.LatLng(37.26667, -116.92197), 
	 new google.maps.LatLng(37.26671, -116.89807), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.26667, -116.51750)];


	var A1460_Layer_Points = [
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.66667, -116.66750), 
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.75185, -116.43417), 
	 new google.maps.LatLng(37.70187, -116.43417), 
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.55000, -116.71668)];


	var A951_Layer_Points = [
	 new google.maps.LatLng(37.55000, -116.71668), 
	 new google.maps.LatLng(37.66667, -116.81750), 
	 new google.maps.LatLng(37.66667, -116.66750), 
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.75185, -116.43417), 
	 new google.maps.LatLng(37.70187, -116.43417), 
	 new google.maps.LatLng(37.55000, -116.43417), 
	 new google.maps.LatLng(37.55001, -116.70831), 
	 new google.maps.LatLng(37.55000, -116.71668)];


	var A952_Layer_Points = [
	 new google.maps.LatLng(37.46500, -114.57844), 
	 new google.maps.LatLng(37.45039, -114.00776), 
	 new google.maps.LatLng(36.71667, -114.60083), 
	 new google.maps.LatLng(36.71688, -114.84528), 
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.46500, -114.57844)];


	var FACA_Points = [
	 new google.maps.LatLng(37.33334, -116.82514), 
	 new google.maps.LatLng(37.37529, -116.78970), 
	 new google.maps.LatLng(37.37519, -116.75020), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.33334, -116.82514)];


	var FACB_Points = [
	 new google.maps.LatLng(37.37534, -116.70836), 
	 new google.maps.LatLng(37.37537, -116.69927), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.37519, -116.75020), 
	 new google.maps.LatLng(37.37534, -116.70836)];


	var A1462_Layer_Points = [
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.38334, -116.28416), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.38334, -116.30083)];


	var A955_Layer_Points = [
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.38334, -116.28416), 
	 new google.maps.LatLng(37.33297, -116.18381), 
	 new google.maps.LatLng(37.26667, -116.18417), 
	 new google.maps.LatLng(37.26674, -116.25083), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.38334, -116.30083)];


	var A1463_Layer_Points = [
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.35000, -116.45084), 
	 new google.maps.LatLng(37.38334, -116.36750), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.38334, -116.30083)];


	var A956_Layer_Points = [
	 new google.maps.LatLng(37.38334, -116.30083), 
	 new google.maps.LatLng(37.26677, -116.30083), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.35000, -116.45084), 
	 new google.maps.LatLng(37.38334, -116.36750), 
	 new google.maps.LatLng(37.38333, -116.31709), 
	 new google.maps.LatLng(37.38334, -116.30083)];


	var A957_Layer_Points = [
	 new google.maps.LatLng(37.99929, -116.66696), 
	 new google.maps.LatLng(38.23335, -116.31443), 
	 new google.maps.LatLng(38.23333, -115.00000), 
	 new google.maps.LatLng(38.01667, -114.20001), 
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(37.99929, -116.66696)];


	var A958_Layer_Points = [
	 new google.maps.LatLng(38.00416, -114.57598), 
	 new google.maps.LatLng(37.97964, -115.00083), 
	 new google.maps.LatLng(37.95643, -115.30012), 
	 new google.maps.LatLng(37.90892, -115.88396), 
	 new google.maps.LatLng(37.88333, -116.18417), 
	 new google.maps.LatLng(37.88333, -116.43417), 
	 new google.maps.LatLng(37.88358, -116.66750), 
	 new google.maps.LatLng(37.88347, -116.83341), 
	 new google.maps.LatLng(37.99929, -116.66696), 
	 new google.maps.LatLng(38.00416, -114.57598)];


	var SALLY_Points = [
	 new google.maps.LatLng(37.28333, -114.84531), 
	 new google.maps.LatLng(37.14611, -114.84532), 
	 new google.maps.LatLng(36.71688, -114.84528), 
	 new google.maps.LatLng(36.71680, -114.96211), 
	 new google.maps.LatLng(36.71667, -115.05083), 
	 new google.maps.LatLng(36.43333, -115.30083), 
	 new google.maps.LatLng(36.53358, -115.30085), 
	 new google.maps.LatLng(36.63334, -115.30087), 
	 new google.maps.LatLng(36.80000, -115.11778), 
	 new google.maps.LatLng(36.85000, -115.11750), 
	 new google.maps.LatLng(37.00000, -115.11750), 
	 new google.maps.LatLng(37.00000, -115.11750), 
	 new google.maps.LatLng(37.20000, -115.11751), 
	 new google.maps.LatLng(37.28339, -115.11751), 
	 new google.maps.LatLng(37.28333, -115.00083), 
	 new google.maps.LatLng(37.28333, -114.84531)];


	var A1360_Layer_Points = [
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.33333, -116.83417), 
	 new google.maps.LatLng(37.33334, -116.82514), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.33340, -116.61747), 
	 new google.maps.LatLng(37.35000, -116.56750)];


	var A960_Layer_Points = [
	 new google.maps.LatLng(37.35000, -116.56750), 
	 new google.maps.LatLng(37.26667, -116.51750), 
	 new google.maps.LatLng(37.26679, -116.83417), 
	 new google.maps.LatLng(37.33333, -116.83417), 
	 new google.maps.LatLng(37.33334, -116.82514), 
	 new google.maps.LatLng(37.33338, -116.75040), 
	 new google.maps.LatLng(37.33337, -116.66862), 
	 new google.maps.LatLng(37.33340, -116.61747), 
	 new google.maps.LatLng(37.35000, -116.56750)];

	  R4808B = new google.maps.Polygon({
		paths: R4808B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0
	  });

	  R4808C = new google.maps.Polygon({
		paths: R4808C_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0
	  });

	  R4808D = new google.maps.Polygon({
		paths: R4808D_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0
	  });

	  R4808E = new google.maps.Polygon({
		paths: R4808E_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0
	  });

	  R4809A = new google.maps.Polygon({
		paths: R4809A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  R71N = new google.maps.Polygon({
		paths: R71N_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R71S = new google.maps.Polygon({
		paths: R71S_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R74C = new google.maps.Polygon({
		paths: R74C_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R75E = new google.maps.Polygon({
		paths: R75E_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R75W = new google.maps.Polygon({
		paths: R75W_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  R76 = new google.maps.Polygon({
		paths: R76_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  ECE = new google.maps.Polygon({
		paths: ECE_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  ECS = new google.maps.Polygon({
		paths: ECS_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  ECW = new google.maps.Polygon({
		paths: ECW_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  ELG = new google.maps.Polygon({
		paths: ELG_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  PAHA = new google.maps.Polygon({
		paths: PAHA_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  PAHB = new google.maps.Polygon({
		paths: PAHB_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  REVN = new google.maps.Polygon({
		paths: REVN_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  REVS = new google.maps.Polygon({
		paths: REVS_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  TPECR = new google.maps.Polygon({
		paths: TPECR_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R74A = new google.maps.Polygon({
		paths: R74A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R74B = new google.maps.Polygon({
		paths: R74B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  CALA = new google.maps.Polygon({
		paths: CALA_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  CALB = new google.maps.Polygon({
		paths: CALB_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  CALC = new google.maps.Polygon({
		paths: CALC_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  COYB = new google.maps.Polygon({
		paths: COYB_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  COYC = new google.maps.Polygon({
		paths: COYC_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  COYA = new google.maps.Polygon({
		paths: COYA_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  COYD = new google.maps.Polygon({
		paths: COYD_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R61A = new google.maps.Polygon({
		paths: R61A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R61B = new google.maps.Polygon({
		paths: R61B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R62A = new google.maps.Polygon({
		paths: R62A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R62B = new google.maps.Polygon({
		paths: R62B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R63A = new google.maps.Polygon({
		paths: R63A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R63B = new google.maps.Polygon({
		paths: R63B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R63C = new google.maps.Polygon({
		paths: R63C_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R64A = new google.maps.Polygon({
		paths: R64A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R64B = new google.maps.Polygon({
		paths: R64B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
	  
	  R64C = new google.maps.Polygon({
		paths: R64C_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  R64D = new google.maps.Polygon({
		paths: R64D_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  R64E = new google.maps.Polygon({
		paths: R64E_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  R64F = new google.maps.Polygon({
		paths: R64F_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  R65A = new google.maps.Polygon({
		paths: R65A_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });	  

	  R65B = new google.maps.Polygon({
		paths: R65B_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });	  

	  R65C = new google.maps.Polygon({
		paths: R65C_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });	  

	  R65D = new google.maps.Polygon({
		paths: R65D_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });	  

	  ALAA = new google.maps.Polygon({
		paths: ALAA_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  ALAB = new google.maps.Polygon({
		paths: ALAB_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });

	  ALAC = new google.maps.Polygon({
		paths: ALAC_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
  
	  FACA = new google.maps.Polygon({
		paths: FACA_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
  
	  FACB = new google.maps.Polygon({
		paths: FACB_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
  
	  SALLY = new google.maps.Polygon({
		paths: SALLY_Points,
		strokeColor: "#1d238d",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0
	  });
  
  R4808B.setMap(map);
  R4808C.setMap(map);
  R4808D.setMap(map);
  R4808E.setMap(map);
  R4809A.setMap(map);
  R71N.setMap(map);
  R71S.setMap(map);
  R74C.setMap(map);
  R75E.setMap(map);
  R75W.setMap(map);
  R76.setMap(map);
  ECE.setMap(map);
  ECS.setMap(map);
  ECW.setMap(map);
  ELG.setMap(map);
  PAHA.setMap(map);
  PAHB.setMap(map);
  REVN.setMap(map);
  REVS.setMap(map);
  TPECR.setMap(map);
  R74A.setMap(map);
  R74B.setMap(map);
  CALA.setMap(map);
  CALB.setMap(map);
  CALC.setMap(map);
  COYB.setMap(map);
  COYC.setMap(map);
  COYA.setMap(map);
  COYD.setMap(map);
  R61A.setMap(map);
  R61B.setMap(map);
  R62A.setMap(map);
  R62B.setMap(map);
  R63A.setMap(map);
  R63B.setMap(map);
  R63C.setMap(map);
  R64A.setMap(map);
  R64B.setMap(map);
  R64C.setMap(map);
  R64D.setMap(map);
  R64E.setMap(map);
  R64F.setMap(map);
  R65A.setMap(map);
  R65B.setMap(map);
  R65C.setMap(map);
  R65D.setMap(map);
  ALAA.setMap(map);
  ALAB.setMap(map);
  ALAC.setMap(map);
  FACA.setMap(map);
  FACB.setMap(map);
  SALLY.setMap(map);
  }
  
