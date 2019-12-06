/*
var mockInput = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN";
var input = ParseInput(mockInput);
var orbitRelations = GetOrbitRelations(input);
console.log("Total orbits: ", CountTotalOrbits(orbitRelations));
findShortestPath(orbitRelations["YOU"], orbitRelations["SAN"]);
*/

GetInput();

function findShortestPath(Object1, Object2) {
    var commonPlanet = undefined;
    var connectionDistance = -1;
    var obj1Indirect = Object1.indirectOrbit;
    for (let i = 0; i < obj1Indirect.length; i++) {
        var obj2Indirect = Object2.indirectOrbit;
        for (let j = 0; j < obj2Indirect.length; j++) {
            if (obj1Indirect[i].name == obj2Indirect[j].name) {
                //console.log(obj1Indirect[i].name, obj2Indirect[j].name, obj1Indirect[i].indirectOrbit.length);
                if (commonPlanet == undefined ||
                    commonPlanet.indirectOrbit.length < obj1Indirect[i].indirectOrbit.length
                ) {
                    commonPlanet = obj1Indirect[i];
                    connectionDistance = i + j + 2;
                }
            }
        }
    }

    console.log("Found common planet: ", commonPlanet, connectionDistance);
}

function CountTotalOrbits(orbitRelations) {
    var totalOrbits = 0;

    for (var planet in orbitRelations) {
        //console.log(orbitRelations[planet]);

        if (orbitRelations[planet].directOrbit != undefined)
            totalOrbits++;

        if (orbitRelations[planet].indirectOrbit != undefined)
            totalOrbits += orbitRelations[planet].indirectOrbit.length;
    }

    return totalOrbits;
}

function ParseInput(input) {
    var inputLines = input.split("\n");
    for (let i = 0; i < inputLines.length; i++) {
        inputLines[i] = inputLines[i].split(")");
    }

    return inputLines;
}

function AddDirectOrbit(objectToAdd, objectToOrbit) {
    objectToOrbit.directOrbit = objectToAdd;
}

function AddIndirectOrbits(objectToAdd, objectToOrbit) {
    if (objectToAdd == undefined) {
        console.log("huh?, ", objectToAdd, objectToOrbit)
    }
    while (objectToAdd.directOrbit != undefined) {
        objectToOrbit.indirectOrbit.push(objectToAdd.directOrbit);
        objectToAdd = objectToAdd.directOrbit;
    }
}

function GetOrbitRelations(orbitData) {
    var orbitRelations = {};

    // Add direct orbits 
    for (let i = 0; i < orbitData.length; i++) {
        if (orbitData[i] == undefined || orbitData[i][0] == "")
            continue;

        if (orbitRelations[orbitData[i][0]] == undefined)
            orbitRelations[orbitData[i][0]] = {
                name: orbitData[i][0],
                indirectOrbit: []
            };
        if (orbitRelations[orbitData[i][1]] == undefined)
            orbitRelations[orbitData[i][1]] = {
                name: orbitData[i][1],
                indirectOrbit: []
            };

        AddDirectOrbit(
            orbitRelations[orbitData[i][0]],
            orbitRelations[orbitData[i][1]]
        );
    }

    // Add indirect orbits
    for (let i = 0; i < orbitData.length; i++) {
        if (orbitData[i] == undefined || orbitData[i][0] == "")
            continue;

        AddIndirectOrbits(
            orbitRelations[orbitData[i][0]],
            orbitRelations[orbitData[i][1]]
        );
    }

    return orbitRelations;
}

function GetInput() {
    var Http = new XMLHttpRequest();
    var inputDataURL = '/2019/day/6/input';
    Http.open("GET", inputDataURL);
    Http.send();
    console.log("Fetching input data.");
    Http.onreadystatechange = (e) => {
        if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
            console.log("Running calculations.")
            var orbitRelations = GetOrbitRelations(ParseInput(Http.responseText));
            console.log("Total orbits: ", CountTotalOrbits(orbitRelations));
            findShortestPath(orbitRelations["YOU"], orbitRelations["SAN"]);
        }
    }
}