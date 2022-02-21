import React from 'react';

import CommonHeader from '../common/CommonHeader';
import '../../../../css/components/addMemo.css';

const propTypes = {
};

const defaultProps = {
   
};

class AddMemo extends React.Component{
    constructor(props){
        super(props)
      
        this.state = {
            selectedFoodKey : props.match.params.food_key , 
            headerValues :{
                headTitle : '메모',
                rightAction : 'AddFood/{0}'.format(props.match.params.food_key),
                rightActionEvent : this.saveAddMemo.bind(this), 
                rightClass : 'back-right'
            } 
        }

    }

    
    saveAddMemo(){
        
        var value = document.getElementById('txtMemo').value
        if(value != undefined && value != ''){
            var db = new freezer.createlocalFreezerDB();
            var myfood = db.getAddFood();
    
            var _myfood = {
                ...myfood , 
                Memo : value, 
            }
            db.setAddFood(_myfood);
        }

        return true;
    }

    componentDidMount(){
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getAddFood();
    
        document.getElementById('txtMemo').value = _myFood.Memo;
        setTimeout(() => {
            if(window.webViewBridge != undefined){
                // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });

                // 해당 페이지 일때만 실행
                if(location.pathname.toUpperCase().indexOf('ADDMEMO') > -1){
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
        return (
            <div className={`add-memo-container`} data-paging-direction="left" >
            <CommonHeader headerValues={this.state.headerValues} />
            <div className="add-memo-wrapeer">
                <div className="memo-area">
                    <textarea id="txtMemo" maxLength="500"></textarea>
                </div>
            </div>
        </div>
        );
    };
}


export default AddMemo;
