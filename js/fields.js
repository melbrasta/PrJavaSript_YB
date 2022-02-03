const MOVE_NORTH = 0;
const MOVE_EAST = 1;
const MOVE_SOUTH = 2;
const MOVE_WEST = 3;

var Field = function(id) {
	this.id = id;
	this.neighbors = [null,null,null,null];
}


/* start und ziel setzen
Field.prototype.setStart = function()
{
	this.start = true;

}

Field.prototype.setGoal = function()
{
	this.goal = true;
}
*/






Field.prototype.setNorth = function( north ) {
	this.neighbors[0] = north;
}

Field.prototype.setEast = function( east ) {
	this.neighbors[1] = east;
}

Field.prototype.setSouth = function( south ) {
	this.neighbors[2] = south;
}

Field.prototype.setWest = function( west ) {
	this.neighbors[3] = west;
}
//
// [directions] bestimmt die gewünschte Richtung:
//  0 = North, 1 = East, 2 = South, 3 = West
// gibt NULL zurück, wenn wir nicht in die Richtung gehen können
//
//
Field.prototype.move = function( direction ) {
	return this.neighbors[direction];
}


// Hier könnte etwas passieren...
Field.prototype.enter = function ( etwas ) {
	console.log("Die Funktion enter ist noch nicht definiert")
	return
}




























//
//Zeichnet Wände an den seiten ein, an denen es keinen Nachbarn gibt
//

Field.prototype.drawField = function (grid)
{
	grid.ctx.strokeStyle='#000000';
	let border = getCoordinateFromId (this.id);
	if (!this.neighbors[0])
	{

		grid.ctx.beginPath();
		grid.ctx.moveTo(border.x * grid.field_width, border.y * grid.field_height);
		grid.ctx.lineTo(( 1 + border.x) * grid.field_width, border.y * grid.field_height);
		grid.ctx.stroke();



	}
	if (!this.neighbors[1])
	{
		let border = getCoordinateFromId (this.id);
		grid.ctx.beginPath();
		grid.ctx.moveTo((1 + border.x )* grid.field_width, border.y * grid.field_height);
		grid.ctx.lineTo(( 1 + border.x) * grid.field_width,(1 + border.y )* grid.field_height);
		grid.ctx.stroke();


	}
	if (!this.neighbors[2])
	{
		let border = getCoordinateFromId (this.id);
		grid.ctx.beginPath();
		grid.ctx.moveTo(border.x * grid.field_width,( 1 + border.y )* grid.field_height);
		grid.ctx.lineTo(( 1 + border.x) * grid.field_width,(1 + border.y) * grid.field_height);
		grid.ctx.stroke();


	}
	if (!this.neighbors[3])
	{
		let border = getCoordinateFromId (this.id);
		grid.ctx.beginPath();
		grid.ctx.moveTo ( border.x* grid.field_width, border.y * grid.field_height);
		grid.ctx.lineTo( border.x * grid.field_width,(1 + border.y )* grid.field_height);
		grid.ctx.stroke();


	}




	if(this.item)
	{
	grid.ctx.drawImage (this.item.img,  border.x* grid.field_width,border.y * grid.field_height,grid.field_width /2, grid.field_height / 2);
	}


}
