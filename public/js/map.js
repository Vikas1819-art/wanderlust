
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
        projection: 'globe', // display the map as a globe
        zoom: 9, // initial zoom level, 0 is the world view, higher values zoom in
        center: listing.geometry.coordinates // center the map on this longitude and latitude
    });




            new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25, className: 'my-class'})
        .setHTML(
           `<h4>${listing.title}</h4><p>Exact location will be provided after booking<p>`
        ))
        .addTo(map);


  
// map.on("load", () => {
//     new mapboxgl.Marker({ color: "red" })
//         .setLngLat(coordinates)
//         .addTo(map);
// });



    //  const marker = new mapboxgl.Marker()
    //     .setLngLat(coordinates)
    //     .addTo(map);
