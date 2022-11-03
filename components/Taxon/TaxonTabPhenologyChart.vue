<!--
 Copyright 2022 Royal Botanic Gardens Board
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div>
    <div class="h4">{{ subgroup[0].toUpperCase() + subgroup.substring(1) }}</div>
    <svg 
      width="900" 
      height="300"
      class="vf-phenology-chart"
    ></svg>
  </div>
</template>

<script>
import * as d3 from "d3"

export default {
  name: "TaxonTabPhenologyChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
    subgroup: {
      type: String,
      default: 'total'
    }
  },
  mounted() {
    const subgroup = this.subgroup
    const colour = '#cccccc'

    let margins = { top: 60, bottom: 60, left: 60, right: 60 }
    let svg = d3.select(this.$el.querySelector('svg'))
    let width = parseInt(svg.attr('width'))
    let height = parseInt(svg.attr('height'))
    let g = svg.append('g')
      .attr('transform', 'translate(' + margins.top + ',' + margins.left + ')')
    
    let data = JSON.parse(JSON.stringify(this.data))

    let xScale = d3.scaleBand()
      .domain(data.map(item => {
        return item.monthShort
      }))
      .range([0, width - margins.left - margins.right])
    let xAxis = d3
      .axisBottom(xScale)
      .tickSize(8)
      
    let yScale = d3.scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d[subgroup]
        })
      )
      .range([height - margins.top - margins.bottom, 0])

    let yAxis = d3.axisLeft(yScale)
      .tickValues(yScale.ticks().filter(tick => Number.isInteger(tick)))
      .tickFormat(d3.format('d'))

    g.append('g')
      .attr('transform', 'translate(' + 0 + ',' + (height - margins.top - margins.bottom) + ')')
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr('font-size', '12px')
    
    g.append('g')
      .attr('transform', 'translate(0, 0)')
      .attr('font-size', '12px')
      .call(yAxis)
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '-4em')
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .text('# specimens')

  let gs = g.selectAll('.rect')
      .data(data)
      .enter()
      .append('g')

    let rectPadding = 2
    gs.append('rect')
      .attr('x', function (d) {
        return xScale(d.monthShort) + rectPadding / 2
      })
      .attr('y', function (d) {
        return yScale(d[subgroup])
      })
      .attr('width', function () {
        return xScale.step() - rectPadding
      })
      .attr('height', function (d) {
        return height - margins.top - margins.bottom - yScale(d[subgroup])
      })
      .attr('fill', colour)


  },
}
</script>

<style lang="scss">
svg.vf-phenology-chart {
  margin-top: -3em;
}
</style>