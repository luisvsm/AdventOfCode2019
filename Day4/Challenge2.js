var min = 246540;
var max = 787419;

function IsValidGuess(inputNumber) {
    numString = inputNumber.toString();
    var hasDouble = false;
    var repeatCount;

    for (let i = 0; i < numString.length - 1; i++) {
        repeatCount = 1;
        while (numString[i] == numString[i + 1]) {
            repeatCount++;
            i++;
            if (numString[i] > numString[i + 1]) {
                return false;
            }
        }

        if (repeatCount == 2)
            hasDouble = true;

        if (numString[i] > numString[i + 1]) {
            return false;
        }
    }

    return hasDouble;
}

function BruteForcePosibilities(min, max) {
    var validGuesses = 0;

    for (let i = min; i < max; i++) {
        if (IsValidGuess(i)) {
            validGuesses++;
        }
    }

    return validGuesses;
}

// BruteForcePosibilities(min, max);