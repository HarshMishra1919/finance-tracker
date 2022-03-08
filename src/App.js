import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
    const { authIsReady, user } = useAuthContext();

    return (
        <div className="App">
            {authIsReady && (
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            {!user && <Redirect to="/login" />}
                            {user && <Home />}
                        </Route>
                        <Route exact path="/login">
                            {!user && <Login />}
                            {user && <Redirect to="/" />}
                        </Route>
                        <Route exact path="/signup">
                            {!user && <Signup />}
                            {user && <Redirect to="/" />}
                        </Route>
                    </Switch>
                </Router>
            )}
        </div>
    );
}

export default App;
