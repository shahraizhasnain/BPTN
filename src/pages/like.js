import React from 'react';

class Like extends React.Component {
    render() {
        let movies = JSON.parse(localStorage.getItem('liked_movies')) || [];
        if(movies){
            return (
                <div>
                    <h1>Liked Movies</h1>
                {
                movies.map(item => (
                <div key={item.id} className="card" style={{width: "18rem", float:"left"}}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} className="card-img-top" alt="..."></img>
                </div>
                ))}
                </div>
            );
        } else {
            return(
                    <div>No Movies Liked</div>
            );
        }
    }

}

  export default Like;