import React from 'react';
import EditMySections from './EditMySections'

import * as commonActions from '../../actions/common.js'
import { connect } from 'react-redux';

class EditMyFreezers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            myFreezers: []
        }
        
        this.setNewSections = this.setNewSections.bind(this);
        this.makeComponent = this.makeComponent.bind(this);
        this.passToParentOpenEditMenu = this.passToParentOpenEditMenu.bind(this);
        this.setMainFreezer = this.setMainFreezer.bind(this);
        this.updateFreezer = this.updateFreezer.bind(this);
        this.changeUpdateMode = this.changeUpdateMode.bind(this);
        this.deleteFreezer = this.deleteFreezer.bind(this);
    }

    setNewSections(code, newSections){
        let updateFreezer = this.state.myFreezers.filter(f => f.FreezerKey == code);
        let prevFreezers = this.state.myFreezers.filter(f => f.FreezerKey != code);
        let newFreezers = [...prevFreezers, {...updateFreezer[0], MySections: newSections}];
        
        this.props.setNewFreezers(newFreezers);
    }

    updateFreezer(e){
        let _code = e.target.dataset.code;
        let _title = e.target.parentNode.querySelector("input[type=text]").value;

        //이름이 없는 경우, return 
        if(_title == "") return;
        
        let updateFreezer = this.state.myFreezers.filter(f => f.FreezerKey == _code);
        let prevFreezers = this.state.myFreezers.filter(f => f.FreezerKey != _code);
        let newFreezers = [...prevFreezers, {...updateFreezer[0], FreezerName: _title, updateYN: "Y", modeRW: "R"}];

        this.props.setNewFreezers(newFreezers);
    }

    setMainFreezer(code){
        let val = confirm("해당 냉장고를 메인으로 설정하시겠습니까? \n메인으로 설정된 냉장고는 첫화면에 나타납니다.")
        if(val){
            //선택한 냉장고 filter
            let updateFreezer = this.state.myFreezers.filter(f => f.FreezerKey == code);
            
            //해당 냉장고를 제외한 다른 냉장고는  MainYn: "N"으로 
            let prevFreezers = this.state.myFreezers.filter(f => f.FreezerKey != code);
            prevFreezers = prevFreezers.flatMap(v => ({...v, MainYn: "N", updateYN: "Y"}));

            //선택한 냉장고는 MainYn: "Y"으로 
            let newFreezers = [...prevFreezers, {...updateFreezer[0], MainYn: "Y", updateYN: "Y"}];

            this.props.setNewFreezers(newFreezers);

            return true;
        }

        return false;
    }

    changeUpdateMode(code){
        //선택한 냉장고 filter
        let updateFreezer = this.state.myFreezers.filter(f => f.FreezerKey == code);

        //해당 냉장고를 제외한 다른 냉장고는  modeRW: "R"으로 
        let prevFreezers = this.state.myFreezers.filter(f => f.FreezerKey != code);
        prevFreezers = prevFreezers.flatMap(v => ({...v, modeRW: "R"}));

        //선택한 냉장고는 MainYn: "Y"으로 
        let newFreezers = [...prevFreezers, {...updateFreezer[0], modeRW: "W"}];

        this.props.setNewFreezers(newFreezers);

        return true;
    }

    deleteFreezer(code){
        let val = confirm("해당 냉장고를 삭제하시겠습니까? \n해당 냉장고를 삭제하면, 냉장칸, 음식 모두 사라집니다.")
        if(val){
            let updateFreezer = this.state.myFreezers.filter(f => f.FreezerKey == code);
            
            //해당 냉장고를 제외한 다른 냉장고
            let prevFreezers = this.state.myFreezers.filter(f => f.FreezerKey != code);

            //선택한 냉장고는 deleteYN: "Y"으로 
            let newFreezers = [...prevFreezers, {...updateFreezer[0], deleteYN: "Y"}];

            this.props.setNewFreezers(newFreezers);

            return true;
        }

        return false;
    }

    passToParentOpenEditMenu(e){
        //read 모드가 아닌 경우, 작동 하지 않음
        if(!e.currentTarget.parentNode.querySelector(".freezer-name")) return;

        this.props.openNcloseEditMenu(true);

        let _freezerCode = e.target.parentNode.querySelector(".content").dataset.code;
        let _title = e.currentTarget.parentNode.querySelector(".freezer-name").textContent;

        let _value = {
            title: _title,
            editList: [ {className: "main", event: this.setMainFreezer.bind(this, _freezerCode), title: "메인으로 설정"},
                        {className: "update", event: this.changeUpdateMode.bind(this, _freezerCode), title: "냉장고 수정"},
                        {className: "delete", event: this.deleteFreezer.bind(this, _freezerCode), title: "냉장고 삭제"} ]
        }

        this.props.setEditMenuValue(_value);
    }

    makeComponent(item){
        let returnComponent;

        if(item.modeRW && item.modeRW == "W"){
            returnComponent = (<div className="writemode-wrapper vertical-middle"><input type="text" defaultValue={item.FreezerName}/><i className="save" data-code={item.FreezerKey} onClick={this.updateFreezer}></i></div>);
        }else{
            returnComponent = (<span className="freezer-name">{item.FreezerName}</span>);
        }

        return returnComponent;
    }

    componentWillReceiveProps(nextProps){
        let _myFreezers = nextProps.myFreezers.filter(f => !f.deleteYN || f.deleteYN == "N");

        this.setState(prevSate => ({
            ...prevSate,
            myFreezers: _myFreezers
        }))
    }

    // componentDidMount(){
    //     setTimeout(() => {
    //         if(window.webViewBridge != undefined){
    //             // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });
                
    //             var handleComponentDidMountMessage = {
    //                 visibleFooter : 'Y' , 
    //                 currentPath : location.pathname
    //             }
    //             window.webViewBridge.send('handleComponentDidMount' , handleComponentDidMountMessage , function (){ } , function (){ });
    //         }
    //         else{
    //             console.log('window.webViewBridge 없어')
    //         }    
    //     }, 0);
    // }

    render(){
        return(
            <div className="freezer-wrapper">
                <ul className="freezer-list">
                {                    
                    this.state.myFreezers.map((item) => (
                        <li key={item.FreezerKey}>
                            <p className="reg-date">{item.RegDate}</p>
                            <div className="contenst-wrapper" >
                                <div className="content" data-code={item.FreezerKey}>
                                    <div className="image-box"><i className="freezer"></i></div>
                                    {this.makeComponent(item)}
                                </div>                            
                                <i className="more" onClick={this.passToParentOpenEditMenu}></i>
                            </div>
                            <EditMySections freezerKey={item.FreezerKey} mySections={item.MySections} setNewSections={this.setNewSections}/>
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    }
}

// export default EditMyFreezers;
const mapDispatchToProps = (dispatch) => {
    return{
        openNcloseEditMenu: (conditon) => {dispatch(commonActions.openNcloseEditMenu(conditon))},
        setEditMenuValue: (value) => {dispatch(commonActions.setEditMenuValue(value))}
    };
}

export default connect(null, mapDispatchToProps)(EditMyFreezers);
