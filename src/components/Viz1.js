import React, { useState, useRef, useReducer } from 'react';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/react';
import { StaticQuery, graphql } from 'gatsby';
import "../styles/viz1.scss";

const Viz1 = () => {
    const url = "https://gist.githubusercontent.com/trust-kimberly/3e37b8fd538dbb679c8d0fefa2c27e74/raw/3a05022c0e12be79997db12327811ff05904268e/retrofit-dataset";

    d3.csv(url).then(data => {

        // console.log("data", data);
        let walkscoreArr = [];

        data.map((elem) => {
            walkscoreArr.push(elem["walkscore"]);
            // console.log(elem["walkscore"]);        
        }); 
        // console.log("walkscoreArr", walkscoreArr);  

        var x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["walkscore"])])
        .range([0, 500]);

        var y = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, 450])

        d3.select(".chart")
        .selectAll("div")
        .data(data)
        .enter().append("div")
            .style("width", function(d) { return (+d["walkscore"]) + "%"; })
            .style("height", 200)
            .text(function(d) { return (d["walkscore"]) })
            .on("mouseover", function(d, i) {
                d3.select(this).style("border", function(d, i) { return "2px solid white"; })
                .text(function(d) { return (d["parcel_addr"]) });
            })
            .on("mouseout", function(d, i) {
                d3.select(this).style("border", "none")
                .text(function(d) { return (d["walkscore"]) });
            })
    });

    return (
        <div>
            <p>Retrofit Walk Scores</p>
            <div className="chart"></div>
        </div>
    );
};

export default Viz1;