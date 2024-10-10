export default ({ filter, action }) => {
	filter('items.create', () => {
		console.log('Creating Item!');
	});

	action('items.create', () => {
		console.log('Item created!');
	});
	filter('products.items.create', (input) => {
		console.log('Creating product Item!');
		input.status='pending';	
		return input;
	});

};
