import React, { Component } from 'react';

import { Row } from 'antd';

import Footer from './components/Footer';
import Header from './components/Header';

import './style/common.less'
class Common extends Component {
    
    render() {
        return (
            <div>
                <Row className='simple-page'>
                    <Header menuType="second"/>
                </Row>
                <Row>
                    {this.props.children}
                    <Footer/>
                </Row>
            </div>
        );
    }
}

export default Common ;