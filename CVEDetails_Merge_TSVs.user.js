// ==UserScript==
// @name        CVEDetails Merge TSVs
// @namespace   http://www.cvedetails.com/
// @description Merges all TSVs and downloads them as a single file (Using Download Results)
// @include     *://www.cvedetails.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function MergePages(element) {
	var links = FindPageLinks(element);
	console.log('[+] Links Fetched');
	console.log(links);

	for (var i = 1; i <= links.length - 1; i++) {
		console.log('[+] Sending XHR for page ' + (i + 1));
		SendXHR(links[i].href);
	}
}

function FindPageLinks(element) {
	console.log('[+] Method Call : FindPageLinks');
	console.log('[+] Variable Passed :');
	console.log(element);
	var links = $(element).find('a[title*=\'Go to page\']');
	console.log('[+] Page Links Derived');
	return links;
}

function GetTable(element) {
	table = $(element).find('#vulnslisttable > tbody > tr').not(':first');
	console.log('[+] Retrieved Table');
	return table;
}

function UpdatePage(table_rows) {
	console.log('[+] Adding rows to current page');
	$('#vulnslisttable tbody').append(table_rows);
}

function SendXHR(url) {
	$.get(url, function(data) {
  		var oPage = data,   // page contents
        table_rows = GetTable(oPage); // analyse the contents
        UpdatePage(table_rows); // do current page modifications
	});
}

MergePages($('#pagingt'));
