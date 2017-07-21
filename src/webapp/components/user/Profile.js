import React from 'react';
import axios from 'axios';

class NewsFeed extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            data: null,
            marketOpens: ""
        };

    }

    componentWillMount(){

        this.startMarketOpenTimer();

    }

    startMarketOpenTimer(){

        var self = this;

        var end = new Date();

        end.setHours(16);
        end.setMinutes(0);
        end.setSeconds(0);
        end.setMilliseconds(0);

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        function showRemaining(){

            var now = new Date();
            var distance = end - now;

            if (distance < 0){

                clearInterval(timer);
                self.setState({marketOpens: "Market is open."});

                return;
            }

            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            self.setState({marketOpens: " Market opens in " + hours + 'hrs ' + minutes + " min " + seconds + " sec"});

        }

        timer = setInterval(showRemaining, 1000);

    }

    componentDidMount(){

    }

	render(){

        return(

            <div className="profile-container">

                <div className="heading">{this.state.marketOpens}</div>

                <div className="profile-card">

                    <div className="profile-name">Adrian David Smith</div>

                </div>

            </div>

        );

        if (this.state.data){



        }

        else{
            return(<div><h1>profile loading...</h1></div>);
        }

	}

}

export default NewsFeed;
