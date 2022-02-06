let Grid = function (cvs, number_of_fields) {
    this.cvs = cvs;
    this.ctx = this.cvs.getContext('2d');
    this.number_of_fields = Number(number_of_fields);


    this.field_width = this.cvs.width / number_of_fields;
    this.field_height = this.cvs.height / number_of_fields;

};

Grid.prototype.getCoordinateFromId = function( field_id )
{
	return {
		x: field_id % this.number_of_fields,
		y: parseInt( field_id / this.number_of_fields ),
	};
}

//Drawgrid
Grid.prototype.drawGrid = function(fields,player)
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
