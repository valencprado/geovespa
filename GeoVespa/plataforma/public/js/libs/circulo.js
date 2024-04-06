export default (L, ops) => {
    return L.circle([ops.lat, ops.log], {
        color: ops.color,
        fillColor: ops.fillColor,
        fillOpacity: ops.fillOpacity,
        radius: ops.radius
    })
}