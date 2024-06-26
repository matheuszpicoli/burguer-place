//- React
import React, { useState } from "react"

//- React Icons
import * as Icon from "../exported/reactIcons"

//- Components
import * as Modal from "./Modal"

export function MenuList({
	option
}) {
	const anchor = event => {
		event.preventDefault()

		document.getElementById(option).scrollIntoView({
			behavior: "smooth"
		})
	}

	return (
		<p
			onClick={anchor}
			className="inline text-white/60 cursor-pointer hover:text-white transition duration-300 active:opacity-20"
		>
			{option}
		</p>
	)
}

export function MenuOrder({
	category,
	items = [],
	searchTerm = "",
	isLastCategory = false
}) {
	const [selectedItem, setSelectedItem] = useState(null)
	const [detailsState, setDetailsState] = useState(true)

	const [modalKey, setModalKey] = useState(Math.random())
	const [detailsKey, setDetailsKey] = useState(Math.random())

	const toggleModal = item => {
		setSelectedItem(item)
		setModalKey(Math.random())
	}

	const toggleDetails = () => {
		setDetailsState(!detailsState)
		setDetailsKey(Math.random())
	}

	const filteredItems = items.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))

	const filterResultText = () => {
		let results = `Seu filtro encontrou ${filteredItems.length} resultados`

		switch (filteredItems.length) {
			case 0:
				results = "Nada foi encontrado"
				break
			case 1:
				results = "Seu filtro encontrou 1 resultado"
				break
		}

		return results
	}

	const itemCol1 = filteredItems.filter((_, index) => index % 2 === 0)
	const itemCol2 = filteredItems.filter((_, index) => index % 2 !== 0)

	const formatPrice = (price = 0) => `R$ ${price.toFixed(2).replace(".", ",")}`

	return (
		<React.Fragment>
			<div
				id={category}
				className="h-24"
			></div>
			<details
				open={detailsState}
				key={detailsKey}
				className={`mx-auto w-10/12 bg-stone-700 ${isLastCategory ? "pb-24" : ""}`}
			>
				<summary
					onClick={toggleDetails}
					className="text-white tracking-wide text-lg font-bold mb-4 cursor-pointer flex items-center justify-around hover:text-white/40 active:text-white transition duration-200"
				>
					{category}
					<span className={`transform ${detailsState ? "rotate-0" : "rotate-180"}`}>
						<Icon.Arrow className="w-6 h-6" />
					</span>
				</summary>

				{searchTerm.length > 0 && (
					<p className="text-white/70 cursor-default text-sm text-center mb-4">
						{filterResultText()}
					</p>
				)}

				<table className={`mx-auto w-10/12 text-gray-400 ${detailsState ? "animate-fade-in" : ""}`}>
					<tbody>
						{itemCol1.map((item, index) => (
							<tr
								key={index}
								className={`
									${index === itemCol1.length - 1 && filteredItems.length % 2 !== 0 ? "md:flex sm:flex" : "flex"}
									md:flex-col sm:flex-col
								`}>

								<td
									onClick={() => toggleModal(item)}
									className={`${index === itemCol1.length - 1 && filteredItems.length % 2 !== 0 ? "colspan-2" : ""} flex items-start flex-1 p-4 cursor-pointer border-2 border-white/20 hover:bg-gradient-to-r from-white/10 via-white/10 to-transparent animate-fade-in`}
								>
									<img
										className="w-24 h-24 object-cover rounded-xl mr-4"
										src={item.image}
										alt={item.description}
										loading="lazy"
									/>
									<div>
										<h2 className="uppercase font-bold">
											{item.description}
										</h2>
										<p className="text-xs">
											{item.text}
										</p>
										<i className="text-green-400">
											{formatPrice(item.price)}
										</i>
									</div>
								</td>

								{index !== itemCol1.length - 1 || filteredItems.length % 2 === 0 ? (
									<td
										onClick={() => itemCol2[index] && toggleModal(itemCol2[index])}
										className="flex items-start flex-1 p-4 cursor-pointer border-2 border-white/20 hover:bg-gradient-to-r from-white/10 via-white/10 to-transparent animate-fade-in"
									>
										{itemCol2[index] && (
											<React.Fragment>
												<img
													className="w-24 h-24 object-cover rounded-xl mr-4"
													src={itemCol2[index].image}
													alt={itemCol2[index].description}
													loading="lazy"
												/>
												<div>
													<h2 className="uppercase font-bold">
														{itemCol2[index].description}
													</h2>
													<p className="text-xs">
														{itemCol2[index].text}
													</p>
													<i className="text-green-400">
														{formatPrice(itemCol2[index].price)}
													</i>
												</div>
											</React.Fragment>
										)}
									</td>
								) : null}

							</tr>
						))}
					</tbody>
				</table>
			</details >

			{selectedItem && (
				<Modal.Order
					key={selectedItem.id && modalKey}
					description={selectedItem.description}
					text={selectedItem.text}
					extras={selectedItem.extras}
					price={selectedItem.price}
				/>
			)}
		</React.Fragment>
	)
}
