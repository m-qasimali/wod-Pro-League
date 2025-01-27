export const teamEmailTemplate = ({
  teamCategory,
  teamName,
  emailList,
  creatorEmail,
}) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>¡Bienvenidos a WOD PRO League!</title>
</head>
<body>
    <p><strong>Equipazo, ¡bienvenidos a WOD PRO League!</strong></p>
    
    <p>¡Lo habéis hecho! <strong>¡¡¡Ya sois parte de la comunidad de WOD PRO League!!! 😊</strong></p>
    
    <p>No sabéis la ilusión que nos hace que hayáis decidido dar el paso de apuntaros en pareja a la 1ª liga online de cross-training en España.</p>
    
    <p><strong>Competiréis en la categoría ${teamCategory}</strong> y tendréis un ranking completamente personalizable para que podáis ver en qué percentil os encontráis del total de equipos filtrando por box, ciudad, comunidad o a nivel nacional.</p>
    
    <p>Pero no queremos desvelaros demasiado, casi mejor que lo descubráis por vosotros mismos 😏</p>
    
    <p>Ahora, simplemente conoced un poco cómo funciona la plataforma y optimizad vuestro perfil al máximo.</p>
    
    <p>Para empezar sigue los siguientes pasos:</p>
    <p>Descarga la app</p>
    <p>Haz click en “Inscribirse”.</p>
    <p>Selecciona la categoría en la que tu capitán te ha inscrito.</p>
    <p>Ingresa el correo electrónico de tu capitán/a y los datos de tu equipo se registrarán automáticamente.</p>
    <p>Completa el registro rellenando los datos que te pedimos.</p>
    
    <p><strong>Nombre del equipo:</strong> ${teamName}</p>
    <p><strong>Miembros del equipo:</strong> ${emailList}</p>
    <p><strong>Miembro que te invitó:</strong> ${creatorEmail}</p>
    
    
    <p>Para descargar la aplicación desde la Apple Store, haz clic en el botón a continuación:</p>
    
    <p>
        <a href="https://apps.apple.com/app/wod-pro-league/id6538719686" style="background-color:#008CBA; color:white; padding:10px 20px; text-align:center; text-decoration:none; display:inline-block; font-size:16px; border-radius:5px;">
            Descargar en Apple Store
        </a>
    </p>
    
    <p><strong>Nota para usuarios de Android:</strong> La aplicación estará disponible para Android pronto.</p>
       
    <p>¡Hablamos pronto y gracias por estar aquí! ❤️</p>

</body>
</html>`;
};

export const selfEmailTemplate = ({ category, password }) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>¡Bienvenidos a WOD PRO League!</title>
</head>
<body>
    <p><strong>Equipazo, ¡bienvenidos a WOD PRO League!</strong></p>
    
    <p>¡Lo habéis hecho! <strong>¡¡¡Ya sois parte de la comunidad de WOD PRO League!!! 😊</strong></p>
    
    <p>No sabéis la ilusión que nos hace que hayáis decidido dar el paso de apuntaros en pareja a la 1ª liga online de cross-training en España.</p>
    
    <p><strong>Competiréis en la categoría ${category}</strong> y tendréis un ranking completamente personalizable para que podáis ver en qué percentil os encontráis del total de equipos filtrando por box, ciudad, comunidad o a nivel nacional.</p>
    
    <p>Pero no queremos desvelaros demasiado, casi mejor que lo descubráis por vosotros mismos 😏</p>
    
    <p>Ahora, simplemente conoced un poco cómo funciona la plataforma y optimizad vuestro perfil al máximo.</p>
    
    <p><strong>Contraseña:</strong> ${password}</p>
    
    <p><strong>¡Hablamos pronto y gracias por estar aquí! ❤️</strong></p>
</body>
</html>`;
};

export const newMemberEmailTemplate = ({
  teamCategory,
  teamName,
  emailList,
  creatorEmail,
  password,
}) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>¡Bienvenidos a WOD PRO League!</title>
</head>
<body>
    <p><strong>Equipazo, ¡bienvenidos a WOD PRO League!</strong></p>
    
    <p>¡Lo habéis hecho! <strong>¡¡¡Ya sois parte de la comunidad de WOD PRO League!!! 😊</strong></p>
    
    <p>No sabéis la ilusión que nos hace que hayáis decidido dar el paso de apuntaros en pareja a la 1ª liga online de cross-training en España.</p>
    
    <p><strong>Competiréis en la categoría ${teamCategory}</strong> y tendréis un ranking completamente personalizable para que podáis ver en qué percentil os encontráis del total de equipos filtrando por box, ciudad, comunidad o a nivel nacional.</p>
    
    <p>Pero no queremos desvelaros demasiado, casi mejor que lo descubráis por vosotros mismos 😏</p>
    
    <p>Ahora, simplemente conoced un poco cómo funciona la plataforma y optimizad vuestro perfil al máximo.</p>
    
    <p>Para empezar sigue los siguientes pasos:</p>
    <p>Descarga la app</p>
    <p>Haz click en “Inscribirse”.</p>
    <p>Selecciona la categoría en la que tu capitán te ha inscrito.</p>
    <p>Ingresa el correo electrónico de tu capitán/a y los datos de tu equipo se registrarán automáticamente.</p>
    <p>Completa el registro rellenando los datos que te pedimos.</p>
    
    <p><strong>Nombre del equipo:</strong> ${teamName}</p>
    <p><strong>Miembros del equipo:</strong> ${emailList}</p>
    <p><strong>Miembro que te invitó:</strong> ${creatorEmail}</p>
    <p><strong>Contraseña:</strong> ${password}</p>
    
    
    <p>Para descargar la aplicación desde la Apple Store, haz clic en el botón a continuación:</p>
    
    <p>
        <a href="https://apps.apple.com/app/wod-pro-league/id6538719686" style="background-color:#008CBA; color:white; padding:10px 20px; text-align:center; text-decoration:none; display:inline-block; font-size:16px; border-radius:5px;">
            Descargar en Apple Store
        </a>
    </p>
    
    <p><strong>Nota para usuarios de Android:</strong> La aplicación estará disponible para Android pronto.</p>
       
    <p>¡Hablamos pronto y gracias por estar aquí! ❤️</p>

</body>
</html>`;
};
