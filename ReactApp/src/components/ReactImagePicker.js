import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'



//import images from local
import img1 from '../images/simply_supported_1.jpg';
import img2 from '../images/simply_supported_3.JPG';
import img3 from '../images/simply_supported_6.jpg';
const imageList = [img1, img2, img3];

class ReactImagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
        this.onPick = this.onPick.bind(this)
    }


    onPick(image) {
        this.setState({ image })
        this.props.imageChange(image);
        console.log(" image :", image);
    }

    render() {
        return (
            <div >
                <ImagePicker
                    images={imageList.map((image, i) => ({ src: image, value: i }))}
                    onPick={this.onPick}
                />

            </div>
        )
    }
}

export default ReactImagePicker