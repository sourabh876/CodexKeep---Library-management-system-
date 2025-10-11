const { UserModel, BookModel } = require("../Models/model")
const issuedBook = require("../Models/user_models")

//get list of all the books

exports.getAllBooks =async (req,res) => {
  const books = await BookModel.find()

  if(books.length === 0){
   return res.status.json({
        success: false,
        message: "No book found in the system"
    })}

    res.status(200).json({
        success: true,
        data: books
    })
}

//get the book by its id
exports.getsinglebookbyId =async (req,res) =>{
 const { id } = req.params
    const book = await BookModel.findById(id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
}

//get all the issued books

exports.getissuedbooks = async (req,res) =>{
    const users = await UserModel.find(
        {issuedbook: {$exists: true}},

    ).populate("issuedbook")

    const issuedbooks = users.map((each) =>{
        return new IssuedBook(each)
    })
        
    if(issuedbooks.length === 0){

       return res.status(404).json({
        success: false,
        message: "no books issued yet"

       })
    }

    res.status(200).json({
        success: true,
        data : issuedbooks
    })
}

//add a new book

exports.addnewbook = async(req,res) =>{
    const {data} = req.body

    if(!data || Object.keys(data).length === 0){
        res.status(404).json({
            success: false,
            message : "please provide data to add a book."
        })
    }
    await BookModel.create(data)

    const allbooks = await BookModel.find() 

    res.status(200).json({
        success: true,
        message: "book added succesfully",
        data: allbooks
    })
}


exports.updatebookbyId = async(req,res) =>{
    const {id} = req.params;
    const {data} = req.body

    if(!data || Object.keys(data).length === 0){
        return res.status(404).json({
            success: false,
            message: " please provide data to update the book"
        })
    }

    const updatebook = await BookModel.findOneAndUpdate(
        {_id : id},
        data,
        { new : true}
    );

    if(!updatebook){
        return res.status(404).json({
            success: false,
            message: `No book found with this id:${id}`
        })
    }

    res.status(200).json({
        success: true,
        message : " Book updated succesfully",
        data : updatebook
    })
}


exports.deletebookbyId = async (req,res) =>{
    const {id} = req.params

    const book = await BookModel.findById(id)

    if(!book){
        res.status(404).json({
            success: false,
            message:  `No book found with this id:${id}`
        })
    }

     await BookModel.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message : "book deleted succesfully"
       
    })
}