import React from 'react';
import  '../../../../css/components/editMenu.css';

import * as commonActions from '../../actions/common.js'
import { connect } from 'react-redux';

class CommonEditMenu extends React.Component{
    constructor(props){
        super(props)


        // {
        //     title: "냉장고",
        //     editList: [ {className: "main", event: this.setMainFreezer.bind(this, _freezerCode), title: "메인으로 설정"},
        //                 {className: "update", event: this.changeUpdateMode.bind(this, _freezerCode), title: "냉장고 수정"},
        //                 {className: "delete", event: this.deleteFreezer.bind(this, _freezerCode), title: "냉장고 삭제"} ]
        // }


        this.state = {
            editMenuValue : props.editMenuValue,
            toggled : props.toggled == undefined ? false : props.toggled , 
            handleCloseEditMenu : props.handleCloseEditMenu
        }

        this.makeMenuList = this.makeMenuList.bind(this);
        this.handleEditListClick = this.handleEditListClick.bind(this);
    }

    handleEditListClick(callback){
        if(callback()) this.closeEditMenu();
    }

    // handleCloseEditMenu(){
    //     this.props.openNcloseEditMenu(false);
    // }

    makeMenuList(){
        let returnElement= [];

        this.state.editMenuValue.editList.map((e, i) => {
            returnElement.push(<li key={i} className="edit-list" onClick={this.handleEditListClick.bind(null, e.event)}>
                                    <div className="edit-list-item"><i className={e.className}></i><span>{e.title}</span></div>
                                </li>);
        })
        
        return returnElement;
    }

    componentWillReceiveProps(nextProps){
        if(this.state.toggled != nextProps.toggled){
            this.setState(prevState => ({
                ...prevState,
                toggled : nextProps.toggled,  
                editMenuValue: nextProps.editMenuValue
            }))
        }
    }

    render(){
        let lsitElement = this.makeMenuList();
        
        return(
            <div className={`edit-container ${this.state.toggled ? "visible" : ""}`}>
                <div className="edit-wrapper">
                    <div className="title-wrapper">
                        <div className="title"><span>{this.state.editMenuValue.title}</span></div>
                        <div className="close-wrapper" onClick={this.state.handleCloseEditMenu}><a className="close"></a></div>
                    </div> 
                    <ul className="edit-list-wrapper">
                        {lsitElement}
                    </ul>
                </div>
            </div>
        );
    }
}

// //export default CommonEditMenu;
// const mapDispatchToProps = (dispatch) => {
//     return{
//         openNcloseEditMenu: (conditon) => {dispatch(commonActions.openNcloseEditMenu(conditon))}
//     };
// }

export default connect(null, null)(CommonEditMenu);