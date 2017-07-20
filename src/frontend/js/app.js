import React from 'react';
import axios from 'axios';
import CandleStickStockScaleChart from './CandleStickStockScaleChart.js';

// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=BEDQE0RSQK7E37S6

class App extends React.Component{

    state : {

    };

    render(){

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=BEDQE0RSQK7E37S6").then(result => {
           console.log(result);
        });

        var data = [
            {
                "date": new Date(),
                "open": 5705.45,
                "high": 5716.6,
                "low": 5496.05,
                "close": 5507.85
            },
            {
                "date": new Date(),
                "open": 5705.45,
                "high": 5716.6,
                "low": 5496.05,
                "close": 5507.85
            },
            {
                "date": new Date(),
                "open": 5705.45,
                "high": 5716.6,
                "low": 5496.05,
                "close": 5507.85
            },
            {
                "date": new Date(),
                "open": 5705.45,
                "high": 5716.6,
                "low": 5496.05,
                "close": 5507.85
            }
        ];

        d3.request("./frontend/js/CandleStickStockScaleChart.js")
          .get(function(err, data) {
            var outputEl = document.getElementById('chart');
            try {
              var output = Babel.transform(data.responseText, { presets: ["es2015", "react", "stage-3"] }).code;
              eval(output);
            } catch (ex) {
              outputEl.innerHTML = 'ERROR: ' + ex.message;
            }
        });

        return(
            <div id="chart"></div>
        );

    }

}

export default App;
