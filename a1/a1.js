//////////////////////////////////////////////////////////////////
// Assignment 1:  Programing
/////////////////////////////////////////////////////////////////

// SETUP RENDERER AND SCENE
var scene = new THREE.Scene();
var body;
var rider;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff); // white background colour
document.body.appendChild(renderer.domElement);
console.log("che");

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(-8, 3, 10);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

////////////////////////////////////////////////////////////////////////////////
//  loadOBJ( ):  loads OBJ file vertex mesh, with vertex normals
////////////////////////////////////////////////////////////////////////////////

function loadOBJ(objName, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
    var onProgress = function(query) {
        if (query.lengthComputable) {
            var percentComplete = query.loaded / query.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function() {
        console.log('Failed to load ' + file);
    };
    var loader = new THREE.OBJLoader();
    loader.load(file, function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        object.position.set(xOff,yOff,zOff);
        object.rotation.x = xRot;
        object.rotation.y = yRot;
        object.rotation.z = zRot;
        object.scale.set(scale,scale,scale);
        object.name = objName;
        scene.add(object);
    }, onProgress, onError);
}

////////////////////////////////////////////////////////////////////////////////////
//   resize( ):  adjust camera parameters if the window is resized
////////////////////////////////////////////////////////////////////////////////////

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

////////////////////////////////////////////////////////////////////////////////////
//   create the needed objects
////////////////////////////////////////////////////////////////////////////////////

  // FLOOR WITH CHECKERBOARD

var floorTexture = new THREE.ImageUtils.loadTexture('images/grass.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
// floorTexture.repeat.set(4, 4);
floorTexture.repeat.set(1, 1);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(20, 20);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

  // LIGHTS:  needed for phong illumination model

var light = new THREE.PointLight(0xFFFFFF);
light.position.x = -70;
light.position.y = 100;
light.position.z = 70;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

  // MATERIALS

var brownMaterial = new THREE.MeshPhongMaterial( {
     ambient: 0x402020, color: 0x806060, specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });
var whiteMaterial = new THREE.MeshPhongMaterial( {
     ambient: 0x404040, color: 0x808080, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading });
var normalMaterial = new THREE.MeshNormalMaterial();

  // Sphere

var sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
var whiteSphere = new THREE.Mesh( sphereGeometry, whiteMaterial );
scene.add( whiteSphere );
whiteSphere.position.set(3,1,0);

////////////////////////////////////////////////////////////////////////////////////
//   top legs
////////////////////////////////////////////////////////////////////////////////////

var TLength = 0.4
// var topGeometry = new THREE.BoxGeometry( 0.1, TLength, 0.1 );
var topGeometry = new THREE.CylinderGeometry( 0.12, 0.1, TLength, 32 );

    // Front left top leg

var FLT = new THREE.Mesh( topGeometry, normalMaterial );
var FLTAngle = 15;       // animation parameter

scene.add( FLT );
FLT.matrixAutoUpdate = false;

    // Front right top

var FRT = new THREE.Mesh( topGeometry, normalMaterial );
var FRTAngle = 15;       // animation parameter
scene.add( FRT );
FRT.matrixAutoUpdate = false;

    // Back left top

var BLT = new THREE.Mesh( topGeometry, normalMaterial );
var BLTAngle = 15;       // animation parameter
scene.add( BLT );
BLT.matrixAutoUpdate = false;

    // Back right top

var BRT = new THREE.Mesh( topGeometry, normalMaterial );
var BRTAngle = 15;       // animation parameter
scene.add( BRT );
BRT.matrixAutoUpdate = false;

////////////////////////////////////////////////////////////////////////////////////
//   mid legs
////////////////////////////////////////////////////////////////////////////////////

var MLength = 0.4
var midGeometry = new THREE.CylinderGeometry( 0.08, 0.06, MLength, 32 );

    // Front left mid leg

var FLM = new THREE.Mesh( midGeometry, normalMaterial );
var FLMAngle = -10;       // animation parameter
scene.add( FLM );
FLM.matrixAutoUpdate = false;

    // Front right mid

var FRM = new THREE.Mesh( midGeometry, normalMaterial );
var FRMAngle = -10;       // animation parameter
scene.add( FRM );
FRM.matrixAutoUpdate = false;

    // Back left mid

var BLM = new THREE.Mesh( midGeometry, normalMaterial );
var BLMAngle = -10;       // animation parameter
scene.add( BLM );
BLM.matrixAutoUpdate = false;

    // Back right mid

var BRM = new THREE.Mesh( midGeometry, normalMaterial );
var BRMAngle = -10;       // animation parameter
scene.add( BRM );
BRM.matrixAutoUpdate = false;

////////////////////////////////////////////////////////////////////////////////////
//   bottom legs
////////////////////////////////////////////////////////////////////////////////////

var BLength = 0.1
var botGeometry = new THREE.CylinderGeometry( 0.08, 0.1, BLength, 32 );

    // Front left bottom leg

var FLB = new THREE.Mesh( botGeometry, normalMaterial );
var FLBAngle = 0;       // animation parameter
scene.add( FLB );
FLB.matrixAutoUpdate = false;

    // Front right bottom

var FRB = new THREE.Mesh( botGeometry, normalMaterial );
var FRBAngle = 0;       // animation parameter
scene.add( FRB );
FRB.matrixAutoUpdate = false;

    // Back left bottom

var BLB = new THREE.Mesh( botGeometry, normalMaterial );
var BLBAngle = 0;       // animation parameter
scene.add( BLB );
BLB.matrixAutoUpdate = false;

    // Back right bottom

var BRB = new THREE.Mesh( botGeometry, normalMaterial );
var BRBAngle = 0;       // animation parameter
scene.add( BRB );
BRB.matrixAutoUpdate = false;

////////////////////////////////////////////////////////////////////////////////////
//   shoulder, arm and weapon
////////////////////////////////////////////////////////////////////////////////////

var shoGeometry = new THREE.SphereGeometry( 0.13, 32, 32 );
var LS = new THREE.Mesh( shoGeometry, normalMaterial );
var RS = new THREE.Mesh( shoGeometry, normalMaterial );
scene.add(LS);
scene.add(RS);
LS.matrixAutoUpdate = false;
RS.matrixAutoUpdate = false;

var armGeometry = new THREE.CylinderGeometry( 0.08, 0.1, 0.5, 32 );
var LA = new THREE.Mesh( armGeometry, normalMaterial );
var RA = new THREE.Mesh( armGeometry, normalMaterial );
scene.add(LA);
scene.add(RA);
LA.matrixAutoUpdate = false;
RA.matrixAutoUpdate = false;

var wea1Geometry = new THREE.CylinderGeometry( 0.000001, 0.1, 1, 32 );
var wea2Geometry = new THREE.CylinderGeometry( 0.000001, 0.7, 0.2, 32 );
var W1 = new THREE.Mesh( wea1Geometry, normalMaterial );
var W2 = new THREE.Mesh( wea2Geometry, normalMaterial );
scene.add(W1);
scene.add(W2);
W1.matrixAutoUpdate = false;
W2.matrixAutoUpdate = false;

  // Body

loadOBJ('body','centaur/cent_no_legs_no_arms.obj',normalMaterial,1,0,0,0,0,0,0);
loadOBJ('rider','armadillo/armadillo.obj',brownMaterial,1,0,0,0,0,0,0);

//////////////////////////////////////////////////////////////////
// printMatrix():  prints a matrix
//////////////////////////////////////////////////////////////////

function printMatrix(name,matrix) { // matrices are stored column-major, although matrix.set() uses row-major
    console.log('Matrix ',name);
    var e = matrix.elements;
    console.log(e[0], e[4], e[8], e[12]);
    console.log(e[1], e[5], e[9], e[13]);
    console.log(e[2], e[6], e[10], e[14]);
    console.log(e[3], e[7], e[11], e[15]);
}

//////////////////////////////////////////////////////////////////
// change camera's perspective
//////////////////////////////////////////////////////////////////

var BLBMatrix = new THREE.Matrix4();
var FRBMatrix = new THREE.Matrix4();

//////////////////////////////////////////////////////////////////
// setupBody():  build model Matrix for body, and then its children
//////////////////////////////////////////////////////////////////

var bodyHeight = 0;
var BAngle = 0;
function setupBody(parentMatrix, bodyAngle) {
    body.matrix.copy(parentMatrix);     // copy the parent link transformation
    body.matrix.multiply(new THREE.Matrix4().makeTranslation(0, bodyHeight, 0));        // post multiply by translate matrix
    body.matrix.multiply(new THREE.Matrix4().makeRotationX(-3.0 * Math.PI / 180.0));      // post multiply by rotation matrix (3 deg rotation)
    body.matrix.multiply(new THREE.Matrix4().makeRotationX(BAngle * Math.PI / 180.0));

    BLBMatrix.copy(body.matrix);
    FRBMatrix.copy(body.matrix);

    setupRider(body.matrix);
    setupArm(body.matrix, LA, -0.45, 1.5, 0.3, 150, LS, -0.3, 1.75, 0.3, W1, -0.7, 0.8, -1, 90);
    setupArm(body.matrix, RA, 0.45, 1.5, 0.3, -150, RS, 0.3, 1.75, 0.3, W2, 0.7, 0.8, -1, 90);

    setupTop(body.matrix, FLT, FLTAngle, 0.2, 0.8, 0.4, FLM, FLMAngle, 0, -0.1, 0, FLB, FLBAngle, 0, -0.2, 0.01);
    setupTop(body.matrix, FRT, FRTAngle, -0.2, 0.8, 0.4, FRM, FRMAngle, 0, -0.1, 0, FRB, FRBAngle, 0, -0.2, 0.01);
    setupTop(body.matrix, BLT, BLTAngle, 0.15, 0.83, -0.3, BLM, BLMAngle, 0, -0.1, 0, BLB, BLBAngle, 0, -0.2, 0.01);
    setupTop(body.matrix, BRT, BRTAngle, -0.15, 0.83, -0.3, BRM, BRMAngle, 0, -0.1, 0, BRB, BRBAngle, 0, -0.2, 0.01);
    // body.matrix.multiply(new THREE.Matrix4().makeScale(0.3,0.3,0.3));   // post multiply by scale matrix, to scale down body geometry
    body.matrix.multiply(new THREE.Matrix4().makeScale(0.07, 0.07, 0.07));   // post multiply by scale matrix, to scale down body geometry
    BLBMatrix.multiply(new THREE.Matrix4().makeScale(0.07, 0.07, 0.07));
    FRBMatrix.multiply(new THREE.Matrix4().makeScale(0.07, 0.07, 0.07));
    body.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupRider(parentMatrix) {
    rider.matrix.copy(parentMatrix);     // copy the parent link transformation
    rider.matrix.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
    rider.matrix.multiply(new THREE.Matrix4().makeRotationX(20 * Math.PI / 180.0));
    rider.matrix.multiply(new THREE.Matrix4().makeScale(0.4, 0.4, 0.4));
    rider.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 3, -0.8));
    //rider.matrix.multiply(new THREE.Matrix4().makeTranslation(txt,tyt,tzt));
}

//////////////////////////////////////////////////////////////////
// setupHead():  build model Matrix for head
//////////////////////////////////////////////////////////////////

function setupTop(parentMatrix, topLeg, topAngle, txt, tyt, tzt, midLeg, midAngle, txm, tym, tzm, botLeg, botAngle, txb, tyb, tzb) {
    //  printMatrix("leg parent",parentMatrix);
    topLeg.matrix.copy(parentMatrix);     // copy the parent link transformation
    topLeg.matrix.multiply(new THREE.Matrix4().makeTranslation(txt, tyt, tzt));              // post multiply by translate matrix
    topLeg.matrix.multiply(new THREE.Matrix4().makeRotationX(topAngle * Math.PI / 180.0));           // post multiply by rotation matrix
    topLeg.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.5 * TLength, 0));              // post multiply by translate matrix
    if (topLeg == BLT) {
        BLBMatrix.multiply(topLeg.matrix);
    }
    if (topLeg == FRT) {
        FRBMatrix.multiply(topLeg.matrix);
    }
    setupMid(topLeg.matrix, midLeg, midAngle, txm, tym, tzm, botLeg, botAngle, txb, tyb, tzb)
    topLeg.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupMid(parentMatrix, midLeg, midAngle, txm, tym, tzm, botLeg, botAngle, txb, tyb, tzb) {
    midLeg.matrix.copy(parentMatrix);     // copy the parent link transformation
    midLeg.matrix.multiply(new THREE.Matrix4().makeTranslation(txm,tym,tzm));              // post multiply by translate matrix
    midLeg.matrix.multiply(new THREE.Matrix4().makeRotationX(midAngle*Math.PI/180.0));           // post multiply by rotation matrix
    midLeg.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*TLength,0));              // post multiply by translate matrix

    setupBottom(midLeg.matrix, botLeg, botAngle, txb, tyb, tzb)
    midLeg.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupBottom(parentMatrix, botLeg, botAngle, txb, tyb, tzb) {
    botLeg.matrix.copy(parentMatrix);     // copy the parent link transformation
    botLeg.matrix.multiply(new THREE.Matrix4().makeTranslation(txb,tyb,tzb));              // post multiply by translate matrix
    botLeg.matrix.multiply(new THREE.Matrix4().makeRotationX(botAngle*Math.PI/180.0));           // post multiply by rotation matrix
    botLeg.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*BLength,0));              // post multiply by translate matrix
    botLeg.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupArm(parentMatrix, arm, txa, tya, tza, armAngle, sho, txs, tys, tzs, weapon, txw, tyw, tzw, weaponAngle) {
    arm.matrix.copy(parentMatrix)
    arm.matrix.multiply(new THREE.Matrix4().makeTranslation(txa,tya,tza));              // post multiply by translate matrix
    arm.matrix.multiply(new THREE.Matrix4().makeRotationZ(armAngle*Math.PI/180.0));

    sho.matrix.copy(parentMatrix);
    sho.matrix.multiply(new THREE.Matrix4().makeTranslation(txs,tys,tzs));

    weapon.matrix.copy(parentMatrix);
    weapon.matrix.multiply(new THREE.Matrix4().makeRotationX(weaponAngle*Math.PI/180.0));
    weapon.matrix.multiply(new THREE.Matrix4().makeTranslation(txw,tyw,tzw));

}

//////////////////////////////////////////////////////////////////
// updateWorld():  update all degrees of freedom, as needed, and recompute matrices
//////////////////////////////////////////////////////////////////

var clock = new THREE.Clock(true);

var modelMatrix = new THREE.Matrix4();
modelMatrix.identity();

function updateWorld() {
    // only start the matrix setup if the 'body' object has been loaded
    if (body != undefined && rider != undefined) {
        setupBody(modelMatrix, BAngle);
    }
}

//////////////////////////////////////////////////////////////////
//  checkKeyboard():   listen for keyboard presses
//////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
var mode = 0;
var dir = 0;
var reset = 0;

function checkKeyboard() {
    body = scene.getObjectByName( 'body' );
    rider = scene.getObjectByName( 'rider' );

    // var x = new THREE.Vector3( 1, 0, 0 );
    if (body != undefined) {
        body.matrixAutoUpdate = false;
    }
    if (rider != undefined) {
        rider.matrixAutoUpdate = false;
    }
    for (var i = 0; i < 6; i++) {
        if (keyboard.pressed(i.toString())) {
            if (i == 0) {
                modelMatrix.identity();
            }
            if (i == 3) {
                modelMatrix.identity();
            }
            if (i != 4) {
                camera.position.set(-8, 3, 10);
                camera.lookAt(scene.position);
            }
            mode = i;
            console.log(i.toString());
            break;

         }
    }
    switch(mode) {
    //add poses here:
    case 0:       // pose
        headAngle = 0;
        BAngle = -3;
        bodyHeight = 0;
        FLTAngle = FRTAngle = BLTAngle = BRTAngle = 15;
        FLMAngle = FRMAngle = BLMAngle = BRMAngle = -10;
        FLBAngle = FRBAngle = BLBAngle = BRBAngle = 0;
        //console.log(scene.position);
        break;
    case 1:       // pose hind legs raised
        headAngle = -20;
        bodyHeight = 0.14;
        BAngle = 20;
        FLTAngle = FRTAngle = -40;
        FLMAngle = FRMAngle = 25;
        FLBAngle = FRBAngle = -3;
        BLTAngle = BRTAngle = 30;
        BLMAngle = BRMAngle = 30;
        BLBAngle = BRBAngle = 10;
        break;
    case 2:      // pose front legs raised
        headAngle = 30;
        bodyHeight = 0.1;
        BAngle = -20;
        BLTAngle = BRTAngle = -15;
        BLMAngle = BRMAngle = 40;
        FLTAngle = FRTAngle = -50;
        FLMAngle = FRMAngle = 50;
        FLBAngle = FRBAngle = 30;
        BLBAngle = BRBAngle = 0;
        break;
    case 3:      // animation
        BAngle = -3;
        var t = clock.getElapsedTime();
        modelMatrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.01));

        bodyHeight = 0.3 * Math.sin(6 * t);
        FLTAngle = 30 * Math.sin(6 * t) - 20;
        FLMAngle = 30 * Math.sin(8 * t) + 30;
        FLBAngle = 30 * Math.sin(10 * t) + 30;

        FRTAngle = 30 * Math.sin(6 * t + Math.PI / 4) - 20;
        FRMAngle = 30 * Math.sin(8 * t) + 30;
        FRBAngle = 30 * Math.sin(10 * t ) + 30;

        BRTAngle = 30 * Math.sin(6 * t + Math.PI / 2) - 20;
        BRMAngle = 30 * Math.sin(8 * t ) + 30;
        BRBAngle = 30 * Math.sin(10 * t) + 30;

        BLTAngle = 30 * Math.sin(6 * t + 3 * Math.PI / 4) - 20;
        BLMAngle = 30 * Math.sin(8 * t ) + 30;
        BLBAngle = 30 * Math.sin(10 * t) + 30;

        camera.matrixAutoUpdate = true;
        break;
    case 4:  // camera moves with left hind leg and looks at front right leg
        BAngle = -3;
        var t = clock.getElapsedTime();

        // legAngle = 30*Math.sin(6*t)+10;
        bodyHeight = 0.3 * Math.sin(6 * t);
        FLTAngle = 30 * Math.sin(6 * t) - 20;
        FLMAngle = 30 * Math.sin(8 * t) + 30;
        FLBAngle = 30 * Math.sin(10 * t) + 30;

        FRTAngle = 30 * Math.sin(6 * t + Math.PI / 4) - 20;
        FRMAngle = 30 * Math.sin(8 * t) + 30;
        FRBAngle = 30 * Math.sin(10 * t) + 30;

        BRTAngle = 30 * Math.sin(6 * t + Math.PI / 2) - 20;
        BRMAngle = 30 * Math.sin(8 * t) + 30;
        BRBAngle = 30 * Math.sin(10 * t) + 30;

        BLTAngle = 30 * Math.sin(6 * t + 3 * Math.PI / 4) - 20;
        BLMAngle = 30 * Math.sin(8 * t) + 30;
        BLBAngle = 30 * Math.sin(10 * t) + 30;
        var camPos = new THREE.Vector3(0, 0, 0).applyMatrix4(BLBMatrix);
        camera.position.set(camPos.x, camPos.y, camPos.z);
        var lookAtPos = new THREE.Vector3(0, 0, 0).applyMatrix4(FRBMatrix);//.applyMatrix4(new THREE.matrix4().translate();
        camera.lookAt(lookAtPos);

        // controls.damping = 0.2;
        break;
    case 5:
        if (keyboard.pressed("W")) {
            console.log('W pressed');
            var newDir = 2;
            switch ((dir - newDir + 4) % 4) {
            case 1:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2));
                break;
            case 2:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), Math.PI));
                break;
            case 3:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 0, 1, 0 ), Math.PI / 2));
                break;
            }
            modelMatrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.1));
            dir = newDir;
        }
        if (keyboard.pressed("S")) {
            console.log('S pressed');
            // modelMatrix.multiply(zPos);
            var newDir = 0;
            switch ((dir - newDir + 4) % 4) {
            case 1:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2));
                break;
            case 2:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), Math.PI));
                break;
            case 3:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2));
                break;
            }
            modelMatrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.1));
            dir = newDir;
        }
        if (keyboard.pressed("A")) {
            console.log('A pressed');
            // modelMatrix.multiply(xNeg);
            var newDir = 3;
            switch ((dir - newDir + 4) % 4) {
            case 1:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), -Math.PI/2 ));
                break;
            case 2:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), Math.PI ));
                break;
            case 3:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), Math.PI/2 ));
                break;
            }
            modelMatrix.multiply(new THREE.Matrix4().makeTranslation ( 0, 0, 0.1 ));
            dir = newDir;
        }
        if (keyboard.pressed("D")) {
            console.log('D pressed');
            // modelMatrix.multiply(xPos);
            var newDir = 1;
            switch ((dir - newDir + 4) % 4) {
            case 1:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2));
                break;
            case 2:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), Math.PI));
                break;
            case 3:
                modelMatrix.multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2));
                break;
            }
            modelMatrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.1));
            dir = newDir;

        }
        BAngle = -3;
        var t = clock.getElapsedTime();
        bodyHeight = 0.3 * Math.sin(6 * t);
        FLTAngle = 30 * Math.sin(6 * t) - 20;
        FLMAngle = 30 * Math.sin(8 * t) + 30;
        FLBAngle = 30 * Math.sin(10 * t) + 30;

        FRTAngle = 30 * Math.sin(6 * t + Math.PI / 4) - 20;
        FRMAngle = 30 * Math.sin(8 * t) + 30;
        FRBAngle = 30 * Math.sin(10 * t) + 30;

        BRTAngle = 30 * Math.sin(6 * t + Math.PI / 2) - 20;
        BRMAngle = 30 * Math.sin(8 * t) + 30;
        BRBAngle = 30 * Math.sin(10 * t) + 30;

        BLTAngle = 30 * Math.sin(6 * t + 3 * Math.PI / 4) - 20;
        BLMAngle = 30 * Math.sin(8 * t) + 30;
        BLBAngle = 30 * Math.sin(10 * t) + 30;
        default:
        break;
    }
}

//////////////////////////////////////////////////////////////////
//  update()
//////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  renderer.render(scene, camera);
  updateWorld();
  requestAnimationFrame(update);     // this requests the next update call
}

update();     // launch an infinite drawing loop
