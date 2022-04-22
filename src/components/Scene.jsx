import React, {useEffect, useRef} from 'react';
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {Object3D} from "three";

const Scene = () => {


    const mountRef = useRef(null);

    useEffect(() => {

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer({ alpha: true});

        renderer.setSize( window.innerWidth, window.innerHeight );
        mountRef.current.appendChild( renderer.domElement );

        var geometry = new THREE.BoxGeometry( 3, 3, 3 );
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );

        var cube = new THREE.Mesh( geometry, material );

        // scene.add( cube );

        let lights = [];

        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1.2, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1.2, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 2, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 400, 400, 200 );
        lights[ 2 ].position.set( - 400, - 400, - 200 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );

        const loader = new GLTFLoader();

        function render() {

            renderer.render( scene, camera );

        }

        let carLoad = loader.load('models/scene.gltf', function ( gltf ) {
                gltf.scene.name = 'Lowpoly car';
                gltf.scene.rotation.set(0,-1,0);
                gltf.scene.position.set(0,-1,0);
                gltf.scene.scale.set(0.01, 0.01, 0.01);
                scene.add( gltf.scene );
                render()
            }
        )

        camera.position.z = 5;

        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        }

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set( 0, 0, - 0.2 );
        controls.update();

        window.addEventListener("resize", onWindowResize, false);

        animate();
        console.log(scene.children);

        return () => mountRef.current.removeChild( renderer.domElement);
    }, []);


    return (
        <div ref={mountRef} className='icanchangeyou'>

        </div>
    );
};

export default Scene;
