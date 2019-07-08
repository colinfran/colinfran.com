import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from 'orbit-controls-es6';

const style = {
  height: (window.innerWidth > 767 && window.innerWidth < 900) ? 200:275 // we can control scene size by setting container dimensions
};

export default class Animation extends Component {
  componentDidMount() {
    this.sceneSetup(this.props);
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = (prop) => {
    // get container dimensions and use them for scene sizing
    var width = 275;
    var height = 275;
    if (window.innerWidth > 767 && window.innerWidth < 900){
      width = 200;
      height = 200;
    }
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      25, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.controls.enableZoom = false;
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor (0x000000, 0);
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    var randomNum = Math.floor(Math.random() * 5);
    var geometry;
    var material;
    switch(randomNum) {
      case 0:
        geometry = new THREE.BoxGeometry(1,1,1);
        material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide
        });
        break;
      case 1:
        geometry = new THREE.IcosahedronGeometry();
        material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide
        });
        break;
      case 2:
        geometry = new THREE.OctahedronGeometry();
        material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide
        });
        break;
      case 4:
        geometry = new THREE.TetrahedronGeometry();
        material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide
        });
        break;
      default:
        geometry = new THREE.DodecahedronGeometry();
        material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide
        });

    }
    console.log(geometry);
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    var width = 275;
    var height = 275;
    if (window.innerWidth > 767 && window.innerWidth < 900){
      width = 200;
      height = 200;
    }

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}
