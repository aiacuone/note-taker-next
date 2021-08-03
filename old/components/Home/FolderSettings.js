import React, { useEffect } from 'react'

export default function FolderSettings({ state, setState, vars }) {
	function handleExit(e) {
		if (e.target.className == 'home') {
			setState.setHomeRender(['folders'])
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleExit)
		return () => {
			document.removeEventListener('mousedown', handleExit)
		}
	})
	return <div>FOLDER SETTINGS</div>
}
