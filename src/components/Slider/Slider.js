import uuid from 'uuid';
import React from 'react';
import s from './Slider.module.scss';

class Slider extends React.Component{

    state = {
        classType: 1,
        currentArray: [],
        leftArray: [],
        rightArray: []
    }

    componentDidMount(){
        this.setInitials();
    }

    setInitials = () => {
        const { data, period=2, offset=0 } = this.props;
        let leftArray=[], currentArray=[], rightArray=[];
        for(let i=0; i<data.length; i++){
            if(i<offset){
                leftArray.push(data[i])
            }else if(i>=offset && i<offset+period){
                currentArray.push(data[i])
            }else{
                rightArray.push(data[i])
            }
        }
        this.setState({
            leftArray,
            currentArray,
            rightArray, 
        });
    }

    renderPost = () => {
        let classVariable;
        const { animateLeft, animateRight } = s;
        const { currentArray, classType } = this.state;
        return currentArray.map((item) => {
            classVariable=classType===1?animateRight:animateLeft
            return (
                <span ref={input => this.postRef=input} key={uuid()} className={classVariable}>
                    {this.props.renderItem(item)}
                </span>
            )
        })
    }


    swipeRight = () => {
        const { leftArray, rightArray, currentArray } = this.state;
        if(rightArray.length){
            const rightElement = rightArray[0];
            const leftElement = currentArray[0];
            currentArray.splice(0 ,1);
            currentArray.push(rightElement);
            rightArray.splice(0, 1);
            leftArray.push(leftElement);
            this.setState({
                leftArray, rightArray, currentArray
            }, () => {
                this.postRef.classList.remove(s.animateRight);
                void this.postRef.offsetWidth;
                this.postRef.classList.add(s.animateRight);
            })
        }
    }

    swipeLeft = () => {
        const { leftArray, currentArray, rightArray } = this.state;
        if(leftArray.length){
            const leftElement = leftArray[leftArray.length-1];
            currentArray.unshift(leftElement);
            leftArray.pop();
            const rightElement = currentArray[currentArray.length-1];
            rightArray.unshift(rightElement);
            currentArray.pop();
            this.setState({
                leftArray, currentArray, rightArray, classType: 0
            }, () => {
                this.postRef.classList.remove(s.animateLeft);
                void this.postRef.offsetWidth;
                this.postRef.classList.add(s.animateLeft);
            });
        }
    }

    render(){
        const {
            containerStyle={},
            buttonContainerStyle={},
            buttonBackgroundStyle={},
            buttonLeftStyle={},
            buttonRightStyle={}
        } = this.props;
        return(
            <>
                <div className={s.container} style={containerStyle}>
                        <div className={s.container_swipeButton} style={buttonContainerStyle}>
                            <div onClick={this.swipeLeft} style={buttonBackgroundStyle} className={s.container_swipeButton_box}>
                                <div className={s.container_swipeButton_box_actualLeft} style={buttonLeftStyle}></div>
                            </div>
                        </div>
                        {this.renderPost()}
                        <div className={s.container_swipeButton} style={buttonContainerStyle}>
                            <div onClick={this.swipeRight} className={s.container_swipeButton_box} style={buttonBackgroundStyle}>
                                <div className={s.container_swipeButton_box_actualRight} style={buttonRightStyle}></div>
                            </div>
                        </div>
                </div>
            </>
        )
    }
}

export default Slider;