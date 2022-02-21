import React , { Component , PropTypes } from "react";
import MyFoods from "./MyFoods"
import { NavLink } from 'react-router-dom';

import * as addFoodAction from '../../actions/addfood'
import * as commonAction from '../../actions/common'

import { connect } from 'react-redux';

class MySection extends Component {
    constructor(props){
        super(props)
        this.state = {
            openYN : props.openYN , 
        }

        this.onClickToggleSection = this.onClickToggleSection.bind(this);
    }


    onClickToggleSection(e){
        var sectionKey = e.target.closest('.handle-wrap').dataset.sectionkey;
        var toggleYN = !e.target.closest('li.section').classList.contains('on');
        
        this.props.selectSections(sectionKey , toggleYN);
        this.props.selectSection(sectionKey);

        if(e.target.className.indexOf("handle") < 0 && e.target.className.indexOf("section") < 0) return;
            
        this.setState(prevState =>  ({
            openYN : !prevState.openYN
        }))
    }

    initializeAddFood(){
        var db = new freezer.createlocalFreezerDB();
        db.initializeAddFood();
    }
    
    render(){

        var classOnoff = this.props.openYN;

        // if(this.props.selectedSections.length > 0){
        //     this.props.selectedSection.map( s => { if( s == this.props.MySection.SectionKey )classOnoff = true;})
        // }
        if(!!this.props.selectedSection){
            classOnoff = this.state.openYN;
        }



        return(
            
            <li className={`section ${ classOnoff ? "on" : ""}`} >
                <div data-sectionkey={this.props.MySection.SectionKey} className="handle-wrap vertical-middle" onClick={this.onClickToggleSection}>
                    <div className="handle-box"><i className="handle"></i></div>
                    <div className="section-name-box"><span className="section-name">{this.props.MySection.SectionName}</span></div>
                    <div className="btn-wrapper">
                        {/* <button type="button" className="save-basket off"></button> --> 삭제 */}
                        <NavLink to={`/AddFood`} onClick={this.initializeAddFood} className="add-food"></NavLink>
                    </div>
                </div>
                <MyFoods MyFoods={this.props.MySection.MyFoods} classOnoff={classOnoff}></MyFoods>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedSections : state.common.selectedSections, 
        selectedSection : state.addfood.selectedSection
    }
}

// redux dispatch 함수
const mapDispatchToProps = (dispatch) => {
    return {
        selectSections: (selectedSections , toggleYN) => { dispatch(commonAction.selectSections(selectedSections , toggleYN)) },
        selectSection: (selectedSection) => { dispatch(addFoodAction.selectSection(selectedSection)) },
    };
}

export default connect( mapStateToProps , mapDispatchToProps)(MySection);
