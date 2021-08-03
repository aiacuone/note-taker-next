import React, { useEffect } from 'react'

export default function HomeFoldersSettings({ vars, state, setState }) {
	let settingsOptions = () => {
		let settingsOptionsArr = ['SORT BY', 'BACKGROUND COLOR']
		return settingsOptionsArr.map((item) => {
			return (
				<div>
					<p
						onClick={() => {
							let newArr = [...state.homeFoldersSettings]
							newArr[0] = item
							setState.setHomeFoldersSettings(newArr)
						}}
						className="home_folder_settings_option">
						{item}
					</p>
				</div>
			)
		})
	}

	let sortByOptions = () => {
		let arr = ['RECENT', 'DATE CREATED', 'NAME']
		return arr.map((item) => {
			return (
				<div>
					<p
						onMouseDown={() => {
							setState.setSortHomeFolders(item)
							setState.setHomeFoldersSettings(null)
						}}
						className="home_folder_settings_option">
						{item}
					</p>
				</div>
			)
		})
	}

	useEffect(() => {
		function handleMouseDown(e) {
			if (e.target.className !== 'home_folder_settings_option') {
				setState.setHomeFoldersSettings('')
			}
		}
		document.addEventListener('mousedown', handleMouseDown)
		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [])
	return (
		<div className="home_folder_settings">
			{!state.homeFoldersSettings[0] && settingsOptions()}
			{state.homeFoldersSettings[0] == 'SORT BY' && sortByOptions()}
		</div>
	)
}
