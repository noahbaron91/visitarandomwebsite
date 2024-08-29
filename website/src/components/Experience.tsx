import { useGLTF } from '@react-three/drei';

export function Experience() {
  const model = useGLTF('/models/gumball_machine.glb');

  return (
    <>
      <ambientLight intensity={1} />
      <primitive object={model.scene} scale={30} />
    </>
  );
}
