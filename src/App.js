import './App.css';
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Offices from "./components/Offices/Offices";
import Employees from "./components/Employees/Employees";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import {WithSuspense} from "./components/Hoc/WithSuspence";


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

    catchallUnhandledErrors = (reason, promise) => {
        alert("some errror");
        console.error(promise);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchallUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchallUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Switch>
                            <Route exact path='/' render={()=> <Redirect to = {"/profile"}/>}/>
                            <Route path='/dialogs' render={WithSuspense(DialogsContainer)}/>
                            <Route path='/profile/:userId?' render={WithSuspense(ProfileContainer)}/>
                            <Route path='/users' render={WithSuspense(UsersContainer)}/>
                            <Route path='/offices' render={WithSuspense(Offices)}/>
                            <Route path='/employees' render={WithSuspense(Employees)}/>
                            <Route path='/login/facebook'
                                   render={() => <div>Facebook</div>}/>
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>

                        <Route path='/login'
                               render={WithSuspense(Login)}/>

                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose
(withRouter,
    connect(mapStateToProps, {initializeApp}))(App);


const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;