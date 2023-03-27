import { NodeProps } from "reactflow";
import { GraphNodeProps } from "../../domain";
import { EventNode } from "../../domain/events";
import { JobNode } from "../../domain/jobs";
import { assertUnreachable } from "../../utils";
import { EventCard } from "./EventCard";
import { JobCard } from "./JobCard";
import { WorkflowCard } from "./WorkflowCard";

export function Card(props: NodeProps<GraphNodeProps>) {
  const { data } = props;

  let InternalCard;
  switch (data.type) {
    case "On":
      InternalCard = () => EventCard(props as NodeProps<EventNode>);
      break;
    case "Jobs":
      InternalCard = () => JobCard(props as NodeProps<JobNode>);
      break;
    case "Workflow":
      InternalCard = () => WorkflowCard();
      break;
    default:
      assertUnreachable(data);
  }

  // TODO make selected edge highlight handles as well (might require DOM trickery)
  // FIXME get rid of small line below card header
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{data.type}</h3>
      </div>

      <InternalCard />
    </div>
  );
}
