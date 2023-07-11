import * as THREE from 'three';
import result from '../result.json';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

let group, camera, scene, renderer;

init();
animate();

function RandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.useLegacyLights = false;
    document.body.appendChild( renderer.domElement );

    // camera

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 15, 20, 30 );
    scene.add( camera );

    // controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // ambient light

    scene.add( new THREE.AmbientLight( 0x666666 ) );

    // point light

    const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
    camera.add( light );

    // helper
    scene.add( new THREE.AxesHelper( 20 ) );

    for (let i = 0; i < result.data.length; i++) {
        const points = [];
        const x = result.data[i][0]/200 ;
        const y = result.data[i][1]/200 ;
        const z1 = result.data[i][2]/200 ;
        const z2 = result.data[i][3]/200 ;
        // 将数据保存到 points 中,不要将线和线之间的点连起来
        points.push(new THREE.Vector3(x, 0, y));
        points.push(new THREE.Vector3(x, z2-z1, y));
        // material
        const material = new THREE.LineBasicMaterial( { color: RandomColor() } );
        // geometry
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        scene.add( line );
    }
    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    renderer.render( scene, camera );
}
