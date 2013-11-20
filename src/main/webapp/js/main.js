function palindrom(word){
	var palindrom = "";
	var streight = "";
	for(var i = 0; i < word.length; i++){
		var c = word[i];
        var e = word[word.length - i];

		if(c !=="," && c !==" "){
			streight = streight + c.toLowerCase();
			palindrom = e.toLowerCase() + palindrom;
			if(streight !== palindrom) {console.log("stopped on"+c+"; "+palindrom+"-"+streight);return false;}
		}
	}

	return true;
}



