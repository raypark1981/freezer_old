import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/components/Recipe.css';
import { connect } from 'react-redux';
import util from '../../scripts/util.js';

class Recipe extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedRcp_seq : props.match.params.rcp_seq,
            rcp_info : {},
            rcp_viewCnt: 0
        }

        this.loadViewCount = this.loadViewCount.bind(this);
        this.loadRecipeInfo = this.loadRecipeInfo.bind(this);
    }

    loadViewCount(url){

        $.ajax({
            url: url
            , contentType: 'application/json'
            , type: "PUT"
            , data: JSON.stringify("view")
            , async: false
            , dataType: "json"
            , success: function (data) { 
                if(data){
                    this.setState(prevState => ({
                        ...prevState.state,
                        rcp_viewCnt: data
                    }),function(){});
                }

            }.bind(this)         
        });
    }

    loadRecipeInfo(url){

        $.ajax({
            url: url
            , type: "GET"
            , async: false
            , dataType: "json"
            , success: function (data) { 
                if(data){
                    this.setState(prevState => ({
                        ...prevState.state,
                        rcp_info: data
                    }),function(){});
                }

            }.bind(this)         
        });
    }

    componentDidMount(){
        let selectedRcp_seq = this.state.selectedRcp_seq;
        let _url = "/api/Recipe/" + selectedRcp_seq;

        //viewCount +1 하고 해당 값 가져옴
        this.loadViewCount(_url);

        //세부 레시피 정보 가져옴 
        this.loadRecipeInfo(_url);
             
        //제일 상단으로 
        window.scrollTo(0, 0);
    }

    render(){
        if(Object.keys(this.state.rcp_info).length > 0)
        {
            let rcp_info = this.state.rcp_info
            
            return(
                <div className={`recipe-container`} data-paging-direction="left">
                    <Link to="/SearchRecipe" className="close"></Link>
                    <div className="title-wrapper">
                        <div className="text-box">
                            <p>{rcp_info.RCP_NM}</p>
                        </div>
                        <img src={rcp_info.ATT_FILE_NO_MK} />
                        <div className="icon">
                            <i className="like on"></i>
                            <i className="view"></i><span>{this.state.rcp_viewCnt == "0" ? "" : this.state.rcp_viewCnt}</span>
                        </div>
                        <div className="nutrition">
                            <p>영양성분({rcp_info.INFO_WGT})</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>열량</td>
                                        <td className="info">{util.trimZeroPoint(rcp_info.INFO_ENG)}Kcal</td>
                                    </tr>
                                    <tr>
                                        <td>탄수화물</td>
                                        <td className="info">{util.trimZeroPoint(rcp_info.INFO_CAR)}g</td>
                                    </tr>
                                    <tr>
                                        <td>단백질</td>
                                        <td className="info">{util.trimZeroPoint(rcp_info.INFO_PRO)}g</td>
                                    </tr>
                                    <tr>
                                        <td>지방</td>
                                        <td className="info">{util.trimZeroPoint(rcp_info.INFO_FAT)}g</td>
                                    </tr>
                                    <tr>
                                        <td>나트륨</td>
                                        <td className="info">{util.trimZeroPoint(rcp_info.INFO_NA)}mg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="recipe-wrapper">
                        <div className="title"><span>재료</span></div>
                        <div className="ingredient">
                            {
                                rcp_info.RCP_PARTS_DTLS.split("\n").map(
                                    function(v, i){
                                        return <span key={i}>{v}</span>
                                    })
                            }
                        </div>
                        <div className="title"><span>레시피</span></div>
                        <div className="method">
                            <ul>
                                {
                                    rcp_info.MANUALS.map(
                                        function(v, i){
                                            if(v.MANUAL_DESC){
                                                if(v.MANUAL_IMG){
                                                    return <li key={i}><img src={v.MANUAL_IMG} /><p className="right">{v.MANUAL_DESC}</p></li>
                                                }else{
                                                    return <li key={i}><p>{v.MANUAL_DESC}</p></li>
                                                }
                                            }
                                        })
                                }
                            </ul>
                        </div>
                        <div className="title"><span>영양성분</span></div>
                        <div className="nutrition">
                            <div className="title-wrap"><span className="title">열량</span><span className="kcal">{util.trimZeroPoint(rcp_info.INFO_ENG)}kcl/{rcp_info.INFO_WGT}</span></div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>탄수화물</th>
                                        <th>딘백질</th>
                                        <th>지방</th>
                                        <th className="last">나트륨</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{util.trimZeroPoint(rcp_info.INFO_CAR)}g</td>
                                        <td>{util.trimZeroPoint(rcp_info.INFO_PRO)}g</td>
                                        <td>{util.trimZeroPoint(rcp_info.INFO_FAT)}g</td>
                                        <td className="last">{util.trimZeroPoint(rcp_info.INFO_NA)}mg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return (<div>오류!!</div>);
        }
    }
}

//export default Recipe;

const mapStateToProps = (state) => {
    return {
        selectedRcp_seq: state.recipe.selectedRcp_seq
    }
}

export default connect(mapStateToProps , null)(Recipe);