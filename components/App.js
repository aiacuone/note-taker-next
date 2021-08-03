import React, { useEffect, useState, useRef } from 'react'
import tempFolders from '../variables/folders'
import Home from './Home/Home'
import MainSection from 'components/CurrentFolder/MainSection'
import 'components/CurrentFolder/styles/current_folder.css'
import AddNote from 'components/CurrentFolder/AddNote'
import EditNote from 'components/CurrentFolder/EditNote'
import DeleteNote from 'components/CurrentFolder/DeleteNote'
import ViewNote from 'components/CurrentFolder/ViewNote'

function App() {
	// STATE & USEREF
	// let [directory, setDirectory] = useState([]) //ORIGINAL
	let [directory, setDirectory] = useState([])
	// let [folders, setFolders] = useState({}) //ORIGINAL
	let [folders, setFolders] = useState(tempFolders)
	let [input, setInput] = useState('')
	let [content, setContent] = useState('')
	let [settings, setSettings] = useState({ sortHomeFolders: 'date' })
	//HOME
	let [homeRender, setHomeRender] = useState(['folders'])
	//CURRENT FOLDER
	let [notesScrolling, setNotesScrolling] = useState(false)
	let [foldersScrolling, setFoldersScrolling] = useState(false)
	let [render, setRender] = useState(['mainSection'])
	let [render2, setRender2] = useState(true)

	let state = {
		directory,
		folders,
		homeRender,
		notesScrolling,
		foldersScrolling,
		input,
		content,
		render,
		render2,
		settings,
	}
	let setState = {
		setDirectory,
		setFolders,
		setHomeRender,
		setNotesScrolling,
		setFoldersScrolling,
		setInput,
		setContent,
		setRender,
		setRender2,
		setSettings,
	}

	// CREATES THE ACTUAL DIRECTORY THROUGH THE FOLDERS OBJECT

	let directoryChain = () => {
		let arr = []
		directory.map((folder, index) => {
			index == 0 ? arr.push(folder) : arr.push('folders', folder)
		})
		return arr
	}

	// AN OBJECT OF THE CURRENT FOLDER, USING THE DIRECTORY CHAIN

	let currentFolder = directoryChain().reduce((a, b) => {
		return a[b]
	}, folders)

	// CONSTRUCTOR METHOD TO CREATE NEW FOLDER

	function Folder({ name, dateCreated, folderColor }) {
		this.name = name
		this.dateCreated = dateCreated
		this.folderColor = folderColor
		this.lastSelected = ''
		this.timesSelected = 0
		this.background = ''
		this.folders = {}
		this.notes = {}
		this.settings = { sortFolders: 'date', sortNotes: 'date' }
	}

	// CONSTRUCTOR METHOD TO CREATE NEW FOLDER
	function Note({ title, dateCreated, content }) {
		this.title = title
		this.dateCreated = dateCreated
		this.lastSelected = ''
		this.timesSelected = 0
		this.noteOutline = 'grey'
		this.content = content
		// this.sortFolders = 'NAME'
		// this.background = ''
		// this.folders = {}
		// this.notes = null
	}
	// GLOBAL VARIABLES

	let vars = {
		directoryChain,
		currentFolder,
		colors: [
			'#ED3A3A', //red
			'#C93AC9', //pink
			'#8E33EF', //light purple
			'#5043C9', //dark purple
			'#355BC9', //blue
			'#2DA1E2', //baby blue
			'#4A8269', //olive
			'#4FC12F', //light green
			'rgb(236, 236, 80)', //yelow
			'#FFA300', //orange
			'#A0A0A0', //grey
			'#000000', //black
		],
		Note,
		Folder,
		foldersScrolling: false,
	}

	window.oncontextmenu = function (event) {
		//STOPS LONG PRESS MENU COMING UP
		event.preventDefault()
		event.stopPropagation()
		return false
	}

	let renderHome = directory.length == 0 ? true : false

	return (
		<div className="app">
			{renderHome && (
				<Home state={state} setState={setState} vars={vars} Folder={Folder} />
			)}
			{!renderHome && render[0] == 'mainSection' && (
				<MainSection
					state={state}
					setState={setState}
					vars={vars}
					Note={Note}
				/>
			)}
			{!renderHome && render[0] == 'addNote' && (
				<AddNote state={state} setState={setState} vars={vars} Note={Note} />
			)}
			{!renderHome && render[0] == 'editNote' && (
				<EditNote state={state} setState={setState} vars={vars} Note={Note} />
			)}{' '}
			{!renderHome && render[0] == 'deleteNote' && (
				<DeleteNote state={state} setState={setState} vars={vars} />
			)}
			{!renderHome && render[0] == 'viewNote' && (
				<ViewNote state={state} setState={setState} vars={vars} />
			)}
		</div>
	)
}

export default App
