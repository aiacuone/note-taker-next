import React, { useEffect } from 'react'
import SettingsSortFolders from './SettingsSortFolders'
import SettingsSortNotes from './SettingsSortNotes'

export default function Settings({ state, setState, vars }) {

    useEffect(() => {
        function handleExit(e) {
            if (e.target.className=='main_section_container') {
                setState.setRender(['mainSection'])
            }
        }

        document.addEventListener('mousedown', handleExit)
        
        return () => {
            document.removeEventListener('mousedown',handleExit)
        }
    },[])


    return (
		<div className='settings'>
			<h1 className="settings_header">SETTINGS</h1>
            <SettingsSortFolders state={state} setState={setState} vars={vars} />
            <SettingsSortNotes state={state} setState={setState} vars={vars}/>
		</div>
    )
}
