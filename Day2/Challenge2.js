var baseProgram = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 10, 19, 1, 9, 19, 23, 1, 13, 23, 27, 1, 5, 27, 31, 2, 31, 6, 35, 1, 35, 5, 39, 1, 9, 39, 43, 1, 43, 5, 47, 1, 47, 5, 51, 2, 10, 51, 55, 1, 5, 55, 59, 1, 59, 5, 63, 2, 63, 9, 67, 1, 67, 5, 71, 2, 9, 71, 75, 1, 75, 5, 79, 1, 10, 79, 83, 1, 83, 10, 87, 1, 10, 87, 91, 1, 6, 91, 95, 2, 95, 6, 99, 2, 99, 9, 103, 1, 103, 6, 107, 1, 13, 107, 111, 1, 13, 111, 115, 2, 115, 9, 119, 1, 119, 6, 123, 2, 9, 123, 127, 1, 127, 5, 131, 1, 131, 5, 135, 1, 135, 5, 139, 2, 10, 139, 143, 2, 143, 10, 147, 1, 147, 5, 151, 1, 151, 2, 155, 1, 155, 13, 0, 99, 2, 14, 0, 0];

function executeProgram(inputProgram) {
    //console.log("Start: ", inputProgram);
    executeMemory(0, inputProgram)
}

function executeMemory(pointer, memory) {
    if (memory[pointer] == 1) {
        memory[memory[pointer + 3]] = (memory[memory[pointer + 1]] + memory[memory[pointer + 2]]);
        //console.log("Add: ", memory);
        executeMemory(pointer + 4, memory);
    } else if (memory[pointer] == 2) {
        memory[memory[pointer + 3]] = (memory[memory[pointer + 1]] * memory[memory[pointer + 2]]);
        //console.log("Multiply: ", memory);
        executeMemory(pointer + 4, memory);
    } else if (memory[pointer] == 99) {
        //console.log("Halt: ", memory);
    } else {
        console.log("Unknown code: " + memory[pointer]);
    }
}

function findOutput(desiredOutput) {
    console.log("Starting");
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            var program = [...baseProgram];
            program[1] = noun;
            program[2] = verb;
            executeProgram(program);

            if (program[0] == desiredOutput) {
                console.log("Noun: " + noun + " Verb: " + verb);
                console.log(100 * noun + verb);
            }
        }
    }
    console.log("Complete");
}