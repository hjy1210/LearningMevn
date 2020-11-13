const jwt = require('jsonwebtoken');


// Never do this!
let users = {
	john: { password: 'passwordjohn' },
	mary: { password: 'passwordmary' }
};

exports.login = function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
    console.log(req.body.username, req.body.password)
	// Neither do this!
	if (!username || !password || users[username].password !== password) {
		return res.status(401).send();
	}
	//use the payload to store information about the user such as username, user role, etc.
	let payload = { username: username };

	//create the access token with the shorter lifespan
	let accessToken = jwt.sign(
        payload, 
        process.env.ACCESS_TOKEN_SECRET || "swsh23hjddnns", 
        {
		algorithm: 'HS256',
		expiresIn: process.env.ACCESS_TOKEN_LIFE || "120000000"
	});
	
    let payload2 = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "swsh23hjddnns")
    
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(payload2.iat);
    console.log(d)

	//create the refresh token with the longer lifespan
	let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "dhw782wujnd99ahmmakhanjkajikhiwn2n", {
		algorithm: 'HS256',
		expiresIn: process.env.REFRESH_TOKEN_LIFE || "86400000000"
	});

	//store the refresh token in the user array
	users[username].refreshToken = refreshToken;

	//send the access token to the client inside a cookie
	res.cookie('jwt', accessToken, { secure: false, httpOnly: true });
	res.send(accessToken);
};

exports.refresh = function (req, res){

    let accessToken = req.cookies.jwt

    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
	}
	//retrieve the refresh token from the users array
    let refreshToken = users[payload.username].refreshToken

    //verify the refresh token
    try{
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }
    let payload2 = {username:payload.username}
    let newToken = jwt.sign(payload2, process.env.ACCESS_TOKEN_SECRET, 
    {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    res.cookie("jwt", newToken, {secure: false, httpOnly: true})
    res.send()
}


