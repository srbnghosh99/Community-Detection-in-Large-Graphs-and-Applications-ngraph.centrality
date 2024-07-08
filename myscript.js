var fs = require('fs');
var fromjson = require('ngraph.fromjson');
var centrality = require('ngraph.centrality');
var g = require('ngraph.graph')();






if (process.argv.length < 4) {
  console.log('Usage: node myscript.js <file_name.json>');
  process.exit(1);
}

// Get the command-line argument (file name)
var inputfileName = process.argv[2];
var outputfilename =process.argv[3];
//var measure = process.argv[4];



// Read the JSON file and load the graph
try {
  var jsonContent = fs.readFileSync(inputfileName, 'utf-8');
  g = fromjson(JSON.parse(jsonContent));
} catch (error) {
  console.error('Error reading or parsing the JSON file:', error);
}


/*

// Add nodes and edges
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);

g.addLink(1, 2);
g.addLink(1, 3);
g.addLink(2, 4);
g.addLink(3, 4);


// Let's use the same graph as before:
g.addLink('fortran', 'c');
g.addLink('c', 'c++');
g.addLink('c++', 'perl');
g.addLink('c', 'javascript');
*/

//This will consider graph as undirected:
//var betweenness = centrality.betweenness(g);
/* betweenness centrality is:

{
  "fortran": 0,
  "c": 5,
  "c++": 3,
  "perl": 0,
  "javascript": 0
}
*/

// this will consider graph as directed:
//var directedBetweenness = centrality.betweenness(g, true);

/* directedBetweenness is:
{
  "fortran": 0,
  "c": 3,
  "c++": 2,
  "perl": 0,
  "javascript": 0
}
*/





var closeness = centrality.closeness(g);
var sameAsDegreeCentrality = centrality.degree(g, 'inout');
var betweenness = centrality.betweenness(g);
var inCentrality = centrality.degree(g, 'in');
var outCentrality = centrality.degree(g, 'out');

var nodeCentralityData = {};

// Populate the object with node-wise centrality measures
g.forEachNode(function(node) {
  var nodeId = node.id;

  nodeCentralityData[nodeId] = {
    node: nodeId,
    closeness: closeness[nodeId],
    sameAsDegreeCentrality: sameAsDegreeCentrality[nodeId],
    betweenness: betweenness[nodeId],
    inCentrality: inCentrality[nodeId],
    outCentrality: outCentrality[nodeId]
    // Add other centrality measures as needed
  };
});

// Write the object to a JSON file
var nodeCentralityJson = JSON.stringify(nodeCentralityData, null, 2);
fs.writeFileSync(outputfilename, nodeCentralityJson, 'utf-8');



//var eccentricity = centrality.eccentricity(g);

//var degreeCentrality = centrality.degree(g);
//var inCentrality = centrality.degree(g, 'in');
//var outCentrality = centrality.degree(g, 'out');
//var sameAsDegreeCentrality = centrality.degree(g, 'inout');

/*
console.log("betweenness");
console.log(betweenness);
console.log("directedBetweenness");
console.log(directedBetweenness);
console.log("closeness");
console.log(closeness);
console.log("eccentricity");
console.log(eccentricity);
*/

// Convert the centrality data to a JSON string
//var centralityJson = JSON.stringify(propensity, null, 2); // Optional: prettify JSON with 2 spaces

// Define the file path where you want to save the centrality data
//var outputPath = root + '_betweenness.json';


// Write the centrality data to the file
//fs.writeFileSync(outputfilename, centralityJson, 'utf-8')


/*, (err) => {
  if (err) {
    console.error('Error writing centrality data:', err);
  } else {
    console.log('Centrality data written to', outputPath);

  }


const nodesToInclude = [1, 2];

// Create a subgraph
const subgraph = createGraph();

// Add nodes from the list to the subgraph
nodesToInclude.forEach(nodeId => {
  // Add the node to the subgraph
  subgraph.addNode(nodeId);

  // Get the neighbors of the node from the main graph
  const neighbors = mainGraph.getLinks(nodeId);

  // Add edges to the subgraph
  neighbors.forEach(neighbor => {
    // Add the neighbor node to the subgraph
    subgraph.addNode(neighbor.toId);
    // Add the edge to the subgraph
    subgraph.addLink(nodeId, neighbor.toId);
  });
});
 */
