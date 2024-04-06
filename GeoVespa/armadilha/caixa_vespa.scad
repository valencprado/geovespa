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
   difference(){
    
    union(){
        difference(){

            cylinder(r=38.5, h=100, $fn=6);

            translate([0,0,-50])
            cylinder(r=32.5, h=200,$fn=100);
            
        }


        union(){
            translate([0,0,106])
            torus(r1=3, r2=32.5);
            difference(){
            translate([0,0,94])
            cylinder(r=32.5, h=15,$fn=100);
             translate([0,0,90])
             cylinder(r=30, h=40,$fn=100);

            }

        }


    }

     translate([-7.5,20,6])
     cube([13,30,8]);
}


union(){

    for (j = [0:2]) {
       translate([sin(-15)*34+9*j, cos(0)*32, 20 ])
       cylinder(r=2.5, h=70,$fn=100);
    }
 
      for (j = [0:2]) {
       translate([sin(75)*25+4*j, cos(30)*26-7*j, 20 ])
       cylinder(r=2.5, h=70,$fn=100);
    }
    
    
    for (j = [0:2]) {
       translate([-sin(75)*25-4*j, -cos(30)*26+7*j, 20 ])
       cylinder(r=2.5, h=70,$fn=100);
    }
    

    
    for (j = [0:2]) {
       translate([sin(-75)*25-4*j, cos(-30)*26-7*j, 20 ])
       cylinder(r=2.5, h=70,$fn=100);
    }
       
    
        for (j = [0:2]) {
       translate([-sin(-75)*25+4*j, -cos(-30)*26+7*j, 20 ])
       cylinder(r=2.5, h=70,$fn=100);
    }




    for (j = [0:2]) {
       translate([-sin(-15)*(40)-10*j, -cos(-30)*37, 20 ])
       cylinder(r=2.5, h=70,$fn=100);
    }



}


}





//cube([1.3,0.5,3]);


