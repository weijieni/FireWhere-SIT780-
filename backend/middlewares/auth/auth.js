function authUser(req,res,next)
{
	console.log(req.app.user);
	if (req.app.user == null){
		res.status(403);
		return res.send('you need to sign in.')
	}
	next()

}

function authRole(role)
{
	return (req,res,next) => {
		if (req.app.user.role !== role) {
			res.status(401);
			return res.send ('not allowed')
		}
		next()
	}
}
module.exports = {
	authUser,
	authRole
}