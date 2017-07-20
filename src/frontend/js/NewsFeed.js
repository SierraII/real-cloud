'use strict';

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

        // TODO
        // create a proxy for getting google news xml feeds
        // cant be loaded from ajax

        let data = [];

        let url = "";

        axios.get(url).then(result => {
            this.setState({data: data});
        });

        var txt, parser, xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString("", "text/xml");

        function readTextFile(file){

            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);

            rawFile.onreadystatechange = function(){

                if(rawFile.readyState === 4){

                    if(rawFile.status === 200 || rawFile.status == 0){

                        var allText = rawFile.responseText;

                        xmlDoc = parser.parseFromString(allText, "text/xml");

                    }

                }

            }

            rawFile.send(null);

        }

        readTextFile("./tmp/News.xml");

    }

	render(){

        if (this.state.data){

            return(

                <div>

                    <div className="article-container">
                        <div className="heading"><span className="stock-highlight">TSLA</span> - Model 3 Can Propel Tesla Inc (TSLA) Stock to $400 by 2018</div>
                        <div className="date">Tue, 18 Jul 2017 13:59:18 GMT</div>
                    </div>
                    <div className="article-container">
                        <div className="heading"><span className="stock-highlight">TSLA</span> - Tesla Investors Swallow The Blue Pill</div>
                        <div className="date">Tue, 18 Jul 2017 13:59:18 GMT</div>
                    </div>
                    <div className="article-container">
                        <div className="heading"><span className="stock-highlight">TSLA</span> - Upstart Tesla rival Lucid Motors is shopping itself around for a sale, report says</div>
                        <div className="date">Tue, 18 Jul 2017 13:59:18 GMT</div>
                    </div>
                    <div className="article-container">
                        <div className="heading"><span className="stock-highlight">TSLA</span> - some cool text here</div>
                        <div className="date">Tue, 18 Jul 2017 13:59:18 GMT</div>
                    </div>
                    <div className="article-container">
                        <div className="heading"><span className="stock-highlight">TSLA</span> - some cool text here</div>
                        <div className="date">Tue, 18 Jul 2017 13:59:18 GMT</div>
                    </div>

                </div>

            );

        }

        else{
            return(<div><h1>loading...</h1></div>);
        }

	}

}

export default NewsFeed;
