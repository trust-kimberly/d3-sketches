import React, { useState, useRef, useReducer } from 'react';
import * as d3 from "d3";
import Viz1 from "../components/Viz1";
import Viz2 from '../components/Viz2';
import Viz3 from '../components/Viz3';
import Viz4 from '../components/Viz4';
import Viz5 from '../components/Viz5';
import { StaticQuery, graphql } from 'gatsby';

const IndexPage = () => {
  
  return (
    <main>
      <title>D3 Sketches (Or Attempted Sketches)</title>
      <h1>Viz 1</h1>
      <Viz1 />
      <h1>Viz 2</h1>
      <Viz2 />
      <h1>Viz 3</h1>
      <Viz3 />
      <h1>Viz 4</h1>
      <Viz4 />
      <h1>Viz 5</h1>
      <Viz5 />
    </main>
  )
}

export default IndexPage
