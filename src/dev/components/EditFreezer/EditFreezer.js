import React from 'react';
import  '../../../../css/components/EditFreezer.css';

import CommonHeader from '../common/CommonHeader'
import EditMyFreezers from './EditMyFreezers'
import CommonEditMenu from '../common/CommonEditMenu'
import CommonFloating from '../common/CommonFloating'
import SelectFreezerPop from './SelectFreezerPop'

import * as commonActions from '../../actions/common.js'
import { connect } from 'react-redux';


class EditFreezer extends React.Component{
    constructor(props){
        super(props)
      
        this.state = {
            headerValues: {
                headTitle : '냉장고 관리',
                leftAction : '',
                leftActionEvent : this.handleClose.bind(this),
                rightAction : '',
                rightActionEvent : this.handleSave.bind(this),
                leftClass : 'close',
                rightClass : 'save'
            },

            floatingMenuList: [{mode: 'freezer' , text: '냉장고 추가' , classname : 'freezer' , clickevent : this.addFreezer.bind(this)},
                               {mode: 'section' , text: '냉장칸 추가' , classname : 'section' , clickevent : this.selectFreezerPopup.bind(this)}
            ],
            
            myFreezers: [],

            freezerListObj: {
                openYN: false,
                freezerList: []
            }
            
        }

        this.closeSelectFreezerPopup = this.closeSelectFreezerPopup.bind(this);
        this.selectFreezerPopup = this.selectFreezerPopup.bind(this);
        this.addFreezer = this.addFreezer.bind(this);
        this.addSections = this.addSections.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.setNewFreezers = this.setNewFreezers.bind(this);
        this.closeEditMenu = this.closeEditMenu.bind(this);
        this.getNewFreezerKey = this.getNewFreezerKey.bind(this);
        this.getNewSectionKey = this.getNewSectionKey.bind(this);
    }

    getNewSectionKey(freezerKey){
        var _myFreezer = this.state.myFreezers;
        var _mySection = _myFreezer.filter(f => f.FreezerKey == freezerKey)[0].MySections;
        var sectionKeys = _mySection.flatMap(s => s.SectionKey.substring(1, 5));

        var max;
        for (var i=0 ; i<sectionKeys.length ; i++) {
            if (!max || parseInt(sectionKeys[i]) > parseInt(max))
                max = sectionKeys[i];
        }
        
        if (max == undefined)
            return "S0001";

        var returnKey = parseInt(max) == -1 ? 1 : parseInt(max) + 1;
        return "S" + String(returnKey).padLeft(0, 4);
    }

    getNewFreezerKey(){
        var _myFreezer = this.state.myFreezers;
        var freezerKeys = _myFreezer.flatMap(f => f.FreezerKey.substring(1, 4))
    
        var max;
        for (var i=0 ; i<freezerKeys.length ; i++) {
            if (!max || parseInt(freezerKeys[i]) > parseInt(max))
                max = freezerKeys[i];
        }
        
        if (max == undefined)
            return "F001";
    
        var returnKey = parseInt(max) == -1 ? 1 : parseInt(max) + 1;
        return "F" + String(returnKey).padLeft(0, 3);
    }

    addFreezer(){
        let newFreezerKey = this.getNewFreezerKey();
        let newFreezer = {FreezerKey: newFreezerKey, FreezerName: "", MainYn: "N", RegDate: new Date().convertFormatString('yyyy년 MM월 dd일'), MySections: [], modeRW: "W"}

        this.setState(prevState => ({
            ...prevState,
            myFreezers: [...prevState.myFreezers, newFreezer]
        }))
        
        return true;
    }

    closeSelectFreezerPopup(){
        //팝업 닫기 
        this.setState(prevState => ({
            ...prevState,
            freezerListObj: {
                ...prevState.freezerListObj,
                openYN: false
            }
        }))
    }

    addSections(freezerKey){
        let prevFreezer = this.state.myFreezers.filter(f => f.FreezerKey != freezerKey);
        let _myfreezer = this.state.myFreezers.find(f => f.FreezerKey == freezerKey);
        let newFreezerKey = this.getNewSectionKey(freezerKey);
        let newSection = {SectionKey: newFreezerKey, SectionName: "", RegDate: new Date().convertFormatString('yyyy년 MM월 dd일'), MyFoods: [], modeRW: "W"}

        this.setState(prevState => ({
            ...prevState,
            myFreezers: [...prevFreezer, {..._myfreezer, MySections: [..._myfreezer.MySections, newSection]}]
        }))
    }

    selectFreezerPopup(){
        this.setState(prevState => ({
            ...prevState,
            freezerListObj: {
                openYN: true,
                freezerList: prevState.myFreezers
            }
        }))
    }

    handleClose(){
        let val = confirm("현재 페이지를 벗어나시겠습니까?");
        if(val) return true;
        else return false;
    }

    handleSave(){
        let _returnVal = true;
        let _myFreezers = this.state.myFreezers;
        var db = new freezer.createlocalFreezerDB();

        //insert할 Freezer
        _myFreezers.map(f => {
            let _isExist = db.getFreezer(f.FreezerKey)
            if(!_isExist){
                delete f.modeRW;
                delete f.updateYN;
                db.insertFreezer(f);
            }
        })

        //update 냉장고 filter
        let _updateFreezers = _myFreezers.filter(f => f.updateYN && f.updateYN == "Y");
        _updateFreezers.map(f => {
            db.updateFreezer(f);
        })

        //delete가 있다면
        let _deleteFreezers = _myFreezers.filter(f => f.deleteYN && f.deleteYN == "Y");
        _deleteFreezers.map(f => (
            db.deleteFreezer(f.FreezerKey)
        ))


        //냉장칸 업데이트
        _myFreezers.map(f => {

            //냉장칸 업데이트전, 예외처리
            if(f.MySections.length < 1)
            {
                alert("모든 냉장고에는 냉장칸이 1개 이상 존재해야 합니다.")
                _returnVal = false;
            }
            
            //insert할 Section
            f.MySections.map(s => {
                let _isExist = db.getSection(f.FreezerKey, s.SectionKey)
                if(!_isExist){
                    delete s.modeRW;
                    delete s.updateYN;
                    db.insertSection(f.FreezerKey, s);
                }
            })

            //update Section filter
            let _updateSections = f.MySections.filter(s => s.updateYN && s.updateYN == "Y");
            _updateSections.map(s => {
                db.updateSection(f.FreezerKey, s);
            })

            //delete가 있다면
            let _deleteSections = f.MySections.filter(s => s.deleteYN && s.deleteYN == "Y");
            _deleteSections.map(s => (
                db.deleteSection(f.FreezerKey, s.SectionKey)
            ))

        })
        
        return _returnVal;
    }

    setNewFreezers(newFreezers){
        this.setState(prevSate => ({
            ...prevSate,
            myFreezers: newFreezers,
        }))
    }

    closeEditMenu(){
        this.props.openNcloseEditMenu(false);
    }

    componentDidMount(){
        var db = new freezer.createlocalFreezerDB();
        let _myFreezers = db.getFreezer();

        this.setState(prevState => ({
            ...prevState,
            myFreezers: _myFreezers
        }))

        setTimeout(() => {
            if(window.webViewBridge != undefined){
                // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });
                
                // 해당 페이지 일때만 실행
                if(location.pathname.toUpperCase().indexOf('EDITFREEZER') > -1){
                    var handleComponentDidMountMessage = {
                        visibleFooter : 'Y' , 
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
            <div className="edit-myfreezer-container" data-paging-direction="right"  >
                <CommonHeader headerValues={this.state.headerValues}/>
                <div className="edit-myfreezer-wrapper">
                    {/* <div className="block">
                        <i className="search"></i><span className="title">검색</span>
                        <input type="text" placeholder="검색" />
                    </div> */}
                    <EditMyFreezers myFreezers={this.state.myFreezers} setNewFreezers={this.setNewFreezers}/>
                </div>
                <CommonFloating menuList={this.state.floatingMenuList}/>
                <CommonEditMenu editMenuValue={this.props.editMenuValue} toggled={this.props.openNclose_editMenu}/>
                <SelectFreezerPop freezerListObj={this.state.freezerListObj} addSections={this.addSections} closeSelectFreezerPopup={this.closeSelectFreezerPopup} />
                <i className="layermask" onClick={this.closeEditMenu} ></i>
            </div>
        );
    }
}

//export default EditFreezer;
const mapStateToProps = (state) => {
    // state 는 component state랑은 틀림 , redux state를 칭함
    return {
        editMenuValue : state.common.editMenuValue,
        openNclose_editMenu: state.common.openNclose_editMenu
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        openNcloseEditMenu: (conditon) => {dispatch(commonActions.openNcloseEditMenu(conditon))}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFreezer);

