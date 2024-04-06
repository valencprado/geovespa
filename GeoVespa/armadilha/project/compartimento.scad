difference(){


difference(){
cylinder(h=80, r=50, center=true,$fn=100);
cylinder(h=100, r=45, center=true,$fn=100);
}


$fn=100;
for ( i = [0 : 5] ){
    rotate( i * 60, [0,0, 90])
    translate([0, 45,0])
    sphere(r = 15);
}

}



translate([0, 0,-40]) 
    difference(){
    cylinder(h=10, r=45, center=true,$fn=100);
    cylinder(h=20, r=40, center=true,$fn=100);
    }


difference(){
translate([0, 0,-40]) 
  cylinder(h=5, r=45, center=true,$fn=100);
   union(){
   for ( i = [0 : 11] ){
    rotate( i * 30, [0,0, 90])
    translate([0, 20,-45])
    cylinder(r = 2,h=10,$fn=100);
  }
   for ( i = [0 : 17] ){
    rotate( i * 20, [0,0, 90])
    translate([0, 25,-45])
    cylinder(r = 2,h=10,$fn=100);
  }
  
     for ( i = [0 : 17] ){
    rotate( i * 20, [0,0, 90])
    translate([0, 25,-45])
    cylinder(r = 2,h=10,$fn=100);
  }
  
     for ( i = [0 : 23] ){
    rotate( i * 15, [0,0, 90])
    translate([0, 30,-45])
    cylinder(r = 2,h=10,$fn=100);
  }}
  
  }