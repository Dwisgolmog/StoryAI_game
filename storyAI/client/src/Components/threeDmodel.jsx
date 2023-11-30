import { Environment, OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { useControls } from "leva"
import { useEffect, useState } from "react"

function ThreeDmodel(){

    const model = useGLTF("./model/zrun.glb")
    const animations = useAnimations(model.animations, model.scene)
    const { actionName } = useControls({
        actionName:{
            value: "Armature|mixamo.com|Layer0",
            options: animations.names,
            render: ()=>null
        }
    })

    useEffect(() => {
        const action = animations.actions[actionName];
        if (action) {
            // Check if action exists before using it
            const mixer = animations.mixer;
            action.reset().fadeIn(0.5).play();
    
            return () => {
                action.fadeOut(1);
            };
        } else {
            console.error(`Animation action "${actionName}" not found.`);
        }
    }, [actionName, animations.actions, animations.mixer]);
    

    const [ height, setHeight] = useState(0)

    useEffect(()=>{
        let minY=Infinity, maxY=-Infinity

        model.scene.traverse((item)=>{
            if(item.isMesh){
                const geomBbox= item.geometry.boundingBox
                if(minY> geomBbox.min.y) minY=geomBbox.min.y
                if(maxY<geomBbox.max.y) maxY=geomBbox.max.y
            }
        })

        const h = maxY-minY
        setHeight(h)
        console.log(h)
    }, [model.scene])

    return(
        <>
            {/* <OrbitControls/> */}

            <Environment preset="sunset"/>

            <primitive 
            scale={4}
            position-y={-(height/2)*5} 
            object={model.scene}/>
        </>
    )
}

export default ThreeDmodel