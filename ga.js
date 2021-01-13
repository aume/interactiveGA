// ga.js
// genetic algorithm script for COSC 114
// digitalmedia.ok.ubc.ca/courses/cosc114
//

// initialization genome length and initial population size and num bits in a gene
function ga(populationSize, genomeLength) {
	
	this.populationSize = populationSize ;
	this.geneLength = 8 ; // num of bits in a gene
	this.maxValue = 0xFF ; // set the max val of a gene
	// set up the initial random population
	this.population = [] ;
	for (var i = 0; i < populationSize; i++) {
		let individual = [] ;
		// push a random int into genome
		for (var gene = 0; gene < genomeLength; gene++) {
			individual.push(Math.floor(Math.random()*this.maxValue)) ;
		}
		this.population.push(individual) ;
	}
}

ga.prototype.getPopulation = function() {
	return this.population ;
};

// run a generation and return empoch with num individuals
ga.prototype.epoch = function(individualA, individualB) {
	let newPopulation = [] ;
	while(newPopulation.length < this.populationSize) {
		// pick two
		let newbies = this.crossover(individualA,individualB,rand(0.1, 0.9)) ;
		newPopulation.push(newbies) ;
	}
	return newPopulation ;
}

// perfrom crossover function on g1 and g2 at point 0.0-1.0   
ga.prototype.crossover = function(g1, g2, point) {
	// slice point in the array
	point = Math.floor(g1.length*point) ; 
	// cut up the parents genomes
	let parent1X = g1.slice(0,point) ;
	let parent1Y = g2.slice(point) ;
	// concat them for the child
	let offSpring1 = parent1X.concat(parent1Y) ;
	return this.mutation(offSpring1) ;
};

// mutation function to randomly flip a bit in a genome
ga.prototype.mutation = function(genome) {
	// go along genome
	for (var gene = 0; gene < genome.length; gene++) {
		// go along gene
		for (var bitNum = 0; bitNum < this.geneLength; bitNum++) {
			// mutation probability
			if(Math.random() < 0.1) { 
				let flipBit = 1 << bitNum ; // shift bit left num places
				genome[gene] ^= flipBit ; // xor at the bot position (flip)
			}
		}
	}
	return genome ;
};


// utility function


function rand(min, max) {
    return Math.random() * (max - min) + min;
}