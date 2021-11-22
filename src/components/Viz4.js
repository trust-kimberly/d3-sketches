import React, { useState, useRef, useReducer } from 'react';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/react';
import { StaticQuery, graphql } from 'gatsby';
import "../styles/viz4.scss";
import municipalities from "../data/municipalities";

const Viz4 = () => {

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

        // console.log("data", data);
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
    
    
    })

    return (
        <div>
            <h1>Attempt at D3 Bar Chart Race</h1>
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

export default Viz4;