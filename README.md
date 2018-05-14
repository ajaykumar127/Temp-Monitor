[Temp Monitor](https://temp-monitor.herokuapp.com/)
============

Is your temperature at the legal limit?

This is a networked temperature monitor for Tom Igoe's [Understanding Networks](itp.nyu.edu/understandingnetworks/Class/Fall2013) class. 

It monitors the temperature from the inside using ethernet and wifi shields on Arduino Unos.

This project includes:

*	Arduino sketches - [setup instructions](https://github.com/sergiomajluf/Temp-Monitor/wiki/How-to-set-up-the-Arduino) on wiki page
*	Express JS, Node and Socket.io for server side websockets
*	[Postgress] as the database
*	[Forecast.io](https://developer.forecast.io) as the weather API

The server expects RESTful HTTP calls to trigger saving and querying events: `<server address>/save/ID/temp`

Project made by Vineet and Ajay - Salesforce


Website: [https://temp-monitor.herokuapp.com/](https://temp-monitor.herokuapp.com/)
