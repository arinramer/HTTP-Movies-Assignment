import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Form = props => {
    const [movie, setMovie] = useState({id: props.match.params.id});
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => {
            setMovie({
                id: props.match.params.id,
                title: res.data.title,
                director: res.data.director,
                metascore: res.data.metascore,
                stars: res.data.stars
            })
        })
    },[])
    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }
    const handleStars = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value.split(",")
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        Axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(() => {
            setMovie("");
            props.history.push("/");
        })
    }
    const handleDelete = e => {
        e.preventDefault();
        Axios.delete(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(() => {
            props.history.push("/");
        })
    }
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
        <form onSubmit={handleSubmit} style={{display: "flex", alignItems: "center", flexDirection: "column", width: "300px"}}>
            <input
            placeholder="Movie name"
            name="title"
            onChange={handleChange}
            value={movie.title}
            />
            <br/>
            <input
            placeholder="Director"
            name="director"
            onChange={handleChange}
            value={movie.director}
            />
            <br/>
            <input
            placeholder="Metascore"
            name="metascore"
            onChange={handleChange}
            value={movie.metascore}
            />
            <br/>
            <input
            placeholder="Stars (separate with ,)"
            name="stars"
            onChange={handleStars}
            value={movie.stars}
            />
            <br/>
            <button>Update Movie</button>
            <br/>
            <button onClick={handleDelete}>Delete Movie</button>
        </form>
        </div>
    )
}

export default Form;