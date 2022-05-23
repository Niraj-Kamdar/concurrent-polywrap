import { concurrent } from "../common";
import {
  Client,
  Input_result,
  Interface_TaskResult,
  Interface_TaskStatus,
  Module,
} from "./w3";

export type QueryConfig = {};

export class Query extends Module<QueryConfig> {
  public async result(
    input: Input_result,
    client: Client
  ): Promise<Interface_TaskResult[]> {
    const conc = concurrent(client);
    const result = await conc.result(input.taskIds, input.returnWhen as number);
    return result;
  }

  public status(input: Input_result, client: Client): Interface_TaskStatus[] {
    const conc = concurrent(client);
    const status = conc.status(input.taskIds);
    return status;
  }
}
