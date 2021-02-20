addLayer("m", {
    name: "multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5db1db",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "multiplying points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() { return new Decimal(1).div(new Decimal(1024).sub(player.b.points)) }, // Prestige currency exponent
    update(diff) {
    if(hasMilestone("e", 2)) addPoints("m", new Decimal(diff).times(tmp.m.resetGain).div(4))
	},
	gainMult() { // Calculate the multiplier for main currency from bonuses
        multi = new Decimal(1).add(player.b.points)
        return multi
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
		return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for multiplying points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	buyables: {
    rows: 1,
    cols: 6,
    11: {
		title: "2x Point Gain Multiplier",
        cost(x) { return new Decimal(3).pow(new Decimal(player.m.buyables[11]).add(1)).round() },
		effect() { let eff = new Decimal(2)
                   if(hasAchievement("a", 15) && player.m.buyables[11]>=1) eff = eff.mul(1.1)
				   if(hasUpgrade("m", 11) && player.m.buyables[11]>=1) eff = eff.mul(1.02)
				   if(hasUpgrade("m", 22) && player.m.buyables[11]>=1) eff = eff.mul(1.02)
                   return eff.pow(player.m.buyables[11]) },
		display() { return "Multiplies point gain by 2x\nAmount: "+formatWhole(player.m.buyables[11])+"\nEffect: "+format(this.effect())+"x\nCost: "+format(this.cost()) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            player.m.buyables[11] = player.m.buyables[11].add(1)
        },
		style() { return {
                  'width': '112px',
			      'height': '130px',
				  }
		}
    },
    12: {
		title: "3x Point Gain Multiplier",
        cost(x) { return new Decimal(5).pow(new Decimal(player.m.buyables[12]).add(1)).pow(1.1).round() },
		effect() { let eff = new Decimal(3)
                   if(hasAchievement("a", 15) && player.m.buyables[12]>=1) eff = eff.mul(1.1)
				   if(hasUpgrade("m", 11) && player.m.buyables[12]>=1) eff = eff.mul(1.02)
				   if(hasUpgrade("m", 22) && player.m.buyables[12]>=1) eff = eff.mul(1.02)
                   return eff.pow(player.m.buyables[12]) },
        display() { return "Multiplies point gain by 3x\nAmount: "+formatWhole(player.m.buyables[12])+"\nEffect: "+format(this.effect())+"x\nCost: "+format(this.cost()) },
		canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            player.m.buyables[12] = player.m.buyables[12].add(1)
        },
		style() { return {
                  'width': '112px',
			      'height': '130px',
				  }
		}
    },
    13: {
		title: "4x Point Gain Multiplier",
        cost(x) { return new Decimal(8).pow(new Decimal(player.m.buyables[13]).add(1)).pow(1.3).round() },
		effect() { let eff = new Decimal(4)
                   if(hasAchievement("a", 15) && player.m.buyables[13]>=1) eff = eff.mul(1.1)
				   if(hasUpgrade("m", 21) && player.m.buyables[13]>=1) eff = eff.mul(1.08)
				   if(hasUpgrade("m", 22) && player.m.buyables[13]>=1) eff = eff.mul(1.02)
                   return eff.pow(player.m.buyables[13]) },
		display() { return "Multiplies point gain by 4x\nAmount: "+formatWhole(player.m.buyables[13])+"\nEffect: "+format(this.effect())+"x\nCost: "+format(this.cost()) },
		canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            player.m.buyables[13] = player.m.buyables[13].add(1)
        },
		style() { return {
                  'width': '112px',
			      'height': '130px',
				  }
		}
    },
    14: {
		title: "5x Point Gain Multiplier",
        cost(x) { return new Decimal(13).pow(new Decimal(player.m.buyables[14]).add(1)).pow(1.6).round() },
		effect() { let eff = new Decimal(5)
				   if(hasUpgrade("m", 12) && player.m.buyables[14]>=1) eff = eff.mul(1.06)
				   if(hasUpgrade("m", 22) && player.m.buyables[14]>=1) eff = eff.mul(1.02)
                   return eff.pow(player.m.buyables[14]) },
        display() { return "Multiplies point gain by 5x\nAmount: "+formatWhole(player.m.buyables[14])+"\nEffect: "+format(this.effect())+"x\nCost: "+format(this.cost()) },
		canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            player.m.buyables[14] = player.m.buyables[14].add(1)
        },
		style() { return {
                  'width': '112px',
			      'height': '130px',
				  }
		},
		unlocked() { return hasMilestone("e", 0) }
    },
    15: {
		title: "6x Point Gain Multiplier",
        cost(x) { return new Decimal(21).pow(new Decimal(player.m.buyables[15]).add(1)).pow(2).round() },
		effect() { let eff = new Decimal(6)
				   if(hasUpgrade("m", 12) && player.m.buyables[15]>=1) eff = eff.mul(1.06)
				   if(hasUpgrade("m", 22) && player.m.buyables[15]>=1) eff = eff.mul(1.02)
                   return eff.pow(player.m.buyables[15]) },
		display() { return "Multiplies point gain by 6x\nAmount: "+formatWhole(player.m.buyables[15])+"\nEffect: "+format(this.effect())+"x\nCost: "+format(this.cost()) },
		canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            player.m.buyables[15] = player.m.buyables[15].add(1)
        },
		style() { return {
                  'width': '112px',
			      'height': '130px',
				  }
				},
		unlocked() { return hasMilestone("e", 1) }
		},
	},
	upgrades: {
    rows: 2,
    cols: 2,
    11: {
		title: "Early Boost",
        cost() { return new Decimal(60) },
        description() { return "Boosts first two buyables's multiplier by 1.02x" },
		unlocked() { return hasMilestone("e", 1) && !hasUpgrade("m", 12) }
    },
    12: {
		title: "Late Boost",
        cost() { return new Decimal(60) },
        description() { return "Boosts last two buyables's multiplier by 1.06x" },
		unlocked() { return hasMilestone("e", 1) && !hasUpgrade("m", 11) }
    },
    21: {
		title: "Mid Boost",
        cost() { return new Decimal(240) },
        description() { return "Boosts third buyable's multiplier by 1.08x" },
		unlocked() { return hasMilestone("e", 2) }
    },
    22: {
		title: "Jack Boost",
        cost() { return new Decimal(360) },
        description() { return "Boosts all buyables's multiplier by 1.02x" },
		unlocked() { return hasMilestone("e", 2) }
    },
},
	doReset(resettingLayer) {
		if(layers[resettingLayer] !== layers.m) {
			layerDataReset("m")
		}
	}
})

addLayer("a", {
    name: "ass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#71e167",
	tooltip: "Achievements",
	resource: "oof",
	baseResource: "ass",
	baseAmount() {return player.points},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
	tabFormat: ["blank", "blank", "achievements"],
	achievements: {
		rows: 2,
		cols: 6,
		11: {
			name: "Hey, you gotta start with something",
			done() { return player.m.buyables[11]>=1 },
			tooltip: "Get \"2x Point Gain Multiplier\" buyable",
		},
		12: {
			name: "Now kiss",
			done() { return player.m.buyables[12]>=1 },
			tooltip: "Get \"3x Point Gain Multiplier\" buyable",
		},
		13: {
			name: "WANNA SEE PG132 FLY AT YOU AT A MILLION MILES PER HOUR?",
			done() { return player.m.buyables[13]>=1 },
			tooltip: "Get \"4x Point Gain Multiplier\" buyable\nReward: Unlocks new layer.",
		},
		14: {
			name: "Wait, there's more!?",
			done() { return player.e.unlocked == true },
			tooltip: "Commit first expansion reset.",
			unlocked() { return hasAchievement("a", 13) == true },
		},
		15: {
			name: "Can't believe we've reached 4th- [REDACTED]",
			done() { return player.m.buyables[14]>=1 },
			tooltip: "Get \"5x Point Gain Multiplier\" buyable\nReward: First three Point Gain Multiplier buyables are 10% more powerful",
			unlocked() { return hasAchievement("a", 13) == true },
		},
		16: {
			name: "Wise choice.",
			done() { return hasUpgrade("m", 11) || hasUpgrade("m", 12) },
			tooltip: "Choose one of dilemma upgrades",
			unlocked() { return hasAchievement("a", 13) == true },
		},
		21: {
			name: "This is going to be a pain in the ass",
			done() { return player.m.buyables[15]>=1 },
			tooltip: "Get \"6x Point Gain Multiplier\" buyable\nReward: Unlocks new layer.",
			unlocked() { return hasAchievement("a", 13) == true },
		},
		22: {
			name: "Would you like a single bit in this trying time?",
			done() { return player.b.points>=1 },
			tooltip: "Gain your first bit",
			unlocked() { return hasAchievement("a", 21) },
		},
		23: {
			name: "8 funkin' minutes later",
			done() { return player.e.points>=4 },
			tooltip: "Have 4 expansion points",
			unlocked() { return hasAchievement("a", 21) },
		},
}
})

addLayer("e", {
    name: "expansion", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#e1bb1b",
    requires() {let cost = new Decimal(400000)
				return cost}, // Can be a function that takes requirement increases into account
    resource: "expansion points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 27,
    exponent: 1.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "E: Reset for expansion points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return hasAchievement("a", 13) },
	milestones: {
		0: {
			requirementDescription: "1 expansion point",
			effectDescription: "Unlocks 4th M buyable",
			done() { return player.e.points.gte(1) }
		},
		1: {
			requirementDescription: "2 expansion point",
			effectDescription: "Unlocks 5th M buyable and upgrade dilemma",
			done() { return player.e.points.gte(2) }
		},
		2: {
			requirementDescription: "3 expansion point",
			effectDescription: "Passively generates 25% mp/s and adds 2 more upgrades",
			done() { return player.e.points.gte(3) }
		},
		3: {
			requirementDescription: "4 expansion point",
			effectDescription: "Even bits multiplies point gain and odd bits decreases bit's cost",
			done() { return player.e.points.gte(4) }
		},
		4: {
			requirementDescription: "5 expansion point",
			effectDescription: "There's nothing beyond the endgame.",
			done() { return player.e.points.gte(5) }
		}
	},
	doReset(resettingLayer) {
		if(layers[resettingLayer].row == "side") {
			layerDataReset("m")
		}
	}
})

addLayer("b", {
    name: "bit", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	effectDescription() { return "lowering softcap by -"+formatWhole(player.b.points)+" bits and increasing multiplying point base gain by +"+format(player.b.points) },
    color: "#7F7F7F",
    requires() {let cost = new Decimal(126000000)
				if(hasMilestone("e", 3)) cost = cost.div(player.b.points.div(2).add(1).ceil())
				return cost},
	resource: "bits", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 1.64,
    exponent: 1.64, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bits", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
