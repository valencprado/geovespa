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



        translate([0,0,0])
        union(){
            translate([0,0,0])
            torus(r1=3, r2=33);
            difference(){
            translate([0,0,1])
             cylinder(r=32.5, h=5,$fn=100);
             translate([0,0,0])
             cylinder(r=30, h=20,$fn=100);

            }
           difference(){
            translate([0,0,4])
              cylinder($fn = 100, $fa = 12, $fs = 2, h = 15, r1 = 32.5, r2 =52.5, center = false);
             translate([0,0,0])
             cylinder($fn = 100, $fa = 12, $fs = 2, h = 20, r1 = 25, r2 =50, center = false);
            }

        }
        
        
        
         translate([0,0,18])
           difference(){
            translate([0,0,1])
             cylinder(r=52.5, h=5,$fn=100);
             translate([0,0,0])
             cylinder(r=50, h=20,$fn=100);

            }
        
        
 
        
       
        
   
