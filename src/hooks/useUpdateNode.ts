import produce from "immer";
import { useReactFlow, Node } from "reactflow";

export function useUpdateNode<T>(id: string) {
  const { setNodes } = useReactFlow();

  return (updateFunction: (node: Node<T>) => void) => {
    setNodes((nodes) =>
      produce(nodes, (draftNodes) => {
        const node = draftNodes.find((node) => node.id === id);
        if (node) {
          updateFunction(node);
        }
      })
    );
  };
}

export type updateNodeFunctionType<T> = ReturnType<typeof useUpdateNode<T>>;
