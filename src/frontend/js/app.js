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

        var data = [];

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&interval=1min&apikey=BEDQE0RSQK7E37S6").then(result => {

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

                    console.log(month);

                    data.unshift(month);

                }

            }

            this.setState({data: data});

        });

    }

    render(){

        var type = "svg";

        if (this.state.data){

            return(
                <div id="chart">
                    <CandleStickStockScaleChart data={this.state.data} type={type}/>
                </div>
            );

        }

        else{
            return(<div><h1>loading...</h1></div>);
        }

    }

}

export default App;
