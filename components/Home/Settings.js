import React, { useEffect } from 'react'
import SortBy from './SortBy'

export default function Settings({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
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
	return (
		<div className="settings">
			<h1 className="settings_header">SETTINGS</h1>
			<SortBy state={state} setState={setState} vars={vars} />
		</div>
	)
}
