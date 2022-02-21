import React from 'react';

class SelectFreezerPop extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openYN: false,
            freezerList: props.freezerListObj.freezerList,
            clickEvent: null
        }
        
        this.passToParentSelectFreezerKey = this.passToParentSelectFreezerKey.bind(this);
        this.closeSelectPopup = this.closeSelectPopup.bind(this);
    }

    passToParentSelectFreezerKey(e){
        let _freezerKey = e.currentTarget.dataset.code;
        this.props.addSections(_freezerKey);
        this.props.closeSelectFreezerPopup();
    }

    closeSelectPopup(){
        this.props.closeSelectFreezerPopup();
    }

    componentWillReceiveProps(nextProps){
        this.setState(prevState => ({
            ...prevState,
            openYN: nextProps.freezerListObj.openYN,
            freezerList: nextProps.freezerListObj.freezerList,

        }))
    }

    componentDidMount(){
        setTimeout(() => {
            if(window.webViewBridge != undefined){
                // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });

                // 해당 페이지 일때만 실행
                if(location.pathname.toUpperCase().indexOf('SELECTFREEZERPOP') > -1){
                    var handleComponentDidMountMessage = {
                        visibleFooter : 'N' , 
                        currentPath : location.pathname
                    }
                    window.webViewBridge.send('handleComponentDidMount' , handleComponentDidMountMessage , function (){ } , function (){ });
                }
            }
            else{
                console.log('window.webViewBridge 없어')
            }    
        }, 0);
    }

    render(){
        return(
            <div className={`select-freezer-wrapper ${this.state.openYN ? "current" : ""} vertical-middle`}>
                <div className="select-container">
                    <div className="select-wrapper">
                        <div className="close" onClick={this.closeSelectPopup}></div>
                        <ul className="select-wrapper-list">
                            {
                                this.state.freezerList.map((f, i)=> (
                                    <li key={f.FreezerKey} className="select-wrapper-list-item vertical-middle" data-code={f.FreezerKey} onClick={this.passToParentSelectFreezerKey}>
                                        <i className={`color${(i + 1) % 24}`}></i>
                                        <span className="nameWrap">{f.FreezerName}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
        </div>
        );
    }
}

export default SelectFreezerPop;