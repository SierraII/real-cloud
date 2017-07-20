import React from 'react';
import axios from 'axios';

import CandleStickStockScaleChart from './CandleStickStockScaleChart.js';

class App extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            data: null
        };

    }

    componentDidMount(){

        // var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
        //
        // d3["tsv"]("//rrag.github.io/react-stockcharts/data/MSFT.tsv", (err, data) => {
        //
        // 	data.forEach((d, i) => {
        // 		d.date = new Date(d3.timeParse("%Y-%m-%d")(d.date).getTime());
        // 		d.open = +d.open;
        // 		d.high = +d.high;
        // 		d.low = +d.low;
        // 		d.close = +d.close;
        // 		d.volume = +d.volume;
        //         // console.log(d);
        // 	});
        //
        // });

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=BEDQE0RSQK7E37S6").then(result => {
        //    console.log(result.data);
        });

        var data = [
            {
                "date": new Date(2012, 0, 1),
                "open": 57.08436360087473,
                "high": 57.451879819431255,
                "low": 57.451879819431255,
                "close": 57.143959
            },
            {
                "date": new Date(2012, 6, 1),
                "open": 57.08436360087473,
                "high": 57.451879819431255,
                "low": 57.451879819431255,
                "close": 57.143959
            }
        ];

        this.setState({data: data});

    }

    render(){



        var type = "svg";

        if (this.state.data){

            return(
                <div id="chart">
                    <CandleStickStockScaleChart data={this.state.data} type={type} />
                </div>
            );

        }

        else{
            return(<div><h1>loading...</h1></div>);
        }



    }

}

export default App;
