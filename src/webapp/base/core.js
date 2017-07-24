import React from 'react'
import App from './app.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Core = () => (

    <Router>

        <div>

            <Link to="/dashboard">Dashboard </Link>
            <Link to="/stock">Stock </Link>
            <Link to="/articles">Articles </Link>

            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/stock" component={Stock}/>

        </div>

    </Router>

)

const Stock = ({ match }) => (

    <h1>Stock</h1>

)

const Dashboard = ({ match }) => (
    <App/>
)

export default Core
