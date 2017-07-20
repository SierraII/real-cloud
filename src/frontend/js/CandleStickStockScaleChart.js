'use strict';

import React from 'react';
import axios from 'axios';
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;
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

		var { data, width, ratio } = this.props;

        if (this.state.data){

            return(

                <ChartCanvas ratio={ratio} width={width} height={400}
    					margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type="svg"
    					seriesName="MSFT"
    					data={this.state.data}
    					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
    					xExtents={[new Date(2001, 0, 1), new Date(2017, 6, 2)]}>

    				<Chart id={1} yExtents={d => [d.high, d.low]}>
    					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
    					<YAxis axisAt="left" orient="left" ticks={5} />
    					<CandlestickSeries />
    				</Chart>

                    <OHLCTooltip forChart={1} origin={[-40, 0]}/>

                    <CrossHairCursor />

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
