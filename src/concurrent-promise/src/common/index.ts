import { Client, InvokableModules } from "@web3api/core-js";

class Task {
  uri: string;
  module: InvokableModules;
  method: string;
  input: ArrayBuffer;
}

enum Status {
  RUNNING,
  COMPLETED,
  FAILED,
}

enum ReturnWhen {
  FIRST_COMPLETED,
  ANY_COMPLETED,
  ALL_COMPLETED,
}

type Result = {
  taskId: number;
  result: Uint8Array | undefined;
  error: string | undefined;
  status: number;
};

class Concurrent {
  private _totalTasks: number = 0;
  private _tasks: Record<number, Promise<unknown>> = {};
  private _status: Record<number, Status> = {};
  constructor(private _client: Client) {}

  schedule(task: Task): number {
    this._tasks[this._totalTasks] = this._client.invoke(task);
    this._status[this._totalTasks] = Status.RUNNING;
    return this._totalTasks++;
  }

  private resolveTask(taskId: number): Promise<Result> {
    return this._tasks[taskId]
      .then((result) => {
        this._status[taskId] = Status.COMPLETED;
        return {
          taskId: taskId,
          result: result as Uint8Array,
          error: undefined,
          status: Status.COMPLETED,
        };
      })
      .catch((err) => {
        this._status[taskId] = Status.FAILED;
        return {
          taskId: taskId,
          result: undefined,
          error: err.message as string,
          status: Status.FAILED,
        };
      });
  }

  async result(taskIds: number[], returnWhen: ReturnWhen): Promise<Result[]> {
    switch (returnWhen) {
      case ReturnWhen.FIRST_COMPLETED: {
        const res = await Promise.race(
          taskIds.map((id) => this.resolveTask(id))
        );
        return [res];
      }
      case ReturnWhen.ANY_COMPLETED: {
        const res = await Promise.any(
          taskIds.map((id) => this.resolveTask(id))
        );
        return [res];
      }
      case ReturnWhen.ALL_COMPLETED: {
        const res = await Promise.all(
          taskIds.map((id) => this.resolveTask(id))
        );
        return res;
      }
    }
  }

  status(taskIds: number[]): number[] {
    return taskIds.map((id) => this._status[id]);
  }
}


let _concurrent: Concurrent | undefined;

export function concurrent(client: Client): Concurrent {
  if (!_concurrent) { 
    _concurrent = new Concurrent(client);
    return _concurrent;
  }
  return _concurrent;
}