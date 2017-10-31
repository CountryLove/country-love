# COUNTRY LOVE
	
## COLLECTION: 
	* Countries
		- Data from WorldFactBook
	* Users
		- Personal Info	
		- userName
		- password
		- homeBase
	* Personal Experiences
		- country_id
		- user_id
		- Comments	
		- Ratings
		- Tags
		- City/Area
		- timeStamp

## ROUTES:
	
	* Country Routes
		- Get:id 
			~one country
			~comments	
			~avg rating
			~to 15 tags
		- Getall
			~all countries
			~avg rating	
			~top tags
			~name / language / currency 

	* Personal Experience Routes
		- Post/Put/Delete :id (registered users only)	
		- Get by
			~rating
			~tags	
			~city/area
			~user_id
			~country_id
			~experience

	* User Routes
		- Patch :id
		- Delete :id
		- Get :id
		- Get All

	* Auth Routes
		- Post: signUp
			~name
			~password	
			~email
			~homeBase
		- Post: signIn
			~email
			~password	
		


STYLE GUIDE:

* es6	
	- let/const
	- Arrow functions
	- Promises vertical chain style
	- No ternary functions
	- type methods
	

1. Integrate WFB API
2. Models -country, user, auth, experience