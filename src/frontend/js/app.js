import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react';

import StockChart from './StockChart.js';
import NewsFeed from './NewsFeed.js';
import Profile from './Profile.js';

class App extends React.Component{

    render(){

        let stockSymbols = ["GOOGL", "TSLA", "MSFT", "AMZN", "AAPL"];
        let renderedStockDoms = [];

        for(var i = 0; i < stockSymbols.length; i++){

            renderedStockDoms.push(

                <div key={stockSymbols[i]} id="chart-container">
                    <StockChart symbol={stockSymbols[i]} series="INTRADAY"/>
                </div>

            );

        }

        return(

            <div>

                <div className="chart-parent">{renderedStockDoms}</div>

                <div className="side-container">
                    <Profile/>
                    <NewsFeed symbols={stockSymbols}/>
                </div>

            </div>

        );

    }

}

export default App;
