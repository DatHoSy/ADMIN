import React, { useState } from 'react';
import { ChartLine } from '../../components/ChartLine';
import { ChartRadial } from '../../components/ChartRadial';
import { ChartProfit } from '../../components/ChartProfit';


export const DashBoard = () => {
    return (
        <>
            <h2>Chart Line</h2>
            <ChartLine />
            <hr />
            <h2>Chart Radial</h2>
            <ChartRadial />
            <hr />
            <h2>Chart Profit</h2>
            <ChartProfit />
        </>

    );
}