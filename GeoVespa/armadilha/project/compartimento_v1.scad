module torus(r1=1, r2=2, angle=360, endstops=0, $fn=50){
    if(angle < 360){
        intersection(){
            rotate_extrude(convexity=10, $fn=$fn)
            translate([r2, 0, 0])
            circle(r=r1, $fn=$fn);
            
            color("blue")
            wedge(h=r1*3, r=r2*2, a=angle);
        }
    }else{
        rotate_extrude(convexity=10, $fn=$fn)
        translate([r2, 0, 0])
        circle(r=r1, $fn=$fn);
    }
    
    if(endstops && angle < 360){
        rotate([0,0,angle/2])
        translate([0,r2,0])
        sphere(r=r1);
        
        rotate([0,0,-angle/2])
        translate([0,r2,0])
        sphere(r=r1);
    }
}



        translate([0,0,-145])
        union(){
            translate([0,0,90])
            torus(r1=3, r2=33);
            difference(){
            translate([0,0,91])
             cylinder(r=32.5, h=5,$fn=100);
             translate([0,0,90])
             cylinder(r=30, h=20,$fn=100);

            }
           difference(){
            translate([0,0,94])
              cylinder($fn = 100, $fa = 12, $fs = 2, h = 15, r1 = 32.5, r2 =50, center = false);
             translate([0,0,90])
             cylinder($fn = 100, $fa = 12, $fs = 2, h = 20, r1 = 25, r2 =49, center = false);
            }

        }


   







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