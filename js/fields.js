const MOVE_NORTH = 0;
const MOVE_EAST = 1;
const MOVE_SOUTH = 2;
const MOVE_WEST = 3;


const FIELD_TYPE_UNKNOWN = 0;
const FIELD_TYPE_STARTFIELD = 1;
const FIELD_TYPE_ENDFIELD = 2;
const FIELD_TYPE_TRAP = 3;
const FIELD_TYPE_ITEM = 4;


var Field = function(id, grid)
{
	this.id = id;
	this.type = FIELD_TYPE_UNKNOWN;
//	this.pos = grid.getCoordinateFromId( id );
	this.neighbors = [null,null,null,null];
	this.item = null;


}




Field.prototype.setNorth = function( north )
{
	this.neighbors[0] = north;
	north.neighbors[ MOVE_SOUTH ] = this;
}

Field.prototype.setEast = function( east )
{
	this.neighbors[1] = east;
	east.neighbors[ MOVE_WEST] = this;

}

Field.prototype.setSouth = function( south )
{
	this.neighbors[2] = south;
	south.neighbors[MOVE_NORTH] = this;

}

Field.prototype.setWest = function( west )
{
	this.neighbors[3] = west;
	west.neighbors[MOVE_EAST] = this;
}
//
// [directions] bestimmt die gewünschte Richtung:
//  0 = North, 1 = East, 2 = South, 3 = West
// gibt NULL zurück, wenn wir nicht in die Richtung gehen können
//
//
Field.prototype.move = function( direction )
{
	return this.neighbors[direction];
}
//
//Zeichnet Wände an den seiten ein, an denen es keinen Nachbarn gibt
//

Field.prototype.drawField = function (grid)
{
	grid.ctx.strokeStyle='#0000ff';
	grid.ctx.fillStyle ='#000000';
	let border = grid.getCoordinateFromId (this.id);
	if (!this.neighbors[0])
	{

		grid.ctx.beginPath();
		grid.ctx.moveTo(border.x * grid.field_width, border.y * grid.field_height);
		grid.ctx.lineTo(( 1 + border.x) * grid.field_width, border.y * grid.field_height);
		grid.ctx.stroke();
	}
	if (!this.neighbors[1])
	{
		grid.ctx.beginPath();
		grid.ctx.moveTo((1 + border.x )* grid.field_width, border.y * grid.field_height);
		grid.ctx.lineTo(( 1 + border.x) * grid.field_width,(1 + border.y )* grid.field_height);
		grid.ctx.stroke();


	}
	if (!this.neighbors[2])
	{
		grid.ctx.beginPath();
		grid.ctx.moveTo(border.x * grid.field_width,( 1 + border.y )* grid.field_height);
		grid.ctx.lineTo(( 1 + border.x) * grid.field_width,(1 + border.y) * grid.field_height);
		grid.ctx.stroke();


	}
	if (!this.neighbors[3])
	{
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
