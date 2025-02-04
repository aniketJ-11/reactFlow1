import { Node } from "reactflow";

const nodeCount = 10;
const nodeRadius = 50;
const maxX = 1000;
const maxY = 500;
const maxAttempts = 100;

const getRandomPosition = (existingNodes: Node[]) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const newX = Math.random() * (maxX - nodeRadius * 2);
    const newY = Math.random() * (maxY - nodeRadius * 2);

    const isOverlapping = existingNodes.some((node) => {
      const dx = node.position.x - newX;
      const dy = node.position.y - newY;
      return Math.sqrt(dx * dx + dy * dy) < nodeRadius * 2;
    });

    if (!isOverlapping) {
      return { x: newX, y: newY };
    }
  }

  return { x: Math.random() * maxX, y: Math.random() * maxY };
};

export const initialNodes: Node[] = [];

for (let i = 0; i < nodeCount; i++) {
  const position = getRandomPosition(initialNodes);
  initialNodes.push({
    id: (i + 1).toString(),
    position,
    data: { label: `Node ${i + 1}`, color: "#68F59D", fontSize: 14 },
  });
}
