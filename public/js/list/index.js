/*
 * 博客列表页面
 * @Author slashhuang
 * 17/4/25
 */
import '../../css/index.scss'

require('./scss/index.scss')

import { blogListApi } from '../manage/ajax/'
import React,{ Component }  from 'react'
import { render } from 'react-dom'
import { Spin } from 'antd'
import { DetailPanel } from '../components/'
class ListPanel extends Component{
    state={
        blogList:[]
    }
    componentDidMount(){
        blogListApi().then(blogList=>{
            blogList = blogList.reverse()
            this.setState({blogList})
        })
        this.setState(this.state)
    }
    renderBlog(detail,index){
        return <DetailPanel key={index} detail={detail}/>
    }
    renderList(){
        let { blogList } =this.state;
        return blogList.map((blog,index)=>{
            return this.renderBlog(blog,index)
        })
    }
    render(){
        let { blogList } =this.state;
        return (
            <div> 
                <div className="list">
                    <h3>文章列表</h3>
                    <ul>
                        {blogList.map((item,index)=>{
                            let {_id,title} = item;
                            return (
                                <li key={index}><a href={`/blog?id=${_id}`}>{title}</a></li>
                            )
                        })}
                    </ul>
                </div>
                <div className='container clearfix'>
                    {
                        do{
                            if(blogList.length>0){
                                this.renderList()
                            }else{
                                <Spin size='large' tip="加载中..." className='spinner'/>
                            }
                        }
                    }
                </div>
            </div>
        )
    }
}
render(<ListPanel />,document.getElementById('mod-list'))





