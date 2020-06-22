import React from 'react';
import {Card,Row,Col,Modal} from 'antd';

export default class Gallery extends React.Component {
    state={
        visible:false
    }
    openGallery = (imgSrc)=>{
        this.setState({
            visible:true,
            currentImg:'/gallery/'+imgSrc
        })
    }
    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png']
        ]
        const imgList = imgs.map((list)=>list.map(
            (item) => <Card
                style={{marginBottom:10}}
                cover={<img src={'/gallery/'+item} alt={item} />}
                onClick={()=>this.openGallery(item)}
            >
                <Card.Meta
                    title="React Admin"
                    description="baby you will pick me up"
                />
            </Card>
        ))
        console.log(imgList)
        return (
            
            <div>
                <Row gutter={10}>
                {
                    imgList.map((value,index)=>{
                        return (
                        
                            <Col md={6}>
                                {
                                    value.map((value)=>{
                                    return value;
                                    })
                                }
                            </Col>
                       
                        )
                    })
                }
                </Row>
                <Modal
                width={300}
                height={500}
                 visible={this.state.visible}
                 title={"图片画廊"}
                 onCancel={()=>{
                     this.setState({
                         visible:false
                     })
                 }}
                 footer={null}
                 >
                    {<img src={this.state.currentImg} alt={this.state.currentImg} style={{width:"100%"}}/>}
                </Modal>
            </div>
        )
    }
}