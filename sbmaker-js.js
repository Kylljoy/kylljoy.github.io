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
var phspoints=0;
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
var cls_act=[];
var other_act=[];
var rce_act=[];
var sk_act=[];


var inv_sks=0;




var gen_sks=["med","sur","inv","rep","for","str","sle","stl","spe","spc"];
var init_sks={};
var gen_inv={};

for(i=0;i<gen_sks.length;i++){
		gen_inv[gen_sks[i]]=0;
}

for(i=0;i<cls_sks.length;i++){
		gen_inv[cls_sks[i]]=0;
}

for(i=0;i<gen_sks.length;i++){
		init_sks[gen_sks[i]]=0;
}

var rc_sks={};
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

function ivskup(skillname){
		if(inv_sks>0){
			inv_sks--;
			gen_inv[skillname]++;
		}
		updatetags();
}

function ivskdo(skillname){
		if(gen_inv[skillname]>0){
			inv_sks++;
			gen_inv[skillname]--;
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
		updatenatskills();
		updatetags();
		
	
}

function updateclass(){
	cls_act=[];
	clearlangs();
	racelang();
	switch(document.getElementById("class").value){
		case "paladin":
			alllang();
			class_phs=4;
			class_cog=3;
			class_cor=2;
			class_chr=2;
			class_health=12;
			cls_tg="for";
			cls_act=["int","spe1","spe2","spe3","ak"];
			break;
		case "mercenary":
			class_phs=5;
			class_cog=3;
			class_cor=2;
			class_chr=1;
			class_health=10;
			cls_tg="str";
			cls_act=["int","lk","sca"];
			break;
		case "marksman":
			class_phs=2;
			class_cog=5;
			class_cor=3;
			class_chr=1;
			class_health=6;
			cls_tg="inv";
			cls_act=["sea","lk","sca"];
			break;
		case "assassin":
			class_phs=3;
			class_cog=2;
			class_cor=5;
			class_chr=1;
			class_health=6;
			cls_tg="stl";
			cls_act=["hid","loc","rig"];
			break;
		case "diplomat":
			alllang();
			class_phs=1;
			class_cog=3;
			class_cor=2;
			class_chr=5;
			class_health=4;
			cls_tg="spc";
			cls_act=["lk","spe1","spe2","spe3","ak"];
			break;
		case "thief":
			class_phs=2;
			class_cog=3;
			class_cor=3;
			class_chr=3;
			class_health=6;
			cls_tg="sle";
			cls_act=["pic","loc","hid"];
			break;
		case "smith":
			class_phs=3;
			class_cog=4;
			class_cor=3;
			class_chr=1;
			class_health=6;
			cls_tg="rep";
			cls_act=["cra","rig","sca"];
			break;
		case "mage":
			alllang();
			class_phs=1;
			class_cog=4;
			class_cor=2;
			class_chr=4;
			class_health=4;
			cls_tg="spe";
			cls_act=["alc","spe1","spe2","spe3","ak"];
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

function skadd(val){
		if(val<1){
				return -2;
		}
		if(val==1){
				return -1;
		}
		if(val==2){
				return 0;
		}
		
		if(val==3){
				return 1;
		}
		if(val==4){
				return 2;
		}
		if(val==5||val==6){
			return 3;
		}
		if(val==7||val==8){
				return 4;
		}
		if(val>8 && val<12){
				return 5;
		}
		if(val>11 && val<15){
				return 6;
		}
		if(val>14 && val<19){
				return 7;
		}
		if(val>18 && val <24){
				return 8;
		}
		if(val>23 && val<30){
				return 9;
		}if(val>29){
			return 10;
		}	
	
}

function getskp(){
	var multiplier;
	switch(document.getElementById("class").value){
			case "paladin":
			case "mercenary":
			case "marksman":
			case "assassin":
				multiplier=2;
			break;
			case "diplomat":
			case "thief":
			case "smith":
			case "mage":
				multiplier=4;
	}
	var high_stat=Math.max(class_cog+race_cog,0)+cogpoints;
	var low_stat=Math.max(class_cog+race_cog,0);
	var total=0;
	var current_stat=Math.max(class_cog+race_cog,0);
	for(i=0;i<document.getElementById("level").value;i++){
		total+=Math.max(skadd(current_stat),0)+1;
		if(current_stat!==high_stat){
				current_stat++;
		}
	}
	
	return multiplier*total;
	
}
function alllang(){
		addlang("eng","Anglish");
		addlang("elf","Elven");
		addlang("orc","Okran");
		addlang("durf","Dwarf-Tongue");
		addlang("nom","Nom");
		addlang("run","Runic");
}

function allspoken(){
		addlang("eng","Anglish");
		addlang("elf","Elven");
		addlang("orc","Okran");
		addlang("durf","Dwarf-Tongue");
		addlang("nom","Nom");
}
function addlang(langname,visual){
		for(i=0;i<document.getElementById("lang1").length;i++){
				if(document.getElementById("lang1")[i].value==langname){
						return;
				}
		}
		document.getElementById("lang1").add(new Option(visual,langname));
		document.getElementById("lang2").add(new Option(visual, langname));
		document.getElementById("lang3").add(new Option(visual, langname));
}

function clearlangs(){
		lang1=document.getElementById("lang1");
		lang1.innerHTML="";
		lang2=document.getElementById("lang2");
		lang2.innerHTML="";
		lang3=document.getElementById("lang3");
		lang3.innerHTML="";
}

function racelang(){
	switch(document.getElementById("race").value){
		case "man":
			addlang("eng","Anglish");
		break;
		case "helf":
		case "welf":
		case "delf":
			addlang("elf","Elvish");
		break;
		case "alf":
			addlang("elf","Elvish");
			addlang("eng","Anglish");
			break;
		case "hord":
		case "hodk":
		case "horm":
			addlang("orc","Okran");
			addlang("eng","Anglish");
		break;
		case "durf":
			addlang("eng","Anglish");
		break;
		case "gnom":
			allspoken();
		break;
	}
}


function updaterace(){
	for(i=0;i<cls_sks.length;i++){
		rc_sks[cls_sks[i]]=0;
	}
	for(i=0;i<gen_sks.length;i++){
		rc_sks[gen_sks[i]]=0;
	}
	updateclass();
	

	race_chr=0;
	race_cog=0;
	race_health=0;
	race_cor=0;
	race_phs=0;
	rce_act=[];
	rce_act.push("spe1");
	racelang();
	
	switch(document.getElementById("race").value){
		case "man":
			race_chr=1;
			race_health=1;
		break;
		case "helf":
			race_phs=-1;
			race_cog=1;
			rc_sks["ak"]+=2;
		break;
		case "welf":
			race_phs=-1;
			race_cor=1;
			rc_sks["sur"]+=2;
		break;
		case "delf":
			race_phs-=1;
			rc_sks["stl"]+=5;
		break;
		case "alf":
			rce_act.push("spe2");
			break;
		case "hord":
			rce_act.push("spe2");
			race_phs=2;
			rc_sks["sur"]+=2;
			race_cog=-1;
		break;
		case "hodk":
			rce_act.push("spe2");
			race_phs=2;
			rc_sks["stl"]+=2;
			race_cog=-1;
		break;
		case "horm":
			rce_act.push("spe2");
			race_phs=2;
			rc_sks["hid"]+=2;
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
			rce_act.push("spe2");
			race_phs=-3;
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
	inv_sks=getskp();
	sk_phs=Math.max(class_phs+race_phs,0);
	sk_cog=Math.max(class_cog+race_cog,0);
	sk_cor=Math.max(class_cor+race_cor,0);
	sk_chr=Math.max(class_chr+race_chr,0);
	for(i=0;i<gen_sks.length;i++){
		init_sks[gen_sks[i]]=0;
	}
	for(i=0;i<gen_sks.length;i++){
		gen_inv[gen_sks[i]]=0;
}

	for(i=0;i<cls_sks.length;i++){
		gen_inv[cls_sks[i]]=0;
}
	
}

function updatetags(){
	sk_act=cls_act.concat(other_act.concat(rce_act));
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
	document.getElementById("invest_points").innerHTML=inv_sks;
	
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
	
	document.getElementById("availableskills").innerHTML="";
	var items =[];
	for(i=0;i<Object.keys(gen_inv).length;i++){
		var key = Object.keys(gen_inv)[i];
		if(sk_act.count(key)>0 || gen_sks.count(key)>0){
			items.push(sks_map[key]+" : <br>"+
			"<button type='button' onclick='ivskdo(\""+key+"\")'>&larr;</button>   <p style='display:inline-block' id='inv_"+key+"'>"+gen_inv[key]*(1+tg_sks.count(gen_sks[i]))+"</p>    <button type='button' onclick='ivskup(\""+key+"\")'>&rarr;</button>"
			);
		}
	}
	for(i=0;i<items.length;i+=3){
		document.getElementById("availableskills").innerHTML+="<tr><td>"+items[i]+"</td><td>"+(items[i+1]==undefined?"":items[i+1])+"</td><td>"+(items[i+2]==undefined?"":items[i+2])+"</td></tr>";
	}
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
	updaterace();
	updateclass();
	updatetags();
	updatenatskills();
}