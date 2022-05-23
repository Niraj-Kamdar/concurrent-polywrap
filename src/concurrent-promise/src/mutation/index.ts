import { concurrent } from "../common";
import {
  Client,
  Input_schedule,
  Interface_InvokableModuleEnum,
  Module,
} from "./w3";

export type MutationConfig = {};

export class Mutation extends Module<MutationConfig> {
  public schedule(input: Input_schedule, client: Client): number[] {
    const conc = concurrent(client);
    return input.tasks.map((task) => {
      const taskId = conc.schedule({
        ...task,
        module:
          task.module === Interface_InvokableModuleEnum.QUERY
            ? "query"
            : "mutation",
      });
      return taskId;
    });
  }
}
