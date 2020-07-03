import React,{ Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';

import App from './App';
import Login from './page/login';
import Admin from './admin';

import Buttons from './page/ui/button';
import Model from './page/ui/model';
import Home from './page/home';
import Nomatch from './page/nomatch';
import Loading from './page/ui/loading';
import Notice from './page/ui/notic';
import Message from './page/ui/message';
import Tags from './page/ui/tags';
import Gallery from './page/ui/gallery';
import Carousels from './page/ui/carousel';
import FormLogin from './page/form/login';
import FormRegister from './page/form/register';
import BasicTable from './page/table/basictable';
import HighTable from './page/table/higertable';
import City from './page/city';
import Order from './page/order';
import User from './page/user';
import BikeMap from './page/map/bikemap';

import Common from './common';
import OrderDetail from './page/order/detail';
import EBar from './page/echarts/bar';
import EPie from './page/echarts/pie';
import ELine from './page/echarts/line';
import Rich from './page/rich';
import Permision from './page/permision';
export default class IRouter  extends Component {
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                    <Route path='/login' component={Login} />
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                        </Common>
                    }/>
                    <Route path='/' render={()=>(
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home}/> 
                                <Route path='/ui/buttons' component={Buttons}/>
                                <Route path='/ui/modals' component={Model}/>
                                <Route path='/ui/Loadings' component={Loading}/>
                                <Route path='/ui/notification' component={Notice}/>
                                <Route path='/ui/messages' component={Message}/>
                                <Route path='/ui/tabs' component={Tags}/>
                                <Route path='/ui/gallery' component={Gallery}/>
                                <Route path='/ui/carousel' component={Carousels}/>
                                <Route path='/form/login' component={FormLogin}/>
                                <Route path='/form/reg' component={FormRegister}/>
                                <Route path='/table/basic' component={BasicTable}/>
                                <Route path='/table/high' component={HighTable}/>
                                <Route path='/city' component={City}/>
                                <Route path='/order' component={Order}/>
                                <Route path='/user' component={User}/>
                                <Route path='/bikeMap' component={BikeMap}/>
                                <Route path='/charts/bar' component={EBar}/>
                                <Route path='/charts/pie' component={EPie}/>
                                <Route path='/charts/line' component={ELine}/>
                                <Route path='/rich' component={Rich}/>
                                <Route path='/permission' component={Permision}/>
                                <Route path='/' component={Permision}/>
                                <Route component={Nomatch}></Route>
                            </Switch>
                        </Admin>
                    )} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}