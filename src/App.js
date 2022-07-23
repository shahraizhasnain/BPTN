import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Like from "./pages/like";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17")
      .then(res => res.json())
      .then(
        (result) => {
          let liked = JSON.parse(localStorage.getItem('liked_movies')) || [];
          if(liked.length){
            liked.forEach((item)=>{
              let index = result.results.map(function(e){return e.id}).indexOf(item.id);
              result.results[index].preference = true;
            })
          }

          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  moviePreference(id, preference){
    let items = [...this.state.items];
    let liked = JSON.parse(localStorage.getItem('liked_movies')) || [];
    let likedIndex = liked.map(function(e){return e.id}).indexOf(id);
    let movieIndex = items.map(function(e){return e.id}).indexOf(id);
    items[movieIndex].preference = preference;

    if(preference === true && likedIndex === -1){
        liked.push(items[movieIndex]);
    }
    this.setState({items});
    localStorage.setItem( 'liked_movies', JSON.stringify(liked));
    console.log(this.state);
}

render(){
  return (
    <div className='container h-100'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Popular Movies</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/like">Liked Movies</a>
                        </li>
                        </ul>
                    </div>
                </nav>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home  movies={this.state.items} onClick={(a,b)=> this.moviePreference(a, b)}/>}>
          <Route path="*" element={<Home movies={this.state.items} onClick={(a,b)=> this.moviePreference(a, b)}/>}/>
        </Route>
        <Route path="like" element={<Like />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
}

export default App;
