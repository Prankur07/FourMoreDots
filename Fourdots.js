// playerone Data
var player1 = prompt("Enter Player One's name, You will be Blue.");
var player1Color = 'rgb(86, 151, 255)';

// player two data
var player2 = prompt("Enter Player Two's name, You will be Red.");
var player2Color = 'rgb(237, 45, 73)';

var gameon = true;
var table = $("table tr");

// function to report win of a person for debugging purpose.
function reportWin(rowNum, colNum) {
    console.log("You won Starting at this row and column");
    console.log(rowNum);
    console.log(colNum);
}

//function to change color of button
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

//function to report color of button
function reportColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//function to check bottom 
function checkBottom(colIndex) {
    var colorreport = reportColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorreport = reportColor(row, colIndex);
        if (colorreport === 'rgb(128, 128, 128)') {
            return row;
        }
    }
}

//function to check colormatch
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

//function to horizontal win check
function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (col = 0; col < 4; col++) {
            if (colorMatchCheck(reportColor(row, col), reportColor(row, col + 1), reportColor(row, col + 2), reportColor(row, col + 3))) {
                console.log("Horizontal win");
                reportWin(row, col);
                return true;
            }
            else
                continue;
        }
    }
}

//function for vertical win check
function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (row = 0; row < 3; row++) {
            if (colorMatchCheck(reportColor(row, col), reportColor(row + 1, col), reportColor(row + 2, col), reportColor(row + 3, col))) {
                console.log("vertical win");
                reportWin(row, col);
                return true;
            }
            else
                continue;
        }
    }
}

//function to diaogonal win check
function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (row = 0; row < 7; row++) {
            if (colorMatchCheck(reportColor(row, col), reportColor(row + 1, col + 1), reportColor(row + 2, col + 2), reportColor(row + 3, col + 3))) {
                console.log("diagonal win");
                reportWin(row, col);
                return true;
            }
            else if (colorMatchCheck(reportColor(row, col), reportColor(row - 1, col + 1), reportColor(row - 2, col + 2), reportColor(row - 3, col + 3))) {
                console.log("diagonal win");
                reportWin(row, col);
                return true;
            }
            else
                continue;
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
var win=false;

$("#statusbar").text(player1 + " Now it's your Turn, Pick a column to drop in!");

// game start from here
$(".board button").on("click", function () {
    
    if(win===false){
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
    {
        $("#statusbar").text(currentName + "You have won!");
        $('h2').fadeOut("fast");
        $('h6').fadeOut("fast");
        win=true;
        $('.startButton').removeAttr('hidden');
    }

    currentPlayer = currentPlayer *-1;
    if(currentPlayer===1 && win===false)
    {
        currentName=player1;
        $("#statusbar").text(currentName + " Now it's your Turn, Pick a column to drop in!");
        currentColor=player1Color;
    }
    else if(currentPlayer===-1 && win===false)
    {
        currentName=player2;
        $("#statusbar").text(currentName + " Now it's your Turn, Pick a column to drop in!");
        currentColor=player2Color;
    }
}
})

// restart the game
$(".restart").on("click",function()
{
    location.reload();
}
);