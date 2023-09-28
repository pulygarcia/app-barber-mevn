function seedDb(){
    console.log('From seedDB');
}

function clearDB(){
    console.log('From ClearDB');
}

if(process.argv[2] == "--import"){
    seedDb();
}else{
    clearDB();
}