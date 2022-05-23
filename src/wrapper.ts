// import { Interface, Input_someMethod, Task, serializeInput_someMethod, Output_someMethod } from "./w3";
// // use capabilities to enable this

// class Concurrent {
//   constructor(
//     private readonly configs: {
//       maxWorkers: number;
//       executorType: "promise" | "thread" | "process";
//     }
//   ) {}

//   schedule(tasks: Task[]): string[] {
//     // call the executor to schedule the tasks
//     return [];
//   }
  
  
// }

// // namespace.namespace.function
// Interface.someMethod.encode = (Input_someMethod): Task => {
//   return {
//     uri: this.uri,
//     module: "query",
//     method: "someMethod",
//     input: serializeInput_someMethod(Input_someMethod)
//   }
// }

// Interface.someMethod.decode = (ArrayBuffer): Output_someMethod => {
//   return deserializeOutput_someMethod(ArrayBuffer);`
// }

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

class Concurrent {
  private _totalTasks: number = 0;
  private _tasks: Record<number, Promise<unknown>> = {};
  constructor() {}

  async schedule(): Promise<number[]> {
    this._tasks[this._totalTasks] = sleep(5000);
    return [this._totalTasks++];
  }

  async result(taskIds: number[]) {
    await Promise.all(Object.values(this._tasks));
  }
}

(async () => {
  const c = new Concurrent()
  const res = await c.schedule()
  console.log(res)
  const res2 = await c.result(res)
  console.log(res2)
})();
