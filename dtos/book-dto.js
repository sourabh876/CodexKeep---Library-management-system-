
class IssuedBook {
    _id;
    title;
    author;
    copies;
    issuedby;
    issueddate;
    returndate;
 
     constructor(user){
         this._id = user.issuedbook._id;
         this.title = user.issuedbook.title;
         this.author = user.issuedbook.author;
         this.copies = user.issuedbook.copies;
         this.issuedby = user.name;
         this.issueddate = user.issueddate;
         this.returndate = user.returndate;
     }
}