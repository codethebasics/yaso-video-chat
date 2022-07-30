import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
	borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <div className={classes.paper}>
          <Grid item xs={12} md={6}>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </div>
      )}
      {callAccepted && !callEnded && (
		<div className={classes.paper}>
			<Grid item xs={12} md={6}>			
				<video playsInline ref={userVideo} autoPlay className={classes.video} />
			</Grid>
		</div>
      )}
    </Grid>
  );
};

export default VideoPlayer;
