import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  componentDidMount() {
    // this.setState({
    //   movies: getMovies()
    // });
  }

  render() {
    if (this.state.movies.length < 1) {
      return <React.Fragment>Empty movie database.</React.Fragment>;
    }
    return (
      <React.Fragment>
        {this.tableInfo()}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.tableContent()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  tableInfo = () => {
    if (this.state.movies.length < 1) {
      return 'Empty Movies';
    }

    return `Showing ${this.state.movies.length} movies in the database.`;
  };

  tableContent = () => {
    let { movies } = this.state;
    return movies.map(movie => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.handleDelete(movie)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({
      movies: this.state.movies.filter(item => item._id !== movie._id)
    });
  };
}

export default Movies;
