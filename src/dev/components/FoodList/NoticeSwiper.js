import React , {Component} from 'react';
import Swiper from 'react-id-swiper';

import '../../../../css/components/FoodList.css'

var notices = [
    { key : 1 , img : 'http://www.freezer.com/src/dev/node/whatis/newiphone.jpg'}
    ,{ key : 2 , img : 'http://www.freezer.com/src/dev/node/whatis/newiphone2.jpg'}
    ,{ key : 3 , img : 'http://www.freezer.com/src/dev/node/whatis/newiphone3.jpg'}
    ,{ key : 4 , img : 'http://www.freezer.com/src/dev/node/whatis/newiphone4.jpg'}
    ]


class NoticeSwiper extends Component {
    constructor(props){
        super(props);

        this.reviewIntro = 'Y'
    }

    getCommonOptionFromLocalStorage (params) {
       
    }


    render(){
        return (
        <div  className={`use-notice`}> 
                <ul style={{padding:0}}>
                    <Swiper {...{ slidesPerzView: 'auto', spaceBetween: 10, freeMode: false }} shouldSwiperUpdate >
                    {
                        notices.map((element) => (
                            <li key={element.key} >
                                <img src={element.img} style={{width:"100%" , height:"400px"}}></img>
                            </li>)
                        )
                    }
                    </Swiper>
                </ul>
                <div className='use-notice-close-button'>
                    <button><i></i></button>
                </div>
        </div>)
    }
}

export default NoticeSwiper;