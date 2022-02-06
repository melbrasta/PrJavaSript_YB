let Player = function( name, current_field, lives, rotate)
{						//changed color to Live attribute
	this.name = name;
	this.current_field = current_field;
	this.lives = lives;
	this.playerImage = null;
	this.steps_done = 0;
	this.rotate = rotate;
	this.item = null;
	this.punkte = 0;
	this.init();
}

Player.prototype.init = function()
{
	this.playerImage = new Image();
	this.playerImage.src = 'img/capnam.png';
	this.steps_done = 0; // Wert bei neuem Spiel zurücksetzen
	document.getElementById('leben').value = "Leben:	♥ ♥ ♥";
}


Player.prototype.drawPlayerPosition = function (grid)
{
	let start_coord = grid.getCoordinateFromId(this.current_field.id );

	let target_width = 0;
	let target_height = 0;
	let target_x = start_coord.x * grid.field_width +1;
	let target_y = start_coord.y * grid.field_height +1;
	let ratio = 0;


	if (grid.field_width > grid.field_height)
	{
		let ratio = this.playerImage.width / this.playerImage.height;
		target_height = (grid.field_height - 2) / 2 ;
		target_width = target_height * ratio;
		target_x += (grid.field_width / 2) - (target_width / 2);
		target_y += (grid.field_height/2) - (target_height/2);


	}
	else {
		let ratio = this.playerImage.height / this.playerImage.width;
		target_width = (grid.field_width - 2) / 2;
		target_height = target_width * ratio;
		target_x += (grid.field_width / 2) - (target_width / 2);
		target_y += (grid.field_height/2) - (target_height/2);
	}

target_x+=2;
target_y+=2;
target_width-=4;
target_height-=4;


grid.ctx.drawImage(this.playerImage, target_x, target_y, target_width, target_height);



}

Player.prototype.move = function( grid,  direction )
{
	let backgroundColor = "#000000"

//überschüssige Zeilen losgeworden
	if( this.current_field.neighbors[ direction ] === null )
	{
		switch (direction)
		{
			case MOVE_NORTH:
				break;
			case MOVE_EAST:
				break;
			case MOVE_SOUTH:
				break;
			case MOVE_WEST:
				break;
		}
		tok.play();
		this.lives -= 1;																			//Lebensattribut testen. bei Wandkollision leben-1
		score_less();																					//Punkte weniger bei Lebensverlust
		switch(this.lives)

		{
				case 3:
						document.getElementById('leben').value = "Leben:	♥ ♥ ♥";
						break;
				case 2:
						document.getElementById('leben').value = "Leben:	♥ ♥";
						break;
				case 1:
						document.getElementById('leben').value = "Leben:	♥";
						break;
				case 0:
						document.getElementById('leben').value = "Tot	†";
            scream.play();
						clear(ctx);
						game = neuesLevel();
						break;
		}

		alert("Mit dem Kopf durch die Wand tut weh. Das kostet dich ein Leben");					//vllt klappt es mit der wand einreißen ja wirklich
	} else
	{
		let old_position = grid.getCoordinateFromId( this.current_field.id);
		grid.ctx.fillStyle=backgroundColor;
		grid.ctx.fillRect(
			old_position.x * grid.field_width + 1,
			old_position.y * grid.field_height + 1,
			grid.field_width -2,
			grid.field_height -2,
		);

		//
		if( this.current_field.item )
		{
			this.item = this.current_field.item;
			this.current_field.item = null;
		}
		score_move();
		this.current_field.drawField( grid );

		//

		this.current_field = this.current_field.neighbors[ direction ];
		this.drawPlayerPosition(grid);
		this.steps_done ++;
	}
	if(this.lives >= 0)
	{
	} else
		{
			alert("Loooooooooooooooser")
		}


}
// Gegner

let Enemy = function(name, current_field, catched)
{
	this.name = name;
	this.current_field = enemypos;
  this.catched = null;
	this.init();
}


Enemy.prototype.init = function()
{
	this.enemyImage = new Image();
	this.enemyImage.src = 'img/badnam.png';
}


Enemy.prototype.drawEnemyPosition = function (grid)
{					//brauche neue zufällige Position
	let start_coord = grid.getCoordinateFromId(this.current_field.id );

	let target_width = 0;
	let target_height = 0;
	let target_x = start_coord.x * grid.field_width +1;
	let target_y = start_coord.y * grid.field_height +1;
	let ratio = 0;


	if (grid.field_width > grid.field_height)
	{
		let ratio = this.enemyImage.width / this.enemyImage.height;
		target_height = (grid.field_height - 2) / 2 ;
		target_width = target_height * ratio;
		target_x += (grid.field_width / 2) - (target_width / 2);
		target_y += (grid.field_height/2) - (target_height/2);


	}
	else {
		let ratio = this.enemyImage.height / this.enemyImage.width;
		target_width = (grid.field_width - 2) / 2;
		target_height = target_width * ratio;
		target_x += (grid.field_width / 2) - (target_width / 2);
		target_y += (grid.field_height/2) - (target_height/2);
	}
target_x+=2;
target_y+=2;
target_width-=4;
target_height-=4;


grid.ctx.drawImage(this.enemyImage, target_x, target_y, target_width, target_height);

}

Enemy.prototype.move = function( grid,  direction )
{
	let backgroundColor = "#000000"

	if( this.current_field.neighbors[ direction ] === null )
	{
    if (game.enemy.current_field.id == game.player.current_field.id)          //Check: beide Spieler gleiches Feld
    {
      Punkte += 100;
      gameend();
    }
		switch (direction)
		{
			case MOVE_NORTH:
      document.getElementById('hint').value ="Ein guter Anfang. Der Gegner kann nicht nach Norden gehen!";
				break;
			case MOVE_EAST:
				document.getElementById('hint').value ="Ein guter Anfang. Der Gegner kann nicht nach Osten gehen!";
				break;
			case MOVE_SOUTH:
				document.getElementById('hint').value ="Ein guter Anfang. Der Gegner kann nicht nach Süden gehen!";
				break;
			case MOVE_WEST:
				document.getElementById('hint').value ="Ein guter Anfang. Der Gegner kann nicht nach Westen gehen!";
				break;
		}

	} else
	{
    if (game.enemy.current_field.id == game.player.current_field.id)          //Check: beide Spieler gleiches Feld
    {
      Punkte += 100;
      gameend();
    }

		let old_position = grid.getCoordinateFromId( this.current_field.id);
		grid.ctx.fillStyle=backgroundColor;
		grid.ctx.fillRect(
			old_position.x * grid.field_width + 1,
			old_position.y * grid.field_height + 1,
			grid.field_width -2,
			grid.field_height -2,
		);

		this.current_field.drawField( grid );

		this.current_field = this.current_field.neighbors[ direction ];
		this.drawEnemyPosition(grid);
	}
}


/*
function destroywall()
{
		    	if( this.current_field.neighbors[ direction ] === null )
          {
			       switch( dest )
             {
				      case DESTROY_NORTH:
					         field_array[y][x].setNorth( field_array[y-1][x] ) ;
				               break;
				     case DESTROY_EAST:
					   field_array[y][x].setEast( field_array[y][x+1] ) ;
				               break;
				     case DESTROY_SOUTH:
					   field_array[y][x].setSouth( field_array[y+1][x] ) ;
				               break;
				     case DESTROY_WEST:
					   field_array[y][x].setWest( field_array[y][x-1] ) ;
				               break;
            }

			   }
}




		let start_x = Math.min( grid.current_coord.x, target_coord.x ) ;
		let start_y = Math.min( current_coord.y, target_coord.y ) ;

		let target_x = Math.max( current_coord.x, target_coord.x );
		let target_y = Math.max( current_coord.y, target_coord.y );



		//
		// Überzeichnet die Rechtecke und stellt grafisch die Verbindungen der einzelnen Felder dar
		//

		if( start_x != target_x ) {
			grid.ctx.fillRect( 	start_x * grid.field_width + 1
							,  	start_y * grid.field_height + 1
							,   grid.field_width * 2 - 2
							,   grid.field_height - 2);
		}
		if( start_y != target_y ) {
			grid.ctx.fillRect( 	start_x * grid.field_width + 1
							,  	start_y * grid.field_height + 1
							,   grid.field_width - 2
							,   grid.field_height * 2 -2 );
		}


		grid.ctx.fillRect( 	start_x * grid.field_width + 1
						,  	start_y * grid.field_height + 1
						,   grid.field_width  * (start_x != target_x ? 2 : 1) - 2
						,   grid.field_height * (start_y != target_y ? 2 : 1) - 2);
*/
