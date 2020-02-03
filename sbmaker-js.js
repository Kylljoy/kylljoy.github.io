var class_phs=0;
var class_cog=0;
var class_chr=0;
var class_cor=0;
var race_phs=0;
var race_cog=0;
var race_chr=0;
var race_cor=0;
var class_health=0;
var race_health=0;

function updateclass(){
	switch(document.getElementById("class").value){
		case "paladin":
			class_phs=4;
			class_cog=3;
			class_cor=2;
			class_chr=2;
			class_health=12;
			break;
		case "mercenary":
			class_phs=5;
			class_cog=3;
			class_cor=2;
			class_chr=1;
			class_health=10;
			break;
		case "marksman":
			class_phs=2;
			class_cog=5;
			class_cor=3;
			class_chr=1;
			class_health=6;
			break;
		case "assassin":
			class_phs=3;
			class_cog=2;
			class_cor=5;
			class_chr=1;
			class_health=6;
			break;
		case "diplomat":
			class_phs=1;
			class_cog=3;
			class_cor=2;
			class_chr=5;
			class_health=4;
			break;
		case "thief":
			class_phs=2;
			class_cog=3;
			class_cor=3;
			class_chr=3;
			class_health=6;
			break;
		case "smith":
			class_phs=3;
			class_cog=4;
			class_cor=3;
			class_chr=1;
			class_health=6;
			break;
		case "mage":
			class_phs=1;
			class_cog=4;
			class_cor=2;
			class_chr=4;
			class_health=4;
			break;
	}
		updatetags();
	}


function updaterace(){
	race_chr=0;
	race_cog=0;
	race_health=0;
	race_cor=0;
	race_phs=0;
	switch(document.getElementById("race").value){
		case "man":
			race_chr=1;
			race_health=1;
		break;
		case "helf":
			race_phs=-1;
			race_cog=1;
		break;
		case "welf":
			race_phs=-1;
			race_cor=1;
		break;
		case "delf":
			race_phs-1;
		break;
		case "hord":
		case "hodk":
		case "horm":
			race_phs=2;
			race_cog=-1;
		break;
		case "durf":
			race_health=2;
			race_cog=1;
			race_phs=1;
			race_cor=-2;
		break;
		case "gnom":
			race_phs=-3;
			race_health=-2;
			race_cor=1;
			race_cog=1;
			race_chr=2;
		break;
		
	}
	
		updatetags();
}

function updatetags(){
	document.getElementById("phs").innerHTML=class_phs+race_phs;
	document.getElementById("cog").innerHTML=class_cog+race_cog;
	document.getElementById("cor").innerHTML=class_cor+race_cor;
	document.getElementById("chr").innerHTML=class_chr+race_chr;
	document.getElementById("health").innerHTML=class_health+race_health;

}
