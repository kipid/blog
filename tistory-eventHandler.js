var TOP_SSL_URL = 'https://www.tistory.com';

function processShortcut(event) {
		if (isIE)
	{
		event = window.event;
		event.target = event.srcElement;
	}

	if (event.altKey || event.ctrlKey || event.metaKey)
		return;
	switch (event.target.nodeName) {
		case "INPUT":
		case "SELECT":
		case "TEXTAREA":
			return;
	}
	switch (event.keyCode) {
		case 81: //Q
			window.location = "/admin";
			break;
		case 83: //S
			window.location = "/entry/2014-총리후보-문창극-vs-안대희-프로필-비교";
			break;
		case 90: //Z
			window.location = "#recentEntries";
			break;
		case 88: //X
			window.location = "#recentComments";
			break;
		case 67: //C
			window.location = "#recentTrackback";
			break;
	}
}
document.onkeydown = processShortcut;

function addComment(caller, entryId) {
	var oForm = findFormObject(caller);
	if (!oForm)
		return false;
	var request = new HTTPRequest("POST", oForm.action);
	request.onSuccess = function () {
		if(entryId == 0)
			window.location = blogURL + "/guestbook";
		else {
			document.getElementById("entry" + entryId + "Comment").innerHTML = this.getText("/response/commentBlock");
			if(document.getElementById("recentComments"))
				document.getElementById("recentComments").innerHTML = this.getText("/response/recentCommentBlock");
			if(document.getElementById("commentCount" + entryId))
				document.getElementById("commentCount" + entryId).innerHTML = this.getText("/response/commentView");
			if(document.getElementById("commentCountOnRecentEntries" + entryId))
				document.getElementById("commentCountOnRecentEntries" + entryId).innerHTML = "(" + this.getText("/response/commentCount") + ")";
		}
		if(typeof window.needCommentCaptcha !== "undefined"){
			captchaPlugin.init('complete');
		}
	}
	request.onError = function() {
		var description = this.getText("/response/description");
		if (description) { alert(description); }
	}
	var queryString = "key=tistory";
	var captchaInput = document.getElementById('inputCaptcha');
	if (oForm["name"])
		queryString += "&name=" + encodeURIComponent(oForm["name"].value);
	if (oForm["password"])
		queryString += "&password=" + encodeURIComponent(oForm["password"].value);
	if (oForm["homepage"])
		queryString += "&homepage=" + encodeURIComponent(oForm["homepage"].value);
	if (oForm["secret"] && oForm["secret"].checked)
		queryString += "&secret=1";
	if (oForm["comment"])
		queryString += "&comment=" + encodeURIComponent(oForm["comment"].value);
	if (captchaInput) {
		if (!captchaInput.value) {
			alert('그림문자가 입력되지 않았습니다.');
			return false;
		}
		queryString += "&captcha=" + encodeURIComponent(captchaInput.value);
	}
	request.send(queryString);
}
var openWindow='';
function alignCenter(win,width,height) {
	if(navigator.userAgent.indexOf("Chrome") == -1)
		win.moveTo(screen.width/2-width/2,screen.height/2-height/2);
}

function deleteComment(id) {
	var width = 450;
	var height = 360;
			try { openWindow.close(); } catch(e) { }
			openWindow = window.open("/comment/delete/" + id, "tatter", "width="+width+",height="+height+",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
	openWindow.focus();
	alignCenter(openWindow,width,height);
}

function commentComment(parent, guestbookPage) {
	var width = 450;
	var height = 360;
			try { openWindow.close(); } catch(e) { }
			openWindow = window.open("/comment/comment/" + parent + (guestbookPage ? "?guestbookPage=" + guestbookPage: ""), "tatter", "width="+width+",height="+height+",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
	openWindow.focus();
	alignCenter(openWindow,width,height);
}

function editEntry(parent,child) {
	var width =  1169;
	var height = 600;
	if(openWindow != '') openWindow.close();
	openWindow = window.open("/admin/entry/edit/" + parent + "?popupEditor&returnURL=CLOSEME","tatter", "width="+1169+",height="+600+",location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0");
	openWindow.focus();
	alignCenter(openWindow,width,height);
}

function guestbookComment(parent) {
	var width = 450;
	var height = 360;
			try { openWindow.close(); } catch(e) { }
			openWindow = window.open("/comment/comment/" + parent, "tatter", "width="+width+",height="+height+",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
	openWindow.focus();
	alignCenter(openWindow,width,height);
}

function sendTrackback(id) {
	var width = 700;
	var height = 500;
			try { openWindow.close(); } catch(e) { }
			openWindow = window.open("/trackback/send/" + id, "tatter", "width=580,height=400,location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0");
			openWindow.focus();
	alignCenter(openWindow,width,height);
}

function deleteTrackback(id,entryId) {
	if (!confirm("선택된 트랙백을 삭제합니다. 계속하시겠습니까?\t"))
		return;

	var request = new HTTPRequest("GET", "/trackback/delete/" + id);
	request.onSuccess = function() {
		var target = document.getElementById('trackback'+id);
		if (target) {
			target.parentNode.removeChild(target);
		}
		if(document.getElementById("recentTrackbacks")) {
			document.getElementById("recentTrackbacks").innerHTML = this.getText("/response/recentTrackbackBlock");
		}
		if(document.getElementById("trackbackCount" + entryId)) {
			document.getElementById("trackbackCount" + entryId).innerHTML = this.getText("/response/trackbackView");
		}
	}
	request.onError = function() {
		alert(this.getText("/response/result"));
	}
	request.send();
}
function changeVisibility(id, visibility) {
	var request = new HTTPRequest("POST", "/admin/entry/setVisibility.php");
	request.onVerify = function() {
		try {
			var result = eval("(" + this.getText() + ")");
			if(result.data.event == 'join'){
				alert("이벤트에 참여한 글은 공개설정을 변경하실 수 없습니다.");
				return false;
			} else {
				return (result.error == false)
			}
		}
		catch (e) {
			return false;
		}
	}
	request.onSuccess = function() {
		window.location.reload();
	}
	request.send("ids=" + id + "&visibility=" + visibility);
}

function deleteEntry(id) {
	if (!confirm("이 글 및 이미지 파일을 완전히 삭제합니다. 계속하시겠습니까?\t"))
		return;
	var request = new HTTPRequest("GET", "/oldmin/entry/removeEntry/" + id);
	request.onSuccess = function() {
		window.location.reload();
	}
	request.send();
}

function reloadEntry(id) {
	var password = document.getElementById("entry" + id + "password");
	if (!password)
		return;
	document.cookie = "GUEST_PASSWORD=" + encodeURIComponent(password.value) + ";path=";

	window.location.href = window.location.href;
}
loadedComments = new Array();
loadedTrackbacks = new Array();
function viewTrigger(id, category, categoryId) {
	var request = new HTTPRequest("GET", "/"+category+"/view/" + id);
	var target = document.getElementById('entry'+id+(category == 'comment' ? 'Comment' : 'Trackback'));
	if(target == null)
		return false;
	request.onSuccess = function() {
		target.innerHTML = this.getText("/response/result");
		target.style.display = 'block';
		highlight();
		category == 'comment' ? loadedComments[id] = true : loadedTrackbacks[id] = true;
		if(categoryId > -1)
			location = location.toString();
		if(category == 'trackback') {
			var holder = document.getElementById('TrackbackCopyHolder' + id);
			if(holder) {
				holder.innerHTML = AC_FL_RunContentNotWriteGetString(
					'src','http://s1.daumcdn.net/cfs.tistory/v/0/blog/script/copyTrackback',
					'Flashvars','url=http://kipid.tistory.com/trackback/' + id + '&mode=blackButton',
					'width','29',
					'height','18',
					'id', 'TrackbackCopyButton' + id,
					'wmode','transparent',
					'allowScriptAccess','always',
					'type','application/x-shockwave-flash',
					'pluginspage','http://www.macromedia.com/go/getflashplayer'
				);
			}
		}
		if(typeof window.needCommentCaptcha !== "undefined"){
			captchaPlugin.init();
		}
	}
	request.onError = function() {
		alert('실패 했습니다');
	}
	request.send();
}
function highlight() {
	var hash = new RegExp("^#(comment\\d+)").exec(window.location.hash);
	if(hash && (el = document.getElementById(hash[1])))
		highlightElement(hash[1], 0, el.style.backgroundColor);
}
function highlightElement(id, amount, origColor) {
	var el = document.getElementById(id);
	if (!el) {
		return;
	}
	el.style.backgroundColor = amount % 2 ? "#FFFF44" : origColor;
	if (++amount < 7) {
		setTimeout("highlightElement('" + id + "', " + amount + ", '" + origColor + "')", 200);
	}
}
function toggleLayerForEntry(id, category, categoryId, mode) {
	if((category == 'comment' ? loadedComments[id] : loadedTrackbacks[id])) {
		try {
			var obj = document.getElementById('entry'+id+(category == 'comment' ? 'Comment' : 'Trackback'));
			if(mode == undefined)
				obj.style.display = (obj.style.display == "none") ? "block" : "none";
			else
				obj.style.display = (mode == 'show') ? "block" : "none";
		} catch (e) {

		}
		return true;
	} else {
		if(categoryId) {
			viewTrigger(id,category, categoryId);
		} else {
			viewTrigger(id,category, -1);
		}
	}
}
function ObserverForAnchor(evetObj) {
	var lo = location.toString();
	var queryString = lo.substr(lo.lastIndexOf('/')+1);
	if(queryString.indexOf('#')>-1) {
		var qsElements = queryString.split('#');
		if(qsElements[1].indexOf('comment')>-1) {
			var category = 'comment';
		} else if(qsElements[1].indexOf('trackback')>-1) {
			var category = 'trackback';
		}
		if(category) {
			entryid = qsElements[0];
			categoryId = qsElements[1].substr(category.length);
			toggleLayerForEntry(entryid,category,categoryId, 'show');
		}
	}
}

STD.addEventListener(window);
window.addEventListener("load", ObserverForAnchor, false);