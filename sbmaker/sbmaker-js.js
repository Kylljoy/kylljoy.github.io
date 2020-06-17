var class_phs=0;
var class_cog=0;
var class_chr=0;
var class_cor=0;

var cs_phs=0;
var cs_cog=0;
var cs_chr=0;
var cs_cor=0;
var cs_heal=0;
var cs_sks=[];
var cs_skm=10;


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

var download_compile="";


var weapondamage=0;
var weaponrange=0;

var ols=false;
var ogs=false;
var ord=false;

var chosenspells=0;
var spell_list=[];

var gspellschool="";
var gspelllevel=0;

var lspellschool="";
var lspelllevel=0;

var spellslotelect=0;
var gspellselect=0;


var boostcount=0;
var activeboosts=0;

var lvltot=0;
var clsname="";
var rcname="";
var allocchange=false;

var weapontype="";
var weaponname=""; 

var racemap={"man":"Human","helf":"High Elf","delf":"Dark Elf","welf":"Wood Elf","alf":"Half-Elf",
"hord":"Half Desert Orc","hodk":"Half Dark Orc","horm":"Half Mountain Orc","gnom":"Gnome",
"durf":"Dwarf"
};

var langmap={ "eng":"Anglish", "elf":"Elven", "orc":"Okran", "durf":"Dwarf-Tongue", "nom":"Nom", "run":"Runic"};

var melee={};
var ranged={};
var casted={};

var cls_tg="";
var tg_other=[];

var traits={};
var ables={};

var totalspellslots=2;

var lesser_schools=["Translocation","Conversion","Illusionry","Manipulation","Enchanting","Promotion","Divination"];

var greater_schools=["Biomanipulation","Transcendence","Transmutation","Necromancy","Conjuration"];

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

function create_weapon(name,type,attack,range){
	if(type=="m"){
		melee[name]={"atk":attack,"rng":range};
	}
	if(type=="r"){
		ranged[name]={"atk":attack,"rng":range};
	}
	if(type=="c"){
		casted[name]={"atk":attack,"rng":range};
	}
	
}

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
		if(val==0||val==1){
				return val-1;
		}
		let levels=[1,4,14,29,49,74,99];
		for(let i=0;i<levels.length;i++){
				if(val<=levels[i]){
						return i-1;
				}
		}
		return 6;
}

function reladd(skillname){
	switch(skillname){
		case "med":
		case "sur":
		case "rep":
		case "inv":
		case "loc":
			return stadd(cogf);
			break;
		case "sle":
		case "stl":
		case "pic":
			return stadd(corf);
			break;
		case "for":
		case "str":
		case "int":
			return stadd(phsf);
			break;
		case "spe":
		case "spc":
		case "spe1":
		case "spe2":
		case "spe3":
			return stadd(chrf);
			break;
		default:
			return -1;
			break;
	}
	
}

function stadd(val){
		let levelsq=[1,2,3,4,5];
		for(let i=0;i<levelsq.length;i++){
				if(val<levelsq[i]){
						return i-2;
				}
		}
		return Math.floor(val/2);
}

function getskp(){
	var multiplier;
	switch(document.getElementById("class").value){
			case "paladin":
			case "mercenary":
			case "marksman":
			case "assassin":
				multiplier=8;
			break;
			case "diplomat":
			case "thief":
			case "smith":
			case "mage":
				multiplier=14;
				break;
			case "cs":
				multiplier=cs_skm;
				break;
	}
	return multiplier*document.getElementById("level").value;
	
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

function getspelllevels(charlevel,spellamount,slotstaken){
	let spelltotal = spellamount;
	let slots=slotstaken;
	let spelllevels={};
	let reverseindex=0;
	for(q=1;q<charlevel+1;q++){
			if(slots>=1&&spelltotal>=1){
					spelllevels[q]=1;
					slots--;
					spelltotal--;
			}else if(slots==0&&spelltotal>=3){
					spelllevels[((charlevel)-reverseindex)]=3;
					reverseindex++;
					spelltotal-=3;
			}else if(spelltotal<3&&spelltotal>0){
					spelllevels[(charlevel)-reverseindex]=spelltotal;
					reverseindex++;
					spelltotal=0;
			}else{
					break;
			}
	}
	return spelllevels;
	
}


function addboosts(number){
	for(let q=1;q<4;q++){
		boost=document.getElementById("boost"+q);
		if(q>number){
		boost.innerHTML="";
		boost.add(new Option("None","none"));
		}
		if(q<number+1&&q>activeboosts){
		for(let g=0;g<Object.keys(sks_map).length;g++){
		boost.add(new Option(sks_map[Object.keys(sks_map)[g]],Object.keys(sks_map)[g]));
		}
		}
	}
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



function cubox(){
		cs_phs=parseInt(document.getElementById("cs_phs").value ? document.getElementById("cs_phs").value : "0");
		cs_cog=parseInt(document.getElementById("cs_cog").value ? document.getElementById("cs_cog").value : "0");
		cs_cor=parseInt(document.getElementById("cs_cor").value ? document.getElementById("cs_cor").value : "0");
		cs_chr=parseInt(document.getElementById("cs_chr").value ? document.getElementById("cs_chr").value : "0");
		cs_heal=parseInt(document.getElementById("cs_heal").value ? document.getElementById("cs_heal").value : "0");
		cs_skm=parseInt(document.getElementById("cs_skm").value ? document.getElementById("cs_skm").value : "0");
		document.getElementById("custom_grey").style.display="none";
		for(let g=0;g<document.getElementById("cs_cls_sks").children.length;g++){
			if(document.getElementById("cs_cls_sks").children[g].checked){
					cs_sks.push(document.getElementById("cs_cls_sks").children[g].id.substr(10));
			}
		}
		update_board();
}

function curbox(){
		document.getElementById("custom_race_grey").style.display="none";
		update_board();
}
function cobox(){
		document.getElementById("custom_grey").style.display="block";
}

function crbox(){
		document.getElementById("custom_race_grey").style.display="block";
}

function tbox(){
	if(!(document.getElementById("trait").value=="none")){
	document.getElementById("grey").style.display="block";
	document.getElementById("informat").innerHTML="<h3>DESCRIPTION :</h3> <br><i style='margin-top:1em'>"+traits[document.getElementById("trait").value]["desc"]+"</i>"+"<h3 style='margin-top:1em'>EFFECT :</h3> <br><i style='margin-top:1em'>"+traits[document.getElementById("trait").value]["fx"]+"</i>";
	}
	
}

function gsbox(){
	if(!(document.getElementById("gmagicspell").value=="")){
	document.getElementById("grey").style.display="block";
	document.getElementById("informat").innerHTML="<h3>SPELL:</h3> <br><i style='margin-top:1em'>"+document.getElementById("gmagicspell").value+"</i>"+"<h3 style='margin-top:1em'>EFFECT :</h3> <br><i style='margin-top:1em'>"+greaterspelldb[document.getElementById("gmagicschool").value][document.getElementById("gmagiclevel").value][document.getElementById("gmagicspell").value]+"</i>";
	}
	
}

function lsbox(){
	if(!(document.getElementById("lmagicspell").value=="")){
	document.getElementById("grey").style.display="block";
	document.getElementById("informat").innerHTML="<h3>SPELL:</h3> <br><i style='margin-top:1em'>"+document.getElementById("lmagicspell").value+"</i>"+"<h3 style='margin-top:1em'>EFFECT :</h3> <br><i style='margin-top:1em'>"+lesserspelldb[document.getElementById("lmagicschool").value][document.getElementById("lmagiclevel").value][document.getElementById("lmagicspell").value]+"</i>";
	}
	
}




function abox(){
	if(!(document.getElementById("able").value=="none")){
	document.getElementById("grey").style.display="block";
	document.getElementById("informat").innerHTML="<h3>DESCRIPTION :</h3> <br><i style='margin-top:1em'>"+ables[document.getElementById("able").value]["desc"]+"</i>"+"<h3 style='margin-top:1em'>EFFECT :</h3> <br><i style='margin-top:1em'>"+ables[document.getElementById("able").value]["fx"]+"</i>";
	}
	
}

function addgspell(){
		if(document.getElementById("gmagicspell").value!=""){
			spell_list.push([document.getElementById("gmagicschool").value,document.getElementById("gmagiclevel").value,document.getElementById("gmagicspell").value]);	
			update_board();
		}
}

function addlspell(){
		if(document.getElementById("lmagicspell").value!=""){
			spell_list.push([document.getElementById("lmagicschool").value,document.getElementById("lmagiclevel").value,document.getElementById("lmagicspell").value]);	
			update_board();
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


function load_doms(){
	dominions=["Life","Death","Protection","War","Knowledge","Trickery","Travel","Fire","Ice","Water","Sky","Air","Earth","Animal","Plant"];
	
	for(let q=0;q<dominions.length;q++){
			document.getElementById("paladindominion").add(new Option(dominions[q],dominions[q]));
		
	}
	
	
}

function load_weapons(){
		weapon_names=["Sword", "Longsword", "Shortsword", "Broadsword", "Rapier", "Dagger", "Lance", "Warhammer", "Waraxe", "Throwing Knife", "Spear", "Bow", "Crossbow" ];
		weapon_types=["m", "m", "m", "m", "m", "m", "m", "m", "m", "r", "r", "r", "r"];
		weapon_damages=[ 4, 4, 5, 6, 3, 2, 6, 5, 6, 2, 4, 3, 4 ];
		weapon_ranges=[5, 10, 4, 6, 5, 3, 2, 15, 7, 5, 10, 15, 35, 20];
		
		for(let q=0;q<weapon_names.length;q++){
				create_weapon(weapon_names[q],weapon_types[q],weapon_damages[q],weapon_ranges[q]);
			
		}
		
		ranged["Throwing Knife"]["count"]=10;
		ranged["Spear"]["count"]=5;

}

function load_greater_spells(){
	greaterschoollist=document.getElementById("gmagicschool");
	for(let q=0;q<Object.keys(greaterspelldb).length;q++){
			greaterschoollist.add(new Option(Object.keys(greaterspelldb)[q],Object.keys(greaterspelldb)[q]))
	}
		for(let q=1;q<8;q++){
			document.getElementById("gmagiclevel").add(new Option(q,q));
	}
}

function load_lesser_spells(){
	lesserschoollist=document.getElementById("lmagicschool");
	for(let q=0;q<Object.keys(lesserspelldb).length;q++){
			lesserschoollist.add(new Option(Object.keys(lesserspelldb)[q],Object.keys(lesserspelldb)[q]))
	}
}

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
	traits_name=["Fast Learner","Outcast", "Outlaw", "Magician", "Warlock", "Medic", "Survivalist", "Trickster", "Lone Wolf", "Bard", "Non-Believer", "Shopaholic", "Pack Mule", "Religious", "Suave Idiot", "Four-Leaf Clover", "Know-It-All", "Cursed", "Chosen One", "Expendable Income", "Adept", "Skilled", "Homicidal", "Hunter", "Slayer", "Know Thine Enemy", "Leader", "Liar, Liar", "Mittens God" ];
	traits_description=["You pick up skills and abilities rather quickly","Due to past actions or events surrounding you, your kind no longer accepts you as one of their own.", "Due to your history as a criminal, you have been marked as wanted by local governments", "Though you were never formally trained in magic, you find yourself still adept for some forms of magic", "Rather than focus on your potential in a greater school, you honed your ability in the lesser schools", "You have prior training in the medical arts", "You are familiar with the wild", "Your lies have not yet caught up with you", "Unfortunate events in your past have led you to a solitary life", "You have a gift with words or music", "You do not have time to fret around with smoke and mirrors", "You have extensive experience with the art of the deal", "You have experience with lugging things across the country", "You have found your place with a god", "You always manage to bumble your way through things", "You have no skills, all luck.", "You seem to know everything there is to know", "You had an unfortunate run-in with a witch", "You have an unusual dynamic with a god/goddess", "You have more money than you know what to do with", "You find that you gain field experience at a higher rate than normal", "You are able to master more skills than normal", "You find great pleasure in taking out others", "Your skill lies in hunting down your prey", "You are the premier expert on killing creatures", "You can accurately assess the weak points of any enemy", "Your group is greater than the sum of your parts. You're just the most important part.", "Pants on fire", "You find that fighting with your hands are best suited for combat" ];
	traits_fx=["Boost one additional skill","Permanently distrusted by those of the same race, +10 to Speak Language of your choice, any language of your choice.", "+10 to Lockpick, Pickpocket, and Stealth. Government officials will not trust you and you may be targeted by bounty hunters", "Learn non-arcane or arcane spells of one lesser school of magic, forfeit potential to learn from any other school. Gain an additional spell slot", "Cast any non-arcane spell as a charm without having it in your spellbook. Still required to learn arcane lesser spells to cast them. Forfeit your potential to learn greater school spells.", "Begin with +25 Medine", "Begin with +25 Survival", "Triple additives on Bluff checks. No additives when telling the truth or persuading.", "Gain two action turns per cycle when alone in combat.", "When performing the performing art of your choice, you may cast inflict emotion upon your audiences.", "+2 additive to all struggles checks against magic. You cannot learn magic spells or prayers.", "All buying prices at merchants are halved", "Gain 5 inventory slots", "Gain one prayer from any dominion or deity. Same rules concerning daily casting limits applies. You must keep in good graces with that deity.", "0 Cognition, Double charisma. Double additives on Seduction checks.", "All statistic additives and skill modifiers drop to zero. Gain a permanent +2 additive on every check.", "+10 to Local Knowledge, Arcane Knowledge, Medicine, and Survival. Nobody likes you", "You begin the game with a familiar of your choice. Every night, you merge into your familiar's body, and become it, intelligence and all. The party will not know unless you tell them.", "Call in the miracle of one deity once per day. Unlimited prayers. You will be smote by that deity if you so much as step out of line.", "Double Gold Gain", "Double experience gain", "Doubled skill points.", "Double damage against humanoids", "Double damage against animals", "Double damage against monsters", "Attacks ignore 25% defense on enemies", "All party members gain +25% attack. Only one member may have this trait.", "You can tell when someone is lying, but you don't know what they are lying about.", "Unarmed attacks deal 3x damage and have a 10% chance to stun enemies"];
	
	for(let q=0;q<traits_name.length;q++){
	traits[traits_name[q]]={};
	traits[traits_name[q]]["desc"]=traits_description[q];
	traits[traits_name[q]]["fx"]=traits_fx[q];
	addOption(traits_name[q],traits_name[q],document.getElementById("trait"));
 }
	
}

function gtn(){
		return document.getElementById("trait").value;
}


function update_board(){
	// Get languages
	ord=false;
	ogs=false;
	ols=false;
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
		
		case "othr":
			race_phs=parseInt(document.getElementById("cr_phs").value ? document.getElementById("cr_phs").value : "0");
			race_cor=parseInt(document.getElementById("cr_cor").value ? document.getElementById("cr_cor").value : "0");
			race_cog=parseInt(document.getElementById("cr_cog").value ? document.getElementById("cr_cog").value : "0");
			race_chr=parseInt(document.getElementById("cr_chr").value ? document.getElementById("cr_chr").value : "0");
			Array.prototype.slice.call(document.getElementById("cs_rce_sks").children).forEach(item=>Array.prototype.slice.call(item.children).forEach(function(p){rc_sks[p.lastChild.id.split("_")[3]]=parseInt(p.lastChild.value ? p.lastChild.value : "0");}));
			
		break;
		
	}

	// Class Stats
	boostcount=0;
	totalspellslots=2;
	switch(document.getElementById("class").value){
		case "paladin":
			class_phs=4;
			class_cog=3;
			class_cor=2;
			class_chr=2;
			ord=true;
			ols=true;
			class_health=12;
			cls_tg="for";
			cls_act=["int","spe1","spe2","spe3","ak"];
			boostcount+=1;
			totalspellslots+=1;
			break;
		case "mercenary":
			class_phs=5;
			class_cog=3;
			class_cor=2;
			class_chr=1;
			class_health=10;
			cls_tg="str";
			cls_act=["int","lk","sca"];
			boostcount+=1;
			break;
		case "marksman":
			class_phs=2;
			class_cog=5;
			class_cor=3;
			class_chr=1;
			class_health=6;
			cls_tg="inv";
			cls_act=["sea","lk","sca"];
			boostcount+=1;
			break;
		case "assassin":
			class_phs=3;
			class_cog=2;
			class_cor=5;
			class_chr=1;
			class_health=6;
			cls_tg="stl";
			cls_act=["hid","loc","rig"];
			boostcount+=1;
			break;
		case "diplomat":
			class_phs=1;
			class_cog=3;
			class_cor=2;
			class_chr=5;
			class_health=4;
			cls_tg="spc";
			cls_act=["lk","spe1","spe2","spe3","ak"];
			boostcount+=2;
			break;
		case "thief":
			class_phs=2;
			class_cog=3;
			class_cor=3;
			class_chr=3;
			class_health=6;
			cls_tg="sle";
			cls_act=["pic","loc","hid"];
			boostcount+=2;
			break;
		case "smith":
			class_phs=3;
			class_cog=4;
			class_cor=3;
			class_chr=1;
			class_health=6;
			cls_tg="rep";
			cls_act=["cra","rig","sca"];
			boostcount+=2;
			break;
		case "mage":
			ogs=true;
			ols=true;
			class_phs=1;
			class_cog=4;
			class_cor=2;
			class_chr=4;
			class_health=4;
			cls_tg="spe";
			cls_act=["alc","spe1","spe2","spe3","ak"];
			boostcount+=2;
			totalspellslots+=2;
			break;
		default:
			class_phs=cs_phs;
			class_cog=cs_cog;
			class_cor=cs_cor;
			class_chr=cs_chr;
			class_health=cs_heal;
			cls_act=cs_sks.slice();
			ols=document.getElementById("cs_lm").checked;
			cls_tg="";
			boostcount+=1;
	}
	fixlevel=false;
	if(lvltot!=document.getElementById("level").value){
		phspoints=0;
		cogpoints=0;
		corpoints=0;
		chrpoints=0;
		statpoints=1+Math.floor(document.getElementById("level").value/4);
	}	

	if(gtn()=="Fast Learner"){
		boostcount++;
	}


	addboosts(boostcount);
	activeboosts=boostcount;
	
	//Load Initial Stats
	
	phsi=class_phs+race_phs;
	cogi=class_cog+race_cog;
	cori=class_cor+race_cor;
	chri=class_chr+race_chr;
	heali=class_health+race_health;
	
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
	if(clsname=="mage"){
			spellslotelect=0;
			gspellselect=(lvltot)*3;
		
	}
}
	
	
	
	// Load Initial Traits
	if(gtn()=="Skilled"){
			inv_sks*=2;
			
		}
		
		if(gtn()=="Outcast"){
			alllang();
	}
	
	if(gtn()=="Outlaw"){
			rc_sks["loc"]+=10;
			rc_sks["pic"]+=10;
			rc_sks["stl"]+=10;
	}
	
	if(gtn()=="Medic"){
		rc_sks["med"]+=25;
	}
	
	if(gtn()=="Survivalist"){
		rc_sks["sur"]+=25;
	}
	if(gtn()=="Know-It-All"){
			rc_sks["med"]+=10;
			rc_sks["sur"]+=10;
			rc_sks["lk"]+=10;
			rc_sks["ak"]+=10;
	}
	
	

	
	//Load Final Stats
	phsf=phsi+phspoints;
	cogf=cogi+cogpoints;
	corf=cori+corpoints;
	chrf=chri+chrpoints;
	healf=heali+(2*(document.getElementById("level").value-1));
	
	//Sum Up All Skills
	
	tg_other=[];
	tg_other.push(document.getElementById("boost1").value);
	tg_other.push(document.getElementById("boost2").value);
	tg_other.push(document.getElementById("boost3").value);
	
	
	tg_sks=tg_other.slice();
	tg_sks.push(cls_tg);
	for(let g=0;g<Object.keys(gen_inv).length;g++){
		fin_sks[Object.keys(gen_inv)[g]]=gen_inv[Object.keys(gen_inv)[g]]*(1+tg_sks.count(Object.keys(gen_inv)[g]));
	}
	for(let g=0;g<Object.keys(rc_sks).length;g++){
		fin_sks[Object.keys(rc_sks)[g]]+=rc_sks[Object.keys(rc_sks)[g]];
	}
	for(let g=0;g<Object.keys(init_sks).length;g++){
		fin_sks[Object.keys(init_sks)[g]]+=init_sks[Object.keys(init_sks)[g]]*(1+tg_sks.count(Object.keys(init_sks)[g]));
	}
	
	
	
	
	
	
	
	//Final Trait Boosts/Effects

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
	
	if(gtn()=="Magician"){
			totalspellslots+=1;
			ols=true;
	}
	
	if(gtn()=="Warlock"){
			ogs=false;
	}
	
	if(gtn()=="Religious"){
			ord=true;
	}
	
	if(gtn()=="Chosen One"){
			ord=true;
	}
	
	//Inventory Stuff
	
	if(weapontype!=document.getElementById("weapontype").value){
			weapontype=document.getElementById("weapontype").value;
			weaponlist=document.getElementById("weapon");
			weaponlist.innerHTML="";
			if(weapontype=="m"){
				for(let m=0;m<Object.keys(melee).length;m++){
					addOption(Object.keys(melee)[m],Object.keys(melee)[m],weaponlist);
				}
			}
			if(weapontype=="r"){
					for(let m=0;m<Object.keys(ranged).length;m++){
					addOption(Object.keys(ranged)[m],Object.keys(ranged)[m],weaponlist);
				}
			}
			if(weapontype=="c"){
			
			}
	}
	
	//Calculate Damages
	weaponname=document.getElementById("weapon").value;
	weapondamage=0;
	weaponrange=0;
	if(weapontype=="m"){
		weapondamage+=melee[weaponname]["atk"];
		weaponrange+=melee[weaponname]["rng"];
		if(weaponname=="Dagger"){
				weapondamage+=stadd(corf);
		}else{
			weapondamage+=stadd(phsf);
		}
	}

	
	if(weapontype=="r"){
		weapondamage+=ranged[weaponname]["atk"];
		weaponrange+=ranged[weaponname]["rng"];
		weapondamage+=stadd(cogf);
	}
	
	//Magic!
	
	if(clsname!="mage"){
	 spellslotelect=0;
	 gspellselect=0;	
	}
	
	totalspellslots+=spellslotelect;

	redraw_board();
}

function redraw_board(){
	sk_act=cls_act.concat(other_act.concat(rce_act));
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
		document.getElementById("rc_sks").innerHTML="<tr><td colspan='3'>( No Initial Skills )</td></tr>";
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
			"<button type='button' onclick='ivskdo(\""+key+"\")'>&larr;</button>   <p style='display:inline-block' id='inv_"+key+"'>"+gen_inv[key]*(1+tg_sks.count(key))+"</p>    <button type='button' onclick='ivskup(\""+key+"\")'>&rarr;</button>"
			);
		}
	}
	
	
	for(i=0;i<items.length;i+=3){
		document.getElementById("availableskills").innerHTML+="<tr><td>"+items[i]+"</td><td>"+(items[i+1]==undefined?"":items[i+1])+"</td><td>"+(items[i+2]==undefined?"":items[i+2])+"</td></tr>";
	}
	
	var finskoutput=[];
	document.getElementById("finalskills").innerHTML="";
	for(i=0;i<Object.keys(fin_sks).length;i++){
		var key = Object.keys(fin_sks)[i];
			finskoutput.push(sks_map[key]+" : <br>"+
			"<p style='display:inline-block' id='inv_"+key+"'>"+fin_sks[key]+"</p>"
			);
	}
	for(i=0;i<finskoutput.length;i+=3){
		document.getElementById("finalskills").innerHTML+="<tr><td>"+finskoutput[i]+"</td><td>"+(finskoutput[i+1]==undefined?"":finskoutput[i+1])+"</td><td>"+(finskoutput[i+2]==undefined?"":finskoutput[i+2])+"</td></tr>";
	}
	
	document.getElementById("weaponstats").innerHTML="Damage: "+weapondamage+"<br>Range: "+weaponrange;
	
	
	if(ogs){
		document.getElementById("greatermagicno").style.display="none";
		document.getElementById("greatermagicyes").style.display="table-row";
		document.getElementById("sacrificeyes").style.display="table-row";
		document.getElementById("spellnumber").style.display="table-row";
	}else{
		document.getElementById("greatermagicyes").style.display="none";
		document.getElementById("greatermagicno").style.display="table-row";
		document.getElementById("sacrificeyes").style.display="none";
		document.getElementById("spellnumber").style.display="none";
	}
	
	if(ols){
		document.getElementById("lessermagicno").style.display="none";
		document.getElementById("lessermagicyes").style.display="table-row";
	}else{
		document.getElementById("lessermagicyes").style.display="none";
		document.getElementById("lessermagicno").style.display="table-row";	
		
	}
	
	
	
	if(ord){
		document.getElementById("paladinno").style.display="none";
		document.getElementById("paladinyes").style.display="table-row";
	}else{
		document.getElementById("paladinyes").style.display="none";
		document.getElementById("paladinno").style.display="table-row";
	}
	
	if(document.getElementById("gmagicschool").value!=gspellschool || document.getElementById("gmagiclevel").value!=gspelllevel){
		gspelllist=document.getElementById("gmagicspell");
		gspelllist.innerHTML="";
		gspellschool=document.getElementById("gmagicschool").value;
		gspelllevel=document.getElementById("gmagiclevel").value;
		if(gspellschool!="none"){
		gspellswath=greaterspelldb[gspellschool][gspelllevel];
		for(let q=0;q<Object.keys(gspellswath).length;q++){
			 gspelllist.add(new Option(Object.keys(gspellswath)[q],Object.keys(gspellswath)[q]));
		}
		}
	}
	
	if(document.getElementById("class").value=="paladin"&&document.getElementById("level").value<5&&gtn()!="Magician"){
			document.getElementById("lmagiclevel").value="nonarcane";
	}
	
	if(document.getElementById("lmagicschool").value!=lspellschool || document.getElementById("lmagiclevel").value!=lspelllevel){
		lspelllist=document.getElementById("lmagicspell");
		lspelllist.innerHTML="";
		lspellschool=document.getElementById("lmagicschool").value;
		lspelllevel=document.getElementById("lmagiclevel").value;
		if(lspellschool!="none"){
		lspellswath=lesserspelldb[lspellschool][lspelllevel];
		for(let q=0;q<Object.keys(lspellswath).length;q++){
			 lspelllist.add(new Option(Object.keys(lspellswath)[q],Object.keys(lspellswath)[q]));
		}
		}
	}
	
	
	document.getElementById("spell_list").innerHTML="<i>(No Spells Selected)</i>";
	if(spell_list.length>0){
	document.getElementById("spell_list").innerHTML="(Click to remove a spell)<br>"	
	}
	for(let q=0;q<spell_list.length;q++){
		document.getElementById("spell_list").innerHTML+="<div class='item_container' onclick='spell_list.splice("+q+",1);redraw_board();'>"+spell_list[q][2]+"</div><br>";
	}
	
	document.getElementById("sacspells").innerHTML=gspellselect;
	document.getElementById("sacspellslot").innerHTML=spellslotelect;
	outstring="<h3>Number of Spells per Level</h3><table>";
	for(let q=0;q<lvltot;q+=2){
		outstring+="<tr><td>Level "+(q+1)+" : "+getspelllevels(lvltot,gspellselect,spellslotelect)[q+1]+" Spells</td>"+(getspelllevels(lvltot,gspellselect,spellslotelect)[q+2]!=undefined ? "<td>Level "+(q+2)+" : "+getspelllevels(lvltot,gspellselect,spellslotelect)[q+2]+" Spells</td></tr>" : "<td></td></tr>");
	}
	outstring+="</table>";
	document.getElementById("spellbreakdown").innerHTML=outstring;
	
	document.getElementById("slotshame").innerHTML=totalspellslots;
}

function load_src(){
	load_ables();load_greater_spells();load_traits();load_weapons();load_doms();load_lesser_spells();
	rce_table=0;
	for(let m=0;m<gen_sks.length;m++){
			document.getElementById("cs_rce_sks").lastChild.appendChild(document.createElement("div"));
			document.getElementById("cs_rce_sks").lastChild.lastChild.style="display:table-cell;";		
			document.getElementById("cs_rce_sks").lastChild.lastChild.innerHTML+=sks_map[gen_sks[m]]+"        ";
			
			
			document.getElementById("cs_rce_sks").lastChild.lastChild.appendChild(document.createElement("input"));
			document.getElementById("cs_rce_sks").lastChild.lastChild.lastChild.size=1;
			document.getElementById("cs_rce_sks").lastChild.lastChild.lastChild.style="font-size:12px;";
			document.getElementById("cs_rce_sks").lastChild.lastChild.lastChild.id="cs_rce_bon_"+gen_sks[m];

			rce_table++;
			if(rce_table>=3){
				document.getElementById("cs_rce_sks").appendChild(document.createElement("div"));
				document.getElementById("cs_rce_sks").lastChild.style="display:table-row;";
				rce_table=0;
			}
			
	}
	
	for(let m=0;m<cls_sks.length;m++){
			document.getElementById("cs_cls_sks").appendChild(document.createElement("input"));
			document.getElementById("cs_cls_sks").lastChild.type="checkbox";
			document.getElementById("cs_cls_sks").lastChild.classList.add("inlinecheckbox");
			document.getElementById("cs_cls_sks").lastChild.id="cs_accept_"+cls_sks[m];
			document.getElementById("cs_cls_sks").innerHTML+=sks_map[cls_sks[m]];
			
			document.getElementById("cs_rce_sks").lastChild.appendChild(document.createElement("div"));
			document.getElementById("cs_rce_sks").lastChild.lastChild.style="display:table-cell;";		
			document.getElementById("cs_rce_sks").lastChild.lastChild.innerHTML+=sks_map[cls_sks[m]]+"        ";
			
			
			document.getElementById("cs_rce_sks").lastChild.lastChild.appendChild(document.createElement("input"));
			document.getElementById("cs_rce_sks").lastChild.lastChild.lastChild.size=1;
			document.getElementById("cs_rce_sks").lastChild.lastChild.lastChild.style="font-size:12px;";
			document.getElementById("cs_rce_sks").lastChild.lastChild.lastChild.id="cs_rce_bon_"+cls_sks[m];

			rce_table++;
			if(rce_table>=3){
				document.getElementById("cs_rce_sks").appendChild(document.createElement("div"));
				document.getElementById("cs_rce_sks").lastChild.style="display:table-row;";
				rce_table=0;
				
			}
			
	}
}


function add_tag(tagname,tagvalue){
		download_compile+=tagname + " : "+tagvalue+"\n";
}

function segbreak(){
		download_compile+="\n\n";
}

function seghead(head){
		download_compile+=head.toUpperCase()+"\n";
}

function add_list(name,listitems){
		download_compile+=name+" : \n";
		for(let mark=0;mark<listitems.length;mark++){
			download_compile+=" - "+listitems[mark]+"\n";
		}
	
}

function compile_character(){
	
	download_compile="";
	finale=document.getElementById("character_summary");
	finale.innerHTML="<h2>"+(document.getElementById("name").value=="" ? "No-Name Johnson":document.getElementById("name").value)+"</h2>";
	finale.innerHTML+="<h4>Level "+document.getElementById("level").value+" "+(document.getElementById("race").value=="othr"? document.getElementById("cr_name").value : racemap[document.getElementById("race").value])+" "+(document.getElementById("class").value=="cs"? document.getElementById("cs_name").value : document.getElementById("class").value)+"</h4>";
	finale.innerHTML+="<h4>Trait : "+(document.getElementById("trait").value=="none" ? "N/A" : document.getElementById("trait").value)+" | Ability : "+(document.getElementById("able").value=="none" ? "N/A" : document.getElementById("able").value);
	finale.innerHTML+="<br><h3>Statistics</h3>";
	finale.innerHTML+="<br><b>Health : "+healf+"</b>";
	finale.innerHTML+="<table><tr class='hey'><td></td><td>Physicality</td><td>Cognition</td><td>Coordination</td><td>Charisma</td></tr><tr><td class='hey'>Scores</td><td>"+phsf+"</td><td>"+cogf+"</td><td>"+corf+"</td><td>"+chrf+"</td></tr><tr><td class='hey'>Modifiers</td><td>"+stadd(phsf)+"</td><td>"+stadd(cogf)+"</td><td>"+stadd(corf)+"</td><td>"+stadd(chrf)+"</td></tr></table>";
	
	finale.innerHTML+="<br><h3>Skills</h3><br>";
	finale.innerHTML+="Boosted Skills: "+document.getElementById("boost1").value+", "+document.getElementById("boost2").value+", "+document.getElementById("boost3").value;
	skscores=[];
	sklabels=[];
	for(let q=0;q<Object.keys(fin_sks).length;q++){
		skscores.push(fin_sks[Object.keys(fin_sks)[q]]);
		sklabels.push(sks_map[Object.keys(fin_sks)[q]]);
	}
	skadds=[];
	for(let q=0;q<Object.keys(fin_sks).length;q++){
		skadds.push(Math.max(skadd(fin_sks[Object.keys(fin_sks)[q]]),reladd(Object.keys(fin_sks)[q])));
	}
	sk_table_data="<table><tr class='hey'><td>Skill</td><td>Score</td><td>Modifier</td></tr>";
	for(let q=0;q<skadds.length;q++){
		sk_table_data+="<tr><td class='hey'>"+sklabels[q]+"</td><td>"+skscores[q]+"</td><td>"+skadds[q]+"</td></tr>";
		
	}
	finale.innerHTML+=sk_table_data+"</table><br><h3>Languages : </h3><br>";
	finale.innerHTML+="First Language : "+langmap[document.getElementById("lang1").value]+"<br>";
	finale.innerHTML+="Second Language : " +langmap[document.getElementById("lang2").value]+"<br>";
	finale.innerHTML+="Third Language : " +langmap[document.getElementById("lang3").value]+"<br>";
	
	finale.innerHTML+="<br><br><h2>Inventory</h2><br><h3>Weapon of Choice:</h3>";
	finale.innerHTML+="<b>"+weaponname+" (Base Damage : "+(document.getElementById("weapontype").value=="m"? melee[document.getElementById("weapon").value]:(document.getElementById("weapontype").value=="r"? ranged[document.getElementById("weapon").value] : casted[document.getElementById("weapon").value]))["atk"]+" | Total Damage : "+weapondamage+" | Range : "+(document.getElementById("weapontype").value=="m"? melee[document.getElementById("weapon").value]:(document.getElementById("weapontype").value=="r"? ranged[document.getElementById("weapon").value] : casted[document.getElementById("weapon").value]))["rng"]+")</b>";
	
	finale.innerHTML+="<br><br><h2>Magic</h2>";
	finale.innerHTML+="Total Spell Slots :"+totalspellslots;
	finale.innerHTML+="<br><br><h3>Spell Roster</h3><ul>";
	spells_final=[];
	if(spell_list.length<=0){
			finale.innerHTML+="<i>(No Spells)</i>";
	}
	for(let q=0;q<spell_list.length;q++){
		finale.innerHTML+="<li>"+spell_list[q][2]+"</li>";
		spells_final.push(spell_list[q][2]);
	}
	finale.innerHTML+="</ul>";
	finale.innerHTML+="<br><br><h2>Religious Affiliation</h2>";
	if(ord){
				finale.innerHTML+=document.getElementById("paladinvariant").value+" / "+document.getElementById("paladindominion").value;
	}else{
			finale.innerHTML+="<i>(No Religious Affiliation)</i>";
	}
	
	//Download File Stuff
	
	add_tag("Name",(document.getElementById("name").value=="" ? "No-Name Johnson":document.getElementById("name").value));
	add_tag("Level",document.getElementById("level").value);
	add_tag("Race",(document.getElementById("race").value=="othr"? document.getElementById("cr_name").value : racemap[document.getElementById("race").value]));
	add_tag("Class",(document.getElementById("class").value=="cs"? document.getElementById("cs_name").value : document.getElementById("class").value));
	add_tag("Trait",document.getElementById("trait").value);
	add_tag("Ability",document.getElementById("able").value);
	segbreak();
	seghead("Statistics");
	add_tag("Health",healf);
	add_tag("Physicality",phsf+" , "+stadd(phsf));
	add_tag("Cognition",cogf+" , "+stadd(cogf));
	add_tag("Coordination",corf+" , "+stadd(corf));
	add_tag("Charisma",chrf+" , "+stadd(chrf));
	segbreak();
	seghead("Skills");
	add_tag("Boosted",document.getElementById("boost1").value+", "+document.getElementById("boost2").value+", "+document.getElementById("boost3").value);
	for(let q=0;q<skscores.length;q++){
		add_tag(sklabels[q],skscores[q]+" , "+skadds[q]);
	}
	add_tag("First Language",langmap[document.getElementById("lang1").value]);
	add_tag("Second Language",langmap[document.getElementById("lang2").value]);
	add_tag("Third Language",langmap[document.getElementById("lang3").value]);
	segbreak();
	seghead("Inventory");
	add_tag("Weapon",weaponname);
	add_tag("Base Damage",(document.getElementById("weapontype").value=="m"? melee[document.getElementById("weapon").value]:(document.getElementById("weapontype").value=="r"? ranged[document.getElementById("weapon").value] : casted[document.getElementById("weapon").value]))["atk"]);
	add_tag("Range",(document.getElementById("weapontype").value=="m"? melee[document.getElementById("weapon").value]:(document.getElementById("weapontype").value=="r"? ranged[document.getElementById("weapon").value] : casted[document.getElementById("weapon").value]))["rng"]);
	segbreak();
	seghead("Magic");
	add_tag("Spell Slots",totalspellslots);
	add_list("Spells",spells_final);
	add_tag("Religious Affiliation",document.getElementById("paladindominion").value+" / "+document.getElementById("paladinvariant").value);
	
	finale.innerHTML+="<br><br><button style='font-size:1.75em;' onclick='download_character()'>Download Character Sheet</button><br><br><button style='font-size:1em;' onclick='text_character()'>Just Text</button>";
}

function text_character(){
	finale.innerHTML+="<div style='border:1px black solid;padding:5px;'>"+download_compile.replace(/\n/g,"<br>")+"</div>";
	
}

function download_character(){
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(download_compile));
  element.setAttribute('download', (document.getElementById("name").value=="" ? "No-Name Johnson":document.getElementById("name").value).toLowerCase()+"_sbmap.txt");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}