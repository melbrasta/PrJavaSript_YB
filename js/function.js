//Spiel
function neuesLevel() {
    start_time = new Date().getTime();
    let dim = document.getElementById('dimensions').value;
    if (dim > 20) {
        alert("nicht übertreiben. Bei 20 ist Schluss");
        document.getElementById('dimensions').value = 20;
        dim = 20;
    }

    let grid = new Grid(cvs, dim);
    let maze = createMaze(grid);
    let player1 = new Player("player1", maze.start_field, 3);   //später ändern: Farbe brauch ich nicht mehr. Dafür aber Leben
    const enemy1 = new Enemy("enemy1", enemypos = getRandomField(grid, maze));
    player1.playerImage.onload = () => {
        player1.drawPlayerPosition(grid);
    }
    enemy1.enemyImage.onload = () => {
        enemy1.drawEnemyPosition(grid);
    }
    clear(ctx);
    maze.flat().forEach(field => field.drawField(grid))
    player1.drawPlayerPosition(grid);
    enemy1.drawEnemyPosition(grid);
    Punkte = 0;
    document.getElementById('punkte').value = "Punkte: 00"
    return {player: player1, enemy: enemy1, grid: grid, maze: maze}    // player und grid zurück geben, sodass man es überall hat (in der variable game)


}

function gameend() {
    document.getElementById('punkte').value = Punkte;
    alert("Geschafft. Du hast den blauen badnam gefangen" + "\nDu hast " + Punkte + " Punkte erreicht.\nDabei hattest du noch " + game.player.lives + " Leben über");
    game = neuesLevel();

}


function clear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

//Zeit
function displayTime(input_field) {

    current_time = new Date().getTime();


    let delta_t = parseInt((current_time - start_time) / 1000);
    let delta_m = parseInt(delta_t / 60);
    let delta_s = delta_t % 60;

    delta_m = delta_m < 10 ? ("0" + delta_m) : delta_m;
    delta_s = delta_s < 10 ? ("0" + delta_s) : delta_s;

    let zeittext = `Zeit ${delta_m}:${delta_s}`;
    input_field.value = zeittext

    if (delta_s == 10) {
        alert("Du warst leider zu langsam. Versuch es nochmal");
        game = neuesLevel();
    }
}


// Punkte
function score_move() {
    Punkte += 5;
    document.getElementById('punkte').value = "Punkte: " + Punkte;
}

function score_less() {
    Punkte -= 50;
    document.getElementById('punkte').value = "Punkte: " + Punkte;
}


function score_time() {
    Punkte -= 20;
    document.getElementById('punkte').value = "Punkte: " + Punkte;
}

// Movements
function keyDown(evt) {
    let defined_keys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]
    /*
      // funktioniert zwar aber gibt probleme beim neuzeichnen
      if (evt.key == defined_keys[0])
      {
        game.player.playerImage.src = 'img/capnam_o.png';
      }

      if (evt.key == defined_keys[1])
      {
        game.player.playerImage.src = 'img/capnam.png';
      }

      if (evt.key == defined_keys[2])
      {
        game.player.playerImage.src = 'img/capnam_u.png';
      }

      if (evt.key == defined_keys[3])
      {
        game.player.playerImage.src = 'img/capnam_l.png';
      }

    */
    // hier habe ich einen bewegungs counter eingefügt (bewegung++) und der wird nur ausgeführt, wenn "move" ausgeführt wird.

    if (defined_keys.includes(evt.key)) {
        let direction = defined_keys.indexOf(evt.key);

        game.player.move(game.grid, direction);   //konnte bisher nicht auf den player1 zugreifen. daher jetzt game.player. Danach grid aus der Variable game genommen (game.grid)
        game.enemy.move(game.grid, direction);
        game.enemy.move(game.grid, direction); // Für jeden Knopfdruck macht der Gegner die doppelte Anzahl an Bewegungen


        // das html input feld mit der id "zuege" soll den Wert von bewegungen bekommen!!  id ansprechen
        document.getElementById('zuege').value = game.player.steps_done + " Zuege gemacht";
        evt.preventDefault();
    }
}

//Maze erstellung
function createMaze(grid) {

    let visited_fields = [];
    let stack = [];

    let total_fields = grid.number_of_fields ** 2;
    let current_field = parseInt(Math.random() * total_fields);

    let xpos = parseInt(current_field % grid.number_of_fields) * grid.field_width;
    let ypos = parseInt(current_field / grid.number_of_fields) * grid.field_height;

    let field_array = new Array(grid.number_of_fields).fill(0).map(a => new Array(grid.number_of_fields).fill(0));


    let current_coord = grid.getCoordinateFromId(current_field);

    field_array[current_coord.y][current_coord.x] = new Field(current_field);

    let start_field = field_array[current_coord.y][current_coord.x];
    visited_fields.push(current_field);
    stack.push(current_field);


    // Backtrack
    while (stack.length > 0) {

        let possible_direction = getDirections(grid, current_field, visited_fields);
        if (possible_direction.every(item => item === false)) {
            current_field = stack.pop();
            continue;
        }

        let target_field = false;
        let direction = -1;

        while (target_field === false) {
            direction = parseInt(Math.random() * possible_direction.length);
            target_field = possible_direction[direction];
        }

        current_coord = grid.getCoordinateFromId(current_field);
        target_coord = grid.getCoordinateFromId(target_field);

        field_array[target_coord.y][target_coord.x] = new Field(target_field, grid);


        switch (direction) {
            case MOVE_NORTH:
                field_array[current_coord.y][current_coord.x].setNorth(field_array[target_coord.y][target_coord.x]);
                field_array[target_coord.y][target_coord.x].setSouth(field_array[current_coord.y][current_coord.x]);

                break;

            case MOVE_EAST:
                field_array[current_coord.y][current_coord.x].setEast(field_array[target_coord.y][target_coord.x]);
                field_array[target_coord.y][target_coord.x].setWest(field_array[current_coord.y][current_coord.x]);
                break;


            case MOVE_SOUTH:
                field_array[current_coord.y][current_coord.x].setSouth(field_array[target_coord.y][target_coord.x]);
                field_array[target_coord.y][target_coord.x].setNorth(field_array[current_coord.y][current_coord.x]);
                break;

            case MOVE_WEST:
                field_array[current_coord.y][current_coord.x].setWest(field_array[target_coord.y][target_coord.x]);
                field_array[target_coord.y][target_coord.x].setEast(field_array[current_coord.y][current_coord.x]);
                break;

        }


        visited_fields.push(target_field);
        stack.push(target_field);
        current_field = target_field;

    }


// teleport am Rand

    field_array[0][0].neighbors[MOVE_NORTH] = field_array[field_array.length - 1] [0];	//von oben links nach unten links
    field_array[0][0].neighbors[MOVE_WEST] = field_array[0] [field_array.length - 1];	//von oben links nach oben rechts

    field_array[field_array.length - 1][0].neighbors[MOVE_SOUTH] = field_array[0] [0];	// von unten links nach oben links
    field_array[field_array.length - 1][0].neighbors[MOVE_WEST] = field_array[field_array.length - 1] [field_array.length - 1];	// von unten links nach unten rechts

    field_array[field_array.length - 1][field_array.length - 1].neighbors[MOVE_EAST] = field_array[field_array.length - 1] [0];	// von unten rechts nach unten links
    field_array[field_array.length - 1][field_array.length - 1].neighbors[MOVE_SOUTH] = field_array[0] [field_array.length - 1];	// von unten rechts nach oben rechts

    field_array[0] [field_array.length - 1].neighbors[MOVE_NORTH] = field_array[field_array.length - 1] [field_array.length - 1];	//von oben rechts nach unten rechts
    field_array[0] [field_array.length - 1].neighbors[MOVE_EAST] = field_array[0] [0];											//von oben rechts nach oben links


//zufällige zusatzwege

    for (let y = 1; y < field_array.length - 1; y++) {
        for (let x = 1; x < field_array[y].length - 1; x++) {
            if (Math.random() < 0.75) {
                let rnd = parseInt(Math.random() * 4);
                switch (rnd) {
                    case MOVE_NORTH:
                        field_array[y][x].setNorth(field_array[y - 1][x]);
                        break;
                    case MOVE_EAST:
                        field_array[y][x].setEast(field_array[y][x + 1]);
                        break;
                    case MOVE_SOUTH:
                        field_array[y][x].setSouth(field_array[y + 1][x]);
                        break;
                    case MOVE_WEST:
                        field_array[y][x].setWest(field_array[y][x - 1]);
                        break;

                }
            }
        }
    }


    let start_x = Math.min(current_coord.x, target_coord.x);
    let start_y = Math.min(current_coord.y, target_coord.y);

    let target_x = Math.max(current_coord.x, target_coord.x);
    let target_y = Math.max(current_coord.y, target_coord.y);


    //
    // Überzeichnet die Rechtecke und stellt grafisch die Verbindungen der einzelnen Felder dar
    //

    if (start_x != target_x) {
        grid.ctx.fillRect(start_x * grid.field_width + 1
            , start_y * grid.field_height + 1
            , grid.field_width * 2 - 2
            , grid.field_height - 2);
    }
    if (start_y != target_y) {
        grid.ctx.fillRect(start_x * grid.field_width + 1
            , start_y * grid.field_height + 1
            , grid.field_width - 2
            , grid.field_height * 2 - 2);
    }


    grid.ctx.fillRect(start_x * grid.field_width + 1
        , start_y * grid.field_height + 1
        , grid.field_width * (start_x != target_x ? 2 : 1) - 2
        , grid.field_height * (start_y != target_y ? 2 : 1) - 2);


    field_array.start_field = start_field;			//packt das start_field in das array welches später zugänglich ist
    return field_array; 											// Gibt alle Felder zurück
}

function getDirections(grid, current_field, visited_fields) {

    let directions = [false, false, false, false];
    let temp_field = 0;
    let total_fields = grid.number_of_fields ** 2;


    //
    // North
    //
    if (current_field >= grid.number_of_fields) {
        temp_field = current_field - grid.number_of_fields;
        if (!visited_fields.includes(temp_field)) {
            directions[0] = temp_field;
        }
    }

    //
    // South
    //
    if (current_field + grid.number_of_fields < total_fields) {
        temp_field = current_field + grid.number_of_fields;
        if (!visited_fields.includes(temp_field)) {
            directions[2] = temp_field;
        }
    }

    //
    // East
    //
    if (parseInt(current_field % grid.number_of_fields) < grid.number_of_fields - 1) {
        temp_field = current_field + 1;
        if (!visited_fields.includes(temp_field)) {
            directions[1] = temp_field;
        }
    }
    //
    // West
    //
    if (parseInt(current_field % grid.number_of_fields) > 0) {
        temp_field = current_field - 1;
        if (!visited_fields.includes(temp_field)) {
            directions[3] = temp_field;
        }
    }
    return directions;
}

function getRandomField(grid, maze) {
    let total_fields = grid.number_of_fields ** 2;
    let random_field = parseInt(Math.random() * total_fields);

    let coord = grid.getCoordinateFromId(random_field);

    let field = maze[coord.y][coord.x];

    return field;
}

// Sounds
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
