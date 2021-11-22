import React, { useState, useRef, useReducer } from 'react';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/react';
import { StaticQuery, graphql } from 'gatsby';
import "../styles/viz2.scss";
import municipalities from "../data/municipalities";

const Viz2 = () => {

    // Dropdown and useState for selected muni

    const [muniSelect, setMuniSelect] = useState("Acton");
    const muniOptions = municipalities.map((elem, i) => {
        return <option value={elem} key={i}>{elem}</option>
    });
    const handleSelect = (e) => {
        setMuniSelect(e.target.value);
    };

    // Fetching csv data

    const url = "https://gist.githubusercontent.com/trust-kimberly/731ac3213321b36ee2e6d3a4e05bc2ba/raw/104f06352ffb351d7b8a6692d5e0bcba25d38985/gistfile1.txt";

    d3.csv(url).then(data => {

        // data.map((d) => {
        //     if (d["municipal"] === muniSelect) {
        //         console.log(d);  // great, working here
        //     }
        // }); 

        // console.log("data", data);

        // console.log("data columns", data.columns);

        var x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["aapop"])])
        .range([0, 500]);

        var y = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, 600]);

        d3.select(".chart-body")
        .selectAll("div")
        .data(data)
        .enter().append("div")
            .style("width", function(d) { return (+d["aapop"]) + "px"; })
            .style("height", 20)
            .text(function(d) { return d["aapop"]; })

    });

    return (
        <div>
            <div className="chart-container">
                <h1>Selected Municipality: {muniSelect}</h1>
                <h2>Nativity and Ability to Speak English by Race (Municipal)</h2>
                <select 
                    id="muni-select"
                    onChange={e => handleSelect(e)}
                    defaultValue={muniSelect}
                >
                    {muniOptions}
                </select>
                <div className="chart-body"></div>
            </div>
        </div>
    );
};

export default Viz2;