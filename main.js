
var dataset = [
    [1947, 4.16],
    [1948, 3.31],
    [1949, 3.67],
    [1950, 4.76],
    [1951, 4.76],
    [1952, 4.76],
    [1953, 4.76],
    [1954, 4.76],
    [1955, 4.76],
    [1956, 4.76],
    [1957, 4.76],
    [1958, 4.76],
    [1959, 4.76],
    [1960, 4.76],
    [1961, 4.76],
    [1962, 4.76],
    [1963, 4.76],
    [1964, 4.76],
    [1965, 4.76],
    [1966, 6.36],
    [1967, 7.50],
    [1968, 7.50],
    [1969, 7.50],
    [1970, 7.50],
    [1971, 7.49],
    [1972, 7.59],
    [1973, 7.74],
    [1974, 8.10],
    [1975, 8.38],
    [1976, 8.96],
    [1977, 8.74],
    [1978, 8.19],
    [1979, 8.13],
    [1980, 7.86],
    [1981, 8.66],
    [1982, 9.46],
    [1983, 10.1],
    [1984, 11.36],
    [1985, 12.37],
    [1986, 12.61],
    [1987, 12.96],
    [1988, 13.92],
    [1989, 16.23],
    [1990, 17.5],
    [1991, 22.74],
    [1992, 25.92],
    [1993, 30.49],
    [1994, 31.37],
    [1995, 32.43],
    [1996, 35.34],
    [1997, 36.31],
    [1998, 41.26],
    [1999, 43.06],
    [2000, 44.94],
    [2001, 47.19],
    [2002, 48.61],
    [2003, 46.58],
    [2004, 45.32],
    [2005, 44.1],
    [2006, 45.31],
    [2007, 41.35],
    [2008, 43.51],
    [2009, 48.41],
    [2010, 45.73],
    [2011, 46.67],
    [2012, 53.54],
    [2013, 56.57],
    [2014, 62.33],
    [2015, 62.97],
    [2016, 66.46],
    [2017, 67.79],
    [2018, 70.09]
];

const w = 1265;
const h = 600;
const padding = 30;
var colors = d3.schemeCategory10;
var num = 0;

// Here we define scale for the graph

const xScale = d3.scaleLinear()
    .domain([1947, d3.max(dataset, (d) => d[0])])
    .range([padding, w - 23]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);

// Start with giving width and height for the graph
const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h + 50);


// Here we draw rectangles and color them

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 17 + 30)
    .attr("y", (d, i) => h - (7.5 * d[1]))
    .attr("width", 11)
    .attr("height", (d, i) => d[1] * 7.5)
    .attr("fill", function (d, i) {
        // To repeat the colors
        if (i >= 10) {
            if (i.toString().includes("0")) {
                num = i;
            }
            i = i - num;
        }
        return colors[i];
    })
    .attr("class", "bar")
    .append('title')
    .text((d) => {
        return d[0] + ": $1 = Rs." + d[1]
    });

// Here we start giving the axis

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// For X-Axis
svg.append("g")
    .attr("transform", "translate(0," + (h - padding + 30) + ")")
    .call(xAxis);

svg.append("text")
    .attr("transform",
        "translate(" + (w / 2) + " ," +
        (h + 35) + ")")
    .style("text-anchor", "middle")
    .style('font-family', 'bold')
    .text("YEARS");

// For Y-Axis
svg.append("g")
    .attr("transform", "translate(" + padding + ", 30)")
    .call(yAxis);

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 35)
    .attr("x", 0 - (h / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style('font-family', 'bold')
    .text("Rupees");

