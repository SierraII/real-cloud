import React from 'react';
import CandleStickStockScaleChart from './CandleStickStockScaleChart.js';

class App extends React.Component{

    render(){

        let stockSymbols = ["GOOGL", "TSLA", "MSFT", "AMZN"];
        let renderedStockDoms = [];

        for(var i = 0; i < stockSymbols.length; i++){

            renderedStockDoms.push(

                <div key={stockSymbols[i]} id="chart-container">
                    <CandleStickStockScaleChart symbol={stockSymbols[i]} series="DAILY"/>
                </div>

            );

        }

        return(
            <div>{renderedStockDoms}</div>
        );

    }

}

export default App;
