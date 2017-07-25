import React from 'react';
import axios from 'axios';

class StockChanges extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            data: null
        };

    }

    componentDidMount(){

        var self = this;

        let tmp = [];

        // for(var i = 0; i < this.props.symbols.length; i++){
        //
        //     let symbol = this.props.symbols[i];
        //
        //     let url = "http://127.0.0.1:5000/news/get?symbol=" + symbol;
        //
        //     axios.get(url).then(result => {
        //
        //         result["symbol"] = symbol;
        //
        //         tmp.push(result);
        //
        //         // self.setState({data: tmp});
        //
        //     });
        //
        // }

    }

	render(){

        return(

            <div className="stock-changes-container">

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">TSLA</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference positive">+ 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">TSLA</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference negative">- 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">TSLA</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference negative">- 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">MSFT</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference positive">+ 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">MSFT</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference positive">+ 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">MSFT</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference positive">+ 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

                <div className="block-container">

                    <a href="#" target="_blank">

                        <div className="change-container">

                            <div className="highlight stock-container">MSFT</div>

                            <div className="stock-right-side">
                                <div className="price">1004.44</div>
                                <div className="difference positive">+ 0.2%</div>
                            </div>

                        </div>

                    </a>

                    <span className="faded-line-darker"></span>

                </div>

            </div>
        );

    }

}

export default StockChanges;
