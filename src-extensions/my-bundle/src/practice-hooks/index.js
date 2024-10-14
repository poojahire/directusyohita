export default ({ filter, action }, { services, database }) => {

	const{ MailService}=services;

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

	action('users.item.create',async(req,res) => {
		console.log('user has been created');

		await  send_mail(from,too,ccc,subjectTitle,msg);

	})


	function send_mail(from,too,ccc,subjectTitle,msg){


		
	}

};
