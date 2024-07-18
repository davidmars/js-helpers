/**
 *
 * @param path Path to the service worker file
 * @param scope Path for app scope
 * @param onInstallPossible Called when / if the app installation is possible
 */
export default function registerSW(onInstallPossible:registerSwCb, path="/sw.js",scope="/",){
  if ('serviceWorker' in navigator) {
    //console.log("A2HS possible")
    navigator.serviceWorker
      .register(path,{ scope: scope })
      .then(() => { console.log('A2HS Service Worker Registered'); });
  }
  // @ts-ignore
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    //console.log("A2HS beforeinstallprompt")
    //return the method to install
    onInstallPossible(cb);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
  });

  const cb=()=>{
    console.log("A2HS cb")
    // Show the prompt
    // @ts-ignore
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    // @ts-ignore
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('A2HS User accepted the A2HS prompt');
      } else {
        console.log('A2HS User dismissed the A2HS prompt');
      }
      onInstallPossible(false);
      deferredPrompt = null;
    });
  }
  return cb;

}
type registerSwCb= (installPWA: Function|false) => void;
