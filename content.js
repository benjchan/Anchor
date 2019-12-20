var depthBottomMeters = 10; //Depth in meters
var depthBottomPixel;
var depthStart;

var init = function(){

	depthBottomPixel = meterToPixel(depthBottomMeters);
	depthStart = depthBottomPixel - meterToPixel(depthBottomMeters * 0.4);

	// Create elements
	$("body").append('<div class="anchor"></div>');
	$(".anchor").append('<div class="creatures"></div>');
	$(".anchor").append('<div class="sea"></div>');
	$(".anchor").append('<div class="depth"><div class="depth--line"></div><div class="depth--line"></div><div class="depth--line"></div><div class="depth--line"></div><div class="depth--line"></div></div>');
	$(".anchor").append('<div class="depth--marker"><div class="marker"><span>0m</span></div></div>');

	loadCreatures();

	$(window).scroll(function(e){

		var s = $("body, html").scrollTop();
		var docHeight = document.body.scrollHeight;

		if($(".anchor").outerHeight() != docHeight){
			$(".anchor").css({"height": docHeight + "px"});
		}
		var progress = (s - depthStart) / (depthBottomPixel - depthStart);
		if(progress <= 0){
			$(".sea").css({"opacity": 0});
		} else if(progress <= 1) {
			// set sea opacity
			$(".sea").css({"opacity": progress});
		} else {
			// Prevent further scrolling
			e.preventDefault();
			$("body, html").scrollTop(depthBottomPixel);
			$(".sea").css({"opacity": 1});
		}


		// set marker position
		var markerProgress = (s / depthBottomPixel);
		if(markerProgress < 0){
			markerProgress = 0;
		}
		if(markerProgress > 0.9 && $(".rock").length == 0){
			$(".anchor").append('<svg class="rock" width="1333px" height="291px" viewBox="0 0 1333 291" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop-HD" transform="translate(-34.000000, -705.000000)" fill="#D8D8D8"><path d="M34,937.037871 L102.36719,782.763552 L195.974042,782.763552 L262.011649,859.900712 L396.492082,907.191989 L396.492082,949.404322 L262.011649,995.171538 L34,982.517914 L34,937.037871 Z M1216.41445,817.476134 L1136.52101,875.733964 L1089.01915,848.308754 L1078.10749,789.816737 L1023.71941,726.417772 L1036.0869,704.996645 L1117.73953,721.172024 L1229.73933,794.396771 L1216.41445,817.476134 Z M837.058065,952.238533 L982.51325,858.382082 L1132.35531,905.310308 L1132.35531,983.688137 L837.058065,952.238533 Z M549,861.613678 L698.562209,810 L782.472553,862.707043 L782.472553,981.125972 L634.21128,995.171538 L549,940.751588 L549,861.613678 Z M834.207142,798.121399 L915.213072,719.153854 L972.273831,758.637627 L972.273831,830.188964 L875.829517,858.382082 L817,830.188964 L834.207142,798.121399 Z M434.090409,903.686877 L387.590849,800.557712 L444.209388,760.442383 L511.445651,784.914382 L504.952619,885.185007 L458.338873,930.824055 L434.090409,903.686877 Z M1276.35036,837.894431 L1367.0178,905.549797 L1336.94641,968.084667 L1266.27598,979.277762 L1223.34276,888.431213 L1241.98581,825.91561 L1276.35036,837.894431 Z" id="Combined-Shape"></path></g></g></svg>');
			$(".rock").css({"top": (depthBottomPixel + window.innerHeight) + "px"});
		}
		if(markerProgress > 1){
			markerProgress = 1;
		}
		var pos = markerProgress * (window.innerHeight - 60);
		$(".marker").css({"transform": "translate(0, " + pos + "px)"});

		
		// Using 96DPI
		var m = Math.round((s / 96) * 2.54) / 100;
		$(".marker span").text(m + 'm');
	});

};

function meterToPixel(m){
	// Using 96DPI
	var p = ((m * 100) / 2.54) * 96;
	return p;
}

function loadCreatures(){

	// Paste sea creatures

	var fishCount = 30;

	for(var i = 1; i <= fishCount; i++){
		var pos = depthStart + (window.innerHeight * 0.7) + ((1 - Math.pow(i / fishCount, 2)) * (depthBottomPixel - depthStart));
		var jellyLeft = (Math.random() * 100);
		var delay = Math.random() * 6;
		var fish1 = '<div class="creature--wrapper" style="transform: translate(0, ' + pos + 'px)"><svg class="fish creature" style="animation-delay: ' + delay + 's;" width="101px" height="44px" viewBox="0 0 101 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop-HD" transform="translate(-101.000000, -173.000000)" fill="#FFD400"><path d="M145.355311,217 L101.355311,217 L145.355311,173 L189.355311,173 L189.355311,217 L145.355311,217 Z M201.623182,207.354662 L189.355311,195.086792 L201.623182,182.818921 L201.623182,207.354662 Z" id="Combined-Shape"></path></g></g></svg></div>';
		var fish2 = '<div class="creature--wrapper" style="transform: translate(0, ' + pos + 'px)"><svg class="fish2 creature" style="animation-delay: ' + delay + 's;" width="101px" height="44px" viewBox="0 0 101 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop-HD" transform="translate(-101.000000, -173.000000)" fill="#FF8D00"><path d="M145.355311,217 L101.355311,217 L145.355311,173 L189.355311,173 L189.355311,217 L145.355311,217 Z M201.623182,207.354662 L189.355311,195.086792 L201.623182,182.818921 L201.623182,207.354662 Z" id="Combined-Shape"></path></g></g></svg></div>';
		var jelly = '<div class="creature--wrapper jelly--wrapper" style="transform: translate(' + jellyLeft + 'vw, ' + pos + 'px)"><svg class="jelly creature" style="animation-delay: ' + delay + 's;" width="32px" height="38px" viewBox="0 0 32 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-2" transform="translate(0.460966, 0.482941)"><g id="Group" fill="#FFD1D1"><path d="M0,15.5390344 C0,6.95706267 6.95706267,0 15.5390344,0 C24.1210061,0 31.0780688,6.95706267 31.0780688,15.5390344 L0,15.5390344 Z" id="Combined-Shape"></path><rect id="Rectangle" x="0" y="15.5170591" width="31.0780688" height="4"></rect></g><path d="M15.5390344,13.7855223 L15.5390344,35.31971" id="Line" stroke="#FFD1D1" stroke-width="4" stroke-linecap="square"></path><path d="M25.5548655,10 L25.5548655,31.5341877" id="Line-Copy" stroke="#FFD1D1" stroke-width="4" stroke-linecap="square"></path><path d="M5.52320328,10 L5.52320328,31.5341877" id="Line-Copy-2" stroke="#FFD1D1" stroke-width="4" stroke-linecap="square"></path></g></g></svg></div>';
		var fishRandom = Math.round(Math.random() * 2);
		if(fishRandom == 0){
			$(".creatures").append(fish1);
		} else if(fishRandom == 1) {
			$(".creatures").append(fish2);
		} else {
			$(".creatures").append(jelly);
		}
		var pos = depthStart + (0.7 * (depthBottomPixel - depthStart));
		var whale = '<div class="creature--wrapper" style="transform: translate(0, ' + pos + 'px)"><svg class="whale creature" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.4 194.84"><defs><style>.cls-1{fill:#dae3ec;}.cls-2{fill:#b5c8d7;}.cls-3{fill:#e6eef2;}</style></defs><title>Whale_1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="285.05 153.09 158.05 194.09 75.05 173.09 16.05 135.09 0 95.62 285.05 153.09"/><polygon class="cls-2" points="392.4 51.97 368.55 59.92 343.17 55.34 285.05 153.09 0 95.62 58.54 53.2 338.66 53.48 337.06 26.9 350.82 0 356.02 39.44 392.4 51.97"/><polygon class="cls-3" points="286.06 153.84 159.06 194.84 76.06 173.84 17.06 135.84 1.01 96.37 286.06 153.84"/></g></g></svg></div>';
		$(".creatures").append(whale);
	}

	
}

chrome.runtime.sendMessage({type: "status"}, function(response) {
    if(response.status == 1) init();
    return;
});


