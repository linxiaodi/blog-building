import './scss/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'

class About extends React.Component{
    render(){
        return(
            <h1 className='note'>装修中~~~~~~</h1>
        )
    }
}

ReactDOM.render( <About/> , document.getElementById('mod-about'))