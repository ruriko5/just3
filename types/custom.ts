import { Tables } from "./database";

export type Wanna = Tables<"wannas">;
export type Todo = Tables<"todos">;
export type Done = Tables<"dones">;

export type Task = Wanna | Todo | Done;
