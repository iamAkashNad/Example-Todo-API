import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { getDb } from "../data/database.ts";

export default class Todo {
  text: string;
  id?: string;
  constructor(text: string, id?: string) {
    this.text = text;
    this.id = id;
  }

  static findAll() {
    return getDb().collection("todos").find().toArray();
  }

  async findById() {
    let todoId: ObjectId;
    try {
      todoId = new ObjectId(this.id);
    } catch (_error) {
      return;
    }
    return (await getDb().collection("todos").findOne({ _id: todoId }));
  }
}
