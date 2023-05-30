const firebaseConfig = {
  apiKey: "AIzaSyAN7DISk8z2Le6hi0DpD_6cnGTEvK92uIk",
  authDomain: "autismooficial-96934.firebaseapp.com",
  projectId: "autismooficial-96934",
  storageBucket: "autismooficial-96934.appspot.com",
  messagingSenderId: "1042009560361",
  appId: "1:1042009560361:web:c04cbe1c3135869d235338",
  measurementId: "G-B13JGTZDLD"
};
firebase.initializeApp(firebaseConfig);
const watermark = atob(
  "U2VlZFByb2dyYW1taW5nIGJ5OiBJemFpIEFsZWphbmRybyBaYWxsZXM="
);
const auth = firebase.auth();
const db = firebase.firestore();
const app = document.getElementById("app");
function showHomeScreen() {
  app.innerHTML = `
    <div class="container">
      <button id="loginButton">Iniciar sesión</button>
      <button id="registerButton">Registrarse</button>
    </div>
  `;

  document
    .getElementById("loginButton")
    .addEventListener("click", showLoginScreen);
  document
    .getElementById("registerButton")
    .addEventListener("click", showRegisterScreen);
}

function showLoginScreen() {
  app.innerHTML = `
    <div class="container">
      <h2>Iniciar sesión</h2>
      <input type="email" id="email" placeholder="Correo electrónico">
      <input type="password" id="password" placeholder="Contraseña">
      <label for="stayLoggedIn">
        <input type="checkbox" id="stayLoggedIn"> Mantener sesión iniciada
      </label>
      <button id="login">Iniciar sesión</button>
      <button id="back">Retroceder</button>
    </div>
  `;

  document.getElementById("login").addEventListener("click", loginUser);
  document.getElementById("back").addEventListener("click", showHomeScreen);
}

function showRegisterScreen() {
  app.innerHTML = `
    <div class="container">
      <h2>Registrarse</h2>
      <input type="text" id="firstName" placeholder="Nombre">
      <input type="text" id="lastName" placeholder="Apellido">
      <input type="number" id="age" placeholder="Edad" min="1">
      <select id="gender">
        <option value="" selected disabled>Género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="other">Otro</option>
      </select>
      <input type="email" id="email" placeholder="Correo electrónico">
      <input type="password" id="password" placeholder="Contraseña">
      <input type="password" id="confirmPassword" placeholder="Confirmar contraseña">
      <label for="stayLoggedIn">
        <input type="checkbox" id="stayLoggedIn"> Mantener sesión iniciada
      </label>
      <button id="register">Registrarse</button>
      <button id="back">Retroceder</button>
    </div>
  `;

  document.getElementById("register").addEventListener("click", registerUser);
  document.getElementById("back").addEventListener("click", showHomeScreen);
}

function showCharacterSelectionScreen() {
  app.innerHTML = `
    <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="texto">
    <h1>Selecciona tu personaje</h1>
    </div>
    
  <div class="button-container">

    <button class="image-btn"id="anaButton">
      <img src="Imagenes/Ana.png">
      <span>ANA</span>
    </button>
  
    <button class="image-btn"  id="julioButton">
      <img src="Imagenes/Leo.png">
      <span>LEO</span>
    </button>
  </div>

    </div>
  `;

  document.getElementById("anaButton").addEventListener("click", () => {
    showSessionSelectionScreengirl();
  });

  document.getElementById("julioButton").addEventListener("click", () => {
    showSessionSelectionScreenboy();
  });

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);
}

function showAccountInfoScreen() {
  const user = auth.currentUser;

  if (user) {
    const userRef = db.collection("users").doc(user.uid);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>

              <div class="texto">
              <h1>Mi cuenta</h1>
              </div>
              <br> 
              
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>

              <br>
              
              <div class="texto">
              <h2>Nombre: ${userData.firstName}</h2>
              </div>

              <div class="texto">
                <h2>Apellido: ${userData.lastName}</h2>
                <h2>Email: ${userData.email}</h2>
                <h2>Edad: ${userData.age}</h2>
                <h2>Género: ${userData.gender}</h2>
              </div>
              
              </div>
              <br> <br> 
            <div id="botones">
              <button id="resetPasswordButton">Restablecer contraseña</button>
            </div>

            </div>
          `;

          document
            .getElementById("resetPasswordButton")
            .addEventListener("click", resetPassword);
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function resetPassword() {
  const user = auth.currentUser;

  if (user) {
    auth
      .sendPasswordResetEmail(user.email)
      .then(() => {
        alert(
          "Se ha enviado un correo electrónico para restablecer la contraseña."
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showSessionSelectionScreenboy() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btnes" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionUno();
  });
}

function showSessionSelectionScreenboydos() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btnes" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);

  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionUno();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionDos();
  });
}

function showSessionSelectionScreenboytres() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btnes" button id="session3Button">
      <h2>Sesion 3</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionUno();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionDos();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionTres();
  });
}

function showSessionSelectionScreenboycuatro() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session3Button">
      <h2>Sesion 3</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

      <button class="text-btnes" button id="session4Button">
      <h2>Sesion 4</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionUno();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionDos();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionTres();
  });
  document.getElementById("session4Button").addEventListener("click", () => {
    showSessionCuatro();
  });
}

function showSessionSelectionScreenboycinco() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session3Button">
      <h2>Sesion 3</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

      <button class="text-btn" button id="session4Button">
      <h2>Sesion 4</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionUno();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionDos();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionTres();
  });
  document.getElementById("session4Button").addEventListener("click", () => {
    showSessionCuatro();
  });
}

//1boy
function showSessionUno() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>
      <model-viewer
        id="boyId"
        src="/Imagenes/S1_N1_HOMBRE.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
        <audio src=+ruta+></audio
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
      
      <audio id="audioPlayer1" src="https://firebasestorage.googleapis.com/v0/b/autismooficial-96934.appspot.com/o/z1.mp3?alt=media&token=e4b3a721-b353-46b3-b62d-b27d650058e8&_gl=1*eq1hls*_ga*MTE1NzIyNTk5OS4xNjc4MTI0NzQ0*_ga_CW55HF8NVT*MTY4NTQxNjc4OS4xMy4xLjE2ODU0MTc2ODUuMC4wLjA."></audio>

      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P0";
    const audioPlayer = document.getElementById("audioPlayer1");
    audioPlayer.play();
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );

    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreenboy);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoUno);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioUno);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioUno);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoUno);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoUno);
}

function showAccountaltoUno() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 1</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboydos);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioUno() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 1</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboy);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoUno() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 1</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboy);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

//2boy
function showSessionDos() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S2_N1_HOMBRE.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );
    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreenboydos);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoDos);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioDos);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioDos);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoDos);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoDos);
}

function showAccountaltoDos() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 2</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboytres);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioDos() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 2</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboydos);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoDos() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 2</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboydos);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

//3boy
function showSessionTres() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S3_N2_HOMBRE.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );
    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreenboytres);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoTres);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioTres);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioTres);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoTres);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoTres);
}

function showAccountaltoTres() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 3</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboycuatro);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioTres() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 3</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboytres);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoTres() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 3</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboytres);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

//4boy
function showSessionCuatro() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S4_N2_HOMBRE.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );
    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreenboycuatro);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoCuatro);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioCuatro);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioCuatro);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoCuatro);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoCuatro);
}

function showAccountaltoCuatro() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 4</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboycinco);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioCuatro() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 4</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboycuatro);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoCuatro() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 4</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreenboycuatro);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
//mujer sesiones
function showSessionSelectionScreengirl() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btnes" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);

  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionCinco();
  });
}

function showSessionSelectionScreengirldos() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btnes" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionCinco();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionSeis();
  });
}

function showSessionSelectionScreengirltres() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btnes" button id="session3Button">
      <h2>Sesion 3</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionCinco();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionSeis();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionSiete();
  });
}

function showSessionSelectionScreengirlcuatro() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session3Button">
      <h2>Sesion 3</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

      <button class="text-btnes" button id="session4Button">
      <h2>Sesion 4</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionCinco();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionSeis();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionSiete();
  });
  document.getElementById("session4Button").addEventListener("click", () => {
    showSessionOcho();
  });
}

function showSessionSelectionScreengirlcinco() {
  app.innerHTML = `
  <div class="container">

    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

      <button class="text-btn" button id="session1Button">
      <h2>Sesion 1</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session2Button">
      <h2>Sesion 2</h2>
      <p>Tercera etapa. Alteración cognitiva.</p>
      </button>

      <button class="text-btn" button id="session3Button">
      <h2>Sesion 3</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

      <button class="text-btn" button id="session4Button">
      <h2>Sesion 4</h2>
      <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
      </button>

    </div>

  </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreen);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionCinco();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionSeis();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionSiete();
  });
  document.getElementById("session4Button").addEventListener("click", () => {
    showSessionOcho();
  });
}

//1 GIRL-FALTA
function showSessionCinco() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S1_N1_MUJER.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N1 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );

    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreengirl);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoCinco);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioCinco);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioCinco);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoCinco);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoCinco);
}

function showAccountaltoCinco() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 1</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirldos);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioCinco() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 1</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirl);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoCinco() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 1</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirl);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

//2girl - FALTA
function showSessionSeis() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S2_N1_MUJER.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N1 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );
    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreengirldos);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoSeis);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioSeis);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioSeis);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoSeis);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoSeis);
}

function showAccountaltoSeis() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 2</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirltres);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioSeis() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 2</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirldos);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoSeis() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 2</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Tercera etapa. Alteración cognitiva.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirldos);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

//3girl
function showSessionSiete() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S3_N2_MUJER.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S1 N2 P7";
  });

  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );
    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreengirltres);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoSiete);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioSiete);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioSiete);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoSiete);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoSiete);
}

function showAccountaltoSiete() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 3</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirlcuatro);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioSiete() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 3</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirltres);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoSiete() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 3</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirltres);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

//4girl
function showSessionOcho() {
  app.innerHTML = `
    <div class="container">
          <div id="botones">
            <a href="#"><button id="backButton">Retroceder</button></a>
          </div>   
      <model-viewer
        id="boyId"
        src="/Imagenes/S4_N2_MUJER.glb"
        alt="A 3D model of a cartoon animated knight"
        ar
        ar-modes="webxr"
        environment-image="neutral"
        animation-name=""
        autoplay
        camera-controls
      > <!-- 00 -->
      <button class="mostrar" id="boton4" slot="ar-button">COMENZAR</button>
      <!-- 0 -->
      <button class="ocultar" id="boton1">BIEN</button>
      <button class="ocultar" id="boton2">MAL</button>
      <!-- 1 -->
      <button class="ocultar" id="boton5">SI, ME GUSTA</button>
      <button class="ocultar" id="boton6">NO, ME GUSTA</button>
      <!-- 2 -->
      <button class="ocultar" id="boton7">SI, ME GUSTA</button>
      <button class="ocultar" id="boton8">NO, ME GUSTA</button>
      <!-- 21 -->
      <!-- R1 -->
      <button class="ocultar" id="boton11">SI</button>
      <button class="ocultar" id="boton12">NO</button>
      <!-- 22 -->
      <button class="ocultar" id="boton13">SI</button>
      <!-- R2 -->
      <button class="ocultar" id="boton14">NO</button>

      <!-- 3 -->
      <!-- 31 -->
      <!-- R3 -->
      <button class="ocultar" id="boton17">NO</button>
      <!-- R4 -->
      <button class="ocultar" id="boton18">SI, ME GUSTARIA</button>
      <!-- R5 -->
      <button class="ocultar" id="boton19">NO, ME GUSTARIA</button>
        
      </model-viewer>
    </div>
  `;
  //0
  const botonA = document.querySelector("#boton4");
  const botonNuevo1 = document.querySelector("#boton1");
  const botonNuevo2 = document.querySelector("#boton2");
  //1
  const botonB = document.querySelector("#boton1");
  const botonBB = document.querySelector("#boton2");
  const botonNuevo3 = document.querySelector("#boton5");
  const botonNuevo4 = document.querySelector("#boton6");
  //2
  const botonC = document.querySelector("#boton5");
  const botonNuevo5 = document.querySelector("#boton7");
  const botonNuevo6 = document.querySelector("#boton8");
  //2SI
  const botonE = document.querySelector("#boton7");
  const botonR1 = document.querySelector("#boton11");
  const botonNuevo10 = document.querySelector("#boton12");
  //2NO
  const botonF = document.querySelector("#boton8");
  const botonNuevo11 = document.querySelector("#boton13");
  const botonR2 = document.querySelector("#boton14");
  //3
  const botonD = document.querySelector("#boton6");
  //3SI
  const botonG = document.querySelector("#boton12");
  //3NO
  const botonH = document.querySelector("#boton13");
  const botonR3 = document.querySelector("#boton17");
  const botonR4 = document.querySelector("#boton18");
  const botonR5 = document.querySelector("#boton19");

  //0
  const modelViewer = document.querySelector("model-viewer#boyId");

  botonA.addEventListener("click", () => {
    botonNuevo1.classList.add("mostrar");
    botonNuevo2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P0";
  });
  //1SI
  botonB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P1";
  });
  //1NO
  botonBB.addEventListener("click", () => {
    botonNuevo1.classList.add("ocultare");
    botonNuevo2.classList.add("ocultare");
    botonNuevo3.classList.add("mostrar");
    botonNuevo4.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P1";
  });
  //2
  botonC.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo5.classList.add("mostrar");
    botonNuevo6.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P2";
  });
  //2SI
  botonE.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonR1.classList.add("mostrar");
    botonNuevo10.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P4";
  });
  //2NO
  botonF.addEventListener("click", () => {
    botonNuevo5.classList.add("ocultare");
    botonNuevo6.classList.add("ocultare");
    botonNuevo11.classList.add("mostrar");
    botonR2.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P5";
  });
  //3
  botonD.addEventListener("click", () => {
    botonNuevo3.classList.add("ocultare");
    botonNuevo4.classList.add("ocultare");
    botonNuevo10.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P3";
  });

  //3SI
  botonG.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonR1.classList.add("ocultare");
    botonR3.classList.add("mostrar");
    botonNuevo11.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P6";
  });

  //3NO
  botonH.addEventListener("click", () => {
    botonNuevo10.classList.add("ocultare");
    botonNuevo11.classList.add("ocultare");
    botonR4.classList.add("mostrar");
    botonR5.classList.add("mostrar");
    console.log("anim");
    modelViewer.animationName = "S2 N2 P7";
  });
  modelViewer.addEventListener("loop", (ev) => {
    nro++;
    console.log(
      "nro " +
        nro +
        " the animation " +
        modelViewer.animationName +
        " is looping"
    );
    if (modelViewer.animationName != "ESPERA") {
      modelViewer.animationName = "ESPERA";
      //contador vuelve a 0
      nro = 0;
      console.log("ESPERA anim");
    }
  });

  document
    .getElementById("backButton")
    .addEventListener("click", showSessionSelectionScreengirlcuatro);
  document
    .getElementById("boton11")
    .addEventListener("click", showAccountaltoOcho);
  document
    .getElementById("boton14")
    .addEventListener("click", showAccountmedioOcho);
  document
    .getElementById("boton17")
    .addEventListener("click", showAccountmedioOcho);
  document
    .getElementById("boton18")
    .addEventListener("click", showAccountbajoOcho);
  document
    .getElementById("boton19")
    .addEventListener("click", showAccountbajoOcho);
}

function showAccountaltoOcho() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 4</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>FAVORABLE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 69;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";

          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirlcinco);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountmedioOcho() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 4</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 31) + 29;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirlcuatro);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function showAccountbajoOcho() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
                <div id="botones">
                <li><a href="#"><button id="backButton">Retroceder</button></li>
                </div>
                <div id="botones">
                <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
                </div>
              </ul>
            </nav>
              <div class="texto">
              <h1>SESION 4</h1>
              </div>
              <header>
                <div class="logo">
                  <img src="Imagenes/LOGO.PNG">
                </div>
              </header>
              <div class="texto">
              <h2>Cuarta etapa. Deficit en la comunicacion y lenguaje.</h2>
              </div>
              <br> 
              <div class="texto">
              <h1>ASCENDENTE</h1>
              </div>
              <br> 
              <div class="medidor">
                <progress id="barra" value="0" max="100"></progress>
              </div>
              <div class="texto">
              <p id="porcentaje"></p>
              </div>
              </div>
              <br> <br> 
              <button id="boton4">Finalizar</button>
            </div>
          `;
          var numeroAleatorio = Math.floor(Math.random() * 29) + 1;

          // Actualizar la barra de progreso y el porcentaje
          var barra = document.getElementById("barra");
          barra.value = numeroAleatorio;
          var porcentaje = document.getElementById("porcentaje");
          porcentaje.innerHTML = numeroAleatorio + "%";
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener("click", showCharacterSelectionScreen);
          document
            .getElementById("boton4")
            .addEventListener("click", showSessionSelectionScreengirlcuatro);
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function checkUserRole(userId) {
  const userRef = db.collection("users").doc(userId);
  return userRef.get().then((doc) => {
    if (doc.exists) {
      const userData = doc.data();
      return userData.role;
    } else {
      throw new Error("No se encontró la información del usuario");
    }
  });
}

function checkUserActive(userId) {
  const userRef = db.collection("users").doc(userId);
  return userRef.get().then((doc) => {
    if (doc.exists) {
      const userData = doc.data();
      return userData.active;
    } else {
      throw new Error("No se encontró la información del usuario");
    }
  });
}

function showCharacterSelectionScreenPsychologist() {
  app.innerHTML = `

  <div class="container">

  <button class="menu-btn">Menú</button>
  
  <nav class="menu">
    <ul>
      <div id="botones">
      <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
      </div>
      <div id="botones">
      <li><a href="#"><button id="userListButton">Lista de usuarios</button></li>
      </div>
      <div id="botones">
      <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
      </div>
    </ul>
  </nav>


  <div class="texto">
    <h1>Selecciona tu personaje</h1>
  </div>
  
<div class="button-container">

  <button class="image-btn"id="anaButton">
    <img src="Imagenes/Ana.png">
    <span>ANA</span>
  </button>

  <button class="image-btn"  id="julioButton">
    <img src="Imagenes/Leo.png">
    <span>LEO</span>
  </button>
</div>

  </div>

  `;

  document.getElementById("anaButton").addEventListener("click", () => {
    showSessionSelectionScreenPsychologist();
  });

  document.getElementById("julioButton").addEventListener("click", () => {
    showSessionSelectionScreenPsychologist();
  });

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreenPsychologist);
  document
    .getElementById("userListButton")
    .addEventListener("click", showUserListScreen);
  document.getElementById("logoutButton").addEventListener("click", logoutUser);
}
function showSessionSelectionScreenPsychologist() {
  app.innerHTML = `
    <div class="container">
    <button class="menu-btn">Menú</button>
    
    <nav class="menu">
      <ul>
        <div id="botones">
        <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="userListButton">Lista de usuarios</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="backButton">Retroceder</button></li>
        </div>
        <div id="botones">
        <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
        </div>
      </ul>
    </nav>

    <div class="button-container">

    <button class="text-btn" button id="session1Button">
    <h2>Sesion 1</h2>
    <p>Tercera etapa. Alteración cognitiva.</p>
    </button>

    <button class="text-btn" button id="session2Button">
    <h2>Sesion 2</h2>
    <p>Tercera etapa. Alteración cognitiva.</p>
    </button>

    <button class="text-btn" button id="session3Button">
    <h2>Sesion 3</h2>
    <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
    </button>

    <button class="text-btn" button id="session4Button">
    <h2>Sesion 4</h2>
    <p>Cuarta etapa. Déficit en la comunicación y lenguaje.</p>
    </button>

  </div>

</div>
`;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreenPsychologist);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreenPsychologist);
  document
    .getElementById("userListButton")
    .addEventListener("click", showUserListScreen);

  document.getElementById("logoutButton").addEventListener("click", logoutUser);

  document.getElementById("session1Button").addEventListener("click", () => {
    showSessionUno();
  });
  document.getElementById("session2Button").addEventListener("click", () => {
    showSessionDos();
  });
  document.getElementById("session3Button").addEventListener("click", () => {
    showSessionTres();
  });
  document.getElementById("session4Button").addEventListener("click", () => {
    showSessionCuatro();
  });
}

function showAccountInfoScreenPsychologist() {
  const user = auth.currentUser;

  if (user) {
    const userRef = db.collection("users").doc(user.uid);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          app.innerHTML = `
            <div class="container">

            <button class="menu-btn">Menú</button>
    
            <nav class="menu">
              <ul>
              <div id="botones">
              <li><a href="#"><button id="backButton">Retroceder</button></li>
              </div>
              <div id="botones">
              <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
              </div>
              </ul>
            </nav>

              <div class="texto">
              <h1>Mi cuenta</h1>
              </div>
              <br> 

              
              <header>
                <div class="logo">
                  <img src="Imagenes/GENERAL.PNG">
                </div>
              </header>

              <br>
                            
              <div class="texto">
              <h2>Nombre: ${userData.firstName}</h2>
              <h2>Apellido: ${userData.lastName}</h2>
              <h2>Email: ${userData.email}</h2>
              <h2>Edad: ${userData.age}</h2>
              <h2>Género: ${userData.gender}</h2>
              </div>  
              </div>
              <br> <br> 
            <div id="botones">
              <button id="resetPasswordButton">Restablecer contraseña</button>
            </div>

            </div>
          `;
          document
            .getElementById("resetPasswordButton")
            .addEventListener("click", resetPassword);
          document
            .getElementById("logoutButton")
            .addEventListener("click", logoutUser);
          document
            .getElementById("backButton")
            .addEventListener(
              "click",
              showCharacterSelectionScreenPsychologist
            );
        } else {
          throw new Error("No se encontró la información del usuario");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

auth.onAuthStateChanged((user) => {
  if (user) {
    checkUserActive(user.uid)
      .then((active) => {
        if (active === "active") {
          checkUserRole(user.uid)
            .then((role) => {
              if (role === "psychologist") {
                showCharacterSelectionScreenPsychologist();
              } else {
                showCharacterSelectionScreen();
              }
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert("Tu cuenta fué desactivada.");
          showHomeScreen();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    showHomeScreen();
  }
});

function showUserListScreen() {
  app.innerHTML = `
    <div class="container">
      <button class="menu-btn">Menú</button>
    
      <nav class="menu">
        <ul>
          <li><div id="botones"><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></div></li>
          <li><div id="botones"><a href="#"><button id="backButton">Retroceder</button></a></div></li>
          <li><div id="botones"><a href="#"><button id="logoutButton">Cerrar sesión</button></a></div></li>
        </ul>
      </nav>  

      <div class="texto">
        <h1>Lista de usuarios</h1>
      </div>

      <br> 
      <header>
        <div class="logo">
          <img src="Imagenes/GENERAL.PNG">
        </div>
      </header>
      <br>
      
      <div class="linea">
        <span class="izquierda">Nombre y Apellido</span>
        <span class="derecha">Datos</span>
      </div>

      <table id="userTable">
        <tbody id="userList"></tbody>
      </table>

      <br><br>  
    </div>
  `;

  document
    .getElementById("accountInfoButton")
    .addEventListener("click", showAccountInfoScreenPsychologist);
  const userList = document.getElementById("userList");

  db.collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const fullName = data.firstName + " " + data.lastName;
        nameCell.textContent = fullName;
        const editCell = document.createElement("td");
        const accountInfoButton = document.createElement("button");
        accountInfoButton.textContent = "Información de la cuenta";
        accountInfoButton.classList.add("edit-button");
        accountInfoButton.addEventListener("click", () => {
          showPsychologistAccountInfoScreen(doc.id);
        });
        row.appendChild(nameCell);
        userList.appendChild(row);
        editCell.appendChild(accountInfoButton);
        row.appendChild(editCell);
      });
    });

  document.getElementById("logoutButton").addEventListener("click", logoutUser);
  document
    .getElementById("backButton")
    .addEventListener("click", showCharacterSelectionScreenPsychologist);
}

function showPsychologistAccountInfoScreen(userId) {
  const userRef = db.collection("users").doc(userId);

  userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();

        app.innerHTML = `
          <div class="container">

          <button class="menu-btn">Menú</button>
  
          <nav class="menu">
            <ul>
              <div id="botones">
              <li><a href="#"><button id="accountInfoButton">Mi cuenta</button></a></li>
              </div>
              <div id="botones">
              <li><a href="#"><button id="userListButton">Lista de usuarios</button></li>
              </div>
              <div id="botones">
              <li><a href="#"><button id="logoutButton">Cerrar sesión</button></a></li>
              </div>
            </ul>
          </nav>

            <div class="texto">
            <h1>Información del usuario</h1>
            </div>

            <header>
              <div class="logo">
                <img src="Imagenes/GENERAL.PNG">
              </div>
            </header>

            <div class="texto">
              <h2>Nombre: ${userData.firstName}</h2>
              <h2>Apellido: ${userData.lastName}</h2>
              <h2>Email: ${userData.email}</h2>
              <h2>Edad: ${userData.age}</h2>
              <h2>Activo: ${userData.active}</h2>
              <h2>Género: ${userData.gender}</h2>
            </div>
            <br>
            <div class="texto">
            <h1>Resultados</h1>
            </div>
            <be>
            <table id="resultsTable" border="1">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Resultado</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3" style="text-align: center;">Aquí se cargarán los resultados</td>
                </tr>
                <!-- Aquí se agregarán los resultados cuando estén disponibles -->
              </tbody>
            </table>
          </div>
        `;
        document
          .getElementById("accountInfoButton")
          .addEventListener("click", showAccountInfoScreenPsychologist);
        document
          .getElementById("userListButton")
          .addEventListener("click", showUserListScreen);
        document
          .getElementById("logoutButton")
          .addEventListener("click", logoutUser);
        document
          .getElementById("backButton")
          .addEventListener("click", showUserListScreen);
      } else {
        throw new Error("No se encontró la información del usuario");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

function showAdminScreen() {
  app.innerHTML = `
    <div class="container">
      <div class="texto">
        <h1>Administrador</h1>
      </div>
      <br>
      <header>
        <div class="logo">
          <img src="Imagenes/OPCIONES.PNG">
        </div>
      </header>
      <br>
      <div class="linea">
        <span class="izquierda">Nombre y Apellido</span>
        <span class="derecha">Editar</span>
      </div>
      
      <table id="userTable">
        <tbody id="userList"></tbody>
      </table>

      <br><br>

      <div id="botones">
        <button id="logoutButton">Cerrar sesión</button>
      </div>
    </div>
  `;

  const userList = document.getElementById("userList");
  db.collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const fullName = data.firstName + " " + data.lastName;
        nameCell.textContent = fullName;
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => {
          showEditUserScreen(doc.id, data);
        });
        editCell.appendChild(editButton);
        row.appendChild(nameCell);
        row.appendChild(editCell);
        userList.appendChild(row);
      });
    });

  document.getElementById("logoutButton").addEventListener("click", logoutUser);
}

function showEditUserScreen(userId, userData) {
  app.innerHTML = `
    <div class="container">
      
      <div class="texto">
      <h1>Editar usuario</h1>
      </div>

      <header>
        <div class="logo">
        <img src="Imagenes/OPCIONES.PNG">
        </div>
      </header>
      <br><br>
    <div class="campo">
      <label for="firstName">Nombre :</label>
      <input type="text" id="firstName" placeholder="Nombre" value="${
        userData.firstName
      }">
      <label for="lastName">Apellido :</label>
      <input type="text" id="lastName" placeholder="Apellido" value="${
        userData.lastName
      }">
      <label for="age">   Edad   :  </label>
      <input type="number" id="age" placeholder="Edad" min="1" value="${
        userData.age
      }">
      <label for="gender">   Genero   :  </label>
      <select id="gender">
        <option value="" selected disabled>Género</option>
        <option value="Masculino" ${
          userData.gender === "masculino" ? "selected" : ""
        }>Masculino</option>
        <option value="Femenino" ${
          userData.gender === "Femenino" ? "selected" : ""
        }>Femenino</option>
        <option value="other" ${
          userData.gender === "other" ? "selected" : ""
        }>Otro</option>
      </select>
      <label for="active">   Activado / Desactivado   :  </label>
      <select id="active">
        <option value="active" ${
          userData.active === "active" ? "selected" : ""
        }>Activo</option>
        <option value="disabled" ${
          userData.active === "disabled" ? "selected" : ""
        }>Desactivo</option>
      </select>
      <label for="role">  Rol   :  </label>
      <select id="role">
        <option value="patient" ${
          userData.role === "patient" ? "selected" : ""
        }>Paciente</option>
        <option value="psychologist" ${
          userData.role === "psychologist" ? "selected" : ""
        }>Psicólogo</option>
      </select>
    </div>
      <br><br>
      <div id="botones">
      <button id="saveButton">Guardar cambios</button>
      <button id="cancelButton">Cancelar</button>
      </div>
    </div>
  `;

  document.getElementById("saveButton").addEventListener("click", () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const active = document.getElementById("active").value;
    const role = document.getElementById("role").value;

    const userRef = db.collection("users").doc(userId);

    userRef
      .update({
        firstName,
        lastName,
        age: parseInt(age),
        gender,
        active,
        role
      })
      .then(() => {
        alert("Los cambios se han guardado exitosamente");
        showAdminScreen();
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  document
    .getElementById("cancelButton")
    .addEventListener("click", showAdminScreen);
}
auth.onAuthStateChanged((user) => {
  if (user) {
    if (user.email === "administrador@gmail.com") {
      showAdminScreen();
    } else {
      showCharacterSelectionScreen();
    }
  } else {
    showHomeScreen();
  }
});

function showHomeScreen() {
  app.innerHTML = `

  <head>
    <link rel="stylesheet" href="estilos.css">
  </head>

  <body>

  <main>
    <header>
      <div class="logo">
        <img src="Imagenes/LOGO.PNG">
      </div>
    </header>

    <br><br><br>

    <div id="botones">
      <button id="loginButton">Iniciar sesion</button>
      <button id="registerButton">Registrarse</button>
    </div>

    <div class="texto">
      <h1>VISION</h1>
      <p>Coadyuvar en la restitución de sus derechos de niñas, niños, adolescentes, jóvenes, mujeres, adultos, personas adultas mayores y personas con discapacidad, brindando atención integral a través de la intervención de los equipos multidisciplinarios en Centros de Acogida, Institutos, Programas, Proyectos y otros servicios.</p>
      <h1>MISION</h1>
      <p>Brindar atención integral especializada al niño, niña y adolescente bajo sistema de residencia cubriendo sus necesidades básicas e ingresándolo al proceso de rehabilitación y/o adaptación y educación a través de terapias interdisciplinarias, logrando en los niños y niñas con trastornos del desarrollo neuro evolutivo y/o retraso mental, el máximo desarrollo de sus capacidades y potencialidades.</p>
    </div>

    </main>
    <script src="script.js"></script>

  </body>

  `;

  document
    .getElementById("loginButton")
    .addEventListener("click", showLoginScreen);
  document
    .getElementById("registerButton")
    .addEventListener("click", showRegisterScreen);
  const contenedor = document.getElementById("contenedor");
}

function showLoginScreen() {
  app.innerHTML = `
      <div class="texto">
        <h1>Iniciar sesión</h1>
      </div>

      <header>
        <div class="logo">
          <img src="Imagenes/LOGO.PNG">
        </div>
      </header>

      <header>
      <div class="column">
        <label for="email">Correo electrónico:</label>
        <br>
        <br>
        <input type="email" id="email" placeholder="Correo electrónico">
        <br>
        <br>
        <label for="new-password">Contraseña:</label>
        <br>
        <br>
        <input type="password" id="password" placeholder="Contraseña">
      </div>
      </header>

      <div class="texto">
        <label for="stayLoggedIn">
          <input type="checkbox" id="stayLoggedIn"> Mantener sesión iniciada 
        </label>
        <br><br>
      </div>

      <div id="botones">
        <button id="login">Iniciar sesión</button>
        <button id="back">Retroceder</button>
      </div>

  `;

  document.getElementById("login").addEventListener("click", loginUser);
  document.getElementById("back").addEventListener("click", showHomeScreen);
}

function showRegisterScreen() {
  app.innerHTML = `

      <div class="texto"> 
        <h1>Registrarse</h1>
      </div>
    
      <header>
        <div class="logo">
          <img src="Imagenes/LOGO.PNG">
        </div>
      </header>
      
     
      <div class="campo">
        <label for="firstName">Nombre :</label>
        <input type="text" id="firstName" placeholder="Nombre"><br>

        <label for="lastName">Apellido :</label>
        <input type="text" id="lastName" placeholder="Apellido"><br>
        
        <label for="age">   Edad   :  </label>
        <input type="number" id="age" placeholder="Edad" min="1" pattern="[0-9]*"><br>
        
        <label for="gender">   Genero   :  </label>
        <select id="gender">
          <input<option value="" selected disabled>Género</option>>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="other">Otro</option>
        </select><br>

        <label for="email">Correo Electronico :  </label>
        <input type="email" id="email" placeholder="Correo electrónico"><br>
        
        <label for="password">Contraseña : </label>
        <input type="password" id="password" placeholder="Contraseña"><br>
        
        <label for="confirmPassword">Confirmar Contraseña : </label>
        <input type="password" id="confirmPassword" placeholder="Confirmar contraseña">
      </div>
      </header>

      <div class="texto">
        <label for="stayLoggedIn">
          <input type="checkbox" id="stayLoggedIn"> Mantener sesión iniciada
        </label>
        <br><br>
      </div>

      <div id="botones">
      <button id="register">Registrarse</button>
      <button id="back">Retroceder</button>
      </div>

  `;

  document.getElementById("register").addEventListener("click", registerUser);
  document.getElementById("back").addEventListener("click", showHomeScreen);
}
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const stayLoggedIn = document.getElementById("stayLoggedIn").checked;

  auth
    .setPersistence(
      stayLoggedIn
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION
    )
    .then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function registerUser() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const stayLoggedIn = document.getElementById("stayLoggedIn").checked;
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  auth
    .setPersistence(
      stayLoggedIn
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION
    )
    .then(() => {
      return auth.createUserWithEmailAndPassword(email, password);
    })
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        firstName,
        lastName,
        age: parseInt(age),
        gender,
        email,
        active: "active",
        role: "patient"
      };
      return db.collection("users").doc(user.uid).set(userData);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logoutUser() {
  auth.signOut().catch((error) => {
    alert(error.message);
  });
}
