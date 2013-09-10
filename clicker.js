console.log('Commence the clicking.');

function clickTheCookie(){
	$("#bigCookie").click();
}

function checkGoldenCookie(){
	if($('#goldenCookie').is(':visible')) {
		$('#goldenCookie').click();
	}
}

// Global booleans used to see if we wait for an upgrade 
// or stockpile cookies for a bigger object.
var waitForUpgrade = false;
var stockpile = false;
var stockpileCounter = 0;

function buySomething(){
	if(stockpileCounter === 0){
		stockpile = false; //when counter is down, we no longer stockpile
	}

	if(stockpile){
		stockpileCounter--;
	}
	else{
		//if there are products that can be bought, we're not waiting, and we're not stockpiling
		if($(".product.enabled").length !== 0 && !waitForUpgrade && !stockpile){
			console.log('buying object ' + $(".product.enabled").last().children().find('.title').text() + '.');
			$(".product.enabled").last().click(); //buy most expensive product available

			//see if there are any available upgrades, and randomly decide whether we'll wait
			if($(".crate.upgrade").length !== 0){
				console.log('going to see if we wait for upgrade...');
				var upgrade_rand = 1 + Math.floor(Math.random() * 100);
				if(upgrade_rand >= 90){
					waitForUpgrade = true;
					console.log('Going to wait to buy an upgrade.');
				}
			}

			//Check to see if we stockpile some cookies
			var stockpile_rand = 1 + Math.floor(Math.random() * 100);
			if(stockpile_rand >= 95){
				waitForUpgrade = false;
				stockpile = true;
				stockpileCounter = 240; //120 seconds since interval is 500ms
				console.log('Going to stockpile some cookies for 2 minutes.');
			}
		}
		else{
			//If we were waiting and there is an upgrade, then get it
			if($(".crate.upgrade.enabled").length !== 0 && !stockpile){
				$(".crate.upgrade.enabled").last().click();
				waitForUpgrade = false;
			}
		}
	}
}

setInterval(clickTheCookie, 100); //click every 100ms
setInterval(buySomething, 500); //check to buy something every half a second
setInterval(checkGoldenCookie, 2000); //check for the golden cookie every 2 seconds
