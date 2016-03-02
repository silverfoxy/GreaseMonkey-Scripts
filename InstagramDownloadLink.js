	// ==UserScript==
	// @name        Instagram Video Downloader
	// @namespace   Instagram
	// @description Adds a download link to video downloads
	// @include     *instagram.com/*
	// @version     1
	// @grant       none
	// ==/UserScript==
	// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js

	function AddDownloadLink(element) {
		/*if (selector === null) {
			console.log("[-] selector was null.");
			var selector = '#react-root > section:first-of-type > main:first-of-type > div:first-of-type > div:first-of-type > article:first-of-type > div:nth-of-type(2) > section > div:first-of-type';
		}
		else {
			console.log("[+] select was passed: " + selector);
			console.log($(selector));
		}*/
		var Link = FindVideoURL(element);// $(selector('video').attr('src').delay(1000);
		console.log("[+] Download Link Fetched: " + Link);
		if($('#greasemonkey-custom-download-button').length == 0) {
			var DownloadButton = '<a id="greasemonkey-custom-download-button" style="margin-left: 15px" href="' + Link + '" target="_blank" class="button-green"> Download Video </a>';
			var DownloadButtonParent = FindDownloadButtonParent(element);
			$(DownloadButtonParent).append(DownloadButton);
		}
		else {
			$('#greasemonkey-custom-download-button').attr('href', Link);
			console.log('[+] Link Exists, URL Updated');	
		}
	}

	function FindVideoURL(element) {
		console.log('[+] Method Call : FindVideoURL');
		console.log('[+] Variable Passed : element');
		console.log(element);
		var link = $(element).find('video').attr('src');
		console.log('[+] Video Link Derived : ' + link);
		return link;
	}

	function FindDownloadButtonParent(element) {
		console.log('[+] Method Call : FindDownloadButtonParent');
		var downloadSpan = $(element).children().eq(2).children().eq(0).children().eq(0);
		console.log('[+] Download Button Placement Derived : ');
	  console.log(downloadSpan);
		return downloadSpan;
	}

	$(document).click(function() {
	  //Find the download link and overlay div
	  console.log('clicked');
	  window.setInterval(function(){
  		AddDownloadLink($('article')[1]);
	  }, 1000);
	  /*$('article').each(function(index, element){
	  	if($(element).find('noscript').size() == 0) {
	  		AddDownloadLink($(element));
	  	}
	  });*/
	  //var selector = "#fb-root + div > div:first-of-type > div:nth-of-type(1) > div:first-of-type > article:first-of-type > div:nth-of-type(1) > section:first-of-type > div:first-of-type > span:first-of-type"
	  //Pass the div to AddDownloadLink method
	  //AddDownloadLink(selector);
	});