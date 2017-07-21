import React from 'react';
import axios from 'axios';

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

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
            data: null,
            series: "INTRADAY"
        };

    }

    propTypes: {
    	width: React.PropTypes.number.isRequired,
    	ratio: React.PropTypes.number.isRequired,
        symbol: React.PropTypes.string.isRequired,
    }

    componentDidMount(){
        this._getStockPrice("INTRADAY");
        this._startPriceTimer();
    }

    _startPriceTimer(){

        var self = this;

        var timer;

        function showRemaining(){
            self._getStockPrice(self.props.series);
        }

        timer = setInterval(showRemaining, 1000 * 30);

    }

    _getStockPrice(series){

        console.log("getting rpice...");

        let data = [];
        let url = "http://127.0.0.1:5000/stocks/get?symbol=" + this.props.symbol + "&interval=" + series;

        this.setState({loading: "loading..."});

        var numDaysBetween = function(d1, d2){

            let diff = Math.abs(d1.getTime() - d2.getTime());
            return diff / (1000 * 60 * 60 * 24);

        };

        let today = new Date();

        axios.get(url).then(result => {

            var series = result.data;

            for(var key in series){

                if(series.hasOwnProperty(key)){

                    if(numDaysBetween(today, new Date(key)) < 180){

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

            this.loading = "";

            this.setState({data: data, series: series, loading: ""});

        });

    }

    _changeSeries(series){

        this._getStockPrice(series);

        var controls = $("div#" + this.props.symbol + ">div.controls");

        console.log(controls);

        controls.children("a").each(function(){

            console.log(this);

            $(this).removeClass("active");

            if($(this).data("series") === series){
                $(this).addClass("active");
            }

        });

    }

	render(){

		let { width, ratio } = this.props;

        let margin = {left: 20, right: 60, top:130, bottom: 250};
        let height = 750;

        let gridHeight = height - margin.top - margin.bottom;
        let gridWidth = width - margin.left - margin.right;

        let showGrid = true;
        let yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
        let xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

        if (this.state.data){

            return(

                <div id={this.props.symbol}>

                    <ChartCanvas ratio={ratio} width={width} height={400}
                            margin={{ left: 50, right: 60, top: 10, bottom: 30 }} type="svg"
                            seriesName={this.props.symbol}
                            data={this.state.data}
                            xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
                            xExtents={[this.state.data[0].date, this.state.data[this.state.data.length - 1].date]}>

                        <Chart id={1} yExtents={d => [d.high, d.low]}>

                            <YAxis axisAt="left" orient="left" ticks={7} {...yGrid} inverted={true} tickStroke="#FFFFFF" />
                            <XAxis axisAt="bottom" orient="bottom" ticks={7} {...xGrid} inverted={true} tickStroke="#FFFFFF"/>

                            <CandlestickSeries wickStroke={d => d.close > d.open ? "#505667" : "#505667"}
                                fill={d => d.close > d.open ? "#26ff00" : "#ff1500"}/>

                            <OHLCTooltip forChart={1} origin={[20, 10]}/>

                            <MouseCoordinateY
                                at="right"
                                orient="right"
                                displayFormat={format(".2f")} />

                            <MouseCoordinateX
                                at="bottom"
                                orient="bottom"
                                displayFormat={timeFormat("%d/%m %H:%M")} />

                        </Chart>

                        <Label x={(width - margin.left - margin.right) / 2} y={(height - margin.top - margin.bottom) / 2}
                        fontSize={40} text={this.props.symbol} fill="#FFFFFF" opacity={0.2}/>

                        <CrossHairCursor stroke="#FFFFFF"/>

                    </ChartCanvas>

                    <div className="controls">
                        <span className="highlight font-small">{this.state.loading} </span>
                        <a className="btn active" data-series="INTRADAY" onClick={this._changeSeries.bind(this, "INTRADAY")}>Intraday</a>
                        <a className="btn" data-series="DAILY" onClick={this._changeSeries.bind(this, "DAILY")}>Daily</a>
                        <a className="btn" data-series="MONTHLY" onClick={this._changeSeries.bind(this, "MONTHLY")}>Monthly</a>
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
