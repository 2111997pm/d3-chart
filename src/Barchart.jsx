import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width, height }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Clear existing chart
        svg.selectAll('*').remove();

        // Create scales
        const xScale = d3
            .scaleBand()
            .domain(data.map((d, i) => i))
            .range([0, width])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d)])
            .nice()
            .range([height, 0]);

        // Draw bars with labels and animations
        svg
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d))
            .attr('fill', 'steelblue')
            .attr('opacity', 0) // Set initial opacity to 0 for animation
            .transition()
            .duration(1000) // Animation duration in milliseconds
            .attr('opacity', 1); // Transition to full opacity

        // Add labels to the bars
        svg
            .selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', d => yScale(d) - 5) // Adjust position for label
            .attr('text-anchor', 'middle')
            .text(d => d);

        // Draw x-axis
        svg
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        // Draw y-axis
        svg.append('g').call(d3.axisLeft(yScale));
    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default BarChart;
