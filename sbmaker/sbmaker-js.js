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
var phsf=0;
var cogf=0;
var corf=0;
var chrf=0;
var healf=0;
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
var phsi=0;
var cogi=0;
var cori=0;
var chri=0;
var heali=0;

var lvltot=0;
var clsname="";
var rcname="";
var allocchange=false;



var cls_tg="";
var tg_other=[];

var traits={};
var ables={};


var sks_map={"med":"Medicine","sur":"Survival","inv":"Invesitgate","rep":"Repair","for":"Fortitude","str":"Struggle",
"sle":"Sleight","hid":"Hide","spe":"Spellcraft","spc":"Speech",
"int":"Intimidate","loc":"Lockpick","pic":"Pickpocket","spe1":"Speak First Language","spe2":"Speak Second Language",
"spe3":"Speak Third Language","lk":"Local Knowledge","ak":"Arcane Knowledge","stl":"Stealth","sea":"Search",
"sca":"Scavenge","rig":"Rig","cra":"Crafting","alc":"Alchemy"
};

var cls_sks=["int","loc","pic","spe1","spe2","spe3","lk","ak","hid","sea","sca","rig","cra","alc"];
var cls_act=[];
var fin_sks={};
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
	update_board();
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
	update_board();
}

function ivskup(skillname){
		if(inv_sks>0){
			inv_sks--;
			gen_inv[skillname]++;
		}
		update_board();
}

function ivskdo(skillname){
		if(gen_inv[skillname]>0){
			inv_sks++;
			gen_inv[skillname]--;
		}
		update_board();
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


function skadd(val){
		if(val==0){
				return -1;
		}
		let levels=[2,5,20,40,70,110,160,230,300];
		for(let i=0;i<levels.length;i++){
				if(val<levels[i]){
						return i+1;
				}
		}
		return 10;
}

function stadd(val){
		let levelsq=[1,2,3,4,5,7,9,12,15,19,24,30];
		for(let i=0;i<levelsq.length;i++){
				if(val<levelsq[i]){
						return i-2;
				}
		}
		return 10;
}

function getskp(){
	var multiplier;
	switch(document.getElementById("class").value){
			case "paladin":
			case "mercenary":
			case "marksman":
			case "assassin":
				multiplier=4;
			break;
			case "diplomat":
			case "thief":
			case "smith":
			case "mage":
				multiplier=6;
	}
	var high_stat=cogf;
	var low_stat=cogi;
	var total=0;
	var current_stat=cogi;
	for(let i=0;i<document.getElementById("level").value;i++){
		total+=Math.max(stadd(current_stat),0)+1;
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

function addOption(value,name,sel){
		sel.add(new Option(name,value));
}

function clearlangs(){
		lang1=document.getElementById("lang1");
		lang1.innerHTML="";
		lang2=document.getElementById("lang2");
		lang2.innerHTML="";
		lang3=document.getElementById("lang3");
		lang3.innerHTML="";
}


function cbox(){
	document.getElementById("grey").style.display="none";
}

function tbox(){
	if(!(document.getElementById("trait").value=="none")){
	document.getElementById("grey").style.display="block";
	document.getElementById("informat").innerHTML="<h3>DESCRIPTION :</h3> <br><i style='margin-top:1em'>"+traits[document.getElementById("trait").value]["desc"]+"</i>"+"<h3 style='margin-top:1em'>EFFECT :</h3> <br><i style='margin-top:1em'>"+traits[document.getElementById("trait").value]["fx"]+"</i>";
	}
	
}

function abox(){
	if(!(document.getElementById("able").value=="none")){
	document.getElementById("grey").style.display="block";
	document.getElementById("informat").innerHTML="<h3>DESCRIPTION :</h3> <br><i style='margin-top:1em'>"+ables[document.getElementById("able").value]["desc"]+"</i>"+"<h3 style='margin-top:1em'>EFFECT :</h3> <br><i style='margin-top:1em'>"+ables[document.getElementById("able").value]["fx"]+"</i>";
	}
	
}






function updatenatskills(){
	inv_sks=getskp();
	sk_phs=phsi;
	sk_cog=cogi;
	sk_cor=cori;
	sk_chr=chri;
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


Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});





function load_ables(){
 ables_name=["Move Fast and Break Things", "Moonshiner", "Dodge", "Rage", "Field Medic", "Quick Hands", "Skill Swap", "Pickup Artist", "Quickcast", "Read Emotions", "Fluent", "Good Listener", "Befuddle", "Credit Karma", "Turret", "Riot Shield", "Rip-off", "Con Man", "Celestial Forgiveness", "Painkiller", "To be Blunt", "Hit and Run", "Read the Manual", "Andrew's Nightmare", "Bluff Buff", "Penny Puncher", "Appraiser", "Nervous Breakdown", "Fighting Spirit"];
 ables_description=["You can pick locks quickly, but your work is sloppy", "You know alcohol like the back of your hand", "You know how to dive when you need it", "You can lose control and become a monster", "You can quickly perform medical operations while on the field. ", "You can swap weapons in battle extremely quicky", "Your knowledge in one skill may be applicable in more than one area", "You have great skills in seduction", "You can let loose a spell before entering battle", "You read people better than you can read books", "You are a master at speaking in tongues", "You may not be able to speak clearly, but you understand flawlessly", "You can confuse and annoy any enemy, like the asshole you are", "Your word is as good as gold", "If you stand your ground, you find you can shoot easier", "You can use your shield as a weapon", "You can swindle people out of their money", "You have a way with words around new faces", "You can slip up and your god will forgive you", "How are you still awake?", "You hit people with heavy things.", "Your horseback license is due to be revoked.", "You obviously don't understand that some weapon's aren't ranged.", "HEALTH AS A RESOURCE", "You won the motivated reasoning olympics", "You throw money around like it's a weapon. Because to you, it is.", "You played The Price is Right and won every game. The audience hated you.", "Fear and Stress seems to have a different effect on you", "Even from beyond the grave, you find a way to help"];
 ables_effect=[ "Take advantage on lockpick checks with the threat of jamming the lock if the check is failed.", "Allows the crafting and distilling of alcohol of any kind, provided that any substance or liquid with sugar or starches is available.", "Allows dodging as a sacrificial preemptive turn, with a relevant coordination check. Negates all damage if successful.", "Allows the character to go into a rage and deal 2x damage and take ½x  damage for 1d6 turns. Usage of rage per day is an equal amount of times as the relevant struggle skill modifier.", "Medical supplies can be taken out, applied, and put away in one turn.", "Allows the sacrificing of movement turns to draw a weapon without sacrificing an action turn.", "Allows certain general skills to be used in place of class skills. Passive boosts are ignored. Stealth in place of Hide. Speech in place of Intimidate. Repair in place of Craft. Spellcraft in place of Alchemy. Investigate in place of Search. Sleight in place of Pickpocket. Double disadvantage.", "Grants double additives on the first seduction check used on a character", "Cast one spell when entering battle, regardless of who goes first", "Examine others for signs of lying or distrust through a relevant investigate check", "Guaranteed success on Speak Language checks for one spoken language possessed either by your race or your class. Reading, Listening, and Speaking checks.", "Pass any Speak Language listening check, regardless of languages known, though no guarantee is provided for speaking and reading checks.", "Pass a Speech check to daze an enemy for 2 turns. Only works once per enemy.", "Allows purchasing of items on credit, with the price being paid at a later time. Only one item may be purchased on credit at a time", "Sacrifice a movement turn to triple your effective range on your action turn.", "Shields can be used offensively, thrown or smacked. Deals 1d6 slammy damage, with relevant additives. 5 foot melee range, 10 foot ranged range.", "Passing a speech check causes selling prices of an item to double. Failing causes them to halve.", "Triple additives on bluff checks when talking to someone new.", "You are allowed to go against your deity's will once per day.", "Rather than going unconscious at 0hp, you stay conscious and can act and move until you die. Including fortitude bonus health.", "All bladed weapons can be used as slammy weapons (using the hilt), dealing the same amount as slashy or stabby damage.", "Hit people with your horse or mount. Deals 10 slammy damage with relevant melee additives. Literally ride it into battle", "Throw any melee weapon to deal half ranged damage. Ranged bonuses apply. Range is double melee range.", "Sacrifice 5 health to cast any spell, regardless of how many daily spells are remaining.", "Pass a relevant buff check and pass any NPC-given skill or statistic check with an excuse or scapegoat", "Gold can be thrown as a ranged weapon, dealing one slammy damage for every 2 pieces thrown. Gold thrown is not recoverable. Maximum of 3 dmg/level. Ranged damage boosts apply", "Instantly know the value or worth of any item, and detect when you are being ripped off. Know the purpose of most items on sight, with no relevant local or arcane knowledge check.", "Take Frenzy status effect rather than the Terror of Fear effects.", "Post death, you can return as a spirit to act as a spy or to give advice. Any spoken checks (Speech, Local Knowledge, Search, etc.) can still be taken" ];
 ables_function=[];
 
 for(let q=0;q<ables_name.length;q++){
	ables[ables_name[q]]={};
	ables[ables_name[q]]["desc"]=ables_description[q];
	ables[ables_name[q]]["fx"]=ables_effect[q];
	addOption(ables_name[q],ables_name[q],document.getElementById("able"));
 }
	
}


function load_traits(){
	traits_name=[ "Outcast", "Outlaw", "Magician", "Warlock", "Medic", "Survivalist", "Trickster", "Lone Wolf", "Bard", "Non-Believer", "Shopaholic", "Pack Mule", "Religious", "Suave Idiot", "Four-Leaf Clover", "Know-It-All", "Cursed", "Chosen One", "Expendable Income", "Fast Learner", "Skilled", "Homicidal", "Hunter", "Slayer", "Know Thine Enemy", "Leader", "Liar, Liar", "Mittens God" ];
	traits_description=[  "Due to past actions or events surrounding you, your kind no longer accepts you as one of their own.", "Due to your history as a criminal, you have been marked as wanted by local governments", "Though you were never formally trained in magic, you find yourself still adept for some forms of magic", "Rather than focus on your potential in a greater school, you honed your ability in the lesser schools", "You have prior training in the medical arts", "You are familiar with the wild", "Your lies have not yet caught up with you", "Unfortunate events in your past have led you to a solitary life", "You have a gift with words or music", "You do not have time to fret around with smoke and mirrors", "You have extensive experience with the art of the deal", "You have experience with lugging things across the country", "You have found your place with a god", "You always manage to bumble your way through things", "You have no skills, all luck.", "You seem to know everything there is to know", "You had an unfortunate run-in with a witch", "You have an unusual dynamic with a god/goddess", "You have more money than you know what to do with", "You find that you pick up new knowledge faster than expected", "You are able to master more skills than normal", "You find great pleasure in taking out others", "Your skill lies in hunting down your prey", "You are the premier expert on killing creatures", "You can accurately assess the weak points of any enemy", "Your group is greater than the sum of your parts. You're just the most important part.", "Pants on fire", "You find that fighting with your hands are best suited for combat" ];
	traits_fx=["Permanently distrusted by those of the same race, +10 to Speak Language of your choice, any language of your choice.", "+10 to Lockpick, Pickpocket, and Stealth. Government officials will not trust you and you may be targeted by bounty hunters", "Learn non-arcane or arcane spells of one lesser school of magic, forfeit potential to learn from any other school. Gain an additional spell slot", "Cast any non-arcane spell as a charm without having it in your spellbook. Still required to learn arcane lesser spells to cast them. Forfeit your potential to learn greater school spells.", "Begin with +25 Medine", "Begin with +25 Survival", "Triple additives on Bluff checks. No additives when telling the truth or persuading.", "Gain two action turns per cycle when alone in combat.", "When performing the performing art of your choice, you may cast inflict emotion upon your audiences.", "+2 additive to all struggles checks against magic. You cannot learn magic spells or prayers.", "All buying prices at merchants are halved", "Gain 5 inventory slots", "Gain one prayer from any dominion or deity. Same rules concerning daily casting limits applies. You must keep in good graces with that deity.", "0 Cognition, Double charisma. Double additives on Seduction checks.", "All statistic additives and skill modifiers drop to zero. Gain a permanent +4 additive on every check.", "+10 to Local Knowledge, Arcane Knowledge, Medicine, and Survival. Nobody likes you", "You begin the game with a familiar of your choice. Every night, you merge into your familiar's body, and become it, intelligence and all. The party will not know unless you tell them.", "Call in the miracle of one deity once per day. Unlimited prayers. You will be smote by that deity if you so much as step out of line.", "Double Gold Gain", "Double experience gain", "Doubled skill points.", "Double damage against humanoids", "Double damage against animals", "Double damage against monsters", "Attacks ignore 25% defense on enemies", "All party members gain +25% attack. Only one member may have this trait.", "You can tell when someone is lying, but you don't know what they are lying about.", "Unarmed attacks deal 3x damage and have a 10% chance to stun enemies"];
	traits_function=[ 	"ola", "loc+10,pic+10,stl+10", "ogs,oss", "cgs", "med+25", "sur+25", "", "", "", "", "", "", "opr", "cog=0,chr*2", "phs=0,cog=0,cor=0,chr=0,ask=0", "lk+25,ak+25,med+25,sur+25", "fam", "dom", "", "", "skp*2", "", "", "", "", "", "", "", "", "", "" 	];
	
	for(let q=0;q<traits_name.length;q++){
	traits[traits_name[q]]={};
	traits[traits_name[q]]["desc"]=traits_description[q];
	traits[traits_name[q]]["fx"]=traits_fx[q];
	traits[traits_name[q]]["function"]=traits_function[q];
	addOption(traits_name[q],traits_name[q],document.getElementById("trait"));
 }
	
}

function gtn(){
		return document.getElementById("trait").value;
}


function update_board(){
	// Get languages
	
	clearlangs();
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
	switch(document.getElementById("class").value){
			case "paladin":
			case "diplomat":
			case "mage":
				alllang();
			break;
			default:
			break;
	}
	
	//Racial Skills
	cls_act=[];
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
	rce_act=[];
	rce_act.push("spe1");
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

	// Class Stats
	switch(document.getElementById("class").value){
		case "paladin":
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
	fixlevel=false;
	if(lvltot!=document.getElementById("level").value){
		phspoints=0;
		cogpoints=0;
		corpoints=0;
		chrpoints=0;
		statpoints=1*document.getElementById("level").value;
	}	


	
	//Load Initial Stats
	
	phsi=Math.max(class_phs+race_phs,0);
	cogi=Math.max(class_cog+race_cog,0);
	cori=Math.max(class_cor+race_cor,0);
	chri=Math.max(class_chr+race_chr,0);
	heali=Math.max(class_health+race_health,0);
	
	//Load Initial Skill Investments
	if(lvltot!=document.getElementById("level").value||clsname!=document.getElementById("class").value||rcname!=document.getElementById("race").value||allocchange){
	// Load Stat points
	
	inv_sks=getskp();
	sk_phs=phsi;
	sk_cog=cogi;
	sk_cor=cori;
	sk_chr=chri;
	
	clsname=document.getElementById("class").value;
	rcname=document.getElementById("race").value;
	lvltot=document.getElementById("level").value;
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
	
	
	
	// Load Initial Traits
	if(gtn()=="Skilled"){
			inv_sks*=2;
			
		}
	

	
	//Load Final Stats
	phsf=phsi+phspoints;
	cogf=cogi+cogpoints;
	corf=cori+corpoints;
	chrf=chri+chrpoints;
	healf=heali+(2*(document.getElementById("level").value-1));
	
	//Sum Up All Skills
	for(let g=0;g<Object.keys(gen_inv).length;g++){
		fin_sks[Object.keys(gen_inv)[g]]=gen_inv[Object.keys(gen_inv)[g]];
	}
	for(let g=0;g<Object.keys(rc_sks).length;g++){
		fin_sks[Object.keys(rc_sks)[g]]+=rc_sks[Object.keys(rc_sks)[g]];
	}
	for(let g=0;g<Object.keys(init_sks).length;g++){
		fin_sks[Object.keys(init_sks)[g]]+=init_sks[Object.keys(init_sks)[g]];
	}
	
	
	
	
	
	
	
	//Final Trait Boosts/Effects
	if(gtn()=="Outcast"){
			alllang();
	}
	
	if(gtn()=="Outlaw"){
			fin_sks["loc"]+=10;
			fin_sks["pic"]+=10;
			fin_sks["stl"]+=10;
	}
	
	if(gtn()=="Medic"){
		fin_sks["med"]+=25;
	}
	
	if(gtn()=="Survivalist"){
		fin_sks["sur"]+=25;
	}
	if(gtn()=="Know-It-All"){
			fin_sks["med"]+=10;
			fin_sks["sur"]+=10;
			fin_sks["lk"]+=10;
			fin_sks["ak"]+=10;
	}
	
	if(gtn()=="Suave Idiot"){
			cogf=0;
			chrf*=2;	
	}
	
	if(gtn()=="Four-Leaf Clover"){
		cogf=0;
		phsf=0;
		corf=0;
		chrf=0;
		for(let g=0;g<Object.keys(fin_sks).length;g++){
		fin_sks[Object.keys(fin_sks)[g]]=0;
	}
	}
	
	

	redraw_board();
}

function redraw_board(){
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
	
	document.getElementById("phs").innerHTML=phsi;
	document.getElementById("cog").innerHTML=cogi;
	document.getElementById("cor").innerHTML=cori;
	document.getElementById("chr").innerHTML=chri;
	document.getElementById("health").innerHTML=healf;
	
	document.getElementById("statpoints").innerHTML=statpoints;
	document.getElementById("phspoints").innerHTML=phspoints;
	document.getElementById("cogpoints").innerHTML=cogpoints;
	document.getElementById("corpoints").innerHTML=corpoints;
	document.getElementById("chrpoints").innerHTML=chrpoints;
	document.getElementById("phsf").value=phsf;
	document.getElementById("cogf").value=cogf;
	document.getElementById("corf").value=corf;
	document.getElementById("chrf").value=chrf;
	document.getElementById("healf").value=healf;
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