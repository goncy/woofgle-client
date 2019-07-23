import React, { Component } from 'react';

import Button from '../ui/Button';
import TextField from '../ui/TextField';
import Form from '../ui/Form';

import api from '../api';

class AddScreen extends Component {
  state = {
    image: '',
    name: '',
  };

  onSubmit = async e => {
    const { name, image } = this.state;
    const { onNotify } = this.props;

    e.preventDefault();

    try {
      onNotify({ message: 'Agregando' });

      await api.dogs.add({ name, image });

      this.setState({ name: '', image: '' });

      onNotify({
        message: 'Tu perrito fue agregado correctamente',
        color: 'lightgreen',
      });
    } catch (error) {
      console.log('error: ', error);

      onNotify({
        message:
          'Hubo un error agregando tu perrito, intentá de nuevo mas tarde',
        color: 'tomato',
      });
    }
  };

  render() {
    const { name, image } = this.state;

    return (
      <div>
        <Form data-test="add-form" onSubmit={this.onSubmit}>
          <TextField
            className="image"
            placeholder="Imagen"
            value={image}
            onChange={e => this.setState({ image: e.target.value })}
          />
          <TextField
            className="name"
            placeholder="Nombre"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Button disabled={!name || !image}>Agregar</Button>
        </Form>
      </div>
    );
  }
}

export default AddScreen;
