var Player = function( name, current_field, lives, rotate) {						//changed color to Live attribute
	this.name = name;
	this.current_field = current_field;
	this.lives = lives;
	this.playerImage = null;
	this.steps_done = 0;
	this.rotate = rotate;
	this.item = null;
	this.init();

}







Player.prototype.init = function()
{
	this.playerImage = new Image();
	this.playerImage.src = 'img/capnam.png';
	this.steps_done = 0; // Wert bei neuem Spiel zurücksetzen
	document.getElementById('leben').value = "Leben:	♥ ♥ ♥";
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
target_x+=2;										//hier stimmen die Werte noch nicht. Es wird noch zu viel überzeichnet		original:2,2,4,4
target_y+=2;
target_width-=4;
target_height-=4;
	this.playerImage.onload = () =>
	{
		grid.ctx.drawImage( this.playerImage, target_x, target_y, target_width, target_height);
	}

grid.ctx.drawImage(this.playerImage, target_x, target_y, target_width, target_height);



}

Player.prototype.move = function( grid,  direction ) {
	let backgroundColor = "#000000"

//überschüssige Zeilen losgeworden
	if( this.current_field.neighbors[ direction ] === null )
	{
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
		this.lives -= 1;																			//Lebensattribut testen. bei Wandkollision leben-1
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
						break;
		}


		alert("Mit dem Kopf durch die Wand tut weh. Das kostet dich ein Leben");
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
		try
		{
			this.current_field.enter( this ) ; // Enter fehlt hier ja noch. Entweder einbauen oder es kann entfernt werden!
		} catch (e)
		{
			console.log(e)
		}
		this.steps_done ++;
	}
	if(this.lives >= 0)
	{								//Lebensattribut testen. bei Wandkollision leben-1
		console.log("Du hast aktuell " + this.lives + " Leben")
	} else
		{
			alert("Loooooooooooooooser")
		}


}
