function getCoordinateFromId( grid, field_id ){
return {
	x: field_id % grid.number_of_fields,
	y: parseInt( field_id / grid.number_of_fields ),
};
}


function createMaze( grid ) {

	let visited_fields = [];
	let stack = [];

	let total_fields = grid.number_of_fields**2;
	let current_field = parseInt( Math.random() * total_fields );

	let xpos = parseInt( current_field % grid.number_of_fields) * grid.field_width;
	let ypos = parseInt( current_field / grid.number_of_fields )* grid.field_height;

	let field_array = new Array( grid.number_of_fields ).fill(0).map( a => new Array( grid.number_of_fields ).fill(0) );


	let current_coord = getCoordinateFromId(grid, current_field);

	field_array[current_coord.y][current_coord.x] = new Field( current_field );

	let start_field = field_array[current_coord.y][current_coord.x];		//vllt als var speichern??

//	field_array[current_coord.y][current_coord.x].setStart();
	visited_fields.push( current_field );
	stack.push( current_field );





	// Backtrack
	while( stack.length > 0 ){

		let possible_direction = getDirections( grid, current_field, visited_fields);
		if( possible_direction.every( item => item === false ) ) {
			current_field = stack.pop();
			console.log(`keine Richtung möglich-gehe zurück zu Feld ${current_field}`);
			continue;
		}

		let target_field = false;
		let direction = -1;

		while( target_field === false) {
			direction =  parseInt( Math.random() * possible_direction.length);
			target_field = possible_direction[ direction ];
		}

		current_coord = grid.getCoordinateFromId( current_field);
		target_coord  = grid.getCoordinateFromId( target_field);

		field_array[target_coord.y][target_coord.x] = new Field( target_field, grid );


		switch(direction) {
				case MOVE_NORTH:
				field_array[current_coord.y][current_coord.x].setNorth( field_array[target_coord.y][target_coord.x] );
				field_array[target_coord.y][target_coord.x].setSouth( field_array[current_coord.y][current_coord.x] );
				break;

				case MOVE_EAST:
				field_array[current_coord.y][current_coord.x].setEast( field_array[target_coord.y][target_coord.x] );
				field_array[target_coord.y][target_coord.x].setWest( field_array[current_coord.y][current_coord.x] );
				break;


				case MOVE_SOUTH:
				field_array[current_coord.y][current_coord.x].setSouth( field_array[target_coord.y][target_coord.x] );
				field_array[target_coord.y][target_coord.x].setNorth( field_array[current_coord.y][current_coord.x] );
				break;

				case MOVE_WEST:
				field_array[current_coord.y][current_coord.x].setWest( field_array[target_coord.y][target_coord.x] );
				field_array[target_coord.y][target_coord.x].setEast( field_array[current_coord.y][current_coord.x] );
				break;

		}


		let start_x = Math.min( current_coord.x, target_coord.x ) ;
		let start_y = Math.min( current_coord.y, target_coord.y ) ;

		let target_x = Math.max( current_coord.x, target_coord.x );
		let target_y = Math.max( current_coord.y, target_coord.y );

		grid.ctx.fillStyle="#000000";					//Farbe vom Spielfeld vllt Schwarz besser?

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






		visited_fields.push( target_field);
		stack.push( target_field );
		console.log( `gehe zu Feld: ${target_field}` );
		current_field = target_field;

//	goal = getCoordinateFromId(grid, target_field);
//	field_array[goal.y][goal.x].setGoal();								//Das Ziel muss noch eingeblendet werden

	}




// teleport am Rand

field_array[0][0].neighbors[MOVE_NORTH] = field_array[field_array.length -1] [0];	//von oben links nach unten links
field_array[0][0].neighbors[MOVE_WEST] = field_array[0] [field_array.length -1];	//von oben links nach oben rechts

field_array[field_array.length -1][0].neighbors[MOVE_SOUTH] = field_array[0] [0];	// von unten links nach oben links
field_array[field_array.length -1][0].neighbors[MOVE_WEST] = field_array[field_array.length -1] [field_array.length -1];	// von unten links nach unten rechts

field_array[field_array.length -1][field_array.length -1].neighbors[MOVE_EAST] = field_array[field_array.length -1] [0];	// von unten rechts nach unten links
field_array[field_array.length -1][field_array.length -1].neighbors[MOVE_SOUTH] = field_array[0] [field_array.length -1] ;	// von unten rechts nach oben rechts

field_array[0] [field_array.length -1].neighbors[MOVE_NORTH] = field_array[field_array.length -1] [field_array.length -1];	//von oben rechts nach unten rechts
field_array[0] [field_array.length -1].neighbors[MOVE_EAST] = field_array[0] [0];											//von oben rechts nach oben links

/*
function durchgang()
{
	let d1 = getRandomField(grid,field_array)
	console.log(d1);
}
*/

//
//keine funktion???
/*
for( let y  = 1; y < field_array.length - 1; y++ ) {
	for( let x = 1; x < field_array[y].length -1; x++) {
		if( Math.random() < 0.75 ) {
			let rnd = parseInt( Math.random() * 4 );
			switch( rnd ) {
				case MOVE_NORTH:
					field_array[y][x].setNorth( field_array[y-1][x] ) ;
				break;
				case MOVE_EAST:
					field_array[y][x].setEast( field_array[y][x+1] ) ;
				break;
				case MOVE_SOUTH:
					field_array[y][x].setSouth( field_array[y+1][x] ) ;
				break;
				case MOVE_WEST:
					field_array[y][x].setWest( field_array[y][x-1] ) ;
				break;

			}
		}
	}
}
*/





field_array.start_field = start_field;			//packt das start_field in das array welches später zugänglich ist
	return field_array; // Gibt alle Felder zurück
}






function getDirections ( grid, current_field, visited_fields ) {

	let directions = [false,false,false,false];
	let temp_field = 0;
	let total_fields = grid.number_of_fields**2;


	//
	// North
	//
	if( current_field  >= grid.number_of_fields ) {
		temp_field = current_field - grid.number_of_fields;
		if( !visited_fields.includes(temp_field) ) {
			directions[0] = temp_field;
		}
	}

	//
	// South
	//
	if( current_field + grid.number_of_fields < total_fields ) {
		temp_field = current_field + grid.number_of_fields;
		if( !visited_fields.includes(temp_field) ) {
			directions[2] = temp_field;
		}
	}

	//
	// East
	//
	if( parseInt( current_field % grid.number_of_fields) < grid.number_of_fields-1 ) {
		temp_field = current_field + 1;
		if( !visited_fields.includes(temp_field) ) {
			directions[1] = temp_field;
		}
	}
	//
	// West
	//
	if( parseInt( current_field % grid.number_of_fields)  > 0 )  {
		temp_field = current_field - 1;
		if( !visited_fields.includes(temp_field) ) {
			directions[3] = temp_field;
		}
	}


	//console.log( directions );
	return directions;

}


//
// Funktion gibt aus dem Labyrinth ein zufälliges Feld zurück
//
//
function getRandomField( grid, field_array ) {
	let total_fields = grid.number_of_fields**2;
	let random_field = parseInt( Math.random() * total_fields );

	let coord = grid.getCoordinateFromId( random_field ) ;

	var field = maze[ coord.y ][ coord.x ];

	return field;



}
