import React , { Component , PropTypes } from "react";
import MyFood from "./MyFood";

class MyFoods extends Component{
    constructor(props){
        super(props)
        this.state = {
            MyFoods : props.MyFoods,
        }
    }

    
    render(){
        var _height = (this.props.MyFoods.length * 100).toString().concat("px");
        
        if(!this.props.classOnoff)
        _height = "0px"

        var _myfoods = this.props.MyFoods == undefined ? [] : this.props.MyFoods;
        return (
        <ul className="foodList"  style={{'height' : _height}}>
            {
                _myfoods.map(item => (
                    <MyFood key={item.FoodKey} MyFood={item}></MyFood>
                ))
            }
        </ul>)
    }
}

export default MyFoods;