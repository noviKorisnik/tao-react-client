[tao-react-client](https://github.com/noviKorisnik/tao-react-client#readme)
___
### snapshot003
## router
The intention of this app is to emulate book reading.

Consider book, like tao - there is some cover page, then contents, within tao there are books, then chapters and some text. All in all, it not be bad if we had it organized in pages - one for cover/contents, one for each book intro and one for each chapter. And, if we look at service we intend to use - it is already organized in such way.

Then... it is a good moment to introduce router, easy to work with pages in react when we have one.
```
npm install react-router-dom
```
## components
The new directory is introduced, containing components. Components are just representation of tipical pages of our application - here, that would be **Tao**, **Book** and **Chapter**.

It is good to notice that we have only one Tao page (cover page, home page, many names for the same thing). On the other hand, there are many Books and Chapters - which are uniquely resolved with **_code_** - therefore we use router hook **_useParams_** to assign it.
## app with router and components
**App** is now changed to fit our needs - we use router, and based on recognized route is rendered apropriate component, while book and chapter gets their needed code.
## test
Components are basic at the moment, not connected to content they need to show, but we can test router.
* http://localhost:3000/ **Tao**
* http://localhost:3000/book/TheBestBook **Book TheBestBook**
* http://localhost:3000/chapter/AnotherChapter **Chapter AnotherChapter**
___
| [Previous](https://github.com/noviKorisnik/tao-react-client/tree/snapshot002#readme) | [Home](https://github.com/noviKorisnik/tao-react-client#readme) | [Next](https://github.com/noviKorisnik/tao-react-client/tree/snapshot004#readme) |
| :-: | :-: | :-: |
___
