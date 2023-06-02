import React, { useState } from 'react';
import { TinyColumn } from '@ant-design/plots';


export const ChartProfit = () => {
 const data = [274, 337, 81, 497, 666, 219, 269];
    const config = {
        height: 64,
        autoFit: false,
        data,
        tooltip: false,
        annotations: [
            {
                type: 'line',
                start: ['min', 'mean'],
                end: ['max', 'mean'],
                text: {
                    content: '平均值',
                    offsetY: 0,
                    style: {
                        textAlign: 'left',
                        fontSize: 10,
                        fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
                        textBaseline: 'bottom',
                    },
                },
                style: {
                    stroke: 'rgba(0, 0, 0, 0.25)',
                },
            },
        ],
    };
   

    return (
        <>
            <TinyColumn {...config} />
        </>

    );
}