import React, { useState } from 'react';
import { RadialBar } from '@ant-design/plots';


export const ChartRadial = () => {
    const data = [
        {
          name: 'Bank',
          star: 297,
        },
        {
          name: 'Token',
          star: 506,
        },
        {
          name: 'Stock',
          star: 805,
        },
        {
          name: 'Cash',
          star: 1278,
        },
      ];
      const config = {
        data,
        xField: 'name',
        yField: 'star',
        maxAngle: 330,
        radius: 0.8,
        innerRadius: 0.2,
        reversed: true,
        tooltip: {
          formatter: (datum) => {
            return {
              name: 'star',
              value: datum.star,
            };
          },
        },
        colorField: 'star',
        color: ({ star }) => {
          if (star > 1000) {
            return '#6349ec';
          } else if (star > 500) {
            return '#ff9300';
          }

          return '#ff93a7';
        },
        position: 'center',
        barBackground: {},
        barStyle: {
          lineCap: 'round',
        },
        // annotations: [
        //   {
        //     type: 'html',
        //     position: ['50%', '50%'],
        //     html: (container, view) => {
        //       const coord = view.getCoordinate();
        //       const w = coord.polarRadius * coord.innerRadius * 1.15;
        //       return `<div style="transform:translate(-50%,-46%)">
        //       <img width="${
        //         (w / 203) * 231
        //       }" height="${w}" alt="" src="https://gw.alipayobjects.com/zos/antfincdn/zrh%24J08soH/AntV%252520LOGO%2525202.png">
        //     </div>`;
        //     },
        //   },
        // ],
      };
    return (
        <>
            <RadialBar {...config} />
        </>
    );
}

// import React from "react";
// import { RadialBarChart, RadialBar, Legend } from "recharts";

// const data = [
//     {
//         name: "18-24",
//         uv: 31.47,
//         pv: 2400,
//         fill: "#8884d8"
//     },
//     {
//         name: "25-29",
//         uv: 26.69,
//         pv: 4567,
//         fill: "#83a6ed"
//     },
//     {
//         name: "30-34",
//         uv: 15.69,
//         pv: 1398,
//         fill: "#8dd1e1"
//     },
//     {
//         name: "35-39",
//         uv: 8.22,
//         pv: 9800,
//         fill: "#82ca9d"
//     },
//     {
//         name: "40-49",
//         uv: 8.63,
//         pv: 3908,
//         fill: "#a4de6c"
//     },
//     {
//         name: "50+",
//         uv: 2.63,
//         pv: 4800,
//         fill: "#d0ed57"
//     },
//     {
//         name: "unknow",
//         uv: 6.67,
//         pv: 4800,
//         fill: "#ffc658"
//     }
// ];

// const style = {
//     top: 0,
//     left: 350,
//     lineHeight: "24px"
// };

// export const ChartRadial = () => {
//     return (
//         <RadialBarChart
//             width={500}
//             height={300}
//             cx={150}
//             cy={150}
//             innerRadius={20}
//             outerRadius={140}
//             barSize={10}
//             data={data}
//         >
//             <RadialBar
//                 minAngle={15}
//                 label={{ position: "insideStart", fill: "#fff" }}
//                 background
//                 clockWise
//                 dataKey="uv"
//             />
//             <Legend
//                 iconSize={10}
//                 width={120}
//                 height={140}
//                 layout="vertical"
//                 verticalAlign="middle"
//                 wrapperStyle={style}
//             />
//         </RadialBarChart>
//     );
// }
