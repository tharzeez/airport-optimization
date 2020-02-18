let a = [ 
"BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD", 
]

// to added routes to work correctly ["LGA", "SFO"], ["LGA", "TLV"], ["LGA", "EWR"]

let startingPath = 'BUD'


let routes = [ 
    ["DSM", "ORD"], ["ORD", "BGI"], ["BGI", "LGA"], ["SIN", "CDG"], ["CDG", "SIN"], ["CDG", "BUD"], ["DEL", "DOH"], ["DEL", "CDG"], ["TLV", "DEL"], ["EWR", "HND"], ["HND", "ICN"], ["HND", "JFK"], ["ICN", "JFK"], ["JFK", "LGA"], ["EYW", "LHR"], ["LHR", "SFO"], ["SFO", "SAN"], ["SFO", "DSM"], ["SAN", "EYW"]
]; 

let lengthBeforeAddingAnyRoutes = routes.length;

let adj = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

let depth = []

let allVisited = []


function repeatProcess() {
    function prepareAdjencyMatrix(airports, routesList) {
        for(let i = 0; i< airports.length; i++) {
            for(let j = 0; j<routesList.length; j++) {
                if(routesList[j][0] === airports[i]) { // the starting route and selected airport is same
                    let destinationIndex = airports.indexOf(routesList[j][1]);
                    adj[i][destinationIndex] = 1
                }
            }
        }
    }
        
    function getDepthForIndividual(adjencyRow, visitedArrayParam) {
        let sum  = 0
        for(let j= 0; j < adjencyRow.length; j++) {
            if(adjencyRow[j] === 1 && visitedArray.indexOf(j) === -1) {
                sum = sum + 1
                visitedArrayParam.push(j)
                sum = sum + getDepthForIndividual(adj[j], visitedArrayParam)
            }
            // if(j === adjencyRow.length - 1) {
            //     return sum
            // }
    
        }
        return sum
    }
    
    prepareAdjencyMatrix(a, routes);
    
    for(let i = 0; i < adj.length; i++) {
        visitedArray = []
        visitedArray.push(i)
        depth[i] = getDepthForIndividual(adj[i], visitedArray)
        allVisited.push(visitedArray)
    }
    
}

let counter = 0;

while(depth[a.indexOf(startingPath)] !== 17) {
    // depth

    allVisited = []
    repeatProcess()
    let flag = 0    
    while(flag === 0) {
        let indexOfMaxDepth = depth.indexOf(Math.max(...depth));
        // the indexOfMaxDepth is not in path from starting airport
        if( !allVisited[a.indexOf(startingPath)].includes(indexOfMaxDepth)) {
            routes.push([startingPath, a[indexOfMaxDepth]])
            console.log(startingPath, a[indexOfMaxDepth])
            flag = 1
            ++counter
        } else if (depth[a.indexOf(startingPath)] === a.length - 1) {
            // if reached the maximum goal no need for running the loop again
            break
        } else {
            // if already in the path of the starting airport, no need to consider that.
            depth[indexOfMaxDepth] = 0;
        }
    }

}

console.log(counter);
console.log(depth.toString());
// console.log(routes)

// console.log(routes.slice(lengthBeforeAddingAnyRoutes).toString())

