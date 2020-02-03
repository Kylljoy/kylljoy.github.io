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
var cls_tg="";
var tg_other=[];


var sks_map={"med":"Medicine","sur":"Survival","inv":"Invesitgate","rep":"Repair","for":"Fortitude","str":"Struggle",
"sle":"Sleight","hid":"Hide","spe":"Spellcraft","spc":"Speech",
"int":"Intimidate","loc":"Lockpick","pic":"Pickpocket","spe1":"Speak First Language","spe2":"Speak Second Language",
"spe3":"Speak Third Language","lk":"Local Knowledge","ak":"Arcane Knowledge","stl":"Stealth","sea":"Search",
"sca":"Scavenge","rig":"Rig","cra":"Crafting","alc":"Alchemy"
};

var cls_sks=["int","loc","pic","spe1","spe2","spe3","lk","ak","hid","sea","sca","rig","cra","alc"];
var cls_inv={};
var cls_act=[];
var sk_act=[];

for(i=0;i<cls_sks.length;i++){
		cls_inv[cls_sks[i]]=0;
}



var gen_sks=["med","sur","inv","rep","for","str","sle","stl","spe","spc"];
var init_sks={};

for(i=0;i<gen_sks.length;i++){
		init_sks[gen_sks[i]]=0;
}

var rc_sks={};
for(i=0;i<cls_sks.length;i++){
		rc_sks[cls_sks[i]]=0;
}
for(i=0;i<gen_sks.length;i++){
		rc_sks[gen_sks[i]]=0;
}

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
			case "stl":
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
			case "stl":
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
			case "stl":
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
	cls_act=[];
	switch(document.getElementById("class").value){
		case "paladin":
			class_phs=4;
			class_cog=3;
			class_cor=2;
			class_chr=2;
			class_health=12;
			cls_tg="for";
			cls_act=[];
			break;
		case "mercenary":
			class_phs=5;
			class_cog=3;
			class_cor=2;
			class_chr=1;
			class_health=10;
			cls_tg="str";
			break;
		case "marksman":
			class_phs=2;
			class_cog=5;
			class_cor=3;
			class_chr=1;
			class_health=6;
			cls_tg="inv";
			break;
		case "assassin":
			class_phs=3;
			class_cog=2;
			class_cor=5;
			class_chr=1;
			class_health=6;
			cls_tg="stl";
			break;
		case "diplomat":
			class_phs=1;
			class_cog=3;
			class_cor=2;
			class_chr=5;
			class_health=4;
			cls_tg="spc";
			break;
		case "thief":
			class_phs=2;
			class_cog=3;
			class_cor=3;
			class_chr=3;
			class_health=6;
			cls_tg="sle";
			break;
		case "smith":
			class_phs=3;
			class_cog=4;
			class_cor=3;
			class_chr=1;
			class_health=6;
			cls_tg="rep";
			break;
		case "mage":
			class_phs=1;
			class_cog=4;
			class_cor=2;
			class_chr=4;
			class_health=4;
			cls_tg="spe";
			break;
		default:
			class_phs=0;
			class_cog=0;
			class_cor=0;
			class_chr=0;
			class_health=6;
			cls_tg="";
	}
		updatenatskills();
		updatetags();
	}


function updaterace(){
	for(i=0;i<cls_sks.length;i++){
		rc_sks[cls_sks[i]]=0;
	}
	for(i=0;i<gen_sks.length;i++){
		rc_sks[gen_sks[i]]=0;
	}

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
			rc_sks["spe1"]+=3;
			rc_sks["ak"]+=2;
		break;
		case "welf":
			race_phs=-1;
			race_cor=1;
			rc_sks["spe1"]+=3;
			rc_sks["sur"]+=2;
		break;
		case "delf":
			race_phs-1;
			rc_sks["spe1"]+=3;
			rc_sks["stl"]+=5;
		break;
		case "alf":
			rc_sks["spe1"]+=3;
			rc_sks["spe2"]+=2;
			break;
		case "hord":
			race_phs=2;
			rc_sks["spe1"]+=3;
			rc_sks["spe2"]+=1;
			rc_sks["sur"]+=2;
			race_cog=-1;
		break;
		case "hodk":
			race_phs=2;
			rc_sks["stl"]+=2;
			rc_sks["spe1"]+=3;
			rc_sks["spe2"]+=1;
			race_cog=-1;
		break;
		case "horm":
			race_phs=2;
			rc_sks["hid"]+=2;
			rc_sks["spe1"]+=3;
			rc_sks["spe2"]+=1;
			race_cog=-1;
		break;
		case "durf":
			race_health=2;
			rc_sks["cra"]+=3;
			rc_sks["rep"]+=2;
			rc_sks["rig"]+=1;
			race_cog=1;
			race_phs=1;
			race_cor=-2;
		break;
		case "gnom":
			race_phs=-3;
			rc_sks["spe1"]+=3;
			rc_sks["spe2"]+=2;
			race_health=-2;
			race_cor=1;
			race_cog=1;
			race_chr=2;
		break;
		
	}
		updatenatskills();
		updatetags();
}

function updatenatskills(){
	sk_phs=Math.max(class_phs+race_phs,0);
	sk_cog=Math.max(class_cog+race_cog,0);
	sk_cor=Math.max(class_cor+race_cor,0);
	sk_chr=Math.max(class_chr+race_chr,0);
	for(i=0;i<gen_sks.length;i++){
		init_sks[gen_sks[i]]=0;
	}
	
}

function updatetags(){
	
	tg_sks=tg_other.slice();
	tg_sks.push(cls_tg);
	rc_values=[];
	for(i=0;i<gen_sks.length;i++){
		if(rc_sks[gen_sks[i]]>0){
		rc_values.push(sks_map[gen_sks[i]]+" : "+rc_sks[gen_sks[i]]);
		}
	}
	for(i=0;i<cls_sks.length;i++){
		if(rc_sks[cls_sks[i]]>0){
		rc_values.push(sks_map[cls_sks[i]]+" : "+rc_sks[cls_sks[i]]);
		}
	}
	
	document.getElementById("rc_sks").innerHTML="";
	if(rc_values.length==0){
		document.getElementById("rc_sks").innerHTML="<tr><td colspan='3'>( No Racial Skills )</td></tr>";
	}
	else{
	for(i=0;i<rc_values.length;i+=3){
		document.getElementById("rc_sks").innerHTML+="<tr><td>"+rc_values[i]+"</td><td>"+(rc_values[i+1]==undefined?"":rc_values[i+1])+"</td><td>"+(rc_values[i+2]==undefined?"":rc_values[i+2])+"</td></tr>";
	}
	}
	
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
		document.getElementById("nat"+gen_sks[i]).innerHTML=init_sks[gen_sks[i]]*(1+tg_sks.count(gen_sks[i]));
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
	updatenatskills();
}