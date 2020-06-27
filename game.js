class Game {
    constructor(level) {
        switch (level) {
            case 1:
                this.length = 8;
                this.nbWall = 3;
                break;
            case 2:
                this.length = 16;
                this.nbWall = 6;
                break;
            case 3:
                this.length = 32;
                this.nbWall = 12;
                break;
            default:
                this.length = 16;
                this.nbWall = 6;

        }
        this.boardDrawing = new BoardDrawing("myCanvas");
        this.board = [];
        for (var i = 0; i < this.length; i++) {
            this.boardDrawing.drawLine(0, (800 / this.length) * i, this.length * (800 / this.length), (800 / this.length) * i);


            this.board [i] = [];
            for (var j = 0; j < this.length; j++) {
                this.boardDrawing.drawLine(j * (800 / this.length), 0, j * (800 / this.length), this.length * (800 / this.length));

                this.board [i][j] = 0;
            }
        }

        this.availablePos = null;
        this.mouse = new Mouse();
        this.mouse.selectCell(this.endRound.bind(this));
        this.playerisDead = false;
        this.roundturn = 0;
        this.endGame = false;
        this.player1 = new Player("Joueur 1", "p1", 1);
        this.player2 = new Player("Joueur 2", "p2", 2);
        this.currentPlayer = this.player1;
        this.Enemy = this.player2;

        this.weapons = [];
        this.weapons [0] = new Weapon("couteau", "10", "couteau");
        this.weapons [1] = new Weapon("epee", "15", "epeeF");
        this.weapons [2] = new Weapon("arc", "5", "arc");
        this.weapons [3] = new Weapon("epee argent", "20", "epeeA");
        this.weapons [4] = new Weapon("")

    }

    start() {
        for (var i = 0; i < this.nbWall; i++) {
            var xWall = 0;
            var yWall = 0;
            var placeWall = false;
            while (!placeWall) {
                xWall = Math.floor(Math.random() * this.length);
                yWall = Math.floor(Math.random() * this.length);
                if (this.board [xWall][yWall] == 0) {
                    this.board [xWall][yWall] = 3;
                    placeWall = true;
                    var xStart = 800 / this.length * xWall;
                    var yStart = 800 / this.length * yWall;
                    var wallSize = 800 / this.length;
                    this.boardDrawing.drawRect(xStart, yStart, wallSize, "#33363F");
                }
            }

        }

        for (var i = 0; i < 2; i++) {
            var xPlayer = Math.floor(Math.random() * this.length);
            var yPlayer = Math.floor(Math.random() * this.length);
            this.board [xPlayer][yPlayer] = i + 1;
            if (i == 0) {
                this.player1.coordX = xPlayer;
                this.player1.coordY = yPlayer;
                var drawX = 800 / this.length * xPlayer + (800 / this.length - 40) / 2;
                var drawY = 800 / this.length * yPlayer + (800 / this.length - 40) / 2;
                var drawImage = this.player1.image;
                this.boardDrawing.drawObject(drawX, drawY, drawImage);

            } else {
                this.player2.coordX = xPlayer;
                this.player2.coordY = yPlayer;
                var drawX = 800 / this.length * xPlayer + (800 / this.length - 40) / 2;
                var drawY = 800 / this.length * yPlayer + (800 / this.length - 40) / 2;
                var drawImage = this.player2.image;
                this.boardDrawing.drawObject(drawX, drawY, drawImage);

            }

            this.currentPlayer = this.player1;


        }
        for (var i = 3; i < 7; i++) {
            var xWeapon = Math.floor(Math.random() * this.length);
            var yWeapon = Math.floor(Math.random() * this.length);
            this.board [xWeapon][yWeapon] = i + 1;
            var drawX = 800 / this.length * xWeapon + (800 / this.length - 40) / 2;
            var drawY = 800 / this.length * yWeapon + (800 / this.length - 40) / 2;
            var drawImage = this.weapons [(i + 1) - 4].image;
            // FIX: On stocke les coordonnées des armes lorsqu'on les génère
            this.weapons[(i + 1) - 4].coordX = xWeapon
            this.weapons[(i + 1) - 4].coordY = yWeapon
            this.boardDrawing.drawObject(drawX, drawY, drawImage);

        }
        this.round()
    }

    changePlayer() {
        if (this.currentPlayer.id == 1) {
            this.currentPlayer = this.player2;
            this.Enemy = this.player1;
        } else {
            this.currentPlayer = this.player1;
            this.Enemy = this.player2;
        }
    }

    availablePosition(player) {
        var playerAvailablePosition = [];
        var bloc = false;
        var r = 0, l = 0, u = 0, d = 0;
        for (r = 1; r <= 3; r++) {
            if (!bloc) {
                if (player.coordX + r >= this.board.length) {
                    bloc = true;

                } else if (this.board[player.coordX + r][player.coordY] == 3) {
                    bloc = true;
                } else if (this.board[player.coordX + r][player.coordY] == 1 || this.board[player.coordX + r][player.coordY] == 2) {
                    bloc = true;
                } else {
                    playerAvailablePosition.push([player.coordX + r, player.coordY]);
                    var xStart = 800 / this.length * (player.coordX + r) + 1;
                    var yStart = 800 / this.length * player.coordY + 1;
                    var cellSize = 800 / this.length - 2;
                    this.boardDrawing.drawRect(xStart, yStart, cellSize, "#00cc44");
                }


            }

        }
        bloc = false;
        for (l = 1; l <= 3; l++) {
            if (!bloc) {
                if (player.coordX - l < 0) {
                    bloc = true;
                } else if (this.board [player.coordX - l] [player.coordY] == 3) {
                    bloc = true;
                } else if (this.board [player.coordX - l][player.coordY] == 1 || this.board [player.coordX - l] [player.coordY] == 2) {
                    bloc = true;
                } else {
                    playerAvailablePosition.push([player.coordX - l, player.coordY]);
                    var xStart = 800 / this.length * (player.coordX - l) + 1;
                    var yStart = 800 / this.length * player.coordY + 1;
                    var cellSize = 800 / this.length - 2;
                    this.boardDrawing.drawRect(xStart, yStart, cellSize, "#00cc44");
                }
            }
        }
        bloc = false;
        for (u = 1; u <= 3; u++) {
            if (!bloc) {
                if (player.coordY - u < 0) {
                    bloc = true;
                } else if (this.board [player.coordX] [player.coordY - u] == 3) {
                    bloc = true;
                } else if (this.board [player.coordX] [player.coordY - u] == 1 || this.board [player.coordX] [player.coordY - u] == 2) {
                    bloc = true;
                } else {
                    playerAvailablePosition.push([player.coordX, player.coordY - u]);
                    var xStart = 800 / this.length * player.coordX + 1;
                    var yStart = 800 / this.length * (player.coordY - u) + 1;
                    var cellSize = 800 / this.length - 2;
                    this.boardDrawing.drawRect(xStart, yStart, cellSize, "#00cc44");
                }
            }
        }
        bloc = false;
        for (d = 1; d <= 3; d++) {
            if (!bloc) {
                if (player.coordY + d >= this.board.length) {
                    bloc = true;
                } else if (this.board [player.coordX] [player.coordY + d] == 3) {
                    bloc = true;
                } else if (this.board [player.coordX] [player.coordY + d] == 1 || this.board [player.coordX] [player.coordY + d] == 2) {
                    bloc = true;
                } else {
                    playerAvailablePosition.push([player.coordX, player.coordY + d]);
                    var xStart = 800 / this.length * player.coordX + 1;
                    var yStart = 800 / this.length * (player.coordY + d) + 1;
                    var cellSize = 800 / this.length - 2;
                    this.boardDrawing.drawRect(xStart, yStart, cellSize, "#00cc44");
                }
            }
        }

        this.drawWeapons()

        return playerAvailablePosition;
    }

    drawWeapons(){
        for (let weapon of this.weapons) {
            var drawX = 800 / this.length * weapon.coordX + (800 / this.length - 40) / 2;
            var drawY = 800 / this.length * weapon.coordY + (800 / this.length - 40) / 2;
            if(weapon.image){
                this.boardDrawing.drawObject(drawX, drawY, weapon.image);
            }
        }
    }

    choosePosition() {

        var cpAvailablePosition = [];
        cpAvailablePosition = this.availablePosition(this.currentPlayer);
        return cpAvailablePosition;
    }

    validatePosition(cpAvailablePosition, screenX, screenY) {

        var x = Math.trunc(screenX / 50);
        var y = Math.trunc(screenY / 50);
        var positionExists = cpAvailablePosition.find((subArray) => subArray[0] === x && subArray[1] === y)
        if (!positionExists) {
            return false;
        } else {
            this.board[this.currentPlayer.coordX][this.currentPlayer.coordY] = 0;

            for (var i = 0; i < cpAvailablePosition.length; i++) {
                var xStart = 800 / this.length * cpAvailablePosition[i][0] + 1;
                var yStart = 800 / this.length * cpAvailablePosition[i][1] + 1;
                var cellSize = 800 / this.length - 2;
                this.boardDrawing.drawRect(xStart, yStart, cellSize, "#FFFFFF");
            }

            var xStart = 800 / this.length * this.currentPlayer.coordX + 1;
            var yStart = 800 / this.length * this.currentPlayer.coordY + 1;
            var cellSize = 800 / this.length - 2;

            this.boardDrawing.drawRect(xStart, yStart, cellSize, "#FFFFFF", this.weapons[1]);
            this.currentPlayer.coordX = x;
            this.currentPlayer.coordY = y;

            var drawX = 800 / this.length * x + (800 / this.length - 40) / 2;
            var drawY = 800 / this.length * y + (800 / this.length - 40) / 2;
            this.boardDrawing.drawObject(drawX, drawY, this.currentPlayer.image);


            this.board[this.currentPlayer.coordX][this.currentPlayer.coordY] = this.currentPlayer.id;
            if (this.isWeapon(this.currentPlayer.coordX, this.currentPlayer.coordY)) {
                this.takeWeapon(this.currentPlayer.coordX, this.currentPlayer.coordY);
            }

            if (this.isPlayer(Math.min(this.board.length - 1, this.currentPlayer.coordX + 1), this.currentPlayer.coordY) || this.isPlayer(Math.max(0, this.currentPlayer.coordX - 1), this.currentPlayer.coordY) || this.isPlayer(this.currentPlayer.coordX, Math.min(this.board.length - 1, this.currentPlayer.coordY + 1)) || this.isPlayer(this.currentPlayer.coordX, Math.max(0, this.currentPlayer.coordY - 1))) {
                this.engageFight();

            }
            return true;
        }


    }

    isPlayer(x, y) {
        var playerDetected = false;
        if (parseInt(this.board[x][y]) != parseInt(this.currentPlayer.id)) {
            switch (this.board[x][y]) {
                case 1:
                case 2:
                    playerDetected = true;
                    break;
                default:
                    playerDetected = false;
                    break;
            }
        }
        return playerDetected;
    }

    engageFight() {

        {
            if (confirm("Voulez-vous attaquer ?")) {
                //Choix Oui
                this.currentPlayer.attack(this.Enemy, this.weapons[this.currentPlayer.weapon - 4].damage);

            } else {
                //Choix Oui
                this.currentPlayer.changeMode();

            }


        }
    }

    isWeapon(x, y) {
        var weaponDetected = false;
        switch (this.board[x][y]) {
            case 4:
                weaponDetected = true;
                break;
            case 5:
                weaponDetected = true;
                break;
            case 6:
                weaponDetected = true;
                break;
            case 7:
                weaponDetected = true;
                break;
            default:
                weaponDetected = false;
                break;
        }
        return weaponDetected;
    }

    takeWeapon(x, y) {
        var oldWeapon = this.board [x][y];
        this.board [x][y] = this.currentPlayer.weapon;
        this.currentPlayer.weapon = oldWeapon;

    }

    endRound(event) {
        if (this.Enemy.isDead()) {
            this.endGame = true;
        } else {
            var delta = this.boardDrawing.currentCanva.getBoundingClientRect();
            if (this.validatePosition(this.availablePos, event.clientX - delta.left, event.clientY - delta.top)) {


                this.roundturn += 1;
                this.changePlayer();
                this.round();
            }

        }
    }

    round() {
        this.endGame = false;

        this.availablePos = this.choosePosition();

        console.log("Nombres de tours joués:" + this.roundturn);
        console.log(this.currentPlayer);
    }

    displayBoard() {
    }
}
