'use strict';

import React from 'react';
import axios from 'axios';

import { ChartCanvas, Chart, series, scale, coordinates, annotation, tooltip, axes, indicator, helper } from "react-stockcharts";

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;
var { Annotate, LabelAnnotation, Label } = annotation;
var { OHLCTooltip } = tooltip;

var { discontinuousTimeScaleProvider } = scale;
var { CandlestickSeries } = series;
var { XAxis, YAxis } = axes;
var { fitWidth } = helper;

class CandleStickStockScaleChart extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            data: null
        };

    }

    propTypes: {

    	width: React.PropTypes.number.isRequired,
    	ratio: React.PropTypes.number.isRequired,
        symbol: React.PropTypes.string.isRequired

    }

    componentDidMount(){

        // get the data
        var data = [];

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + this.props.symbol + "&interval=1min&apikey=BEDQE0RSQK7E37S6").then(result => {

            var monthlySeries = result.data["Monthly Time Series"];

            for(var key in monthlySeries){

                if(monthlySeries.hasOwnProperty(key)){

                    var value = monthlySeries[key];
                    var month = {};

                    month["date"] = new Date(key);

                    month["open"] = parseFloat(value["1. open"]);
                    month["high"] = parseFloat(value["2. high"]);
                    month["low"] = parseFloat(value["3. low"]);
                    month["close"] = parseFloat(value["4. close"]);
                    month["volume"] = parseFloat(value["5. volume"]);

                    data.unshift(month);

                }

            }

            this.setState({data: data});

        });

    }

	render(){

		var { width, ratio } = this.props;

        var margin = {left: 20, right: 80, top:130, bottom: 250};
        var height = 750;

        var gridHeight = height - margin.top - margin.bottom;
        var gridWidth = width - margin.left - margin.right;

        var showGrid = true;
        var yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
        var xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

        if (this.state.data){

            return(

                <ChartCanvas ratio={ratio} width={width} height={400}
    					margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type="svg"
    					seriesName="MSFT"
    					data={this.state.data}
    					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
    					xExtents={[new Date(2001, 0, 1), new Date(2017, 6, 2)]}>

                        <Label x={(width - margin.left - margin.right) / 2} y={(height - margin.top - margin.bottom) / 2}
                        fontSize="40" text={this.props.symbol} fill="#FFFFFF" opacity="0.2"/>

    				<Chart id={1} yExtents={d => [d.high, d.low]}>

                        <YAxis axisAt="left" orient="left" ticks={5} {...yGrid} inverted={true} tickStroke="#FFFFFF" />
                        <XAxis axisAt="bottom" orient="bottom" ticks={5} {...xGrid} inverted={true} tickStroke="#FFFFFF"/>

        				<CandlestickSeries wickStroke={d => d.close > d.open ? "#505667" : "#505667"}
							fill={d => d.close > d.open ? "#26ff00" : "#ff1500"}/>
    				</Chart>

                    <OHLCTooltip forChart={1} origin={[20, 350]}/>
                    <CrossHairCursor stroke="#FFFFFF"/>

    			</ChartCanvas>

            );

        }

        else{
            return(<div><h1>loading...</h1></div>);
        }

	}

}

CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);

export default CandleStickStockScaleChart;
