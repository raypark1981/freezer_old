import React , { Component , PropTypes } from "react";
import MySection from "./MySection"
import { connect } from 'react-redux';
class MySections extends Component{
    constructor(props){
        super(props)
        
        // this.state = {
        //     MySections : []
        // }
    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         MySections : nextProps.MySections
    //     })
    // }

    render(){
        var _mySections = this.props.MySections.length == 0 ? [] : this.props.MySections ;
        return (
            <div className="foodlist-wrapper">
                <ul className="sectionlist">
                    {
                        _mySections.map((item , i) => {
                            var classOnoff = false;
                            if(this.props.selectedSections.length > 0){
                                this.props.selectedSections.map( s => { if( s == item.SectionKey )classOnoff = true;})
                            }

                            return <MySection key={item.SectionKey} MySection={item} openYN={classOnoff ? classOnoff : (!this.props.selectedSection && i == 0 ? true : false) }></MySection>;
                        })
                    }
                </ul>
            </div>
        );
    }   
}


const mapStateToProps = (state) => {
    return {
        selectedSection : state.addfood.selectedSection,
        selectedSections : state.common.selectedSections
    }
}
export default connect( mapStateToProps , null)(MySections);
