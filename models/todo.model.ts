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
    return await getDb().collection("todos").findOne({ _id: todoId });
  }

  async save() {
    let todoId: ObjectId;
    if (this.id) {
      todoId = new ObjectId(this.id);
      await getDb()
        .collection("todos")
        .updateOne({ _id: todoId }, { $set: { text: this.text } });
    } else {
      todoId = await getDb()
        .collection("todos")
        .insertOne({ text: this.text, createdAt: new Date() });
    }
    return (await new Todo("", todoId.toString()).findById())!;
  }

  async delete() {
    let todoId: ObjectId;
    try {
      todoId = new ObjectId(this.id);
    } catch (_error) {
      return 0;
    }
    return await getDb().collection("todos").deleteOne({ _id: todoId });
  }
}
