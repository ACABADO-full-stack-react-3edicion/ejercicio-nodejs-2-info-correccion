const os = require("os");
const fs = require("fs");
const path = require("path");

console.log("Hackeando tu sistema operativo...");

setTimeout(() => {
  analizaSO();
}, 500);

const analizaSO = () => {
  const plataforma = os.platform();
  switch (plataforma) {
    case "win32":
      console.log("Tú no molas mucho");
      break;
    case "linux":
      console.log("Tú molas");
      break;
    case "darwin":
      console.log(
        "Tú no molas nada. Bueno, excepto si eres Geraldine o Pol. En ese caso molas. Pero por ser tú, no por usar Mac"
      );
      break;
    default:
      console.log("No sé si molas o no");
  }
  const memoriaLibre = os.freemem() / 1024 / 1024;
  const versionOS = os.version();
  const infoUsuario = os.userInfo();
  console.log(`Cuidado, te quedan ${memoriaLibre} de RAM libre.`);
  console.log(`La versión de tu sistema operativo es ${versionOS}.`);
  console.log(
    `Tu usuario del sistema operativo es ${infoUsuario.username} y tu carpeta es ${infoUsuario.homedir}`
  );
  console.log("Éstos son los archivos y carpetas de tu carpeta de usuario:");
  listaArchivos(infoUsuario.homedir);
};

const listaArchivos = (ruta) => {
  fs.readdir(ruta, (err, archivos) => {
    if (err) {
      console.log(`Error al listar los archivos de ${ruta}`);
      console.log(err.message);
      return;
    }
    for (const archivo of archivos) {
      fs.stat(path.join(ruta, archivo), (err, infoArchivo) => {
        if (err) {
          console.log(
            `Error al obtener la información de ${path.join(ruta, archivo)}`
          );
          console.log(err.message);
          return;
        }
        console.log(
          archivo,
          infoArchivo.size,
          infoArchivo.isDirectory() ? "Directorio" : "Archivo"
        );
        if (infoArchivo.isDirectory()) {
          listaArchivos(path.join(ruta, archivo));
        }
      });
    }
  });
};
