var Grid = function(cvs, number_of_fields )
{
this.cvs = cvs;
this.ctx = this.cvs.getContext('2d');
this.number_of_fields = number_of_fields;
this.color = color;


this.field_width = this.cvs.width / number_of_fields;
this.field_height = this.cvs.height / number_of_fields;

}
