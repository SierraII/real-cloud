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

class StockChart extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            data: null
        };

    }

    propTypes: {
    	width: React.PropTypes.number.isRequired,
    	ratio: React.PropTypes.number.isRequired,
        symbol: React.PropTypes.string.isRequired,
        series: React.PropTypes.string.isRequired
    }

    componentDidMount(){

        let data = [];
        let url = "http://127.0.0.1:5000/stocks/get?symbol=" + this.props.symbol + "&interval=" + this.props.series;

        var numDaysBetween = function(d1, d2){

            let diff = Math.abs(d1.getTime() - d2.getTime());
            return diff / (1000 * 60 * 60 * 24);

        };

        let today = new Date();

        axios.get(url).then(result => {

            var series = result.data;

            for(var key in series){

                if(series.hasOwnProperty(key)){

                    if(numDaysBetween(today, new Date(key)) < 90){

                        let value = series[key];
                        let month = {};

                        month["date"] = new Date(key);

                        month["open"] = parseFloat(value["1. open"]);
                        month["high"] = parseFloat(value["2. high"]);
                        month["low"] = parseFloat(value["3. low"]);
                        month["close"] = parseFloat(value["4. close"]);
                        month["volume"] = parseFloat(value["5. volume"]);

                        data.unshift(month);

                    }

                }

            }

            this.setState({data: data});

        });

    }

	render(){

		let { width, ratio } = this.props;

        let margin = {left: 20, right: 20, top:130, bottom: 250};
        let height = 750;

        let gridHeight = height - margin.top - margin.bottom;
        let gridWidth = width - margin.left - margin.right;

        let showGrid = true;
        let yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
        let xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

        if (this.state.data){

            return(

                <div>

                    <ChartCanvas ratio={ratio} width={width} height={400}
                            margin={{ left: 50, right: 0, top: 10, bottom: 30 }} type="svg"
                            seriesName={this.props.symbol}
                            data={this.state.data}
                            xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
                            xExtents={[new Date(2001, 6, 20), new Date(2017, 6, 22)]}>

                        <Chart id={1} yExtents={d => [d.high, d.low]}>

                            <YAxis axisAt="left" orient="left" ticks={7} {...yGrid} inverted={true} tickStroke="#FFFFFF" />
                            <XAxis axisAt="bottom" orient="bottom" ticks={7} {...xGrid} inverted={true} tickStroke="#FFFFFF"/>

                            <CandlestickSeries wickStroke={d => d.close > d.open ? "#505667" : "#505667"}
                                fill={d => d.close > d.open ? "#26ff00" : "#ff1500"}/>

                            <OHLCTooltip forChart={1} origin={[20, 10]}/>

                        </Chart>

                        <Label x={(width - margin.left - margin.right) / 2} y={(height - margin.top - margin.bottom) / 2}
                        fontSize={40} text={this.props.symbol} fill="#FFFFFF" opacity={0.2}/>

                        <CrossHairCursor stroke="#FFFFFF"/>

                    </ChartCanvas>

                    <div className="controls">
                        <a className="btn">Daily</a>
                        <a className="btn">Year</a>
                        <a className="btn">Tracker</a>
                    </div>

                </div>

            );

        }

        else{
            return(<div className="loading"><div className="loader"></div></div>);
        }

	}

}

StockChart = fitWidth(StockChart);

export default StockChart;
