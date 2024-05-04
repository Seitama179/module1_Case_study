let constNumber = [
    [0, 0, 1], [0, 3, 8], [0, 5, 6],
    [1, 4, 3], [1, 8, 7],
    [2, 1, 6], [2, 3, 4], [2, 6, 2], [2, 8, 5],
    [3, 3, 5], [3, 6, 9],
    [4, 0, 2], [4, 3, 9], [4, 5, 3], [4, 8, 4],
    [5, 2, 5], [5, 5, 1],
    [6, 0, 3], [6, 2, 4], [6, 5, 2], [6, 7, 1],
    [7, 0, 9], [7, 4, 8],
    [8, 3, 1], [8, 5, 7], [8, 8, 8]
];
let startButton = document.getElementById("start");
let checkButton = document.getElementById("check-button");
function drawBoard() {
    let table = document.getElementById("sudoku-table");
    for (let i = 0; i < 9; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 9; j++) {
            let cell = row.insertCell();
            let input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.max = 9;
            input.addEventListener("input", enableCheckButton);
            for (let k = 0; k < constNumber.length; k++) {
                if (constNumber[k][0] === i && constNumber[k][1] === j) {
                    // Nhập toạ độ số cho sẵn vào bảng
                    input.value = constNumber[k][2];
                    input.disabled = true;
                    cell.classList.add("fixed");
                    break;
                }
            }
            cell.appendChild(input);
        }
    }
}
function startPlay() {
    drawBoard();
    startButton.disabled = true;
}
//kiem tra dieu kien thang
function checkWin() {
    let table = document.getElementById("sudoku-table");
    let isValid = true;
    // Kiểm tra hàng và cột
    for (let i = 0; i < 9; i++) {
        let rowValues = new Set();
        let colValues = new Set();
        for (let j = 0; j < 9; j++) {
            // Kiểm tra hàng
            let rowValue = parseInt(table.rows[i].cells[j].firstChild.value);
            if(rowValue<1 || rowValue>9 || isNaN(rowValue)) {
                isValid = false;
                break;
            }
            if (rowValues.has(rowValue)) {
                isValid = false;
                break;
            }
            rowValues.add(rowValue);
            if (!isValid) break;
            // Kiểm tra cột
            let colValue = parseInt(table.rows[j].cells[i].firstChild.value);
            if (colValues.has(colValue)) {
                isValid = false;
                break;
            }
            colValues.add(colValue);
            if (!isValid) break;
        }
    }
    // Kiểm tra vùng nhỏ
    for (let k = 0; k < 9; k += 3) {
        for (let l = 0; l < 9; l += 3) {
            let numbers = new Set();
            for (let m = k; m < k + 3; m++) {
                for (let n = l; n < l + 3; n++) {
                    let value = parseInt(table.rows[m].cells[n].firstChild.value);
                    if (numbers.has(value)) {
                        isValid = false;
                        break;
                    }
                    numbers.add(value);
                }
            }
        }
    }
    if(isValid) {
        alert("Bạn đã thắng trò chơi!");
        disableInputs();
        disableCheckButton();
    } else {
        alert("Chưa chính xác, hãy kiểm tra kỹ lại");
        disableCheckButton();
    }
}
//ngưng nhập số khi đã đúng
function disableInputs() {
    let inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(function(input) {
        input.disabled = true;
    });
}
// Vô hiệu hóa nút kiểm tra
function disableCheckButton() {
    checkButton.disabled = true;
}
// Cho phép nút kiểm tra
function enableCheckButton() {
    checkButton.disabled = false;
}

