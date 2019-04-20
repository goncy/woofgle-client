import React, { Component } from 'react';

import Button from '../ui/Button';
import TextField from '../ui/TextField';
import Form from '../ui/Form';

import api from '../api';

class SearchScreen extends Component {
  state = {
    criteria: '',
  };

  onSearch = async e => {
    const { criteria } = this.state;
    const { onSearch, onNotify } = this.props;

    e.preventDefault();

    try {
      onNotify({ message: 'Buscando', color: 'gainsboro' });

      const results = await api.dogs.search(criteria);

      onSearch(results);
    } catch (error) {
      onNotify({
        color: 'tomato',
        message:
          'Hubo un error en nuestro servidor, intentá de nuevo mas tarde',
      });
    }
  };

  render() {
    const { criteria } = this.state;

    return (
      <div>
        <Form inline data-test="search-form" onSubmit={this.onSearch}>
          <TextField
            placeholder="Nombre"
            value={criteria}
            onChange={e => this.setState({ criteria: e.target.value })}
          />
          <Button>Buscar</Button>
        </Form>
      </div>
    );
  }
}

export default SearchScreen;
