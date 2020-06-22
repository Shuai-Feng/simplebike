import React, { Component } from 'react';
import { Menu} from 'antd';
import { NavLink } from 'react-router-dom';
// import { EnvironmentOutlined } from '@ant-design/icons';
import menuList from './../../config/menuConfig';
const { SubMenu } = Menu;

class NavLeft extends Component {
    render() {
        let { menuTree } = this.state;
        return (
            <div>
                <div className='logo'>
                    <img src='/asset/logo-ant.svg' alt='图片的logo'></img>
                    <h1>布里特安防</h1>
                </div>
                <Menu theme='dark'>
                    {menuTree}
                </Menu>
            </div>
        );
    }
    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}> 
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                        <NavLink to={item.key}> {item.title}</NavLink>    
            </Menu.Item>
        })
    }
    componentWillMount(){
        const menuTree = this.renderMenu(menuList);
        this.setState({
            menuTree
        })
    }
}

export default NavLeft;