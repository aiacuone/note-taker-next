import React from 'react'
import NotesSection from './NotesSection'
import AddFolder from './AddFolder'
import Footer from './Footer'
import Header from './Header'
import DeleteFolder from './DeleteFolder'
import EditFolder from './EditFolder'
import Settings from './Settings'

export default function MainSection({ state, setState, vars }) {
	return (
		<div className="main_section_container">
			{state.render2 && (
				<Header state={state} setState={setState} vars={vars} />
			)}
			{!state.render[1] && (
				<NotesSection state={state} setState={setState} vars={vars} />
			)}
			{state.render[1] === 'addFolder' && (
				<AddFolder state={state} setState={setState} vars={vars} />
			)}
			{state.render[1] === 'deleteFolder' && (
				<DeleteFolder state={state} setState={setState} vars={vars} />
			)}
			{state.render[1] === 'editFolder' && (
				<EditFolder state={state} setState={setState} vars={vars} />
			)}
			{state.render[1] === 'settings' && (
				<Settings state={state} setState={setState} vars={vars} />
			)}
			{state.render2 && (
				<Footer state={state} setState={setState} vars={vars} />
			)}
		</div>
	)
}
