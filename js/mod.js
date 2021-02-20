let modInfo = {
	name: "Multiplier Tree",
	id: "funninumbers",
	author: "Oleg",
	pointsName: "points",
	discordName: "Holy Broly#0530",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "The beginning",
}

let changelog = `<h1>Changelog:</h1><br>
	<h4>v0.1.1:</h4>
		- Buffed 3rd expansion milestone to make it less painful for idle players to... Idle. (5% => 25%)<br>
		- Lowered achievements to made 5th achievement's description readable<br>
	<h3>v0.1: The beginning</h3><br>
		- There's currently 3 different layers and achievement layer.<br>
		- That's it. I'm not going to spoil anything else.`

let winText = `Congrats, dude! You have reached the current endgame... at least for now.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1).mul(layers.m.buyables[11].effect()).mul(layers.m.buyables[12].effect()).mul(layers.m.buyables[13].effect()).mul(layers.m.buyables[14].effect()).mul(layers.m.buyables[15].effect())
	if(hasMilestone("e", 3)) gain = gain.mul(player.b.points.div(2).add(1).floor())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() { return "Current softcap: "+formatWhole(new Decimal(1024).sub(player.b.points))+" bits" }
]

// Determines when the game "ends"
function isEndgame() {
	return player.e.points.gte(5)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
