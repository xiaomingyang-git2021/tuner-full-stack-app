import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function SongDetails() {
  const [song, setSong] = useState({});
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(()=>{
    axios.get(API + "/songs/" + id)
      .then((res)=>{
        setSong(res.data);
      }).catch((err)=>{
        console.log(err);
      })
  }, [id, API]);

  const handleDelete=()=>{
    axios.delete(API + "/songs/" + id)
      .then((res)=>{
        navigate("/songs")
      }).catch((err)=>{
        console.log(err)
      })
  }

  return <article>
    <div id="Song" className="Song-Details">
      <h3>{true ? <span>⭐️</span> : null} { song.name }&nbsp;- By {song.artist}</h3>
      <br />
      {/* <h5> 
        <span>{song.name}</span>
      </h5> */}
      <h4>{ song.album }</h4>
      <br />
      <p>Time:&nbsp;{ song.time }</p>
    </div>
    <br />
    <div className="showNavigation">
      <div>
        <Link to={`/songs`}>
          <button>BACK</button>
        </Link>
      </div>
      <div>
        <Link to={`/songs/${song.id}/edit`}>
          <button>EDIT</button>
        </Link>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </article>
}

export default SongDetails;