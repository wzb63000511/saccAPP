var hide=false;
function enterPressed(o){
  if(o.value.replace(/(^\s*)|(\s*$)/g, "") != "" && (event.keyCode==13||event.keyCode==120))
    return true;
  return false;
}
function enterSearchPressed(){
	  if(event.keyCode==13||event.keyCode==120)
	    return true;
	  return false;
}
function getLocalUser(){
	return window.localStorage.getItem("un.");
}
function getLocalPassWord(){
	return window.localStorage.getItem("pw.");
}

function getWorkCellGid(){
	return window.localStorage.getItem("wc.");
}

function getWorkCellCode(){
	return window.localStorage.getItem("wcCode.");
}

function getWorkCellName(){
	return window.localStorage.getItem("wcName.");
}

function getWorkCellDesc(){
	return "["+getWorkCellCode()+"]"+getWorkCellName();
}

function getLocalStorage(key){
	var v = localStorage.getItem(key);
	return v === undefined ? null : v;
}
function getServerUrl(){
	var serverUrl = localStorage.getItem('serverUrl');
	var serverIp = localStorage.getItem('serverIp');
	var serverPort = localStorage.getItem('serverPort');
	var serverProject = localStorage.getItem('serverProject');
	return "http://" + serverIp + ":" + serverPort + "/" + serverProject + "/";
}
function getworkcellUrl(){ 
		var name=window.localStorage.getItem("un");
		return getServerUrl()+"padController!getworkcenter.m?name="+name;
}
function getresultUrl(){
        return getServerUrl()+"padController!getworkcellbind.m";
}
function getUrl(url){
    var un= localStorage.getItem('un');
	var pw=localStorage.getItem('pw');
	if(un != ''&&un!=null)
	{
//		alert(getServerUrl()+"autoLoginController!login.m?_u=" +un+ "&_p=" +pw  + "&_to=" + url);
		return getServerUrl()+"autoLoginController!login.m?_u=" +un+ "&_p=" +pw+"&_pt=min"+ "&_to=" + url;
	}else
	{
		return url;
	}
}

function toggle(){
  if(hide){
  	$.ui.toggleHeaderMenu();
    $.ui.toggleNavMenu();
  }
}

function toggleBack(){
	$.ui.goBack();
	if(hide){
	  	$.ui.toggleHeaderMenu();
	    $.ui.toggleNavMenu();
	}
}

function goPanel(panel){
	$("#"+panel).click();
	toggle();
}