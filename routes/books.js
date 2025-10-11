const express = require('express')
const { books } = require('../data/books.json')
const {users} = require('../data/users.json')

const router = express.Router();

const {BookModel, UserModel} = require('../Models/model');
const { getAllBooks, getsinglebookbyId, getissuedbooks, addnewbook, deletebookbyId, updatebookbyId } = require('../Controllers/book_controller');

//get list of all the books

// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })

router.get('/', getAllBooks)

//get the book by its id

// router.get('/:id', (req, res) => {
//     const { id } = req.params
//     const book = books.find((each) => each.id === id)

//     if (!book) {
//         res.status(404).json({
//             success: false,
//             message: `book is not found with id:${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })

router.get('/:id',getsinglebookbyId)

//Add a new book

// router.post('/', (req, res) => {
//     const { id, title, author, copies } = req.body;

//     if (!id || !title || !author || !copies) {
//         return res.status(400).json({
//             success: false,
//             message: "please provide all the details"
//         })
//     }

//     const book = books.find((each) => each.id === id)
//     if (book) {
//         return res.status(409).json({
//             success: false,
//             message: `book already exists with id ${id}`
//         })
//     }

//     books.push({ id, title, author, copies })
//     res.status(200).json({
//         success: true,
//         message: "book created succesfully"
//     })
// })


router.post('/', addnewbook )

//update a book by its id

// router.put('/:id', (req, res) => {
//         const {id} = req.params;
//         const {data} = req.body

//     const book = books.find((each) => each.id === id)

//     if (!book){
//         return res.status(404).json({
//             success: false,
//             message : `book is found with id:${id}`
//         })
//     }

//     updatebook = books.map((each)=>{
//         if(each.id === id){
//             return  {
//                 ...each,
//                 ...data
//             }
//         }

//         return each
//     })

//     res.status(200).json({
//         success:true ,
//         data: updatebook,
//         message:"book updated succesfully"
//     })


// })

router.put('/:id',updatebookbyId )


//deleting a book

// 
// router.delete('/:id', (req,res)=>{
//     const {id} = req.params;
   
//      const book = books.find((each) => each.id === id)
//     if(!book){
//       return  res.status(404).json({
//             success: false,
//             message: "book not found"
//         })
//     }

//     const removebook = books.filter((each)=>each.id !== id)

//     res.status(200).json({
//         success: true,
//         data: removebook,
//         message: "book deleted succesfully"
//     })

// })


router.delete('/:id', deletebookbyId)

//issued books

// router.get('/issued/for-users', (req,res)=>{

//   const userwithissuedbooks = users.filter((each)=>{
//     if(each.issuedbook){
//         return each;
//     }
//   })

//   const issuedBooks = [];

//   userwithissuedbooks.forEach((each)=>{
//     const book = books.find((book)=>book.id ===each.issuedbook)

//     book.issuedby = each.name;
//     book.issueddate = each.issueddate;
//     book.returndate = each.returndate;

//     issuedBooks.push(book)
//   })
   
//   if(!issuedBooks === 0){
//     return res.status(404).json({
//         success: false,
//         message : "no book issued yet"
//     })

//   }

//   res.status(200).json({
//     success: true,
//     data: issuedBooks
//   })

// })
router.get('/issued/for-users',getissuedbooks)

//   const userwithissuedbooks = users.filter((each)=>{
//     if(each.issuedbook){
//         return each;
//     }
//   })

//   const issuedBooks = [];

//   userwithissuedbooks.forEach((each)=>{
//     const book = books.find((book)=>book.id ===each.issuedbook)

//     book.issuedby = each.name;
//     book.issueddate = each.issueddate;
//     book.returndate = each.returndate;

//     issuedBooks.push(book)
//   })
   
//   if(!issuedBooks === 0){
//     return res.status(404).json({
//         success: false,
//         message : "no book issued yet"
//     })

//   }

//   res.status(200).json({
//     success: true,
//     data: issuedBooks
//   })

// })


module.exports = router;