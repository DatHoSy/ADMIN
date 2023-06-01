import React, { useState } from 'react';
import { Line } from '@ant-design/plots';
import { dataChart } from '../../../js/dataChart';


export const ChartLine = () => {
    const [data, setData] = useState(dataChart);
    const config = {
        data,
        xField: 'hour',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
            },
        },
        legend: {
            position: 'top',
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
            text: {
                style: {
                    textAlign: 'left',
                    fontSize: 10,
                    fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
                    textBaseline: 'bottom',
                },
            }
        },
    };

    return (
        <>
            <Line {...config} />
        </>
    );
}