//Запустить отображение в полноэкранном режиме
export function launchFullScreen(document) {
    if(document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if(document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if(document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    }
  }
  
  // Выход из полноэкранного режима
 export function cancelFullscreen(document) {
    if(document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }