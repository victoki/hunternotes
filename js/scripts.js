// Author: Victoria King
//Scripts that build hunter's notes page


'use strict'; //enable strict mode

//Ensure that the DOM is loaded first before proceeding.
if (document.readyState !== "loading") {
    // If the document is ready, execute the function
    loadPage();
}
else {
    // If not ready, wait for document to finish load
    document.addEventListener("DOMContentLoaded", loadPage);
}

function loadPage() {
	initNav(siteData());
	initListeners();
}

//Sets up nav from data list on page load.
function initNav(data) {
	let fragment = document.createDocumentFragment();
	let nav_template = document.querySelector('#nav_menu').content;
	let clone = '';
	let key = '';
	let item = '';
	let container = document.querySelector('.menu_container');
	
	for (key in data) {
		//Get data from object key
		item = data[key];
		//Clone the html template
		clone = nav_template.cloneNode(true);
		
		clone.querySelector('label').innerHTML = item.name;
		clone.querySelector('button').id = item.name;
		clone.querySelector('button').setAttribute('aria-label', item.name);
		clone.querySelector('img').src = "img/icon/monster/MHRise-" + item.name + "_Icon.png";
		clone.querySelector('img').alt = item.name;
		//Add clone to the fragment
		fragment.appendChild(clone);
	}
	//Output the fragment to the DOM
	container.appendChild(fragment);
}

//Toggles section visibility
function toggleVisible(whatElement, whatState) {
	let elementToToggle = document.querySelector(whatElement);

	//if visible or none, set display.
	if (whatState == "visible") {
		elementToToggle.style.display = "block";
	}
	else if (whatState == "none") {
		elementToToggle.style.display = "none";
	}
}

//Initiates event listeners.
function initListeners() {
	const body = document.querySelector('body');
	const menu = document.querySelector('.menu_container');
	const main = document.querySelector('main');
	const aside = document.querySelector('aside');
	let monsterName = '';
	
	//Put event listener on body, stop propagation
	if (body) {
		body.addEventListener('click', element => {
			element.stopPropagation();
			
			//Is it a button?
			if (element.target.tagName == 'BUTTON') {
				switch (element.target.id) {
					//Some buttons need specific actions.
					case "dyslexic_mode":
						body.classList.toggle('dyslexicFont');
					break;
					
					case "toggle_nav":
						menu.classList.toggle('invisible');
					break;
					
					case "mat_low_btn":
						//set tabs to display low rank
						aside.querySelector('#mat_low_btn').classList.add('mat_btn_current');
						aside.querySelector('#mat_high_btn').classList.remove('mat_btn_current');
						aside.querySelector('#mat_spec_btn').classList.remove('mat_btn_current');
						
						//Show section
						aside.querySelector('#materials_low').classList.remove('invisible');
						aside.querySelector('#materials_high').classList.add('invisible');
						aside.querySelector('#materials_spec').classList.add('invisible');
					break;
					
					case "mat_high_btn":
						//set tabs to display high rank
						aside.querySelector('#mat_high_btn').classList.add('mat_btn_current');
						aside.querySelector('#mat_low_btn').classList.remove('mat_btn_current');
						aside.querySelector('#mat_spec_btn').classList.remove('mat_btn_current');
						
						//Show section
						aside.querySelector('#materials_high').classList.remove('invisible');
						aside.querySelector('#materials_low').classList.add('invisible');
						aside.querySelector('#materials_spec').classList.add('invisible');
					break;
					
					case "mat_spec_btn":
						//set tabs to display spec mat
						aside.querySelector('#mat_spec_btn').classList.add('mat_btn_current');
						aside.querySelector('#mat_high_btn').classList.remove('mat_btn_current');
						aside.querySelector('#mat_low_btn').classList.remove('mat_btn_current');
						
						//Show section
						aside.querySelector('#materials_spec').classList.remove('invisible');
						aside.querySelector('#materials_high').classList.add('invisible');
						aside.querySelector('#materials_low').classList.add('invisible');
					break;
					
					//If none of these, it must be a button in the monster icon menu.
					default:
						monsterName = element.target.id;
						monsterName = monsterName.replace('#', '');
						
						updateDataPanel(monsterName, siteData());
						
						//set tabs to display low rank when monster clicked.
						aside.querySelector('#mat_low_btn').classList.add('mat_btn_current');
						aside.querySelector('#mat_high_btn').classList.remove('mat_btn_current');
						aside.querySelector('#mat_spec_btn').classList.remove('mat_btn_current');
						
						//set to show low mats
						//Show section
						aside.querySelector('#materials_low').classList.remove('invisible');
						aside.querySelector('#materials_high').classList.add('invisible');
						aside.querySelector('#materials_spec').classList.add('invisible');
						
				}
			}
		});
	}
}

function updateNameplate(monsterName, data) {
	let section = document.querySelector('#main_nameplate');
	let subSections = '';
	let index = data[monsterName];
	let i = '';
	let edit = '';
	
	//set nameplate header
	section.querySelector('h2').innerHTML = index.name;
	section.querySelector('img').src = "img/icon/monster/MHRise-" + index.name + "_Icon.png";
	section.querySelector('img').alt = index.name;
	section.querySelector('p').innerHTML = index.type;
	
	//set nameplate data
	section = document.querySelector('#nameplate_data');
	subSections = section.querySelectorAll('p');
	
	subSections[0].innerHTML = index.e_type;
	subSections[1].innerHTML = index.threat;
}

function updateWeaknessPanel(monsterName, data) {
	let section = document.querySelector('#weakness_nameplate');
	let subSections = '';
	let index = data[monsterName];
	let i = '';
	let edit = '';
	
	//Set weakness header
	section.querySelector('p').innerHTML = index.best_e_dmg;
	
	//Set weakness data
	section = document.querySelector('#element_data');
	subSections = section.querySelectorAll('p');
	
	subSections[0].innerHTML = index.fire;
	subSections[1].innerHTML = index.ice;
	subSections[2].innerHTML = index.dragon;
	subSections[3].innerHTML = index.water;
	subSections[4].innerHTML = index.lightning;
	subSections[5].innerHTML = index.avoid_e;
}

function updateStatusPanel(monsterName, data) {
	let section = document.querySelector('#status_nameplate');
	let subSections = '';
	let index = data[monsterName];
	let i = '';
	let edit = '';
	
	//Set status header
	section.querySelector('p').innerHTML = index.best_status;
	
	//Set status data
	section = document.querySelector('#status_data');
	subSections = section.querySelectorAll('p');
	
	subSections[0].innerHTML = index.poison;
	subSections[1].innerHTML = index.blast;
	subSections[2].innerHTML = index.stun;
	subSections[3].innerHTML = index.fireblight;
	subSections[4].innerHTML = index.thunderblight;
	subSections[5].innerHTML = index.sonic;
	subSections[6].innerHTML = index.traps;
	subSections[7].innerHTML = index.paralysis;
	subSections[8].innerHTML = index.sleep;
	subSections[9].innerHTML = index.exhaust;
	subSections[10].innerHTML = index.waterblight;
	subSections[11].innerHTML = index.iceblight;
	subSections[12].innerHTML = index.flash;
	subSections[13].innerHTML = index.status_caution;
}

function updateBreakablePanel(monsterName, data) {
	let section = document.querySelector('#break_nameplate');
	let subSections = '';
	let index = data[monsterName];
	let i = '';
	let edit = '';
	
	//Set status data
	section = document.querySelector('#break_data');
	subSections = section.querySelectorAll('p');
	
	subSections[0].innerHTML = index.breakable;
	subSections[1].innerHTML = index.severable;
}

function updateMonsterImage(monsterName, data) {
	let aside = document.querySelector('aside');
	let index = data[monsterName];
	aside.querySelector('img').src = "img/monster/" + index.name + ".png";
}

function updateDataPanel(monsterName, data) {
	updateNameplate(monsterName, data);
	updateWeaknessPanel(monsterName, data);
	updateStatusPanel(monsterName, data);
	updateBreakablePanel(monsterName, data);
	updateMonsterImage(monsterName, data);
	updateMaterials(monsterName, data);
	
	//For first time button clicked: Remove invisible states on main & aside.
	if (document.querySelector('main').className == 'invisible') {
		document.querySelector('main').classList.remove('invisible');
	}
	
	if (document.querySelector('aside').className == 'invisible') {
		document.querySelector('aside').classList.remove('invisible');
	}
	
	//toggle nav menu off.
	document.querySelector('.menu_container').classList.toggle('invisible');
}

function updateMaterials(monsterName, data) {
	let aside = document.querySelector('aside');
	let index = data[monsterName];
	let section = document.querySelector('#materials_low');
	let list = '';
	let length = '';
	let material = '';
	let fragment = document.createDocumentFragment();
	let clone = '';
	let template = document.querySelector('#mat_data').content;
	let subElementQuery = '';
	
	list = Object.keys(index.matlow);
	length = list.length;
	
	//set up low
	for (let i = 1; i <= length; i++) {
		material = index.matlow[i];
		clone = template.cloneNode(true);
		
		clone.querySelector('img').src = "img/icon/item/" + material.icon;
		clone.querySelector('img').alt = material.name; 
		clone.querySelector('.mat_card_header').innerHTML = material.name;
		
		clone.querySelector('.rarity').innerHTML = material.rarity;
		clone.querySelector('.source').innerHTML = material.get;
		clone.querySelector('.best_source').innerHTML = material.best;
		
		fragment.appendChild(clone);
	}
	
	//clear the article of sections or it endlessly appends, then append fragment.
	section.querySelectorAll('section').forEach((item) => item.remove());
	section.appendChild(fragment);
	
	//prep high
	list = Object.keys(index.mathigh);
	length = list.length;
	
	//set up high
	for (let i = 1; i <= length; i++) {
		material = index.mathigh[i];
		clone = template.cloneNode(true);
		
		clone.querySelector('img').src = "img/icon/item/" + material.icon;
		clone.querySelector('img').alt = material.name; 
		clone.querySelector('.mat_card_header').innerHTML = material.name;
		
		clone.querySelector('.rarity').innerHTML = material.rarity;
		clone.querySelector('.source').innerHTML = material.get;
		clone.querySelector('.best_source').innerHTML = material.best;
		
		fragment.appendChild(clone);
	}
	
	//clear the article of sections or it endlessly appends, then append fragment.
	section = document.querySelector('#materials_high');
	section.querySelectorAll('section').forEach((item) => item.remove());
	section.appendChild(fragment);
	
	//edit spec material area
	section = document.querySelector('#materials_spec');
	
	//If spec mat, set it up. If no spec mat, disable button.
	if (index.matspec.exists == 0) {
		document.getElementById('mat_spec_btn').classList.add('disabled');
		document.getElementById('mat_spec_btn').disabled = true;
	}
	else {
		document.getElementById('mat_spec_btn').disabled = false;
		document.getElementById('mat_spec_btn').classList.remove('disabled');
		
		section.querySelector('#spec_item_icon').src = "img/icon/item/" + index.matspec.icon;
		section.querySelector('#spec_item_icon').alt = index.matspec.name;
		
		section.querySelector('.mat_card_header').innerHTML = index.matspec.name;
		section.querySelector('.source').innerHTML = index.matspec.get;
	}
}

function siteData() {
	const siteData = {
		Aknosom: {
			name: "Aknosom",
			type: "Bird Wyvern",
			threat: "⭐⭐",
			e_type: "Fire",
			status_caution: "Fireblight",
			fire: "❌",
			water: "⭐⭐",
			ice: "⭐",
			lightning: "⭐⭐",
			dragon: "❌",
			best_e_dmg: "Water, Lightning",
			avoid_e: "Fire, Dragon",
			poison: "⭐",
			paralysis: "⭐",
			blast: "⭐⭐",
			sleep: "⭐",
			stun: "⭐",
			exhaust: "⭐",
			fireblight: "⭐",
			waterblight: "⭐⭐",
			thunderblight: "⭐",
			iceblight: "⭐",
			best_status: "Blast, Waterblight",
			traps: "Pitfall ✔️ Shock ✔️",
			flash: "✔️",
			sonic: "❌",
			breakable: "Beak, Crest, Wings, Tail",
			severable: "None",
			matlow: {
				1: {
					name: "Aknosom Feather",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Wing, Carve, Drop",
					best: "Break Wing"
				},
				2: {
					name: "Aknosom Scale",
					icon: "Icon-Scale_White.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Beak, Carve, Drop",
					best: "Break Tail"
				},
				3: {
					name: "Flame Sac",
					icon: "Icon-Sac_Red.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Carve",
					best: "Target Reward"
				},
				4: {
					name: "Monster Bone M",
					icon: "Icon-Bone_Yellow.svg",
					rarity: "⭐",
					get: "Target Reward",
					best: "Target Reward Only"
				},
				5: {
					name: "Aknosom Beak",
					icon: "Icon-Head_Orange.svg",
					rarity: "⭐",
					get: "Capture Reward, Break Beak",
					best: "Break Beak"
				},
				6: {
					name: "Aknosom Crest",
					icon: "Icon-Hide_Orange.svg",
					rarity: "⭐",
					get: "Capture Reward, Break Crest",
					best: "Break Crest"
				}
			},
			mathigh: {
				1: {
					name: "Aknosom Feather+",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Wing, Carve, Drop",
					best: "Break Wing"
				},
				2: {
					name: "Aknosom Scale+",
					icon: "Icon-Scale_White.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Wing, Carve, Drop",
					best: "Break Tail"
				},
				3: {
					name: "Inferno Sac",
					icon: "Icon-Sac_Red.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Carve",
					best: "Target Reward"
				},
				4: {
					name: "Monster Keenbone",
					icon: "Icon-Bone_Pink.svg",
					rarity: "⭐",
					get: "Target Reward",
					best: "Target Reward Only"
				},
				5: {
					name: "Aknosom Beak",
					icon: "Icon-Head_Orange.svg",
					rarity: "⭐",
					get: "Target Reward, Capture Reward, Break Beak, Carve",
					best: "Break Beak"
				},
				6: {
					name: "Aknosom Crest+",
					icon: "Icon-Hide_Orange.svg",
					rarity: "⭐",
					get: "Capture Reward, Break Crest",
					best: "Break Crest"
				},
				7: {
					name: "Bird Wyvern Gem",
					icon: "Icon-Ball_Blue.svg",
					rarity: "✨",
					get: "Target Reward, Capture Reward, Break Beak, Carve, Drop",
					best: "Break Beak"
				}
			},
			matspec: {
				exists: 0,
				name: "n",
				icon: "n",
				get: "n",
			}
		},
		Khezu: {
			name: "Khezu",
			type: "Flying Wyvern",
			threat: "⭐⭐",
			e_type: "Lightning",
			status_caution: "Thunderblight",
			fire: "⭐⭐⭐",
			water: "⭐",
			ice: "⭐",
			lightning: "❌",
			dragon: "⭐",
			best_e_dmg: "Fire",
			avoid_e: "Thunder",
			poison: "⭐⭐⭐",
			paralysis: "❌",
			blast: "⭐⭐",
			sleep: "⭐",
			stun: "⭐",
			exhaust: "❌",
			fireblight: "⭐⭐",
			waterblight: "⭐",
			thunderblight: "⭐",
			iceblight: "⭐",
			best_status: "Poison",
			traps: "Pitfall ✔️ Shock ❌",
			flash: "❌",
			sonic: "✔️ (Use when on ceiling)",
			breakable: "Head, Legs",
			severable: "None",
			matlow: {
				1: {
					name: "Flabby Hide",
					icon: "Icon-Hide_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Leg, Carve, Drop",
					best: "Break Leg"
				},
				2: {
					name: "Suspicious Fang",
					icon: "Icon-Claw_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Leg, Carve, Drop",
					best: "Break Head"
				},
				3: {
					name: "Pale Extract",
					icon: "Icon-Chemical_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Head, Carve, Drop",
					best: "Shiny Drop"
				},
				4: {
					name: "Pale Bone",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Head",
					best: "Break Head"	
				},
				5: {
					name: "Monster Bone M",
					icon: "Icon-Bone_Yellow.svg",
					rarity: "⭐",
					get: "Target Reward",
					best: "Target Reward Only"
				},
				6: {
					name: "Electro Sac",
					icon: "Icon-Sac_Light_Yellow.svg",
					rarity: "⭐",
					get: "Target Reward, Capture Reward, Carve",
					best: "Capture Reward"
				}
			},
			mathigh: {
				1: {
					name: "Pearl Hide",
					icon: "Icon-Hide_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Leg, Carve, Drop",
					best: "Break Leg"
				},
				2: {
					name: "Suspicious Fang+",
					icon: "Icon-Claw_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Head, Carve, Drop",
					best: "Break Head"
				},
				3: {
					name: "Pale Extract",
					icon: "Icon-Chemical_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Head, Carve, Drop",
					best: "Shiny Drops"
				},
				4: {
					name: "Pale Steak",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Head",
					best: "Break Head"
				},
				5: {
					name: "Pale Bone",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Break Head",
					best: "Break Head"
				},
				6: {
					name: "Thunder Sac",
					icon: "Icon-Sac_Light_Yellow.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Carve",
					best: "Target Reward"
				},
				7: {
					name: "Monster Keenbone",
					icon: "Icon-Bone_Pink.svg",
					rarity: "⭐",
					get: "Target Reward",
					best: "Target Reward Only"
				},
				8: {
					name: "Wyvern Gem",
					icon: "Icon-Ball_Blue.svg",
					rarity: "✨",
					get: "Target Reward, Capture Reward, Drop",
					best: "Capture Reward"
				}
			},
			matspec: {
				exists: 0,
				name: "n",
				icon: "n",
				get: "n",
			}
		},
		"Kulu-Ya-Ku": {
			name: "Kulu-Ya-Ku",
			type: "Bird Wyvern",
			threat: "⭐⭐",
			e_type: "None",
			status_caution: "Stun",
			fire: "⭐",
			water: "⭐⭐",
			ice: "⭐",
			lightning: "⭐",
			dragon: "⭐",
			best_e_dmg: "Water",
			avoid_e: "None",
			poison: "⭐",
			paralysis: "⭐",
			blast: "⭐⭐",
			sleep: "⭐",
			stun: "⭐⭐",
			exhaust: "⭐",
			fireblight: "⭐",
			waterblight: "⭐⭐",
			thunderblight: "⭐",
			iceblight: "⭐",
			best_status: "Waterblight, Stun",
			traps: "Pitfall ✔️ Shock ✔️",
			flash: "✔️",
			sonic: "❌",
			breakable: "Head, Foreleg",
			severable: "Tail?",
			matlow: {
				1: {
					name: "Kulu-Ya-Ku Scale",
					icon: "Icon-Scale_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Foreleg, Carve, Drop",
					best: "Shiny Drop"
				},
				2: {
					name: "Kulu-Ya-Ku Hide",
					icon: "Icon-Hide_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Head, Carve, Drop",
					best: "Capture Reward"
				},
				3: {
					name: "Kulu-Ya-Ku Plume",
					icon: "Icon-Monster_Part_Orange.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Foreleg, Carve, Drop",
					best: "Break Foreleg"
				},
				4: {
					name: "Kulu-Ya-Ku Beak",
					icon: "Icon-Head_Orange.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Head",
					best: "Break Head"
				},
				5: {
					name: "Monster Bone M",
					icon: "Icon-Bone_Yellow.svg",
					rarity: "⭐",
					get: "Target Reward",
					best: "Target Reward Only"
				}
			},
			mathigh: {
				1: {
					name: "Kulu-Ya-Ku Scale+",
					icon: "Icon-Scale_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Foreleg, Carve, Drop",
					best: "Shiny Drop"
				},
				2: {
					name: "Kulu-Ya-Ku Hide+",
					icon: "Icon-Hide_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Head, Carve, Drop",
					best: "Target or Capture Reward"
				},
				3: {
					name: "Kulu-Ya-Ku Plume+",
					icon: "Icon-Monster_Part_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Foreleg, Carve, Drop",
					best: "Break Foreleg"
				},
				4: {
					name: "Kulu-Ya-Ku Beak+",
					icon: "Icon-Head_Orange.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Head",
					best: "Break Head"
				},
				5: {
					name: "Monster Bone+",
					icon: "Icon-Bone_Orange.svg",
					rarity: "⭐",
					get: "Target Reward",
					best: "Target Reward Only"
				},
				6: {
					name: "Bird Wyvern Gem",
					icon: "Icon-Ball_Blue.svg",
					rarity: "✨",
					get: "Target Reward, Capture Reward, Break Beak, Carve, Drop",
					best: "Capture Reward, Break Head"
				}
			},
			matspec: {
				exists: 0,
				name: "n",
				icon: "n",
				get: "n",
			}
		},
		Valstrax: {
			name: "Valstrax",
			type: "Elder Dragon",
			threat: "⭐⭐⭐⭐⭐⭐⭐",
			e_type: "Dragon",
			status_caution: "Dragonblight",
			fire: "⭐⭐⭐",
			water: "⭐⭐⭐",
			ice: "⭐⭐⭐",
			lightning: "⭐⭐⭐",
			dragon: "❌",
			best_e_dmg: "Fire, Water, Lightning, Ice",
			avoid_e: "Dragon",
			poison: "⭐",
			paralysis: "⭐",
			blast: "⭐⭐",
			sleep: "⭐",
			stun: "⭐",
			exhaust: "⭐",
			fireblight: "⭐",
			waterblight: "⭐⭐",
			thunderblight: "⭐",
			iceblight: "⭐",
			best_status: "Blast",
			traps: "Pitfall ❌ Shock ❌",
			flash: "✔️",
			sonic: "❌",
			breakable: "Head, Foreleg",
			severable: "Tail",
			matlow: {
				1: {
					name: "High Rank Only",
					icon: "Icon-Ball_Blue.svg",
					rarity: "❌",
					get: "This monster has High rank materials only",
					best: "Please look up high rank materials"
				}
			},
			mathigh: {
				1: {
					name: "Gleaming Shell",
					icon: "Icon-Shell_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Breaks, Carve, Drop",
					best: "Shiny Drops"
				},
				2: {
					name: "Shimmering Scale",
					icon: "Icon-Scale_Orange.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Break Head or Chest, Carve Body or Severed Tail, Drop",
					best: "Break Head or Chest"
				},
				3: {
					name: "Valstrax Claw+",
					icon: "Icon-Claw_White.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Break Wing, Break Foreleg, Carve",
					best: "Break Foreleg"
				},
				4: {
					name: "Valstrax Spineshell",
					icon: "Icon-Shell_Gray.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Break Beak, Carve, Drop",
					best: "Target Reward Only"
				},
				5: {
					name: "Valstrax Tail",
					icon: "Icon-Tail_Gray.svg",
					rarity: "⭐",
					get: "Target Reward, Carve Severed Tail",
					best: "Carve Severed Tail"
				},
				6: {
					name: "Crimson Liquid",
					icon: "Icon-Chemical_Orange.svg",
					rarity: "⭐",
					get: "Target Reward, Break Head, Break Back, Break Chest, Drops",
					best: "Shiny Drops"
				},
				6: {
					name: "Rouge Spikewing",
					icon: "Icon-Monster_Part_Orange.svg",
					rarity: "⭐",
					get: "Break Wings, Carve",
					best: "Break Wings"
				},
				7: {
					name: "Red Serpent Orb",
					icon: "Icon-Ball_Blue.svg",
					rarity: "✨",
					get: "Target Reward, Break Head, Break Chest, Carve Body & Severed Tail, Drop",
					best: "Break Head, Carve Severed Tail"
				}
			},
			matspec: {
				exists: 0,
				name: "n",
				icon: "n",
				get: "n",
			}
		},
		Zinogre: {
			name: "Zinogre",
			type: "Fanged Wyvern",
			threat: "⭐⭐⭐⭐⭐⭐",
			e_type: "Lightning",
			status_caution: "Thunderblight",
			fire: "⭐",
			water: "⭐",
			ice: "⭐⭐",
			lightning: "❌",
			dragon: "⭐",
			best_e_dmg: "Ice",
			avoid_e: "Lightning",
			poison: "⭐",
			paralysis: "❌",
			blast: "⭐⭐",
			sleep: "⭐",
			stun: "⭐",
			exhaust: "⭐",
			fireblight: "⭐",
			waterblight: "⭐",
			thunderblight: "⭐",
			iceblight: "⭐⭐",
			best_status: "Iceblight, Blast",
			traps: "Pitfall ✔️ Shock ❌",
			flash: "✔️",
			sonic: "❌",
			breakable: "Back, Both Horns, Forelegs",
			severable: "Tail",
			matlow: {
				1: {
					name: "Zinogre Shell",
					icon: "Icon-Shell_Teal.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Carve Body & Severed Tail, Drop",
					best: "Shiny Drop"
				},
				2: {
					name: "Zinogre Shockfur",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Back, Carve, Drop",
					best: "Shiny Drop"
				},
				3: {
					name: "Zinogre Shocker",
					icon: "Icon-Shell_Teal.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Back, Break Foreleg, Carve",
					best: "Break Back"
				},
				4: {
					name: "Zinogre Tail",
					icon: "Icon-Tail_Teal.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Cut Tail, Carve Severed Tail",
					best: "Carve Severed Tail"
				},
				5: {
					name: "Zinogre Horn",
					icon: "Icon-Claw_Teal.svg",
					rarity: "⭐",
					get: "Capture Reward, Break Both Horns",
					best: "Break Both Horns"
					
				},
				6: {
					name: "Zinogre Claw",
					icon: "Icon-Claw_Teal.svg",
					rarity: "⭐",
					get: "Break Both Forelegs, Carve Body, Drops",
					best: "Break Both Forelegs"
					
				},
				7: {
					name: "Zinogre Plate",
					icon: "Icon-Plate_Teal.svg",
					rarity: "✨",
					get: "Target Reward, Capture Reward, Break Both Horns, Carve Body & Severed Tail, Drop",
					best: "Capture, Break Both Horns, Carve Severed Tail"
				}
			},
			mathigh: {
				1: {
					name: "Zinogre Carapace",
					icon: "Icon-Shell_Teal.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Carve Body & Severed Tail, Drop",
					best: "Shiny Drop"
				},
				2: {
					name: "Zinogre Electrofur",
					icon: "Icon-Monster_Part_White.svg",
					rarity: "⭐⭐⭐",
					get: "Target Reward, Capture Reward, Break Back, Carve, Drop",
					best: "Shiny Drop"
				},
				3: {
					name: "Zinogre Shocker+",
					icon: "Icon-Shell_Teal.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Break Back, Break Foreleg, Carve",
					best: "Break Back"
				},
				4: {
					name: "Zinogre Tail",
					icon: "Icon-Tail_Teal.svg",
					rarity: "⭐⭐",
					get: "Target Reward, Capture Reward, Cut Tail, Carve Severed Tail",
					best: "Carve Severed Tail"
				},
				5: {
					name: "Zinogre Horn+",
					icon: "Icon-Claw_Teal.svg",
					rarity: "⭐",
					get: "Capture Reward, Break Both Horns",
					best: "Break Both Horns"
					
				},
				6: {
					name: "Zinogre Claw+",
					icon: "Icon-Claw_Teal.svg",
					rarity: "⭐",
					get: "Break Both Forelegs, Carve Body, Drops",
					best: "Break Both Forelegs"
					
				},
				7: {
					name: "Zinogre Plate",
					icon: "Icon-Plate_Teal.svg",
					rarity: "✨",
					get: "Target Reward, Capture Reward, Break Both Horns, Carve Body & Severed Tail, Drop",
					best: "Break Both Horns, Carve Severed Tail"
				},
				8: {
					name: "Zinogre Jasper",
					icon: "Icon-Ball_Teal.svg",
					rarity: "✨",
					get: "Target Reward, Capture Reward, Break Both Horns, Carve Body & Severed Tail, Drop",
					best: "Capture, Break Both Horns, Carve Severed Tail"
				}
			},
			matspec: {
				exists: 1,
				name: "Fulgurbug",
				icon: "Icon-Bug_Blue.svg",
				get: "Zinogre has a long history of being infested with Fulgurbugs, like a dog having thunder fleas. " +
					"In rise, you can obtain Fulgurbugs through Target Rewards as well as pick them up from Shiny " +
					"drops on the ground. However, an additional way to get them is to search Zinogre while it is " +
					"knocked down, much like in prior games, to obtain Fulgurbugs."
			}
		}
	}
	
	return siteData;
}