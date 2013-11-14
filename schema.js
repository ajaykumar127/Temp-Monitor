db.usercollection.insert(
	{ 
		"username" : "testuser1", 
		"email" : "testuser1@testdomain.com" 
	}
)


db.usercollection.insert(
{
  "timestamp": 0,
  "user": "SM",
  "temp": "70"
})
										   				  				 
db.astronautModel.insert({"timeStamp" : 0, "user" : "AB", "inTemp" : 65, "outTemp" : 35 })
db.astronautModel.insert({"timeStamp" : 1, "user" : "AB", "inTemp" : 70, "outTemp" : 45 })
db.astronautModel.insert({"timeStamp" : 2, "user" : "AB", "inTemp" : 72, "outTemp" : 50 })
db.astronautModel.insert({"timeStamp" : 3, "user" : "AB", "inTemp" : 75, "outTemp" : 55 })
