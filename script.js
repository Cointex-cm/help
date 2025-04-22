if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('Service worker registered:', registration);
        })
        .catch(error => {
            console.error('Service worker registration failed:', error);
        });
}

// Handle install button click
const installButton = document.getElementById('install-button');
installButton.addEventListener('click', async () => {
    if ('BeforeInstallPromptEvent' in window) {
        const promptEvent = window.deferredInstallPrompt;
        if (promptEvent) {
            promptEvent.prompt();
            const { outcome } = await promptEvent.userChoice;
            if (outcome === 'accepted') {
                console.log('PWA installed');
            } else {
                console.log('PWA installation cancelled');
            }
            window.deferredInstallPrompt = null;
        }
    }
});

// Handle beforeinstallprompt event
window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    window.deferredInstallPrompt = event;
    installButton.style.display = 'block';
});
```
