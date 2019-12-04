function executeProgram(inputProgram) {
    console.log("Start: ", inputProgram);
    executeMemory(0, inputProgram)
}

function executeMemory(pointer, memory) {
    if (memory[pointer] == 1) {
        memory[memory[pointer + 3]] = (memory[memory[pointer + 1]] + memory[memory[pointer + 2]]);
        console.log("Add: ", memory);
        executeMemory(pointer + 4, memory);
    } else if (memory[pointer] == 2) {
        memory[memory[pointer + 3]] = (memory[memory[pointer + 1]] * memory[memory[pointer + 2]]);
        console.log("Multiply: ", memory);
        executeMemory(pointer + 4, memory);
    } else if (memory[pointer] == 99) {
        console.log("Halt: ", memory);
    } else {
        console.log("Unknown code: " + memory[pointer]);
    }
}