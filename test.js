const mongoose = require('mongoose');
const Person = require('./models/person');
const Story = require('./models/story');




function saveAuthor(callback){
    console.log("save author called.")
    var author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
    });
    author.save(function (err) {
        console.log("author saved..")
        if (err) return handleError(err);
     
        var story1 = new Story({
            title: 'Casino Royale',
            author: author._id    // assign the _id from the person
        });
    
        story1.save(function (err) {
            if (err) return handleError(err);
            // thats it!
            console.log("Done!");
            callback(null,"Done");
        });
    });
}

saveAuthor(function(err,result){
    if(err){
        console.log("Error during saving author",err);
    }else{
        console.log("Success => ",result);
    }
});