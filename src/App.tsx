import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EthereumServiceInstance from './app/services/ethereum.service';
import VotingPageComponent from './app/components/container/voting-page.component';
import NavigationBarComponent from './app/components/presentational/navigation-bar.component';
import {Container} from '@material-ui/core';

function App() {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        EthereumServiceInstance.setupData().then(() => setInitialized(true));
    });

    if (!initialized) {
        return <h1>Loading</h1>;
    }
    return (
        <Router>
            <Container disableGutters={true} maxWidth={'xl'}>
                <NavigationBarComponent/>
                <Switch>
                    <Route path="/vote">
                        <VotingPageComponent/>
                    </Route>
                    <Route path="/">
                        <VotingPageComponent/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
