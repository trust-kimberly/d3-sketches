import React, { useState, useRef, useReducer } from 'react';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/react';
import { StaticQuery, graphql } from 'gatsby';
import "../styles/viz3.scss";
import municipalities from "../data/municipalities";

const Viz3 = () => {

    // Dropdown and useState for selected muni

    const [muniSelect, setMuniSelect] = useState("Acton");
    const muniOptions = municipalities.map((elem, i) => {
        return <option value={elem} key={i}>{elem}</option>
    });
    const handleSelect = (e) => {
        setMuniSelect(e.target.value);
    };

    // Parse the Data
    const url = "https://gist.githubusercontent.com/trust-kimberly/4d4968af67a59e66bba12d44d2637cd7/raw/ee825729a2ace93c630df7a810513f05038806ec/tabular.b16005_nativity_english_ability_by_race_acs_m_2005-09_2006-10_2007-11_2008-12_2009-13_2010-14_2011-15_2012-16_2013-17_2014-18_2015-19.csv"
    d3.csv(url).then(data => {

        let dataFiltered = [];

        function Obj(date, name, value) {
            this.date = date;
            this.name = name;
            this.value = value;
        };

        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }

        data.map((d) => {
            dataFiltered.push( new Obj(d.acs_year, (getKeyByValue(d, d.aspop)), d.aspop) )
            // console.log("dataFiltered inside map", dataFiltered)
        })
    
        // Sorting
        // data.sort((a, b) => 
        // b.whi_nw_p - a.whi_nw_p
        // )

        // Dimensions and margins of the graph
        var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 20000 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

        // Tooltip
        var tooltip = d3.select("#tooltip")
        .html("Hover over a bar for more information.");

        // Append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
        
        // X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(dataFiltered.map(function(d) { return d.name; }))
        // .domain(data.columns)
        .padding(0.05);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, 10000])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
        .data(dataFiltered)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            // .attr("x", function() { return x(data.columns); })
            // .attr("y", function(d) { 
            //     if (d.municipal === "Chelsea") {
            //         console.log("attr y: d", d);
            //         for (const [key, value] of Object.entries(d)) {
            //             // console.log("inside attr y", `${key}: ${value}`);
            //             console.log("inside attr y value", `${value}`)
            //             y(value)
            //         }
            //     }
            // })
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            // .attr("height", function(d) { 
            //     if (d.municipal === "Chelsea") {
            //         let heightsArr = []
            //         for (const [key, value] of Object.entries(d)) {
            //             heightsArr.push(value)
            //         }
            //         console.log("heightsArr after object.entries", heightsArr)
            //         heightsArr.forEach(value => {
            //             console.log("foreach value", value);
            //             return height - y(value);
            //         });
            //     }
            // })
            .attr("fill", function(d) {
                if (d.municipal === muniSelect) {
                    return "lavender";
                } else {
                    return "#69b3a2";
                }
            })
            .on("mouseover", function(e, data) {
                d3.select(this).style("opacity", "0.5");
                return tooltip.html(`
                    <h2>Municipality: ${data["municipal"]}</h2>
                    <p>White population 5 years and over: <br/>${data["whipop"]}</p>
                    <p>Native White population:	<br/>${data["nwhipop"]}</p>
                    <p>Foreign-born White population: <br/>${data["fwhipop"]}</p>
                    <p>% White population not speaking english very well: <br/>${data["whi_nw_p"]}</p>
                                        	
                `);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", "");
            })
    })

    return (
        <div>
            <h1>Selected Municipality: {muniSelect}</h1>
                <h2>Nativity and Ability to Speak English by Race (Municipal)</h2>
                <select 
                    id="muni-select"
                    onChange={e => handleSelect(e)}
                    defaultValue={muniSelect}
                >
                    {muniOptions}
                </select>
            <div id="tooltip"></div>
            <div id="my_dataviz"></div>
        </div>
    );
};

export default Viz3;