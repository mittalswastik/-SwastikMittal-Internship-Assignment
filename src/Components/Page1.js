import React, { Component } from 'react';
import '../Css/Page1.css'
import d3 from 'd3';
import RaleighJson from '../Data/raleigh3.geojson';
import { Redirect, Link } from 'react-router-dom';

class Page1 extends Component {
    constructor(props){
      super(props)
      this.state = {
        id : 1,
        data: [
            ["27603", 75], ["27608", 43], ["27606", 50], ["27601", 88], ["27616", 21], ["27614", 43],
            ["27613", 21], ["27604", 19], ["27609", 60], ["27607", 4], ["27609", 44], ["27612", 38],
            ["27610", 67],["27615",80],["27617",1],["27605",90]],
        redirect: false,
        val: null
      }
    }
    

    print = (value) => {
        console.log(value);
    }

    componentDidMount() {
        
        let dataset = {};
        let onlyValues = this.state.data.map(function (obj) { return obj[1]; });

        let minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        let paletteScale = d3.scale.linear()
                                    .domain([minValue, maxValue])
                                    .range(["#77DD77","#414833"]);

        let tooltip = d3.select("#map")
                        .append("div")
                        .attr("class", "tooltip hidden");

        this.state.data.forEach(function (item) {
            let iso = item[0], value = item[1];
            dataset[iso] = paletteScale(value);
        });

        let width = 800, height = 800;
        let svg = d3.select('#map')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

        d3.json(RaleighJson, function(error, json) {
          svg.append('g')
            .attr('class', 'features')
            .selectAll('path')
            .data(json.features)
            .enter().append('path')
            .attr('d', d3.geo.path().projection(d3.geo.mercator().center([-78.6382,35.7796]).scale(85000).translate([width/2, height/2])))
            .attr('fill', d => {
              return dataset[d.properties.GEOID10]
            })
            .on('click', d => {
              this.setState({
                redirect: true,
                val: d
              })
            })
            .on('mousemove', showTooltip)
            .on('mouseout', hideTooltip);
        }.bind(this));    // to access class

        /*
          Show tool tip : (Refered below code from : https://data-map-d3.readthedocs.io/en/latest/)
        */

        function showTooltip(f) {
            // Get the ID of the feature.
            let id = f.properties.GEOID10;
            // Use the ID to get the data entry.
            //var d = dataById[id];

            // Get the current mouse position (as integer)
            var mouse = d3.mouse(d3.select('#map').node()).map(
              function(f) { return parseInt(f); }
            );

            var left = Math.min(width - 4 * id.length, mouse[0] + 5);
            var top = mouse[1] + 25;

            tooltip.classed('hidden', false)
              .attr("style", "left:" + left + "px; top:" + top + "px")
              .html(id);
        }

        /*
         * Hide the tooltip.
         */
        function hideTooltip() {
          tooltip.classed('hidden', true);
        }
    }

    render() {
        if(this.state.redirect){
          return (
             <Redirect push to={{ pathname: '/page2',state: {val : JSON.stringify(this.state.val.properties.GEOID10)}}}/>
          );
        }

        else {
          return (
            <div id="main">
              <div id="map" style={{
                  height: "100%",
                  width: "100%",
              }}></div>  
              <div id="welcome">
                <div>
                  <h1>Welcome To Raleigh Census Data</h1>
                </div>
                <div id="instructions">
                  <ul>
                    <li key="instr1">Hover over the regions to know the zip codes.</li>
                    <li key="instr2">Click on the region to get census demographic data for that region</li>
                  </ul>
                </div>
                <div id="about">
                  <p>
                    Raleigh is the capital city of North Carolina. 
                    It’s known for its universities, including North Carolina State University. 
                    The number of technology and scholarly institutions around Raleigh, 
                    Chapel Hill and Durham make the area known as the Research Triangle. 
                    The North Carolina State Capitol is a 19th-century Greek Revival–style
                    building with a statue of George Washington dressed as a Roman general in its rotunda.
                  </p>
                  <p>
                    This is a very basic application holding static data. 
                    The data mentioned is last updated by 2010.
                  </p>
                  <p>
                    Swastik Mittal - Graduate student from North Carolina State University
                  </p>
                </div>
              </div>
            </div>
          );
        }
    }
}

export default Page1;