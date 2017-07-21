import React from 'react';
import axios from 'axios';

class NewsFeed extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            data: null
        };

    }

    componentDidMount(){

        console.log(this.props.symbols);

        var self = this;

        let tmp = [];

        for(var i = 0; i < this.props.symbols.length; i++){

            let symbol = this.props.symbols[i];

            let url = "http://127.0.0.1:5000/news/get?symbol=" + symbol;

            axios.get(url).then(result => {

                result["symbol"] = symbol;

                tmp.push(result);

                self.setState({data: tmp});

            });

        }

    }

	render(){

        let dom = [];

        if (this.state.data){

            var data = this.state.data;

            for(var i = 0; i < data.length; i++){

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data[i].data, "text/xml");

                $(xmlDoc).find("item").each(function(){

                    var el = $(this);

                    dom.push(

                        <a href={el.find("link").text()} target="_blank">

                            <div className="article-container">
                                <div className="heading"><span className="highlight">{data[i].symbol}</span> - {el.find("title").text()}</div>
                                <div className="date">{el.find("pubDate").text()}</div>
                            </div>

                        </a>

                    );

                });

            }

            return(

                <div className="news-container">

                    {dom}

                </div>

            );

        }

        else{

            return(

                <div className="loading-news">
                    <div className="loader"></div>
                </div>

            );
        }

	}

}

export default NewsFeed;
