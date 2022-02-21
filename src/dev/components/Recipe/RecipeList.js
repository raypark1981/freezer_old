import React from 'react';
import { Link } from 'react-router-dom';
import util from '../../scripts/util.js';

class RecipeList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: this.props.title,
            rowPerPage: 10,
            totCnt: 0,
            currentPage: 0,
            list: []
        }

        this.goNextPage = this.goNextPage.bind(this);
    }

    goNextPage(){
        let pageList = util.getPageingList(this.props.list, this.state.rowPerPage, this.state.currentPage + 1)

        this.setState((prevState) => ({
            ...prevState.state,
            currentPage: this.state.currentPage + 1,
            list: [...prevState.list, ...pageList]
        }))
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.list) !== JSON.stringify(nextProps.list))
        {
            //페이징 처리된 리스트 가져오기
            if(nextProps.list.length){
                let pageList = util.getPageingList(nextProps.list, this.state.rowPerPage, 1)

                this.setState({
                    ...this.state,
                    totCnt: nextProps.list.length,
                    currentPage: 1,
                    list: pageList
                })
            }else{
                this.setState({
                    ...this.state,
                    totCnt: 0,
                    currentPage: 0,
                    list: []
                })
            }
        }        
    }

//     componentDidMount(){
//         window.addEventListener('scroll', this.handleScroll);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('scroll', this.handleScroll);
//     }

//     handleScroll(e){
//         // Get the header
//         var header = document.getElementsByName("listTitle");
// debugger;
//         // Get the offset position of the navbar
//         var sticky = header.offsetTop;


//         if (window.pageYOffset >= sticky) {
//             header.classList.add("sticky");
//           } else {
//             header.classList.remove("sticky");
//           }

//     }

    render(){
        if(this.state.list.length > 0){
            let readMore;
            if(this.state.totCnt > this.state.currentPage * this.state.rowPerPage ){
                readMore = (<div className="more-wrapper" onClick={this.goNextPage}><span>read more</span></div>);
            }

            return(
                <div className="list-wrapper">
                    <p>{this.state.title} 레시피</p>
                    <div className="recipe-wrapper-container">
                        <ul>
                            {
                                this.state.list.map(item => (
                                    <li key={item.RCP_SEQ}>
                                        <Link to={`Recipe/${item.RCP_SEQ}`}>
                                            <div className="recipe-wrapper">
                                                <img src={item.ATT_FILE_NO_MAIN}/>
                                                <span className="recipe-name">{item.DISP_RCP_NM}</span>
                                                <span className="recipe-hash">#{item.RCP_WAY2} #{item.RCP_PAT2} {item.HASH_TAG ? `#${item.HASH_TAG}` : ""}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {readMore}
                </div>
            );       
        }
        else{
            return(
                <div className="list-wrapper">
                    <p>{this.state.title} 레시피</p>
                    <div className="no-list vertical-middle">
                        <i className="sad"></i><span>검색어를 입력해주세요</span>
                    </div>
                </div>
            );    
        }
    };
}

export default RecipeList