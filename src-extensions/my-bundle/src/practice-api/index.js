export default (router,{database,services}) => {

	const { ItemsService } = services;
	const {MailService}=services;
	
	console.log("items service",ItemsService);
	
		router.get('/', (req, res) => res.send('Hello, World!'));
	
	//Will create custmom routes/api
	
	router.get('/hello/:name',(req,res)=>{
		const {name}=req.params;
		res.send(`Hello I am,${name}`);
	});
	
	
	//below is for database 
	router.get('/products',async (req,res)=> { //calling a endpoint product
	//database KNEX instance // KNEX is ORM used by directus to handle DB operatins.
	
	const products =await database('products').select('*'); //getting products from DB
	res.json(products)// Send the products as a response
	});
	
	
	//below is for itemservice
	
	router.get('/product_by_service', async(req,res) => {
	
		let productService= new ItemsService('products',{schema:req.schema, accountability:req.accountability});//accountability is nothing but all authenticated users information
	
		console.log("service",productService)
		let products = await productService.readByQuery({fields:['id','name','price']});
	
		res.json(products);
	});
	


	// below is for test email
	router.get('/test-email', async(req,res) => {

   let mailService = new MailService({schema:req.schema});

	let mailOptions={
	  to:'vedanti.mude@mobify.bz,aparna.pradhan@mobify.bz',
	  cc:'sunil.salunke@mobify.bz,mandar.bakale@mobify.bz',
	  subject: 'Test Email ',
	  html: 'Good Afternoon Pooja'
		}

		let response =  await mailService.send(mailOptions);
		return res.send(response);
	})

	router.get('/send-template-testemail', async(req,res) => {
		let mailService = new MailService({schema:req.schema});

		let mailOptions={
			to: 'vedanti.mude@mobify.bz, aparna.pradhan@mobify.bz',
			cc:'sunil.salunke@mobify.bz, pooja.hire@mobify.bz,mandar.bakale@mobify.bz',
			subject : 'Test Email',
			template: {
					name:'my-template',
					data: {
						user_name: 'Developers How are you? ',
						message: 'Hope you get the answer for how to send email !'
					}
			}
		};
		
		let response = await mailService.send(mailOptions);
		return res.send(response);
	});

	};
	