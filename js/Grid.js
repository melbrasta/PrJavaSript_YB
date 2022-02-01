var Grid = function(cvs, number_of_fields )
{
this.cvs = cvs;
this.ctx = this.cvs.getContext('2d');
this.number_of_fields = Number (number_of_fields);


this.field_width = this.cvs.width / number_of_fields;
this.field_height = this.cvs.height / number_of_fields;

}


Grid.prototype.getCoordinateFromId = function( field_id )
{
	return {
		x: field_id % this.number_of_fields,
		y: parseInt( field_id / this.number_of_fields ),
	};
}




//Drawgrid
Grid.prototype.drawGrid = function(fields,player)        //hier später noch den Spieler angeben
{


   this.ctx.beginPath();
   this.ctx.lineWidth=1;

   for( let y = 0; y <= this.cvs.height; y += this.field_height)
   {
 	this.ctx.moveTo( 0, y );
 	this.ctx.lineTo( this.cvs.width, y );
   }

   for( let x = 0; x <= this.cvs.width; x += this.field_width)
   {
 	this.ctx.moveTo( x, 0 );
 	this.ctx.lineTo( x, this.cvs.height);
   }

   this.ctx.stroke();


}





//Felderzahlen zu Testzwecken
Grid.prototype.drawFieldNumbers = function( )
{
	this.ctx.font="12px Arial";

	for( let y = 0; y  <= this.cvs.height; y += this.field_height )
  {
		for( let x = 0; x <= this.cvs.width; x += this.field_width)
     {
			//
			// let xpos = parseInt( x / feldbreite );
			// let ypos = parseInt( y / feldhoehe );
			// let fieldnumber = ypos * anzahlfelder + xpos;
			//
			let fieldnumber = ( (parseInt(y/this.field_height) * this.number_of_fields) + parseInt(x / this.field_width)) ;

			let measure = this.ctx.measureText( fieldnumber );

			let text_width = measure.width;

			this.ctx.fillText( fieldnumber, x +(this.field_width/2) - (text_width/2) , y + 10);
		}
	}
}






Grid.prototype.getStart = function(maze)
{
	for (y = 0; y < this.number_of_fields; y++)
  {
		for(x = 0; x < this.number_of_fields; x++)
    {
			if (maze[y][x].start == true)
      {
				return maze[y][x];
			}
		}
	}
}

Grid.prototype.drawStart = function (maze)
{
	var start_coord = getCoordinateFromId(this,this.getStart(maze).id);
	this.ctx.beginPath();
	this.ctx.fillStyle = "#0000ff";
	this.ctx.arc( (start_coord.x * this.field_width)  + (this.field_width / 2)
				, (start_coord.y * this.field_height) + (this.field_height / 2)
				, 	15, 0 , 2*Math.PI);
	this.ctx.fill();
}
