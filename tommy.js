
//Random String Generator
let string = "1234567890qwertyuiopasdfghjklz1234567890xcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
function shuffleString(inputString){
	return inputString.split('').sort(function(){return 0.5-Math.random()}).join('');
}
function keygen(){
	document.getElementById('keygen').value=shuffleString(string).substring(0,16);
}
function valueSet(obj){
	obj.value=obj.value.substring(0,16);
}
let padding="1234567890asdfgh";
let urlPadding="@@@@@@@@@@@@@@@@";
function finalString(){
	return (document.getElementById('keygen').value+padding).substring(0,16);
}




function twiceWidth(obj){
	obj.style.width="450px";
}
function is_url(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}
function makeRed(obj){
	if(!(is_url(obj.value)&&obj.value.length<990)){
		obj.style.borderColor="red";
		document.getElementById("invalid").style.display="";
	}
	else{
		obj.style.borderColor="";
		document.getElementById("invalid").style.display="none";
	}
	
}
function checkRed(){
	obj=document.getElementById("url");
	if(!(is_url(obj.value)&&obj.value.length<990)){
		obj.style.borderColor="red";
		document.getElementById("invalid").style.display="";
	}
}


function checkSubm(){
	checkRed();
	obj=document.getElementById("url")
	if(is_url(obj.value)&&obj.value.length<990){
		document.location.href="https://tinyurl.com/create.php?url=https://url.juma.io/?data="+encryptAES(obj.value,finalString());
		//location.href.split("/?data=")[1]
		//document.location.href="http://localhost:8000/?data="+encryptAES(obj.value,finalString());
	}
}

function encryptAES(url,skey){
	//text url
// An example 128-bit key
var key = aesjs.utils.utf8.toBytes(skey);

// The initialization vector (must be 16 bytes)
var iv = aesjs.utils.utf8.toBytes(skey);
// Convert text to bytes (text must be a multiple of 16 bytes)
url=(url+urlPadding).substring(0,Math.ceil(url.length/16)*16);
var textBytes = aesjs.utils.utf8.toBytes(url);



var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
var encryptedBytes = aesCbc.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
return encryptedHex+aesjs.utils.hex.fromBytes(iv);
}

function checkPath(){
	if(location.href.split("/?data=")[1]){
		data=location.href.split("/?data=")[1]
		document.getElementById("dashboard").style.display="none";
		document.getElementById("redir").style.display="";
		history.replaceState({}, window.title, "/");
		solveURL(data);
	}
}

function solveURL(data){
	skey=data.substring(data.length-32);
	skey=aesjs.utils.hex.toBytes(skey);
	url=data.substring(0,data.length-32);
	url=aesjs.utils.hex.toBytes(url);
	
	var aesCbc = new aesjs.ModeOfOperation.cbc(skey, skey);
	var decryptedBytes = aesCbc.decrypt(url);

	// Convert our bytes back into text
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	urldata=decryptedText.replace(/@/g, '');
	if(!urldata.substring(0,4)=="http"){
		urldata="http://"+urldata;
	}
	document.getElementById("redir-url").href=urldata;
	document.getElementById("redir-url").innerHTML=urldata;
	
}

function btd(){
	document.getElementById("dashboard").style.display="";
	document.getElementById("redir").style.display="none";
}




