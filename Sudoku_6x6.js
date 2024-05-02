let checkButton = document.getElementById("check-button");
//let sudokuInputs = document.querySelectorAll("#sudoku-table input[type='number']");
function drawBoard() {
    let table = document.getElementById("sudoku-table");
    for (let i = 0; i < 6; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            let cell = row.insertCell();
            let input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.max = 6;
            input.addEventListener("input", enableCheckButton); // Thêm sự kiện input
            //chia các vùng nhỏ 2x3
            if ((i === 0 || i === 1 || i === 4 || i=== 5) && (j === 0 || j === 1 || j === 2)) {
                cell.classList.add("small-grid");
            }
            if ((i === 2 || i === 3 ) && (j === 3 || j === 4 || j === 5)) {
                cell.classList.add("small-grid");
            }
            // Thiết lập giá trị cố định cho các ô
            if ((i === 0 && j === 0)) {
                input.value = 6;
                input.disabled = true; // Không cho phép thay đổi giá trị
                cell.classList.add("fixed"); // Thêm class để tạo kiểu cho ô cố định
            }
            if ((i === 0 && j === 1)) {
                input.value = 2;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 0 && j === 3)) {
                input.value = 5;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 0 && j === 5)) {
                input.value = 3;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 2 && j === 0)) {
                input.value = 5;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 2 && j === 4)) {
                input.value = 3;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 3 && j === 1)) {
                input.value = 6;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 3 && j === 4)) {
                input.value = 2;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 4 && j === 3)) {
                input.value = 3;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 4 && j === 4)) {
                input.value = 4;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 4 && j === 5)) {
                input.value = 6;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 5 && j === 0)) {
                input.value = 3;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            if ((i === 5 && j === 2)) {
                input.value = 6;
                input.disabled = true;
                cell.classList.add("fixed");
            }
            cell.appendChild(input);
        }
    }
}
//kiem tra dieu kien thang
function checkWin() {
    let table = document.getElementById("sudoku-table");
    let isValid = true;

    // Kiểm tra hàng và cột
    for (let i = 0; i < 6; i++) {
        let rowValues = new Set();
        let colValues = new Set();
        for (let j = 0; j < 6; j++) {
            // Kiểm tra hàng
            let rowValue = parseInt(table.rows[i].cells[j].firstChild.value);
            if (rowValues.has(rowValue) || rowValue<1 || rowValue>6 || isNaN(rowValue)) {
                isValid = false;
                break;
            }
            rowValues.add(rowValue);
            if (!isValid) break;
            // Kiểm tra cột
            let colValue = parseInt(table.rows[j].cells[i].firstChild.value);
            if (colValues.has(colValue) /*|| colValue === 0*/) {
                isValid = false;
                break;
            }
            colValues.add(colValue);
            if (!isValid) break;
        }
    }
    // Kiểm tra vùng nhỏ
    for (let k = 0; k < 6; k += 2) {
        for (let l = 0; l < 6; l += 3) {
            let numbers = new Set();
            for (let m = k; m < k + 2; m++) {
                for (let n = l; n < l + 3; n++) {
                    let value = parseInt(table.rows[m].cells[n].firstChild.value);
                    if (numbers.has(value) /*|| value === 0*/) {
                        isValid = false;
                        break;
                    }
                    numbers.add(value);
                }
            }
        }
    }
    // let resultMessage = document.getElementById("result");
    // resultMessage.textContent = isValid ? "Hợp lệ" : "Không hợp lệ";
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
// khoi chay
window.onload = function() {
    drawBoard();
};