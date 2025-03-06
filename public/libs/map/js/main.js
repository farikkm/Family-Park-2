import * as THREE from './three.js'
import * as TWEEN from './tween.js'
import {OrbitControls} from './three.orbit.controll.js'
import {SVGLoader} from './SVGLoader.js'
import {Vector2, Vector3} from "./three.js";
import {TextGeometry} from "./three.textgeometry.js";
import {FontLoader} from "./three.fontloader.js";

export default class {
    _currentFloor

    constructor() {
        this.mouseVector = new Vector2(1, 1);
        this.svgLoader = new SVGLoader();
        this.mapDOMElemnet = document.getElementById('map')
        this.infoLabel = document.getElementById('info')
        this.infoLabelPosition = new THREE.Vector2();
        this.shops = [];
        this.floors = [];
        this._activeShop = null;
        this._currentFloor = undefined;
        this.navigation = false;
        this.navigationObjects = {};
        this.publicRoomIDS = ["WC", "WCW", "WCM", "NW", "NM", "D", "S", "D", "A"]
        this.mainGroup = new THREE.Group();
        this.fontLoader = new FontLoader();
        this.fontLoader.load('three_fonts/font.json', (font) => {
            this.defultFont = font
        });

        this.createRenderer();
        this.readJson();
        this.createCamera();
        this.createScene();

        this.initNavigationButtons();
        // this.createObject();
        this.createObjectsFromSvg(
            [
                {
                    name: '1 Этаж',
                    floorNumber: 1,
                    svgObjectPath: 'src/svg/floor1_objects.svg',
                    svgBackgroundPath: 'src/svg/floor1_background.svg',
                    svgWallPath: 'src/svg/floor1_walls.svg',
                    svgStaticFloorPath: 'src/svg/floor1_static_floor.svg',
                    svgStaticUpPath: 'src/svg/floor1_static_up.svg',
                    svgNavigationPath: ''
                },
                {
                    name: '2 Этаж',
                    floorNumber: 2,
                    svgObjectPath: 'src/svg/floor2_objects.svg',
                    svgBackgroundPath: 'src/svg/floor2_background.svg',
                    svgWallPath: 'src/svg/floor2_walls.svg',
                    svgStaticFloorPath: 'src/svg/floor2_static_floor.svg',
                    svgStaticUpPath: 'src/svg/floor2_static_up.svg',
                    svgNavigationPath: ''
                },
                {
                    name: '3 Этаж',
                    floorNumber: 3,
                    svgObjectPath: 'src/svg/floor3_objects.svg',
                    svgBackgroundPath: 'src/svg/floor3_background.svg',
                    svgWallPath: 'src/svg/floor3_walls.svg',
                    svgStaticFloorPath: 'src/svg/floor3_static_floor.svg',
                    svgStaticUpPath: 'src/svg/floor3_static_up.svg',
                    svgNavigationPath: ''
                },
            ]
        );
        this.createLight();
        this.render();
        this.animated();
    }

    set currentFloor(value) { // external property name
        this._currentFloor = value;
    }

    get currentFloor() {
        return this._currentFloor;
    }

    set activeShop(value) { // external property name
        this._activeShop = value;
    }

    get activeShop() {
        return this._activeShop;
    }

    initNavigationButtons() {
        document.getElementById('reset_button').addEventListener('click', (e) => {
            this.camera.resetCameraPosition()
        })
        document.getElementById('zoom_in').addEventListener('click', (e) => {
            this.controls.zoomOut();
        })
        document.getElementById('zoom_out').addEventListener('click', (e) => {
            this.controls.zoomIn();
        })
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    readJson() {
        fetch('data.json')
            .then(async (response) => {
                this.objectsData = await response.json();
            })
        fetch('shops_data.json')
            .then(async (response) => {
                this.dataInfo = await response.json();
            })
    }

    updateInfoLabelPosition(app) {
        clearTimeout(this.hideTimeout)
        this.infoLabelPosition = this.getCameraPosition(app.activeShop)
        this.infoLabel.className = 'show'
        this.infoLabel.style = `top: ${this.infoLabelPosition.y - 180}px; left: ${this.infoLabelPosition.x - 20}px`
        this.hideTimeout = setTimeout(() => {
            this.infoLabel.className = 'hide'
        }, 5000)
    }

    updateInfoLabelData(mesh) {
        document.getElementById('shop-category').textContent = mesh.infoData['category']
        document.getElementById('shop-name').textContent = mesh.infoData['title']
        document.getElementById('shop-work-time').textContent = mesh.infoData['work-item']
    }

    setActiveShop(mesh, app) {
        if (!mesh.infoData) return 1
        if (app.activeShop) {
            if (mesh.infoData === app.activeShop.infoData) return 1
        }
        this.updateInfoLabelData(mesh)
        this.startActivateShop(mesh)
        if (app.activeShop) {
            this.startDeactivateShop(app.activeShop)
            app.activeShop.isActiveShop = false;
        }
        app.activeShop = mesh
        app.activeShop.isActiveShop = true
        this.updateInfoLabelPosition(app)
    }

    getCameraPosition(mesh) {
        let middle = new THREE.Vector3();
        let geometry = mesh.geometry;
        let screenPos = new THREE.Vector2();

        geometry.computeBoundingBox();

        middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
        middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
        middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

        mesh.localToWorld(middle);
        middle.project(this.camera)

        let width = this.mapDOMElemnet.offsetWidth, height = this.mapDOMElemnet.offsetHeight;
        let widthHalf = width / 2, heightHalf = height / 2;

        screenPos.x = (middle.x * widthHalf) + widthHalf;
        screenPos.y = -(middle.y * heightHalf) + heightHalf;
        return screenPos;
    }

    startActivateShop(mesh) {
        let tween = new TWEEN.Tween({color: mesh.selfColor.clone()})
            .to({color: mesh.activeColor.clone()}, 500)
            .onUpdate((materials) => {
                mesh.material.color = materials.color;
            })
        tween.start()
    }

    startDeactivateShop(mesh) {
        let tween = new TWEEN.Tween({color: mesh.activeColor.clone()})
            .to({color: mesh.selfColor}, 500)
            .onUpdate((materials) => {
                mesh.material.color = materials.color;
            })
        tween.start()
    }

    createActiveObjects(scene, data, floorGroup) {
        const paths = data.paths;
        const group = floorGroup;
        scene.add(group);

        for (let path of paths) {
            const pathId = path.userData.node.id.toString().includes('shop') ? path.userData.node.id.split('-')[1] : '';
            let material = new THREE.MeshStandardMaterial({
                color: 0x25254C,
                opacity: 1,
                transparent: true,
            });
            group.objectsMaterial = material
            let selfMaterial = new THREE.MeshStandardMaterial({
                color: 0x25254C
            });
            let activeMaterial = new THREE.MeshStandardMaterial({
                color: 0xBB2649
            });
            let disabledMaterial = new THREE.MeshStandardMaterial({
                color: 0x777777
            });
            let publicRoomsMaterial = new THREE.MeshStandardMaterial({
                color: 0x222222
            });

            const shapes = SVGLoader.createShapes(path);

            for (let shape of shapes) {

                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 20,
                    bevelEnabled: false
                });
                let mesh = new THREE.Mesh(geometry, material);
                mesh.selfColor = selfMaterial.color;
                mesh.disabled = true;
                if (this.publicRoomIDS.includes(pathId)) {
                    mesh.disabledColor = publicRoomsMaterial.color
                } else {
                    mesh.disabledColor = disabledMaterial.color;
                }
                mesh.activeColor = activeMaterial.color;
                mesh.isShopObj = true;
                mesh.isActiveShop = true;
                mesh.childMeshes = [];
                mesh.name = `floor_${group.floorObj.floorNumber}_${pathId}`;
                mesh.infoData = this.objectsData['objects'][mesh.name];
                mesh.onClickEvent = (event, object) => {

                }
                mesh.onMouseHover = (object) => {

                }
                this.shops.push(mesh)
                group.add(mesh);
                mesh.meshGroup = group

                const textMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    transparent: true
                });
                if (mesh.infoData) {
                    const textGeometry = new TextGeometry(mesh.infoData['name'], {
                        font: this.defultFont,
                        size: 12,
                        height: .1,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: .1,
                        bevelSize: .1,
                        bevelOffset: 0,
                        bevelSegments: 1
                    });
                    let textMesh = new THREE.Mesh(textGeometry, textMaterial);
                    textMesh.selfColor = textMesh.material.color
                    textMesh.onClickEvent = (event, object) => {
                        // console.log(textMesh)
                    }
                    textMesh.onMouseHover = (object) => {
                        // object.material.color.set(0xffff00);
                    }
                    mesh.onMouseHover = (object) => {
                        this.setActiveShop(mesh, this)
                    }
                    mesh.onClickEvent = (object) => {
                        if (mesh.infoData.link) window.open(mesh.infoData.link, '_blank');
                    }
                    mesh.data
                    textMesh.shopMesh = mesh
                    textMesh.scale.x = -1
                    mesh.childMeshes.push(textMesh)
                    group.add(textMesh);
                    mesh.disabled = false;
                } else {
                    mesh.material.color = mesh.disabledColor
                    mesh.onClickEvent = () => {

                    }
                }
            }
        }
    }

    createWallsObjects(scene, data, floorGroup) {
        const paths = data.paths;
        const group = floorGroup;

        for (let path of paths) {
            let material = new THREE.MeshStandardMaterial({
                color: 0x444444,
                transparent: true,
            });

            const shapes = SVGLoader.createShapes(path);

            for (let shape of shapes) {

                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 20,
                    bevelEnabled: false
                });
                let mesh = new THREE.Mesh(geometry, material);
                mesh.onClickEvent = (event, object) => {
                    console.log(mesh)
                }
                mesh.selfColor = material.color
                mesh.onMouseHover = (event, object) => {
                    // console.log(mesh)
                }
                mesh.position.z = .1
                group.add(mesh);

            }

        }
    }

    createStaticFloorObjects(scene, data, floorGroup) {
        const paths = data.paths;
        const group = floorGroup;

        for (let path of paths) {
            let material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
            });

            const shapes = SVGLoader.createShapes(path);

            for (let shape of shapes) {

                const geometry = new THREE.ShapeGeometry(shape);
                let mesh = new THREE.Mesh(geometry, material);
                mesh.onClickEvent = (event, object) => {
                    console.log(mesh)
                }
                mesh.selfColor = material.color
                mesh.onMouseHover = (event, object) => {
                    // console.log(mesh)
                }
                mesh.position.z = .1
                group.add(mesh);

            }

        }
    }

    createStaticUpObjects(scene, data, floorGroup) {
        const paths = data.paths;
        const group = floorGroup;

        for (let path of paths) {
            let material = new THREE.MeshStandardMaterial({
                color: path.color,
                transparent: true,
            });

            const shapes = SVGLoader.createShapes(path);

            for (let shape of shapes) {

                const geometry = new THREE.ShapeGeometry(shape);
                let mesh = new THREE.Mesh(geometry, material);
                mesh.onClickEvent = (event, object) => {
                    console.log(mesh)
                }
                mesh.selfColor = material.color
                mesh.onMouseHover = (event, object) => {
                    // console.log(mesh)
                }
                mesh.position.z = 20.1
                group.add(mesh);

            }

        }
    }

    createBackgroundObjects(scene, data, floorGroup) {
        const paths = data.paths;
        const group = floorGroup;

        for (let path of paths) {
            let material = new THREE.MeshStandardMaterial({
                color: 0x444444,
                transparent: true,
            });

            const shapes = SVGLoader.createShapes(path);

            for (let shape of shapes) {

                const geometry = new THREE.ShapeGeometry(shape);
                let mesh = new THREE.Mesh(geometry, material);
                mesh.onClickEvent = (event, object) => {
                    console.log(mesh)
                }
                mesh.selfColor = material.color
                mesh.onMouseHover = (event, object) => {
                    // console.log(mesh)
                }
                group.add(mesh);

            }

        }
        group.scale.set(-.1, .1, .1)
        group.rotation.x = -1.58
        group.position.z = 30
        group.position.x = 30
    }

    createNavigationObjects(scene, data, floorGroup) {
        const paths = data.paths;
        const group = floorGroup;


        for (let path of paths) {
            const pathId = path.userData.node.id.toString().includes('L') ? path.userData.node.id.split('-')[1] : '';
            let material = new THREE.MeshStandardMaterial({
                color: path.color,
            });
            material.transparent = true
            material.opacity = 0

            const shapes = SVGLoader.createShapes(path);

            for (let shape of shapes) {

                const geometry = new THREE.ShapeGeometry(shape);
                let mesh = new THREE.Mesh(geometry, material);
                this.navigationObjects[pathId] = mesh
                mesh.navId = pathId
                mesh.onClickEvent = (event, object) => {
                    // console.log(mesh)
                }
                mesh.selfColor = path.color
                mesh.onMouseHover = (event, object) => {
                    // console.log(mesh)
                }
                group.add(mesh);

            }

        }
    }

    setGroupOpacity(obj, opacity) {
        obj.children.forEach((child) => {
            this.setGroupOpacity(child, opacity);
        });
        if (obj.material) {
            obj.material.opacity = opacity;
        }
    };

    getFloorGroup(floorObj) {
        let group = new THREE.Group();
        group.visible = false;
        group.floorObj = floorObj
        group.toDown = new TWEEN.Tween({y: 0, opacity: 1})
            .to({y: -30, opacity: 0}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((coords) => {
                group.position.y = coords.y;
                this.setGroupOpacity(group, coords.opacity)
            }).onComplete((coords) => {
                group.visible = false
                this.currentFloor.allFloors.forEach(e => {
                    e.floorButton.removeAttribute('disabled')
                })
            })
        group.toUp = new TWEEN.Tween({y: 0, opacity: 1})
            .to({y: 30, opacity: 0}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((coords) => {
                group.position.y = coords.y;
                this.setGroupOpacity(group, coords.opacity)
            }).onComplete((coords) => {
                group.visible = false
                this.currentFloor.allFloors.forEach(e => {
                    e.floorButton.removeAttribute('disabled')
                })
            })
        group.fromDown = new TWEEN.Tween({y: -30, opacity: 0})
            .to({y: 0, opacity: 1}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((coords) => {
                group.position.y = coords.y;
                this.setGroupOpacity(group, coords.opacity)
            }).onStart((coords) => {
                group.visible = true
                this.currentFloor.allFloors.forEach(e => {
                    e.floorButton.setAttribute('disabled', 'disabled')
                })
            })
        group.fromUp = new TWEEN.Tween({y: 30, opacity: 0})
            .to({y: 0, opacity: 1}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((coords) => {
                group.position.y = coords.y;
                this.setGroupOpacity(group, coords.opacity)

            }).onStart((coords) => {
                group.visible = true

            })
        return group
    }

    createObjectsFromSvg(floorsSVG) {
        let floors = []
        let reload = false;
        const scene = this.scene
        const _app = this
        const buttonsDiv = document.getElementById('floor_buttons')

        for (let floorIndex in floorsSVG) {
            let floorObj = floorsSVG[floorIndex]
            floorObj.meshGroup = this.getFloorGroup(floorObj)
            floorObj.floorIndex = floorIndex;
            floorObj.allFloors = this.floors
            floorObj.floorButton = document.createElement(
                'button'
            )
            floorObj.floorButton.setAttribute('id', `floor_${floorObj.floorIndex}`)
            floorObj.floorButton.textContent = floorObj.name;
            floorObj.floorButton.floorObj = floorObj

            this.svgLoader.load(
                floorObj.svgObjectPath,
                (data) => this.createActiveObjects(scene, data, floorObj.meshGroup),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    reload = true
                    _app.createObjectsFromSvg(floorsSVG)
                }
            );

            this.svgLoader.load(
                floorObj.svgBackgroundPath,
                (data) => this.createBackgroundObjects(scene, data, floorObj.meshGroup),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    reload = true
                    _app.createObjectsFromSvg(floorsSVG)
                }
            );

            this.svgLoader.load(
                floorObj.svgWallPath,
                (data) => this.createWallsObjects(scene, data, floorObj.meshGroup),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    reload = true
                    _app.createObjectsFromSvg(floorsSVG)
                    return 1;
                }
            );

            this.svgLoader.load(
                floorObj.svgStaticFloorPath,
                (data) => this.createStaticFloorObjects(scene, data, floorObj.meshGroup),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    _app.createObjectsFromSvg(floorsSVG)
                    return 1;
                }
            );

            this.svgLoader.load(
                floorObj.svgStaticUpPath,
                (data) => this.createStaticUpObjects(scene, data, floorObj.meshGroup),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    _app.createObjectsFromSvg(floorsSVG)
                    return 1;
                }
            );

            this.svgLoader.load(
                floorObj.svgNavigationPath,
                (data) => this.createNavigationObjects(scene, data, floorObj.meshGroup),
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    _app.createObjectsFromSvg(floorsSVG)
                    console.log('Hi')
                    return 1;
                }
            );
            floors.push(floorObj)
        }
        if (!reload) {
            buttonsDiv.innerHTML = '';
            for (let floor of floors) {
                buttonsDiv.insertBefore(floor.floorButton, buttonsDiv.firstChild);
                floor.floorButton.addEventListener('click', (e) => this.setFloor(e, this))
                this.mainGroup.add(floor.meshGroup);
                this.floors.push(floor);
            }
        }
        this.currentFloor = this.floors[0]
        this.floors[0].meshGroup.visible = true;
        this.floors[0].floorButton.setAttribute('active', 'active')
    }

    setFloor(e, app) {
        const button = e.target
        if (app.currentFloor.floorNumber === button.floorObj.floorNumber) return
        app.currentFloor.allFloors.forEach(e => {
            e.floorButton.setAttribute('disabled', 'disabled')
        })
        app.currentFloor.floorButton.setAttribute('active', '')
        if (app.currentFloor.floorNumber > button.floorObj.floorNumber) {
            app.currentFloor.meshGroup.toUp.start()
            button.floorObj.meshGroup.fromDown.start()
        } else if (app.currentFloor.floorNumber < button.floorObj.floorNumber) {
            app.currentFloor.meshGroup.toDown.start()
            button.floorObj.meshGroup.fromUp.start()
        }
        app.currentFloor = button.floorObj
        button.setAttribute('active', 'active')
    }

    createRenderer() {
        this.renderer = new THREE.WebGL1Renderer();

        document.getElementById('map').appendChild(this.renderer.domElement);
        this.renderer.domElement.setAttribute('class', 'map-canvas col')

        this.renderer.setSize(document.getElementById('map').offsetWidth, document.getElementById('map').offsetHeight)
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setPixelRatio(2)
    }

    onPointerMove(app, event) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        this.mouseVector.setX((event.clientX / document.getElementById('map').offsetWidth) * 2 - 1);
        this.mouseVector.setY(-(event.clientY / document.getElementById('map').offsetHeight) * 2 + 1);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            document.getElementById('map').offsetWidth / document.getElementById('map').offsetHeight,
            1,
            500,
        )


        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.addEventListener('change', () => {
            if (this.activeShop)
                this.updateInfoLabelPosition(this)
        });
        this.controls.enablePan = false;
        this.controls.maxDistance = 90;
        this.controls.minDistance = 40;
        this.controls.maxAzimuthAngle = Math.PI;
        this.controls.minAzimuthAngle = -Math.PI / 2;
        this.controls.maxPolarAngle = Math.PI / 2.5;
        this.controls.minPolarAngle = Math.PI / 20;
        this.camera.position.set(60, 60, 60);
        this.camera.lookAt(0, 10, 0);

        this.controls.update();


        this.camera.resetCameraPosition = () => {
            let animation = new TWEEN.Tween(
                this.camera.position
            )
                .to(new Vector3(60, 60, 60), 500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onStart((coords) => {
                    this.controls.enabled = false;
                })
                .onUpdate((coords) => {
                    this.camera.position.x = coords.x;
                    this.camera.position.y = coords.y;
                    this.camera.position.z = coords.z;
                }).onComplete((coords) => {
                    this.controls.enabled = true;
                })
            animation.start()
        }

        this.raycaster = new THREE.Raycaster();

        window.addEventListener('mousemove', (e) => this.onPointerMove(this, e))
        window.addEventListener('click', (e) => this.objectClick(e))

    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    objectHover() {
        this.raycaster.setFromCamera(this.mouseVector, this.camera)
        this.intersects = this.raycaster.intersectObjects(this.scene.children);

        for (let intersect of this.intersects) {
            if (intersect.object.infoData && intersect.object.parent.visible) {
                intersect.object.onMouseHover(intersect.object);
                break;
            }
        }
    }

    objectClick(e) {
        this.raycaster.setFromCamera(this.mouseVector, this.camera)
        this.intersects = this.raycaster.intersectObjects(this.scene.children);
        for (let intersect of this.intersects) {
            if (intersect.object.isShopObj && intersect.object.parent.visible) {
                intersect.object.onClickEvent(e, intersect.object)
                break
            }
        }
    }

    resizeCanvas() {
        const mapElem = document.getElementById('map')
        this.camera.aspect = document.getElementById('map').offsetWidth / document.getElementById('map').offsetHeight
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(mapElem.offsetWidth, mapElem.offsetHeight)
    }

    createLight() {
        this.light1 = new THREE.DirectionalLight(0xffffff, 1.5)
        this.scene.add(this.light1)
        this.light1.position.set(0, 10, 0)
        this.light2 = new THREE.DirectionalLight(0xffffff, 1)
        this.scene.add(this.light2)
        this.light2.position.set(10, 0, 0)
        this.light3 = new THREE.DirectionalLight(0xffffff, 1)
        this.scene.add(this.light3)
        this.light3.position.set(-10, 0, 0)
        this.light4 = new THREE.DirectionalLight(0xffffff, 1)
        this.scene.add(this.light4)
        this.light4.position.set(0, 0, 10)
        this.light5 = new THREE.DirectionalLight(0xffffff, 1)
        this.scene.add(this.light5)
        this.light5.position.set(0, 0, -10)

    }

    animated(t) {
        TWEEN.update(t)
        this.controls.update();
        this.objectHover();
        this.resizeCanvas();
        this.renderer.render(this.scene, this.camera)
        this.shops.forEach(shopsMesh => {
            shopsMesh.childMeshes.forEach(meshes => {
                meshes.position.set(
                    shopsMesh.geometry.boundingSphere.center.x + (meshes.geometry.boundingSphere.center.x),
                    shopsMesh.geometry.boundingSphere.center.y,
                    21)
            })
        })
        requestAnimationFrame((t) => this.animated(t));
    }
}