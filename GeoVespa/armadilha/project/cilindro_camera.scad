
union(){
    
    difference(){
    cylinder(h=80, r=50, center=true,$fn=100);
    cylinder(h=100, r=45, center=true,$fn=100);
    }


    translate([0, 0,-40]) 
    difference(){
    cylinder(h=15, r=45, center=true,$fn=100);
    cylinder(h=20, r=40, center=true,$fn=100);
    }    
}

