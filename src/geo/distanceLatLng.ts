import {deg2rad} from "../math/deg2rad";

/**
 * Renvoie la distance en mètre entre les deux coordonnées
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @return {number} la distance en mètres entre les deux coordonnées
 */
export function distanceLatLng(lat1:number,lng1:number,lat2:number,lng2:number){

    let R = 6371; // km
    let dLat = deg2rad(lat2-lat1);
    let dLon = deg2rad(lng2-lng1);
    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d *1000;
}