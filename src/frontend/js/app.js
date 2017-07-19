import React from 'react';
import axios from 'axios';

var LineChart = require("react-chartjs").Bar;

// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=BEDQE0RSQK7E37S6

class App extends React.Component{

    state : {

    };

    render(){

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=BEDQE0RSQK7E37S6").then(result => {
           console.log(result.data["Time Series (1min)"]);

        });

        return(

            <div>
                wtf
            </div>

        );

    }

}

export default App;
