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
                                <Route path='/admin/home' component={Home}/> 
                                <Route path='/admin/ui/buttons' component={Buttons}/>
                                <Route path='/admin/ui/modals' component={Model}/>
                                <Route path='/admin/ui/Loadings' component={Loading}/>
                                <Route path='/admin/ui/notification' component={Notice}/>
                                <Route path='/admin/ui/messages' component={Message}/>
                                <Route path='/admin/ui/tabs' component={Tags}/>
                                <Route path='/admin/ui/gallery' component={Gallery}/>
                                <Route path='/admin/ui/carousel' component={Carousels}/>
                                <Route path='/admin/form/login' component={FormLogin}/>
                                <Route path='/admin/form/reg' component={FormRegister}/>
                                <Route path='/admin/table/basic' component={BasicTable}/>
                                <Route path='/admin/table/high' component={HighTable}/>
                                <Route path='/admin/city' component={City}/>
                                <Route path='/admin/order' component={Order}/>
                                <Route path='/admin/user' component={User}/>
                                <Route path='/admin/bikeMap' component={BikeMap}/>
                                <Route path='/admin/charts/bar' component={EBar}/>
                                <Route path='/admin/charts/pie' component={EPie}/>
                                <Route path='/admin/charts/line' component={ELine}/>
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