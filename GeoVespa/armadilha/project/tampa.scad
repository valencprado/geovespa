
cylinder(h=10, r=50, center=true,$fn=100);
//texto "geovespa"
translate([-32,-5,4])
linear_extrude(4)
    text("GeoVespa");
    
//mão da tampa
 rotate([90,0,0]) 
   rotate_extrude(angle=180, convexity=2,$fn=100)
       translate([40, 0]) 
       circle(4);


translate([0, 0,-5]) 
difference(){
cylinder(h=10, r=45, center=true,$fn=100);
cylinder(h=20, r=40, center=true,$fn=100);
}
