import React, { Component } from 'react';
import styles from './Search.css';
import SearchCategories from './SearchCategories/SearchCategories';
import axios from 'axios';
import Results from '../../Results/Results';

class Search extends Component {
	state = {
		search: '',
		zipcode: '',
		categories: []
	}

	handleChange = e => {
		if (e.target.value !== ' ') {
			this.setState({
				[e.target.name]: e.target.value,
			});
		}
	}

	removeCategory = category => {
		let categoryCopy = [...this.state.categories];
		let index = categoryCopy.indexOf(category.target.name);
		categoryCopy.splice(index, 1);
		this.setState({ categories: categoryCopy });
	}

	handleSearchCategories = e => {

		if (e.key === 'Enter' || (e.charCode === 32 && this.state.search !== '')) {
			this.setState({
				categories: [...this.state.categories, this.state.search],
				search: '',
			});
		}
	}



	handleOnClick = () => {
		const categories = {
			data: this.state.categories,
			zipcode: this.state.zipcode
		}

		axios.post('/search', categories)
		.then((response) => {
			this.props.view('loading');
			this.props.getData(response);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render() {
		return (
			<div>
			<div className={styles.Search}>
				<div className={styles.Find}>Find</div>
				<input
					className={styles.FormCategory}
					type="text"
					name="search"
					onKeyPress={this.handleSearchCategories}
					value={this.state.search}
					placeholder="Add categories"
					onChange={this.handleChange}
				/>
				<div className={styles.Zipcode}>Zipcode</div>
				<input
					className={styles.FormCategory}
					type="text"
					name="zipcode"
					value={this.state.zipcode}
					placeholder="Enter a zipcode"
					onChange={this.handleChange}
				/>
				<button className={styles.SearchButton} onClick={this.handleOnClick}>
					<span class="glyphicon glyphicon-search" />
				</button>
			</div>
				<div>
					<SearchCategories categories={this.state.categories} removeCategory={this.removeCategory.bind(this)}/>
				</div>
			</div>
		)
	}
}

export default Search;