import React from 'react'
import './styles/home.css'
import './styles/newHome.css'
import AddFolderButton from './AddFolderButton'
import menuButton from 'images/menu.svg'
import logo from 'images/logo.svg'
import Folders from './Folders'
import AddFolder from './AddFolder'
import Settings from './Settings'
import EditFolder from './EditFolder'
import DeleteFolder from './DeleteFolder'

export default function Home({ state, setState, vars, Folder }) {
	function handleRenderSettings() {
		setState.setHomeRender(['settings'])
	}

	return (
		<div className="home">
			<img className="home_logo" src={logo} />
			<img
				onMouseDown={handleRenderSettings}
				className="home_folder_settings_button"
				src={menuButton}
				style={{ cursor: 'pointer' }}
			/>

			{Object.keys(state.folders).length > 0 &&
				state.homeRender[0] == 'folders' && (
					<Folders state={state} setState={setState} vars={vars} />
				)}

			{state.homeRender[0] == 'addFolder' && (
				<AddFolder state={state} setState={setState} vars={vars} />
			)}
			{state.homeRender[0] == 'settings' && (
				<Settings state={state} setState={setState} vars={vars} />
			)}
			{state.homeRender[0] == 'folderSettings' && (
				<EditFolder state={state} setState={setState} vars={vars} />
			)}
			<AddFolderButton state={state} setState={setState} vars={vars} />
			{state.homeRender[0] == 'deleteFolder' && (
				<DeleteFolder state={state} setState={setState} vars={vars} />
			)}
		</div>
	)
}
