const mongoose=require('mongoose');
const mongoURI='mongodb+srv://gofood:mern123@cluster0.ukssr.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB =async() =>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
        if(err) console.log("---",err)
        else{
            console.log("connected");
            const foodCategory= mongoose.connection.db.collection("food_Category");
            foodCategory.find({}).toArray(function(err,catData){
                if (err) console.log(err);
                    else{
                        global.foodCategory=catData;
                    }
                })
            const fetched_data=mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                    if (err) console.log(err);
                    else{
                        global.food_items=data;
                        console.log(global.food_items);
                    }
            })
        }    
        
})
}
module.exports=mongoDB;
