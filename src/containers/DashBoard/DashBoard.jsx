import React, { useState } from 'react';
import { ChartLine } from './ChartLine';
import { ChartRadial } from './ChartRadial';
import { ChartProfit } from './ChartProfit';


export const DashBoard = () => {
    return (
        <>
            <ChartLine />
            <hr />
            <ChartRadial />
            <hr />
            <ChartProfit />
        </>

    );
}