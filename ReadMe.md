[tao-react-client](https://github.com/noviKorisnik/tao-react-client)
___
### snapshot002
## the idea
This is intentended to be readable spot which uses service of [tao-dotnet-api](https://github.com/noviKorisnik/tao-dotnet-api) - the first steps, for instance, could be to provide service usage - let start on that way...
## offline?
Before that, not bad if we provide that app can do something without net. It is about reading book, so not too interactive, no change in data we succeed to provide once. And before that, to note that all app source we store in src directory.

for helper functions we introduced lib directory (real library indeed), and there is now **localStorage** to work with local storage, to store data and retrieve them connected to given key.
## value provider
Another item in library is **valueProvider**. It uses localStorage, therefore we introduced it already.

Value provider provides data to given key. The first is to try to retrieve data from local storage - if found, that's it, data can go back to caller, else... else, in async manire, fetch data by key from service... then store it to local strorage and return result.
___
| [Previous](https://github.com/noviKorisnik/tao-react-client/tree/snapshot001) | [Home](https://github.com/noviKorisnik/tao-react-client) | [Next](https://github.com/noviKorisnik/tao-react-client/tree/snapshot003) |
| :-: | :-: |
___