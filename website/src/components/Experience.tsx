import { Backdrop, Stage, useGLTF } from '@react-three/drei';

export function Experience() {
  const model = useGLTF('/models/gumball_machine.glb');

  console.log(model.animations);

  const handleClick = (event: any) => {
    console.log(event);
  };

  return (
    <>
      <Stage adjustCamera={true} />
      {/* <primitive
        object={model.scene}
        scale={8}
        position={[0, -2.5, 0]}
        onClick={handleClick}
      /> */}
      {/* <Backdrop
        floor={0.25} // Stretches the floor segment, 0.25 by default
        segments={20} // Mesh-resolution, 20 by default
      >
        <meshStandardMaterial color='#ff80ae' />
      </Backdrop> */}
    </>
  );
}
