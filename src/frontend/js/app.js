import React from 'react';
import CandleStickStockScaleChart from './CandleStickStockScaleChart.js';
import NewsFeed from './NewsFeed.js';

class App extends React.Component{

    render(){

        let stockSymbols = ["GOOGL", "TSLA", "MSFT", "AMZN", "AAPL"];
        let renderedStockDoms = [];

        for(var i = 0; i < stockSymbols.length; i++){

            renderedStockDoms.push(

                <div key={stockSymbols[i]} id="chart-container">
                    <CandleStickStockScaleChart symbol={stockSymbols[i]} series="DAILY"/>
                </div>

            );

        }

        return(

            <div>
                <div className="chart-parent">{renderedStockDoms}</div>
                <div className="news-feed-parent"><NewsFeed symbols={stockSymbols}/></div>
            </div>

        );

    }

}

export default App;
