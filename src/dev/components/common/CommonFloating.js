import React from 'react';
import '../../../../css/components/floating.css'

class CommonFloating extends React.Component{
    constructor(props){
        super(props)

        if(props.menuList == undefined)
            console.warn('you need to set MenuList at leact ONE!');

        /*
       
               {
                    mode : 'delete' , 
                    text : '선택삭제' , 
                    classname : 'delete' , 
                    clickevent : function (){ alert('선택삭제')}
                } , 
                {
                    mode : 'ingredient' , 
                    text : '재료 추가' , 
                    classname : 'ingredient' , 
                    clickevent : function (){alert('재료추가')}
                }

        */

        this.state = {
            options : {

            }
            ,toggled : false
            ,menuList : props.menuList == undefined ? [
              
            ] : props.menuList
        }

        this.toggleFloatingMenu = this.toggleFloatingMenu.bind(this);
        this.clickDelegate = this.clickDelegate.bind(this);
    }
    
    toggleFloatingMenu(){
        this.setState(prevState => ({
            ...prevState,
            toggled: !prevState.toggled
        }))
    }

    clickDelegate(callback , e){
        if(e.target.tagName.toUpperCase() == "I"){
            if(callback != undefined){
                callback();
            }
        }
    }
    

    render(){
        var _menuList = this.state.menuList.length > 0 ? this.state.menuList : [];
        return(
            <div onClick={this.toggleFloatingMenu} className={`morefloatingWrapper ${this.state.toggled ? "current" : ""}`}>
                <div className="floatingBtnWrap" >
                    <button type="button" className={`moreLinkBtn ${this.state.toggled ? "on" : ""}`}><span>더많은컨텐츠보기</span></button>
                </div>
                <div className="floatingContentsWrap">
                    <ul id="ulMenuList">
                        {_menuList.map(list => (
                            <li key={list.mode} onClick={this.clickDelegate.bind(this , list.clickevent)}>
                                <a data-mode={list.mode}>
                                    <span className="col nameWrap"><i className="name">{list.text}</i></span>
                                    <span className="col imgWrap"><i className={list.classname}></i></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default CommonFloating;