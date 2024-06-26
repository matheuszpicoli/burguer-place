//- React
import React, { useState } from "react"

//- Components
import * as Modal from "./Modal"

//- React Icons
import * as Icon from "../exported/reactIcons"

//- Constants
import * as constant from "../exported/constants"

export function Search({
	onSearch
}) {
	const handleSearch = event => onSearch(event.target.value)

	return (
		<div>
			<Icon.Find className="h-7 w-7 p-1 rounded-l rounded-r inline mr-2 bg-slate-200 text-black sm:hidden" />
			<input
				className="mr-5 pt-1 pb-1 pl-2 pr-2 rounded-l rounded-r h-7 text-xs text-black bg-slate-200 outline-none align-middle hover:opacity-80 active:opacity-100 transition duration-300"
				type="search"
				placeholder="O que deseja pedir?"
				autoComplete="off"
				onChange={handleSearch}
			/>
		</div>
	)
}

export function Menu({
	hasBackIcon = false
}) {
	const returnToTop = () => window.scrollTo(0, 0)

	return (
		<h1
			className="cursor-pointer font-bold text-xl ml-5 text-slate-200 hover:opacity-70 active:opacity-100 transition duration-300"
			onClick={returnToTop}
		>
			{hasBackIcon && (
				<Icon.Back className="inline w-6 h-6 mr-6" />
			)}
			<Icon.Logo className="inline w-6 h-6 mr-1" />
			<span className="align-middle">
				<span className="text-red-500">MP</span> Burger
			</span>
		</h1>
	)
}

export function Operation() {
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => setModalOpen(true)

	let text = ""

	constant.isOpen ? text = "Aberto" : text = "Fechado"

	return (
		<React.Fragment>
			<button
				className={`${constant.isOpen ? `text-green-400 border-2 border-green-400` : `text-red-400 border-2 border-red-400`} outline-none h-11 p-2 rounded-l rounded-r hover:bg-opacity-70 hover:bg-black/20 transition duration-200 active:opacity-60`}
				onClick={toggleModal}
			>
				{text}
			</button>

			<Modal.OfficeHour
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
			/>

			{constant.isOpen && (
				<div className="cursor-default">
					<Icon.Clock className="inline m-2" /> <b>60-100min</b> • Mínimo <span className="text-green-400">{constant.maskForPrice(constant.minimumPrice)}</span>.
				</div>
			)}
			{!constant.isOpen && (
				<div className="cursor-default">
					Abre às <span className="text-red-400">{constant.openingTime}h</span>, fecha às <span className="text-red-400">{constant.closingTime}h</span>.
				</div>
			)}
		</React.Fragment>
	)
}
