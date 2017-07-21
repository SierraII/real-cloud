import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react';

import StockChart from '../components/stocks/stock-chart.js';
import NewsFeed from '../components/news/feed.js';
import Profile from '../components/user/profile.js';

class App extends React.Component{

    render(){

        let stockSymbols = ["GOOGL", "TSLA", "MSFT", "AMZN", "AAPL"];
        let renderedStockDoms = [];

        for(var i = 0; i < stockSymbols.length; i++){

            renderedStockDoms.push(

                <div className="chart-line-container">

                    <div key={stockSymbols[i]} id="chart-container">
                        <StockChart symbol={stockSymbols[i]} series="INTRADAY"/>
                    </div>

                </div>

            );

        }

        return(

            <div>

                <div className="content-parent">
                    {renderedStockDoms}
                </div>

                <div className="side-container">

                    <Profile/>

                    <span className="faded-line"></span>

                    <NewsFeed symbols={stockSymbols}/>

                </div>

            </div>

        );

    }

}

export default App;
