import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";
import API from "../API/API";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

function UserVideos(props) {
	const { username, deleteVideo} = props;
    const [allVideos, setAllVideos] = useState([]);

	useEffect(() => {
		API.getVideos().then((videos) => {
            setAllVideos(videos);
            
		});
	}, []);

	const findUserVideos = () => {
        console.log(allVideos)
        const userVideos = allVideos.filter(video => video.user.username === username)
        
        return  userVideos.map(video => {
            return ( 
                    <div>
                    <video width="300" height="240" controls>
                        <source src={video.video_url} type="video/mp4" />
                    </video>
                    <h4>{video.sign.name}</h4>
                    <DeleteForeverOutlinedIcon onClick={() => removeVideo(video.id)}/>
                    </div>
                    )
        })

    };


    const removeVideo = (id) => {
        console.log("clicked", id)      
        // deleteVideo(id)
              
        API.deleteVideo(id).then(() => {
           const updatedVideos = allVideos.filter(video => video.id !== id)  
           setAllVideos(updatedVideos)
        })
        
    }

	return (
		<div>
			<h1>{username}'s uploaded Videos</h1>
			{findUserVideos()}
            
        



            
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

// const mapDispatchToProps = dispatch => {
//     return {
//         deleteVideo: (id) => dispatch({type: "DELETE_VIDEO", payload: {id}})
//     }
// }

export default connect(mapStateToProps, null)(UserVideos);
