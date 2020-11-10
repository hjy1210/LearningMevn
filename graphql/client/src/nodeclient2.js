const axios = require('axios');
const gql = require('graphql-tag');
const name = 'rice';
const country = 'Taiwan';
function addDish(name, country) {
	axios({
		url: 'http://localhost:9000/graphql',
		method: 'post',
		data: {
			query: `mutation add($input: DishInput) {
                    addDish(input: $input) {
                      id
                      name
                      country
                    }
                  }`,
			variables: {
				input: { name: name, country: country }
			}
		}
	})
		.then((result) => {
			console.log(result.data.data.addDish);
		})
		.catch((err) => {
			console.log(err);
		});
}

addDish("湯麵","台灣")
