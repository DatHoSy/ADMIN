let data = [];

for (let index = 1; index <= 12; index++) {
    let isStocks = Math.floor(Math.random() * 4 + 1);
    if (isStocks <= 3) {
        data.push(
            {
                "hour": (12 - index + 1) + '.00',
                "gdp": index + Math.random() * 19000000000 + 1000000000,
                "name": "User",
                "fill": "#8884d8"
            },
        )
    } else {
        data.push(
            {
                "hour": (12 - index + 1) + '.00',
                "gdp": index + Math.random() * 19000000000 + 1000000000,
                "name": "User"
            },
        )
    }
    
}

export const dataChart = [
   ...data
];