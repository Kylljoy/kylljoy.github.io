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
var statpoints=0;
var phspoints=0;
var cogpoints=0;
var corpoints=0;
var chrpoints=0;
var sk_phs=0;
var sk_cog=0;
var sk_cor=0;
var sk_chr=0;
var med_init=0;
var sur_init=0;
var rep_init=0;
var inv_init=0;
var for_init=0;
var str_init=0;
var sle_init=0;
var hid_init=0;
var spe_init=0;
var spc_init=0;


var init_sks={"med":0,"sur":0,"inv":0,"rep":0,"for":0,"str":0,"hid":0,"sle":0,"hid":0,"spe":0,"spc":0};
var gen_sks=["med","sur","inv","rep","for","str","sle","hid","spe","spc"];

var tg_sks=[];

function inskup(skillname){
	var skillval = 0;
	switch(skillname){
			case "med":
			case "sur":
			case "inv":
			case "rep":
			skillval=sk_cog;
			break;
			case "for":
			case "str":
			skillval=sk_phs;
			break;
			case "sle":
			case "hid":
			skillval=sk_cor;
			break;
			case "spc":
			case "spe":
			skillval=sk_chr;
			break;
	}
	if(skillval>0){
		switch(skillname){
			case "med":
			case "sur":
			case "inv":
			case "rep":
			sk_cog--;
			break;
			case "for":
			case "str":
			sk_phs--;
			break;
			case "sle":
			case "hid":
			sk_cor--;
			break;
			case "spc":
			case "spe":
			sk_chr--;
			break;
	}
	init_sks[skillname]++;
	}
	updatetags();
}

function inskdo(skillname){
	if(init_sks[skillname]>0){
		switch(skillname){
			case "med":
			case "sur":
			case "inv":
			case "rep":
			sk_cog++;
			break;
			case "for":
			case "str":
			sk_phs++;
			break;
			case "sle":
			case "hid":
			sk_cor++;
			break;
			case "spc":
			case "spe":
			sk_chr++;
			break;
	}
	init_sks[skillname]--;
	}
	updatetags();
}

function updatename(){
		if(document.getElementById("name").value=="God"){
				race_phs=99;
				race_chr=99;
				race_cog=99;
				race_cor=99;
				race_health=99;
		}else{
				updaterace();
		}
		updatetags();
}

function updatelevel(){
		phspoints=0;
		cogpoints=0;
		corpoints=0;
		chrpoinst=0;
		statpoints=1*document.getElementById("level").value;
		updatetags();
		
	
}
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
		default:
			class_phs=0;
			class_cog=0;
			class_cor=0;
			class_chr=0;
			class_health=6;
	}
		updatetags();
		updatenatskills();
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
		updatenatskills();
}

function updatenatskills(){
	sk_phs=document.getElementById("phs").innerHTML;
	sk_cog=document.getElementById("cog").innerHTML;
	sk_cor=document.getElementById("cor").innerHTML;
	sk_chr=document.getElementById("chr").innerHTML;
	med_init=0;
	sur_init=0;
	rep_init=0;
	inv_init=0;
	for_init=0;
	str_init=0;
	sle_init=0;
	hid_init=0;
	spe_init=0;
	spc_init=0;
	
}

function updatetags(){
	document.getElementById("phs").innerHTML=Math.max(class_phs+race_phs,0);
	document.getElementById("cog").innerHTML=Math.max(class_cog+race_cog,0);
	document.getElementById("cor").innerHTML=Math.max(class_cor+race_cor,0);
	document.getElementById("chr").innerHTML=Math.max(class_chr+race_chr,0);
	document.getElementById("health").innerHTML=Math.max(class_health+race_health,0)+(2*(document.getElementById("level").value-1));
	document.getElementById("statpoints").innerHTML=statpoints;
	document.getElementById("phspoints").innerHTML=phspoints;
	document.getElementById("cogpoints").innerHTML=cogpoints;
	document.getElementById("corpoints").innerHTML=corpoints;
	document.getElementById("chrpoints").innerHTML=chrpoints;
	document.getElementById("phsf").value=Math.max(class_phs+race_phs,0)+phspoints;
	document.getElementById("cogf").value=Math.max(class_cog+race_cog,0)+cogpoints;
	document.getElementById("corf").value=Math.max(class_cor+race_cor,0)+corpoints;
	document.getElementById("chrf").value=Math.max(class_chr+race_chr,0)+chrpoints;
	document.getElementById("healf").value=Math.max(class_health+race_health,0)+(2*(document.getElementById("level").value-1));
	for(i=0;i<gen_sks.length;i++){
		document.getElementById("nat"+gen_sks[i]).innerHTML=init_sks[gen_sks[i]]*(1+tg_sks.count("med"));
	}

	document.getElementById("sk_phs").innerHTML=sk_phs;
	document.getElementById("sk_cor").innerHTML=sk_cor;
	document.getElementById("sk_chr").innerHTML=sk_chr;
	document.getElementById("sk_cog").innerHTML=sk_cog;




}

Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});

function allofthem(){
	updatelevel();
	updateclass();
	updaterace();
	updatetags();
	
}