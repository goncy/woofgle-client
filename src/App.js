import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Notification from './ui/Notification';

import Add from './screens/Add';
import Search from './screens/Search';
import Results from './components/Results';

const Logo = styled.h1`
  font-family: 'Baloo';
  font-size: 6rem;
  color: lightskyblue;
  text-shadow: 3px 4px 0px dodgerblue;
  margin: 32px 0;
`;

const Header = styled.header`
  max-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
`;

const Container = styled.div`
  width: 100%;
  margin: 16px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ center }) => (center ? 'center' : 'inherit')};
`;

const Content = styled.div`
  margin: 16px 0;
`;

class App extends Component {
  state = {
    results: [],
    notification: null,
  };

  notificationTimeout;

  onSearch = results => {
    this.setState({ results });

    if (results.length) {
      this.onNotify({
        message: 'Se encontraron perritos!',
        color: 'lightgreen',
      });
    } else {
      this.onNotify({ message: 'No se encontraron perritos', color: 'gold' });
    }
  };

  onNotify = notification => {
    this.setState({ notification });

    this.notificationTimeout && clearTimeout(this.notificationTimeout);
    this.notificationTimeout = setTimeout(
      () => this.setState({ notification: null }),
      2000
    );
  };

  onLeaveResults = () => this.setState({ results: [] });

  render() {
    const { results, notification } = this.state;

    return (
      <Container>
        <Header>
          <Logo>Woofgle</Logo>
          <nav>
            <NavLink
              data-test="search-link"
              style={{ margin: '0 8px' }}
              to="/search"
            >
              Buscar
            </NavLink>
            <NavLink
              data-test="add-link"
              style={{ margin: '0 8px' }}
              to="/add"
              onClick={this.onLeaveResults}
            >
              Agregar
            </NavLink>
          </nav>
        </Header>
        <Main>
          <Switch>
            <Route exact path="/search">
              <>
                <Search onNotify={this.onNotify} onSearch={this.onSearch} />
                <Content>
                  <Results data={results} />
                </Content>
              </>
            </Route>
            <Route path="/add">
              <Add onAdd={this.onAdd} onNotify={this.onNotify} />
            </Route>
            <Redirect to="/search" />
          </Switch>
        </Main>
        {notification && (
          <Notification
            color={notification.color}
            onClick={() => this.onNotify(null)}
          >
            {notification.message}
          </Notification>
        )}
      </Container>
    );
  }
}

export default App;
