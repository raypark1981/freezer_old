import React from 'react';

import * as commonActions from '../../actions/common.js'
import { connect } from 'react-redux';

class EditMySections extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            freezerKey: props.freezerKey,
            mySections: props.mySections.filter(s => (!s.delteYN || s.deleteYN == "N"))
        }

        this.changeUpdateMode = this.changeUpdateMode.bind(this);
        this.passToParentOpenEditMenu = this.passToParentOpenEditMenu.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    updateSection(e){
        let _code = e.target.dataset.code;
        let _title = e.target.parentNode.querySelector("input[type=text]").value;

        let updateSection = this.state.mySections.filter(f => f.SectionKey == _code);
        let prevSections = this.state.mySections.filter(f => f.SectionKey != _code);
        let newSections = [...prevSections, {...updateSection[0], SectionName: _title, updateYN: "Y", modeRW: "R"}];

        this.props.setNewSections(this.state.freezerKey, newSections);
    }

    changeUpdateMode(code){

        //선택한 냉장칸 filter
        let updateSection = this.state.mySections.filter(f => f.SectionKey == code);
        
        //선택되지 않은 냉장칸은 modeRW:"R"
        let prevSections = this.state.mySections.filter(f => f.SectionKey != code);
        prevSections = prevSections.flatMap(v => ({...v, modeRW: "R"}));

        let newSections = [...prevSections, {...updateSection[0], modeRW: "W"}];

        this.props.setNewSections(this.state.freezerKey, newSections);

        return true;
    }

    deleteSection(code){

        let val = confirm("해당 냉장칸을 삭제하시겠습니까? \n해당 냉장칸을 삭제하면, 모든 음식이 사라집니다.")
        if(val){
            //선택된 Section
            let updateSection = this.state.mySections.filter(f => f.SectionKey == code);

            //선택되지 않은 Section
            let prevSections = this.state.mySections.filter(f => f.SectionKey != code);

            //선택된 Section은 deleteYN = 'Y'
            let newSections = [...prevSections, {...updateSection[0], deleteYN: "Y"}];

            this.props.setNewSections(this.state.freezerKey, newSections);

            return true;
        }

        return false;
    }

    passToParentOpenEditMenu(e){

        this.props.openNcloseEditMenu(true);

        let _sectionCode = e.target.parentNode.dataset.code;
        let _title = e.target.parentNode.querySelector("p").textContent;
        let _value = {
            title: _title,
            editList: [ {className: "update", event: this.changeUpdateMode.bind(this, _sectionCode), title: "냉장칸 수정"},
                        {className: "delete", event: this.deleteSection.bind(this, _sectionCode), title: "냉장칸 삭제"} ]
        }
        this.props.setEditMenuValue(_value);
    }

    makeComponent(item){
        let returnComponent;

        if(item.modeRW && item.modeRW == "W"){
            returnComponent = (<div className="vertical-middle"><input type="text" defaultValue={item.SectionName} /><i className="save" data-code={item.SectionKey} onClick={this.updateSection}></i></div>);
        }else{
            returnComponent = (<p>{item.SectionName}</p>);
        }

        return returnComponent;
    }

    componentWillReceiveProps(nextProps){
        let _mySections = nextProps.mySections.filter(s => !s.deleteYN || s.deleteYN == "N");

        this.setState(prevSate => ({
            ...prevSate,
            mySections: _mySections
        }))
    }

    componentDidMount(){
        setTimeout(() => {
            if(window.webViewBridge != undefined){
                // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });

                // 해당 페이지 일때만 실행
                if(location.pathname.toUpperCase().indexOf('EDITMYSECTIONS') > -1){
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
        let sectionCnt = this.state.mySections.length;
        return(
            <ul className="sectionlist">
                {
                    this.state.mySections.map((item, i) => (
                        <li key={item.SectionKey} className={`vertical-middle ${sectionCnt -1 == i ? "last" : ""}`} data-code={item.SectionKey}>
                            <i className={`color${(i + 1) % 24}`}></i>
                            {this.makeComponent(item)}
                            <span>{item.RegDate}</span>
                            <i className="more" onClick={this.passToParentOpenEditMenu}></i>
                        </li>
                    ))
                }
            </ul>
        );
    };
}

// export default EditMySections;
const mapDispatchToProps = (dispatch) => {
    return{
        openNcloseEditMenu: (conditon) => {dispatch(commonActions.openNcloseEditMenu(conditon))},
        setEditMenuValue: (value) => {dispatch(commonActions.setEditMenuValue(value))}
    };
}

export default connect(null, mapDispatchToProps)(EditMySections);
