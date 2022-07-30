		import React, { useState, useContext } from 'react';
		import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
		import { CopyToClipboard } from 'react-copy-to-clipboard';
		import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
		import { makeStyles } from '@material-ui/core/styles';

		import { SocketContext } from '../Context';

		const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		gridContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			},
		},
		container: {
			width: '600px',
			margin: '35px 0',
			padding: 0,
			[theme.breakpoints.down('xs')]: {
			width: '80%',
			},
		},
		margin: {
			marginTop: 20,
		},
		padding: {
			padding: 20,
		},
		paper: {
			padding: '10px 20px',
		},
		}));

		const Sidebar = ({ children }) => {
		const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, typeUser } = useContext(SocketContext);
		const [idToCall, setIdToCall] = useState('');
		const classes = useStyles();

		const renderFinalizarConsulta = () => {
			if (callAccepted && !callEnded) {
				return (
					<Button variant="contained" color="secondary" fullWidth onClick={leaveCall} className={classes.margin}>
					Finalizar consulta
					</Button>
				)
			}
		}

		const renderIniciarConsulta = () => {
			if (typeUser === 'doctor' && !callAccepted) {
				return (
					<Grid item xs={12} md={6} className={classes.padding} fullWidth>
						<CopyToClipboard text={me} className='cta'>
							<Button variant="contained" color="primary" fullWidth>
								Copy Your ID
							</Button>
						</CopyToClipboard>
					</Grid>
				)
			} else {
				return (
					<Button variant="contained" color="primary" fullWidth onClick={() => callUser()} className={classes.margin}>
						Iniciar consulta
					</Button>
				)
			}
		}

		return (
			<Container className={classes.container}>
			<div>
				<form className={classes.root} noValidate autoComplete="off">
					<Grid container className={classes.gridContainer}>						
						<Grid item xs={12} md={6} className={classes.padding}>
						<Typography style={{ display: 'none' }} gutterBottom variant="h6">Make a call</Typography>
						<TextField style={{ display: 'none' }} label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
						{ renderFinalizarConsulta() }
						{ renderIniciarConsulta() }
						</Grid>
					</Grid>
				</form>
				{children}
			</div>
			</Container>
		);
		};

		export default Sidebar;
