import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";
import { GraphNode } from "../domain";
import { Card } from "./cards";
import { GraphName } from "./GraphName";
import { YamlPreview } from "./YamlPreview";

const initialNodes: GraphNode[] = [
  {
    id: "0",
    position: { x: 50, y: 0 },
    data: { type: "Workflow" },
    type: "card",
  },
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {
      type: "On",
      triggers: [
        {
          name: "Push",
          filters: {
            branches: [],
            tags: [],
            "branches-ignore": [],
            "tags-ignore": [],
          },
        },
      ],
    },
    type: "card",
  },
  {
    id: "2",
    position: { x: 500, y: 500 },
    data: { type: "Jobs" },
    type: "card",
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState("name");

  const nodeTypes = useMemo(
    () => ({
      card: Card,
    }),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // TODO make separate GraphControls component
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={{ hideAttribution: true }}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      className="graph"
    >
      <Panel position="top-left">
        <GraphName name={name} onNameChange={setName} />
        <YamlPreview nodes={nodes} edges={edges} />
      </Panel>
      <Controls />
    </ReactFlow>
  );
}
