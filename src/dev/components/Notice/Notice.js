import React from 'react';
import  '../../../../css/components/notice.css';

import CommonHeader from '../common/CommonHeader'
import renderHTML from 'react-render-html';

class Notice extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            headerValues: {
                headTitle : '공지사항',
                leftAction : '',
                leftActionEvent : '',
                rightAction : '',
                rightActionEvent : '',
                leftClass : '',
                rightClass : 'back-right'
            },

            NoticeList: []
        }

        this.openNotice = this.openNotice.bind(this);
    }

    openNotice(e){
        e.currentTarget.classList.toggle("current");
    }

    componentDidMount(){
        $.ajax({
            url: "/src/dev/components/Notice/NoticeData.js"
            , type: "GET"
            , async: false
            , dataType: "json"
            , success: function (data) { 
                if(data){
                    this.setState(prevState => ({
                        ...prevState.state,
                        NoticeList: data.notices
                    }),function(){});
                }

            }.bind(this)         
        });   
    }

    render(){
        return(
            <div className="notice-container" data-paging-direction="right">
                <CommonHeader headerValues={this.state.headerValues}/>
                <div className="notice-wrapper">
                    <ul className="notice-list">
                        {
                            this.state.NoticeList.map((n, i) => (
                                <li key={i} className="notice-list-item" onClick={this.openNotice}>
                                    <div className="notice-item-wrapper vertical-middle">
                                        <div className="title-wrapper">
                                            <span className="type">{n.type}</span><span className="date">{n.date}</span>
                                            <p className="title">{n.title}</p>
                                        </div>
                                        <button className="toggle"></button>
                                    </div>
                                    <div className="notice-detail-wrapper">
                                        {renderHTML(n.detail)}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Notice;