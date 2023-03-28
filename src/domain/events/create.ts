import { Trigger } from "./trigger";

export class CreateEvent extends Trigger {
  filters: undefined;
  types: undefined;

  constructor() {
    super("create");
  }
}
