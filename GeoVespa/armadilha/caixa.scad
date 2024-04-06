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



difference(){
    
    union(){
        difference(){

            cylinder(r=38.5, h=100, $fn=6);

            translate([0,0,-50])
            cylinder(r=30, h=200,$fn=100);
            
        }


        union(){
            translate([0,0,106])
            torus(r1=3, r2=30);
            difference(){
            translate([0,0,94])
            cylinder(r=30, h=15,$fn=100);
            translate([0,0,90])
            cylinder(r=28, h=40,$fn=100);

            }

        }


    }

    translate([6.5,10,7])
    cube([13,30,8]);
}
difference(){
    
    union(){
        translate([0,100,0])
        cylinder(r=28, h=25,$fn=100);
        translate([0,100,0])
        cylinder(r=38.5, h=10, $fn=6);
    }
    translate([-3.5,80,14])
    cube([27,41,36]);

    translate([6.5,100,13])
    cube([13,30,20]);
}






//cube([1.3,0.5,3]);


