
/*
    This file is part of "ChoiCo" a web application for designing digital games, written by Marianthi Grizioti for the National and Kapodistrian University of Athens (Educational Technology Lab).
    Copyright (C) 2017-2018.
    ChoiCo is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChoiCo is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/
function pointsGroup (point, name){
  var name = name;
  var leafletGroup = L.layerGroup([point]);
  var points = [point]
  leafletGroup.addTo (myGame.myMap.mapInstance);
  this.addPoint = function (newpoint){
    points.push(newpoint);
   leafletGroup.addLayer(newpoint)
  }
  this.remove = function (point){
    //points.push(newpoint);
   leafletGroup.removeLayer(point)
  }
}
