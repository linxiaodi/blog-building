/*
 * 博客详情页面
 * @Author slashhuang
 * 17/4/25
 */
require('./scss/index.scss')
import { blogDetailApi } from './ajax'
import React,{ Component }  from 'react'
import { render } from 'react-dom'
import { Spin } from 'antd'
import {DetailPanel}  from '../components/index.js'
class DetailIndex extends Component{
    state={
        detail:null
    }
    componentDidMount(){
        blogDetailApi().then(detail=>{
            detail=detail[0]
            this.setState({detail})
        })
    }
    render(){
        let {detail} = this.state
        return (
            <div className='container clearfix'>
               {
                do{
                    if(detail){
                        <DetailPanel detail={detail}/>
                    }else{
                        <Spin size='large' tip="加载中..." className='spinner'/>
                    }
                }
               }
                <div className="widgets">
                </div>
            </div>
        )
    }
}
render(<DetailIndex />,document.getElementById('mod-detail'))





