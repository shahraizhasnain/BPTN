import React from 'react';
class Home extends React.Component {

    render() {
        if(this.props.movies){
            return (
                <div>
                    <h1>Movies</h1>
                {
                this.props.movies.map(item => (
                <div key={item.id} className="card" style={{width: "18rem", float:"left"}}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    
                    <button className="btn btn-primary" 
                        onClick={()=>{this.props.onClick(item.id, true)}}>
                            <i className={item.preference === true ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up" }></i>
                    </button>
                    
                    <button className="btn btn-danger" 
                        onClick={()=>{this.props.onClick(item.id, false)}}>
                            <i className={item.preference === false ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down" }></i>
                    </button>
                </div>
                </div>
                ))}
                </div>
            );
        } else {
            return(
                    <div>Loading...</div>
            );
        }
    }
  }

   
  export default Home;
