import React, { useEffect, useRef, useState } from 'react'
import Note from './Note'

export default function Note_s({ state, setState, vars }) {
	let notesRef = useRef()
	let timeout
	let [element, setElement] = useState()

	let sortedNotes = () => {
		let arr = []
		Object.keys(vars.currentFolder.notes).map((note) => {
			arr.push(vars.currentFolder.notes[note])
		})
		if (vars.currentFolder.settings.sortNotes == 'date') {
			return arr.sort((a, b) => {
				return a['dateCreated'] - b['dateCreated']
			})
		} else if (vars.currentFolder.settings.sortNotes == 'recent') {
			return arr
				.sort((a, b) => {
					return a['lastSelected'] - b['lastSelected']
				})
				.reverse()
		} else if (vars.currentFolder.settings.sortNotes == 'name') {
			return arr.sort((a, b) => {
				if (a['title'] < b['title']) {
					return -1
				}
				if (a['title'] > b['title']) {
					return 1
				}
				return 0
			})
		}
	}
	let scrollbarWidth
	useEffect(() => {
		function handleScroll() {
			setState.setRender2(false)
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				setState.setRender2(true)
			}, 2000)
		}
		if (notesRef && notesRef.current) {
			notesRef.current.addEventListener('scroll', handleScroll)
			setElement({
				offsetWidth: notesRef.current.offsetWidth,
				clientWidth: notesRef.current.clientWidth,
			})
		}

		return () => {
			if (notesRef && notesRef.current) {
				notesRef.current.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])

	if (element) {
		scrollbarWidth = element.offsetWidth - element.clientWidth
	}

	let notes = sortedNotes().map((note) => {
		return (
			<Note
				key={note.title}
				state={state}
				setState={setState}
				vars={vars}
				note={note}
			/>
		)
	})

	return (
		<div className="curret_page_notes">
			<div className="curret_page_notes_wrapper_parent">
				<div
					className="curret_page_notes_wrapper_child"
					ref={notesRef}
					style={{
						paddingRight: element && scrollbarWidth + 1 + 'px',
					}}>
					<div className="current_notes_gap_fill_top" />
					{notes}
					<div className="current_notes_gap_fill_bottom" />
				</div>
			</div>
		</div>
	)
}
