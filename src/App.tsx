import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EthereumServiceInstance from './app/services/ethereum.service';
import VotingPageComponent from './app/components/container/voting-page.component';
import NavigationBarComponent from './app/components/presentational/navigation-bar.component';
import {Container} from '@material-ui/core';
import VoteSystemServiceInstance from './app/services/vote-system.service';
import IssuersPageComponent from './app/components/container/issuers-page.component';
import {MyIdentityModel} from './app/models/my-identity.model';

function App() {
    const [initialized, setInitialized] = useState(false);
    const [identity, setIdentity] = useState<MyIdentityModel>(null);

    useEffect(() => {
        EthereumServiceInstance.setupData().then(() => VoteSystemServiceInstance.setup().then(() => {
            setIdentity(VoteSystemServiceInstance.state.identity);
            setInitialized(true)
        }));
    });

    if (!initialized) {
        return <h1>Loading</h1>;
    }
    return (
        <Router>
            <Container disableGutters={true} maxWidth={'xl'}>
                <NavigationBarComponent identity={identity}/>
                <Switch>
                    <Route path="/vote">
                        <VotingPageComponent/>
                    </Route>
                    <Route path="/issuers">
                        <IssuersPageComponent/>
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
