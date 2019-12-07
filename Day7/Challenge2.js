
var baseProgram = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 46, 59, 84, 93, 110, 191, 272, 353, 434, 99999, 3, 9, 101, 2, 9, 9, 102, 3, 9, 9, 1001, 9, 5, 9, 102, 4, 9, 9, 1001, 9, 4, 9, 4, 9, 99, 3, 9, 101, 3, 9, 9, 102, 5, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 4, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 102, 2, 9, 9, 1001, 9, 3, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 1001, 9, 5, 9, 1002, 9, 3, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99];
var programState = [];
var exitMode = {
    Halt: 0,
    Exception: 1,
    Input: 2,
    Output: 3
}
var ampName = ["A", "B", "C", "D", "E"];

function runAmplification(sequence) {
    var ampValue = 0;
    var maxIteration = 1000;
    //boot each one and run first round
    for (let i = 0; i < sequence.length; i++) {
        programState[i] = {};
        programOutput = ExecuteProgram(baseProgram, [sequence[i], ampValue], programState[i], ampName[i]);

        if (programOutput[0] == exitMode.Halt) {
            return programOutput[1];
        } else if (programOutput[0] == exitMode.Output) {
            ampValue = programOutput[1];
            programState[i] = programOutput[2];
        }
        maxIteration--;
    }

    //Run as many rounds as we need, I guess
    while (maxIteration > 0) {
        for (let i = 0; i < sequence.length; i++) {
            programOutput = ExecuteProgram(baseProgram, [ampValue], programState[i]);

            if (programOutput[0] == exitMode.Halt) {
                return ampValue;
            } else if (programOutput[0] == exitMode.Output) {
                ampValue = programOutput[1];
                programState[i] = programOutput[2];
            }
        }
        maxIteration--;
    }
}

var maxSeen = 0;
var maxSequence = [];
for (let Pos1Value = 0; Pos1Value < 5; Pos1Value++) {
    for (let Pos2Value = 0; Pos2Value < 4; Pos2Value++) {
        for (let Pos3Value = 0; Pos3Value < 3; Pos3Value++) {
            for (let Pos4Value = 0; Pos4Value < 2; Pos4Value++) {
                var possibleOptions = [5, 6, 7, 8, 9];
                var sequence = [
                    possibleOptions.splice(Pos1Value, 1),
                    possibleOptions.splice(Pos2Value, 1),
                    possibleOptions.splice(Pos3Value, 1),
                    possibleOptions.splice(Pos4Value, 1),
                    possibleOptions[0]
                ];

                sequenceOutput = runAmplification(sequence);
                //console.log(sequenceOutput, "" + sequence[0] + sequence[1] +
                //sequence[2] + sequence[3] + sequence[4]);
                if (sequenceOutput > maxSeen) {
                    maxSeen = sequenceOutput;
                    maxSequence = "" + sequence[0] + sequence[1] +
                        sequence[2] + sequence[3] + sequence[4];
                }
            }
        }
    }
}
console.log("Max: " + maxSeen, maxSequence);


function ExecuteProgram(program, input, state, ampName) {
    //console.log("Input state: ", state);
    if (state.memory == undefined) {
        state = {
            memory: [...program],
            pointer: 0,
            ampName: ampName
        };
    } else {
        //console.log("Resumed state", state);
    }

    var memory = state.memory;
    var pointer = state.pointer;

    var abort = false;
    const ImmediateMode = 1, PositionMode = 0;

    return Tick();

    function GetValue(mode, intValue) {
        if (mode === ImmediateMode) {
            //console.log("ImmediateMode: " + intValue);
            return intValue;
        } else if (mode === PositionMode) {
            if (memory[intValue] == undefined) {
                console.log(memory, pointer);
                abort = [exitMode.Exception, "Invalid memory position: " + intValue];
            } else {
                //console.log("PositionMode: " + memory[intValue]);
                return memory[intValue];
            }
        } else {
            abort = [exitMode.Exception, "Invalide mode: " + mode];
        }
    }

    function Tick() {
        var mode = [0, 0, 0];

        if (abort !== false) {
            if (abort[0] != exitMode.Halt) {
                //console.log("[Abort] " + ampName + ": " + abort);
                state.memory = memory;
                state.pointer = pointer;
                abort.push(state);
            }
            return abort;
        }
        var runCode = memory[pointer];
        //console.log("Reading: ", memory[pointer], pointer);
        if (runCode > 10000) {
            runCode -= 10000;
            mode[2] = ImmediateMode;
        }

        if (runCode > 1000) {
            runCode -= 1000;
            mode[1] = ImmediateMode;
        }

        if (runCode > 100) {
            runCode -= 100;
            mode[0] = ImmediateMode;
        }
        //console.log("mode: ", mode);
        if (runCode == 1) {
            // Add
            memory[memory[pointer + 3]] =
                GetValue(mode[0], memory[pointer + 1]) +
                GetValue(mode[1], memory[pointer + 2]);

            pointer += 4;
        } else if (runCode == 2) {
            // Multiply
            memory[memory[pointer + 3]] =
                GetValue(mode[0], memory[pointer + 1]) *
                GetValue(mode[1], memory[pointer + 2]);

            pointer += 4;
        } else if (runCode == 3) {

            // Input
            if (input === undefined) {
                abort = [exitMode.Input, "Waiting for input: Input(123)"];
            } else if (Array.isArray(input)) {
                memory[memory[pointer + 1]] = parseInt(input.shift());
                //console.log("Reading input: " + memory[memory[pointer + 1]]);
                pointer += 2;
            } else {
                memory[memory[pointer + 1]] = input;
                input = undefined;
                pointer += 2;
            }
        } else if (runCode == 4) {
            //console.log("Set output to " + GetValue(mode[0], memory[pointer + 1]));
            abort = [exitMode.Output, GetValue(mode[0], memory[pointer + 1])];
            pointer += 2;
        } else if (runCode == 5) {
            if (GetValue(mode[0], memory[pointer + 1]) > 0) {
                pointer = GetValue(mode[1], memory[pointer + 2]);
            } else {
                pointer += 3;
            }
        } else if (runCode == 6) {
            if (GetValue(mode[0], memory[pointer + 1]) == 0) {
                pointer = GetValue(mode[1], memory[pointer + 2]);
            } else {
                pointer += 3;
            }
        } else if (runCode == 7) {
            if (GetValue(mode[0], memory[pointer + 1]) < GetValue(mode[1], memory[pointer + 2])) {
                memory[memory[pointer + 3]] = 1;
            } else {
                memory[memory[pointer + 3]] = 0;
            }
            pointer += 4;
        } else if (runCode == 8) {
            if (GetValue(mode[0], memory[pointer + 1]) == GetValue(mode[1], memory[pointer + 2])) {
                memory[memory[pointer + 3]] = 1;
            } else {
                memory[memory[pointer + 3]] = 0;
            }
            pointer += 4;
        } else if (runCode == 99) {
            abort = [exitMode.Halt, "Halt"];
        } else {
            abort = [exitMode.Exception, "Unknown code: " + memory[pointer]];
            console.log(memory, pointer);
        }

        return Tick();
    }
}