import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {

        // intilise all value
        const svg = d3.select(svgRef.current);
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        svg.attr('width', width).attr('height', height);

        // crete x axis

        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.month))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.sales)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = (g) =>
            g
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickSizeOuter(0));

        const yAxis = (g) =>
            g.attr('transform', `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale).ticks(null, 's'))
                .call((g) => g.select('.domain').remove())
                .call((g) =>
                    g
                        .append('text')
                        .attr('x', -margin.left)
                        .attr('y', 10)
                        .attr('fill', 'currentColor')
                        .attr('text-anchor', 'start')
                        .text('Sales')
        );

        svg.select('.x-axis').call(xAxis);
        svg.select('.y-axis').call(yAxis);

        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xScale(d.month))
            .attr('y', (d) => yScale(d.sales))
            .attr('width', xScale.bandwidth())
            .transition() // Transition for animation
            .duration(1000)
            .attr('height', (d) => chartHeight - yScale(d.sales))
            .attr('fill', 'steelblue');
            

    }, [data]);

    return (
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
};

export default BarChart;
