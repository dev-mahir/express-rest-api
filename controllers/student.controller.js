const path = require('path');
const fs = require('fs');


const students = JSON.parse( fs.readFileSync( path.join( __dirname, "../data/students.json")).toString());

// generate id 
const generateId = () => {
    if( students.length > 0 ){
        return students[students.length - 1].id + 1
    } else{
        return 1;
    }
}



// get all students 
exports.getAllStudent = (req, res) => {
    if( students.length > 0){
        res.status(200).json(students);
    }else{
        res.status(204).json({
            message: "Data not found"
        })
    }
}



// add new students 
exports.addNewStudent = (req, res) => {
    const { name, email } = req.body;
    if( name != "" && email != ""){
        students.push({
            id: generateId(),
            name: name,
            email: email
        })
        fs.writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students) );
        res.status(201).json({
            message: "Added"
        });
    }else{
        res.status(400).json({
            message: "Error"
        });
    }    
}
exports.updateStudent = (req, res) => {
    let id = req.params.id;
    if( students.some( data => data.id == id)){
        students.filter( data => data.id == id).map( updateData => {
            updateData.name = req.body.name
        });
        fs.writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students));    
        res.status(404).json(students);
    }else{
        res.status(404).json({
            message: "Not found student"
        });
    }
}



// delete student data 
exports.deleteStudent = (req, res) => {
    let id = req.params.id;
    if( students.some( data => data.id == id)){
        let deletedData = students.filter( data => data.id != id);
        fs.writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(deletedData));    
        res.status(404).json(deletedData)
    }else{
        res.status(404).json({
            message: "Not found student"
        });
    }
}


// get single student 
exports.getSingleStudent = (req, res) => {
    let id = req.params.id;

    if( students.some( data => data.id == id)){
        res.status(200).json(students.find( data => data.id = id));
    }else{
        res.status(404).json({
            message: "Not found student"
        });
    }
}