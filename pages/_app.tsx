import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
	// STATE & USEREF
	// let [directory, setDirectory] = useState([]) //ORIGINAL
	let [directory, setDirectory] = useState([])
	// let [folders, setFolders] = useState({}) //ORIGINAL
	let [folders, setFolders] = useState({})
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
		let arr: any = []
		directory.map((folder: any, index: any) => {
			index == 0 ? arr.push(folder) : arr.push('folders', folder)
		})
		return arr
	}

	// AN OBJECT OF THE CURRENT FOLDER, USING THE DIRECTORY CHAIN

	let currentFolder = directoryChain().reduce((a: any, b: any) => {
		return a[b]
	}, folders)

	// CONSTRUCTOR METHOD TO CREATE NEW FOLDER

	class Folder {
		name: any
		dateCreated: any
		folderColor: any
		lastSelected: any
		timesSelected: any
		background: any
		folders: any
		notes: any
		settings: any
		constructor(obj: any) {
			this.name = obj.name
			this.dateCreated = obj.dateCreated
			this.folderColor = obj.folderColor
			this.lastSelected = ''
			this.timesSelected = 0
			this.background = ''
			this.folders = {}
			this.notes = {}
			this.settings = { sortFolders: 'date', sortNotes: 'date' }
		}
	}

	// CONSTRUCTOR METHOD TO CREATE NEW FOLDER
	class Note {
		title
		dateCreated
		lastSelected
		timesSelected
		noteOutline
		content
		sortFolders
		background
		folders: any
		notes: any
		constructor(obj: any) {
			this.title = obj.title
			this.dateCreated = obj.dateCreated
			this.lastSelected = ''
			this.timesSelected = 0
			this.noteOutline = 'grey'
			this.content = obj.content
			this.sortFolders = 'NAME'
			this.background = ''
			this.folders = {}
			this.notes = null
		}
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
		<Component
      {...pageProps}
      vars={vars}
      Note={Note}
      Folder={Folder}
      state={state}
      setState={setState}
      renderHome={ renderHome}
		/>
	)
}
export default MyApp
