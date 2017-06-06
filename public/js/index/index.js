import './scss/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {blogListApi} from '../manage/ajax/'
class App extends React.Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div className='jumbotron-content'>
                        <h2>Hello World!</h2>
                        <p>我走得很慢</p>
                        <p>但是我从未后退！</p>
                        <a className='btn' target='_blank' href="http://wpa.qq.com/msgrd?v=3&uin=343206347&site=qq&menu=yes">Say hello to author</a>
                    </div>
                </div>
                <div className="container">
                    <div className="server">
                        <h1>Server <small>Code for Server</small></h1>
                        <ul>
                            <li>
                                <img src="../../img/nodejs.jpg" alt=""/>
                                <h2 className="title">NodeJS</h2>
                                <p>基于 Chrome V8 引擎的 JavaScript 运行环境</p>
                            </li>
                            <li>
                                <img src="../../img/mongodb.png" alt=""/>
                                <h2 className="title">MongoDB</h2>
                                <p>基于分布式文件存储的数据库。</p>
                            </li>
                        </ul>
                    </div>
                    <div className="browser">
                        <h1>Browser <small>Code for Browser</small></h1>
                        <ul>
                            <li>
                                <i className='iconfont icon-socialjavascript'></i>
                                <h2>JavaScript</h2>
                                <p>脚本语言</p>
                            </li>
                            <li>
                                <i className='iconfont icon-css3'></i>
                                <h2>CSS</h2>
                                <p>层叠样式表</p>
                            </li>
                            <li>
                                <i className='iconfont icon-html-copy'></i>
                                <h2>Html</h2>
                                <p>超文本标记语言</p>
                            </li>
                        </ul>
                    </div>
                    <div className="other">
                        <h1>Other</h1>
                        <ul>
                            <li>
                                <i className='iconfont icon-git'></i>
                                <h2>Git</h2>
                                <p>分布式版本控制系统</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render( <
    App / > , document.getElementById('mod-index')
)
