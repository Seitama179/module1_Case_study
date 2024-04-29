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
    //kiểm tra giá trị trong khoảng 1-6
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if(table.rows[i].cells[j].firstChild.value < 1 || table.rows[i].cells[j].firstChild.value > 6) {
                isValid = false;
                break;
            }
        }

    }
    // Kiểm tra hàng và cột
    for (let i = 0; i < 6; i++) {
        let rowValues = new Set();
        let colValues = new Set();
        for (let j = 0; j < 6; j++) {
            // Kiểm tra hàng
            let rowValue = parseInt(table.rows[i].cells[j].firstChild.value);
            if (rowValues.has(rowValue) || rowValue === 0) {
                isValid = false;
                break;
            }
            rowValues.add(rowValue);
            if (!isValid) break;
            // Kiểm tra cột
            let colValue = parseInt(table.rows[j].cells[i].firstChild.value);
            if (colValues.has(colValue) || colValue === 0) {
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
                    if (numbers.has(value) || value === 0) {
                        isValid = false;
                        break;
                    }
                    numbers.add(value);
                }
            }
        }
    }
    let resultMessage = document.getElementById("result");
    resultMessage.textContent = isValid ? "Hợp lệ" : "Không hợp lệ";
}
// khoi chay
window.onload = function() {
    drawBoard();
};