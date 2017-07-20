import React from 'react';
import CandleStickStockScaleChart from './CandleStickStockScaleChart.js';

class App extends React.Component{

    render(){

        return(

            <div id="chart-container">
                <CandleStickStockScaleChart symbol="GOOGL"/>
            </div>

        );

    }

}

export default App;
