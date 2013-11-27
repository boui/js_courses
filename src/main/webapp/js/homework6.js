function Table(selector, xn, yn) {
    var xsize = xn;
    var ysize = yn;
    var position = {x: 0, y: 0};
    var domTable = null;
    var domSelected;


    var init = function init() {
        var table = document.createElement("table");
        var tableBody = document.createElement("tbody");
        for (var i = 0; i < xsize; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < ysize; j++) {
                var col = document.createElement("td");
                row.appendChild(col);
            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        var dom = document.querySelector(selector);
        dom.appendChild(table);
        domTable = table;
        domSelected = domTable.rows[0].cells[0];
        selectPosition(0, 0);
    }

    var clearCurrentPosition = function clearCurrentPosition() {
        if (!domSelected) {
            return;
        }
        domSelected.classList.remove("selected");
    }

    var selectPosition = function selectPosition(x, y) {
        domSelected.classList.add("selected");
        position.x = x;
        position.y = y;
    }

    var move = function move(dx, dy) {
        var newX = position.x + dx;
        var newY = position.y + dy;

        clearCurrentPosition();

        if (newX < 0 || newX > xsize) return;
        if (newY < 0 || newY > ysize) {
            domSelected = domTable.rows[position.x];
        } else {
            domSelected = domTable.rows[newX].cells[newY];
        }

        selectPosition(newX, newY)
    }

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 40:
                move(0, -1);
                break;
            case 37:
                move(-1, 0);
                break;
            case 38:
                move(0, 1);
                break;
            case 39:
                move(1, 0);
                break;
            default:
                return false;
        }
    }

    this.init = init.bind(this);
//    <стрелка влево> - перемещение выделения на ячейку слева/перемещение выделения на ряд
//    (в случае, если была выделена первая ячейка ряда)
//        <стрелка вправо> - перемещение выделения на ячейку справа/перемещение выделения на первую ячейку ряда
//        (в случае, если был выделен весь ряд)
//            <стрелка вверх> - перемещение выделения на ячейку сверху/перемещение выделения на таблицу
//            (в случае, если был выделен первый ряд)
//                <стрелка вниз> - перемещение выделения на ячейку снизу/перемещение выделения на первый ряд
//                (в случае, если была выделена таблица)
//
//                Редактирования:
//                    <Enter> - добавление рядка
//                        <Shift>+<Enter> - добавление колонки
//                            <Delete> - удаление рядка
//                                <Shift>+<Delete> - удаление колонки
}


(new Table("#lolypop", 10, 10)).init();