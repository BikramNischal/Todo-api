import fs from "fs";
import Todo from "../model/todo";

export default class DataSource{
    public static filename = "./data/todo.json";
    
    public static read(): Todo[]{
        let data: Todo[] = [];
        try{
            let fileData = fs.readFileSync(DataSource.filename,"utf-8");
            data = fileData.length ? JSON.parse(fileData) : [];
        } catch(err){
            console.error(err);
        }
        return data;
    }

    public static writeOne(todo:Todo){
        const fileData = DataSource.read();  
        fileData.push(todo);
        const stringFileData = JSON.stringify(fileData);
        try{
            fs.writeFileSync(DataSource.filename,stringFileData,"utf-8");
        } catch (err){
            console.error(err);
        }
    }

    public static write(todolist: Todo[]){
        const stringData = JSON.stringify(todolist);
        try{
            fs.writeFileSync(DataSource.filename,stringData, "utf-8");
        } catch (err) {
            console.log(err);
        }
    }
    
}