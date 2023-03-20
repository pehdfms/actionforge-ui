import { NodeProps } from "reactflow";
import { GraphNodeProps } from "../domain";
import { Event } from "../domain/events";
import { Job } from "../domain/jobs";
import { assertUnreachable } from "../utils";
import { EventCard } from "./cards/EventCard";
import { JobCard } from "./cards/JobCard";

export function Card(props: NodeProps<GraphNodeProps>) {
  const { data } = props;

  let InternalCard;
  switch (data.type) {
    case "On":
      InternalCard = () => EventCard(props as NodeProps<Event>);
      break;
    case "Jobs":
      InternalCard = () => JobCard(props as NodeProps<Job>);
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
