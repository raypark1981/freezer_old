import React from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import '../../../../node_modules/react-id-swiper/src/styles/css/swiper.css';

const swipeParams = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
}

class SearchType extends React.Component{
    constructor(props){
        super(props)

        this.setSearchItem = this.setSearchItem.bind(this);
    }

    
    setSearchItem(e){
        let _type = this.props.searchTypeObj.type;
        let _name = e.currentTarget.textContent;
        
        let _new = 
            this.props.searchTypeObj[_type].map(item => {
                //재료의 경우 복수 선택 가능
                if(_type == "ingredient"){
                    if(item.name == _name) item.onoff = !item.onoff;
                }
                else{
                    //현재 클릭된 항목은 이전 상태와 반대로
                    if(item.name == _name) item.onoff = !item.onoff;
                    else item.onoff = false; //현재 클릭된 항목이 아닌 경운, 무조건 fasle
                    
                }

                return item;
            })
        
        this.props.passTogetListObj({...this.props.searchTypeObj, [_type] : _new });
    }

    render(){
        let type = this.props.searchTypeObj.type;

        if(this.props.searchTypeObj[type].length < 1){
            return(
                <div className="ingredient-list">
                    <div className="no-list vertical-middle">
                        <i className="happy"></i><span>냉장고 재료를 선택해주세요</span>
                    </div>
                </div>
            );

        }else{
            return(
                <div className="ingredient-list">
                    <Swiper {...swipeParams} shouldSwiperUpdate>
                    {
                        this.props.searchTypeObj[type].map((item, i) => (
                            <div className={`ingredient-list-item ${item.onoff ? "on" : ""}`} key={i} onClick={this.setSearchItem}>{item.name}</div>
                        ))
                    }
                    </Swiper>
                </div>
            );
        }
    }    
}

const mapStateToProps = (state) => {
    return{
        searchTypeObj: state.recipe.searchTypeObj
    }
}


export default connect (mapStateToProps , null)(SearchType);