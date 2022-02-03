var bewegungen = 0 ;
var Player = function( name, current_field, lives ) {						//changed color to Live attribute
	this.name = name;
	this.current_field = current_field;
	this.lives = lives;
	this.playerImage = null;

	this.item = null;
	this.init();
}



Player.prototype.init = function()
{
	this.playerImage = new Image();
	this.playerImage.src = 'img/capnam.png';
	bewegungen = 0; // Wert bei neuem Spiel zurücksetzen

}


Player.prototype.drawPlayerPosition = function (grid) {
	var start_coord = getCoordinateFromId( grid, this.current_field.id );

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

	this.playerImage.onload = () =>
	{
		grid.ctx.drawImage( this.playerImage, target_x, target_y, target_width, target_height);
	}

grid.ctx.drawImage(this.playerImage, target_x, target_y, target_width, target_height);



}

Player.prototype.move = function( grid,  direction ) {
	let backgroundColor = "#000000"

//überschüssige Zeilen losgeworden
	if( this.current_field.neighbors[ direction ] === null ) {
		switch (direction)
		{
			case MOVE_NORTH:
				console.log("Du kannst nicht nach Norden gehen!");
				break;
			case MOVE_EAST:
				console.log("Du kannst nicht nach Osten gehen!");
				break;
			case MOVE_SOUTH:
				console.log("Du kannst nicht nach Süden gehen!");
				break;
			case MOVE_WEST:
				console.log("Du kannst nicht nach Westen gehen!");
				break;
		}
		this.live -= 1;																			//Lebensattribut testen. bei Wandkollision leben-1
	} else
	{
		let old_position = getCoordinateFromId(grid, this.current_field.id);
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

		this.current_field.drawField( grid );

		//

		this.current_field = this.current_field.neighbors[ direction ];
		this.drawPlayerPosition(grid);
		try {
			this.current_field.enter( this ) ; // Enter fehlt hier ja noch. Entweder einbauen oder es kann entfernt werden!
		} catch (e) {
			console.log(e)
		}
		bewegungen++;
	}
	if(this.live > 0) {								//Lebensattribut testen. bei Wandkollision leben-1
		console.log("Du hast aktuell " + this.live + " Leben")
	} else {
		alert("Loooooooooooooooser")
	}


}
