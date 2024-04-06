
difference(){
    
    union(){
     
        cylinder(r=30, h=20,$fn=100);
        translate([0,0,0])
        cylinder(r=38.5, h=3, $fn=6);
    }
    translate([-13.5,-20,6])
    cube([27,41,36]);

    translate([-7.5,20,6])
    cube([13,30,26]);
    
    translate([-60,10,10])
    cube([100,8,30]);
}






//cube([1.3,0.5,3]);


