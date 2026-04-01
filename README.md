# js-helpers

> Collection de fonctions et classes utilitaires TypeScript pour les projets web modernes.
> Stack : **TypeScript** · **Vite**

---

## Table des matières

- [Array](#array)
- [Browser](#browser)
- [Classes](#classes)
- [Colors](#colors)
- [Date](#date)
- [Files](#files)
- [Geo](#geo)
- [Human Spoken](#human-spoken)
- [Magics](#magics)
- [Math](#math)
- [Mouse](#mouse)
- [Objects](#objects)
- [String](#string)
- [Type Checking](#type-checking)
- [TypeCast](#typecast)
- [Valid](#valid)
- [Window](#window)

---

## Array

### `arrayShuffle`

```typescript
import { arrayShuffle } from './src/array/arrayShuffle'
```

**Signature :** `arrayShuffle(arr: any[]): any[]`

Renvoie une copie mélangée aléatoirement du tableau.

```typescript
arrayShuffle([1, 2, 3, 4, 5])
// → [3, 1, 5, 2, 4]  (ordre aléatoire)
```

---

### `arrayUnique`

```typescript
import { arrayUnique } from './src/array/arrayUnique'
```

**Signature :** `arrayUnique(arr: []): any[]`

Renvoie un nouveau tableau sans doublons.

```typescript
arrayUnique([1, 2, 2, 3, 3, 3])
// → [1, 2, 3]
```

---

### `inArray`

```typescript
import inArray from './src/array/inArray'
```

**Signature :** `inArray(needle: any, haystack: any[]): boolean`

Vérifie si une valeur est présente dans un tableau.

```typescript
inArray('pomme', ['poire', 'pomme', 'cerise'])  // → true
inArray('abricot', ['poire', 'pomme', 'cerise']) // → false
```

---

### `randomEntry`

```typescript
import { randomEntry } from './src/array/randomEntry'
```

**Signature :** `randomEntry(items: any[]): any`

Retourne un élément aléatoire du tableau.

```typescript
randomEntry(['rouge', 'vert', 'bleu'])
// → 'vert'  (aléatoire)
```

---

## Browser

### `copyClipboard`

```typescript
import copyClipboard from './src/browser/copyClipboard'
```

**Signature :** `copyClipboard(text: string, cb?: (ok: boolean) => void): void`

Copie un texte dans le presse-papiers. Le callback optionnel reçoit `true` si la copie a réussi, `false` sinon.

```typescript
copyClipboard('Texte à copier', (ok) => {
  console.log(ok ? 'Copié !' : 'Échec de la copie')
})
```

---

### `FileDropper`

```typescript
import FileDropper from './src/browser/FileDropper'
```

**Classe** qui gère le drag & drop de fichiers sur un élément HTML. Hérite d'`EventEmitter`.

**Événements :**

| Événement | Payload | Description |
|---|---|---|
| `filesDropped` | `File[]` | Fichiers déposés sur la zone |
| `enter` | — | Le curseur entre dans la zone |
| `hover` | — | Alias de `enter` |
| `leave` | — | Le curseur quitte la zone |

```typescript
const dropper = new FileDropper(document.getElementById('drop-zone')!)

dropper.on('filesDropped', (files) => {
  console.log('Fichiers reçus :', files)
})
dropper.on('enter', () => console.log('Survol de la zone'))
dropper.on('leave', () => console.log('Sortie de la zone'))
```

---

### `getBrowserLangCode`

```typescript
import getBrowserLangCode from './src/browser/getBrowserLangCode'
```

**Signature :** `getBrowserLangCode(): string`

Retourne le code ISO 639-1 de la langue du navigateur (`fr`, `en`, `es`…).

```typescript
getBrowserLangCode()
// → 'fr'
```

---

### `href`

```typescript
import href from './src/browser/href'
```

**Signature :** `href(url: string, newTab?: boolean): void`

Ouvre une URL dans un nouvel onglet par défaut (`newTab = true`). Alias de `window.open`.

```typescript
href('https://example.com')         // ouvre dans un nouvel onglet
href('https://example.com', false)  // ouvre dans l'onglet courant
```

---

### `isDesktop`

```typescript
import isDesktop from './src/browser/isDesktop'
```

**Signature :** `isDesktop(): boolean`

Retourne `true` si l'appareil n'est pas un mobile ou une tablette (détection via `userAgent`).

```typescript
if (isDesktop()) {
  // afficher la navigation complète
}
```

---

### `isFacebookWebview`

```typescript
import isFacebookWebview from './src/browser/isFacebookWebview'
```

**Signature :** `isFacebookWebview(): boolean`

Détecte si la page s'affiche dans la webview de Facebook ou Messenger.

```typescript
if (isFacebookWebview()) {
  alert('Pour une meilleure expérience, ouvrez ce lien dans votre navigateur.')
}
```

---

### `isIos`

```typescript
import isIos from './src/browser/isIos'
```

**Signature :** `isIos(): boolean`

Retourne `true` si l'appareil est un iPhone, iPad ou iPod.

```typescript
if (isIos()) {
  // comportement spécifique iOS
}
```

---

### `isLocalhost`

```typescript
import isLocalhost from './src/browser/isLocalhost'
```

**Signature :** `isLocalhost(host?: string): boolean`

Retourne `true` si l'hôte est `localhost` ou `127.0.0.x`. Par défaut utilise `document.location.host`.

```typescript
isLocalhost()                   // → true en développement local
isLocalhost('127.0.0.1:5173')  // → true
isLocalhost('monsite.com')      // → false
```

---

### `isPWA`

```typescript
import isPWA from './src/browser/isPWA'
```

**Signature :** `isPWA(): boolean`

Détecte si l'application est exécutée en mode standalone (PWA installée).

```typescript
if (isPWA()) {
  // masquer le bouton "Installer l'app"
}
```

---

### `mailTo`

```typescript
import mailTo from './src/browser/mailTo'
```

**Signature :** `mailTo(to?: string, subject?: string, body?: string): string`

Génère une chaîne `mailto:` encodée prête à être utilisée en `href`.

```typescript
const lien = mailTo('contact@example.com', 'Demande de devis', 'Bonjour,')
// → 'mailto:contact@example.com?subject=Demande%20de%20devis&body=Bonjour%2C'

ancre.href = lien
```

---

### `queryString`

```typescript
import queryString from './src/browser/queryString'
```

**Signature :** `queryString(varName: string): string | null`

Retourne la valeur d'un paramètre de l'URL courante, ou `null` s'il est absent.

```typescript
// URL : https://example.com?page=2&lang=fr
queryString('lang')  // → 'fr'
queryString('page')  // → '2'
queryString('foo')   // → null
```

---

### `registerSW`

```typescript
import registerSW from './src/browser/registerSW'
```

**Signature :** `registerSW(onInstallPossible: Function, path?: string, scope?: string): void`

Enregistre un Service Worker et déclenche un callback lorsque l'installation de la PWA est proposable. Le callback reçoit une fonction à appeler pour déclencher la bannière d'installation native.

```typescript
registerSW(
  (promptInstall) => {
    const btn = document.getElementById('btn-install')!
    btn.style.display = 'block'
    btn.onclick = () => promptInstall()
  },
  '/sw.js',
  '/'
)
```

---

## Classes

### `AppCommonManager`

```typescript
import AppCommonManager from './src/classes/AppCommonManager'
```

Classe de base pour une application web. Regroupe dans une seule instance le localStorage JSON, l'écoute des propriétés de fenêtre et les métadonnées de l'app.

**Constructeur :** `new AppCommonManager(appName: string, version: string)`

**Propriétés publiques :**

| Propriété | Type | Description |
|---|---|---|
| `ls` | `LocalStorageJson` | Instance du localStorage JSON de l'app |
| `win` | `WinPropsListener` | Écoute du scroll, de la taille et de l'état réseau |
| `version` | `string` | Version de l'application |
| `appName` | `string` | Nom de l'application |
| `debug.enabled` | `boolean` | Active le mode debug |

**Méthodes :**

| Méthode | Description |
|---|---|
| `init()` | Initialise tous les listeners — **à appeler après instanciation** |

```typescript
const app = new AppCommonManager('mon-app', '1.2.0')
app.init()  // à appeler dans le composant racine (ex. App.vue mounted())

console.log(app.version)    // → '1.2.0'
console.log(app.win.width)  // → 1440
app.ls.setItem('theme', 'dark')
```

---

### `LocalStorageJson`

```typescript
import LocalStorageJson from './src/classes/LocalStorageJson'
```

Wrapper autour de `localStorage` pour stocker et lire des données JSON. Émet un événement `change` lorsqu'une clé est modifiée, y compris depuis un autre onglet.

**Constructeur :** `new LocalStorageJson(name: string)`

**Propriétés :**

| Propriété | Type | Description |
|---|---|---|
| `evt` | `EventEmitter` | Événement `change` émis avec la clé modifiée |
| `keys` | `string[]` *(getter)* | Liste des clés présentes dans le storage |

**Méthodes :**

| Méthode | Signature | Description |
|---|---|---|
| `setItem` | `(key: string, value: any) => void` | Ajoute ou met à jour une entrée |
| `getItem` | `(key: string, ifNotDefined?: any) => any` | Récupère une entrée (valeur par défaut si absente) |
| `removeItem` | `(key: string) => void` | Supprime une entrée |

```typescript
const store = new LocalStorageJson('mon-app')

store.setItem('user', { name: 'Alice' })
console.log(store.getItem('user'))           // → { name: 'Alice' }
console.log(store.getItem('absent', 'N/A'))  // → 'N/A'
console.log(store.keys)                      // → ['user']

store.evt.on('change', (key) => {
  console.log(`La clé "${key}" a été modifiée`)
})
```

---

### `WinPropsListener`

```typescript
import WinPropsListener from './src/classes/WinPropsListener'
```

Écoute les propriétés de la fenêtre navigateur en temps réel. Conçu pour être intégré dans un contexte réactif (Vue, React…).

**Méthodes :**

| Méthode | Description |
|---|---|
| `init()` | Branche les listeners resize/scroll/online — **à appeler une fois** |

**Propriétés publiques :**

| Propriété | Type | Description |
|---|---|---|
| `scroll` | `{ x: Number, y: Number }` | Position courante du défilement |
| `width` | `number` | Largeur de la fenêtre (`innerWidth`) |
| `height` | `number` | Hauteur de la fenêtre (`innerHeight`) |
| `isOnline` | `boolean` | `true` si le navigateur est connecté à internet |

```typescript
const win = new WinPropsListener()
win.init()

console.log(win.width)     // → 1440
console.log(win.scroll.y)  // → 0
console.log(win.isOnline)  // → true
```

---

## Colors

### `atomFileSizeColor`

```typescript
import atomFileSizeColor from './src/colors/atomFileSizeColor'
```

**Signature :** `atomFileSizeColor(bytes: number): string`

Retourne une couleur hexadécimale qui représente visuellement la "dangerosité" d'une taille de fichier : du vert (petit) au rouge (très grand).

| Plage | Couleurs |
|---|---|
| < 10 Mo | Vert → Jaune |
| 10 Mo – 200 Mo | Orange → Rouge orangé |
| > 200 Mo | Rouge orangé → Rouge foncé |

```typescript
atomFileSizeColor(500 * 1024)          // → '#17d32f'  (500 Ko, vert)
atomFileSizeColor(50 * 1024 * 1024)    // → orange
atomFileSizeColor(500 * 1024 * 1024)   // → '#b2001f'  (500 Mo, rouge foncé)
```

---

### `blendColors`

```typescript
import blendColors from './src/colors/blendColors'
```

**Signature :** `blendColors(hexColorA: string, hexColorB: string, amount: number): string`

Mélange deux couleurs hexadécimales. `amount` varie de `0` (100 % couleur A) à `1` (100 % couleur B).

```typescript
blendColors('#ff0000', '#0000ff', 0.5)   // → '#800080'  (violet)
blendColors('#ffffff', '#000000', 0.25)  // → '#bfbfbf'
blendColors('#ff0000', '#0000ff', 0)     // → '#ff0000'  (couleur A intacte)
```

---

## Date

### `date19991231_2359`

```typescript
import date19991231_2359 from './src/date/date19991231_2359'
```

**Signature :** `date19991231_2359(d: Date): string`

Formate une date en chaîne compacte `YYYYMMDD-HHmm`. Utile pour les noms de fichiers horodatés.

```typescript
date19991231_2359(new Date('1999-12-31T23:59:00'))
// → '19991231-2359'

date19991231_2359(new Date())
// → '20260401-1430'  (selon la date courante)
```

---

### `dateFormat`

```typescript
import dateFormat from './src/date/dateFormat'
```

**Signature :** `dateFormat(date: Date | string, localeCode?: string, fmt?: Intl.DateTimeFormatOptions | null): string`

Formate une date avec `Intl.DateTimeFormat`. Accepte un objet `Date` ou une chaîne au format `YYYY-MM-DD HH:mm:ss`. Retourne une chaîne vide si la date est invalide.

```typescript
dateFormat(new Date(), 'fr')
// → 'mercredi 01 avril 2026 à 14:30'

dateFormat('2026-01-01 14:30:00', 'fr', { year: 'numeric', month: 'long', day: '2-digit' })
// → '01 janvier 2026'

dateFormat(new Date(), 'en')
// → 'Wednesday, April 01, 2026 at 02:30 PM'
```

---

### `msToHHMMSS`

```typescript
import msToHHMMSS from './src/date/msToHHMMSS'
```

**Signature :** `msToHHMMSS(ms: number): string`

Convertit des millisecondes en chaîne formatée `HH:MM:SS`.

```typescript
msToHHMMSS(3661000)  // → '01:01:01'
msToHHMMSS(90000)    // → '00:01:30'
msToHHMMSS(0)        // → '00:00:00'
```

---

## Files

### `downloadBlob`

```typescript
import downloadBlob from './src/files/downloadBlob'
```

**Signature :** `downloadBlob(blob: Blob, name?: string): void`

Déclenche le téléchargement d'un `Blob` dans le navigateur via un lien temporaire.

```typescript
const blob = new Blob(['Contenu du fichier'], { type: 'text/plain' })
downloadBlob(blob, 'export.txt')

// Télécharger un JSON
const data = JSON.stringify({ a: 1 })
downloadBlob(new Blob([data], { type: 'application/json' }), 'data.json')
```

---

### `extension`

```typescript
import extension from './src/files/extension'
```

**Signature :** `extension(file: string | Blob, dot?: boolean): string`

Retourne l'extension d'un fichier depuis son nom (string) ou un objet `File`/`Blob`. Le paramètre `dot` permet d'inclure le point de séparation.

```typescript
extension('photo.jpeg')        // → 'jpeg'
extension('photo.jpeg', true)  // → '.jpeg'
extension(myFileObject)        // → 'pdf'
extension('sans-extension')    // → ''
```

---

### `filePath`

```typescript
import filePath from './src/files/filePath'
```

**Signature :** `filePath(file: File | any): string`

Retourne le chemin relatif d'un fichier issu d'un `<input>` ou d'un drop. Gère les propriétés `webkitRelativePath`, `filepath` et `path`.

```typescript
filePath(file)
// → 'dossier/sous-dossier/image.png'
```

---

### `fileListToArray`

```typescript
import fileListToArray from './src/files/fileListToArray'
```

**Signature :** `fileListToArray(fileList: FileList): File[]`

Convertit un objet `FileList` (issu d'un `<input type="file">`) en tableau `File[]`.

```typescript
input.addEventListener('change', (e) => {
  const files = fileListToArray((e.target as HTMLInputElement).files!)
  files.forEach(f => console.log(f.name))
})
```

---

### `humanFileSize`

```typescript
import humanFileSize from './src/files/humanFileSize'
```

**Signature :** `humanFileSize(bytes: number, locale?: string, standard?: 'si' | 'iec' | 'jedec'): string`

Convertit un nombre d'octets en chaîne lisible. La locale `fr` adapte les unités (Mo, Go…) et remplace le point décimal par une virgule.

```typescript
humanFileSize(1_500_000)             // → '1.50 MB'
humanFileSize(1_500_000, 'fr')       // → '1,50 Mo'
humanFileSize(1_500_000, 'fr', 'iec') // → '1,43 Mio'
humanFileSize(512)                   // → '512 B'
```

---

### `mbps`

```typescript
import mbps from './src/files/mbps'
```

**Signature :** `mbps(bytes: number, milliseconds: number): number`

Calcule une vitesse de transfert en Mbit/s à partir d'une quantité d'octets et d'une durée.

```typescript
mbps(5 * 1024 * 1024, 2000)
// → 20.97  (environ 21 Mbps pour 5 Mo transférés en 2 s)
```

---

### `mimeToMdi`

```typescript
import mimeToMdi from './src/files/mimeToMdi'
```

**Signature :** `mimeToMdi(mime: string): string`

Retourne l'identifiant d'une icône [Material Design Icons](https://pictogrammers.com/library/mdi/) correspondant au type MIME fourni.

```typescript
mimeToMdi('application/pdf')        // → 'mdi-file-pdf-outline'
mimeToMdi('image/png')              // → 'mdi-image'
mimeToMdi('video/mp4')              // → 'mdi-file-video-outline'
mimeToMdi('audio/mpeg')             // → 'mdi-file-music-outline'
mimeToMdi('application/zip')        // → 'mdi-folder-zip-outline'
mimeToMdi('application/msword')     // → 'mdi-file-word-outline'
mimeToMdi('text/plain')             // → 'mdi-file-document-outline'
```

---

### `rootPathName`

```typescript
import rootPathName from './src/files/rootPathName'
```

**Signature :** `rootPathName(filePath: string): string`

Retourne le premier segment d'un chemin de fichier (le dossier racine, ou le nom du fichier s'il est à la racine).

```typescript
rootPathName('dossier/sous-dossier/fichier.txt')  // → 'dossier'
rootPathName('fichier.txt')                        // → 'fichier.txt'
```

---

### `trimSlashes`

```typescript
import trimSlashes from './src/files/trimSlashes'
```

**Signature :** `trimSlashes(filePath: string): string`

Supprime les slashes en début et en fin de chaîne.

```typescript
trimSlashes('/mon/chemin/')  // → 'mon/chemin'
trimSlashes('/fichier')      // → 'fichier'
trimSlashes('chemin/')       // → 'chemin'
```

---

## Geo

### `distanceLatLng`

```typescript
import { distanceLatLng } from './src/geo/distanceLatLng'
```

**Signature :** `distanceLatLng(lat1: number, lng1: number, lat2: number, lng2: number): number`

Calcule la distance en **mètres** entre deux coordonnées GPS en utilisant la formule de Haversine.

```typescript
// Distance Paris → Marseille
distanceLatLng(48.8566, 2.3522, 43.2965, 5.3698)
// → ~660 000  (environ 660 km)

// Distance en km
const km = distanceLatLng(48.8566, 2.3522, 43.2965, 5.3698) / 1000
// → ~660
```

---

## Human Spoken

### `humanSpokenJoin`

```typescript
import { humanSpokenJoin } from './src/human-spoken/humanSpokenJoin'
```

**Signature :** `humanSpokenJoin(words: string[], locale: string): string`

Assemble un tableau de mots en remplaçant la dernière virgule par le connecteur de la langue choisie.

| Locale | Connecteur |
|---|---|
| `fr` | et |
| `en` | and |
| `es` | y |

```typescript
humanSpokenJoin(['Alice', 'Bob', 'Charlie'], 'fr')
// → 'Alice, Bob et Charlie'

humanSpokenJoin(['Alice', 'Bob'], 'en')
// → 'Alice and Bob'

humanSpokenJoin(['uno', 'dos', 'tres'], 'es')
// → 'uno, dos y tres'
```

---

## Magics

### `Folks`

```typescript
import { Folks } from './src/magics/Folks'
```

Classe de stockage de propriétés dynamiques. Utile pour détecter si une valeur est définie pour la première fois dans un flux d'exécution.

**Méthodes :**

| Méthode | Signature | Description |
|---|---|---|
| `getItem` | `(propName: string) => any` | Retourne la valeur d'une propriété |
| `setItem` | `(propName: string, value: any) => void` | Définit une propriété |
| `getAndSetItem` | `(propName: string, valueToSet: any) => any \| false` | Retourne la valeur si elle existe, sinon la définit et retourne `false` |

```typescript
const folks = new Folks()

folks.getAndSetItem('visited', true)  // → false  (1re fois : valeur définie, retourne false)
folks.getAndSetItem('visited', true)  // → true   (déjà défini, retourne la valeur)

folks.setItem('count', 0)
folks.getItem('count')  // → 0
```

---

## Math

### `clamp`

```typescript
import clamp from './src/math/clamp'
```

**Signature :** `clamp(num: number, min: number, max: number): number`

Contraint un nombre dans l'intervalle `[min, max]`.

```typescript
clamp(15, 0, 10)   // → 10  (trop grand)
clamp(-5, 0, 10)   // → 0   (trop petit)
clamp(7, 0, 10)    // → 7   (déjà dans l'intervalle)
```

---

### `compactNumber`

```typescript
import compactNumber from './src/math/compactNumber'
```

**Signature :** `compactNumber(number: number): string`

Formate un grand nombre en notation compacte (sans décimales).

```typescript
compactNumber(25648)    // → '26K'
compactNumber(1200000)  // → '1M'
compactNumber(999)      // → '999'
```

---

### `deg2rad`

```typescript
import { deg2rad } from './src/math/deg2rad'
```

**Signature :** `deg2rad(degrees: number): number`

Convertit des degrés en radians.

```typescript
deg2rad(180)  // → 3.14159…  (π)
deg2rad(90)   // → 1.5708…   (π/2)
deg2rad(0)    // → 0
```

---

### `floorTo`

```typescript
import floorTo from './src/math/floorTo'
```

**Signature :** `floorTo(number: number, precision: number): number`

Arrondit un nombre à l'inférieur au palier de précision le plus proche.

```typescript
floorTo(163, 5)    // → 160
floorTo(167, 5)    // → 165
floorTo(160, 100)  // → 100
floorTo(199, 100)  // → 100
```

---

### `formatMoney`

```typescript
import formatMoney from './src/math/formatMoney'
```

**Signature :** `formatMoney(amount: number, currency?: string): string`

Formate un montant en devise avec `Intl.NumberFormat` (locale `fr-FR`, devise `EUR` par défaut).

```typescript
formatMoney(1234.5)          // → '1 234,50 €'
formatMoney(1234.5, 'USD')   // → '1 234,50 $US'
formatMoney(0.99, 'GBP')     // → '0,99 £GB'
```

---

### `formatNumber`

```typescript
import formatNumber from './src/math/formatNumber'
```

**Signature :** `formatNumber(number: number): string`

Formate un nombre avec les séparateurs de milliers selon la locale système.

```typescript
formatNumber(15312)     // → '15 312'  (fr) ou '15,312' (en)
formatNumber(1000000)   // → '1 000 000'
```

---

### `lerp`

```typescript
import { lerp } from './src/math/lerp'
```

**Signature :** `lerp(previous: number, target: number, factor: number): number`

Interpolation linéaire entre deux valeurs. `factor` entre `0` (valeur précédente) et `1` (valeur cible). Idéal pour les animations fluides.

```typescript
lerp(0, 100, 0.5)    // → 50
lerp(0, 100, 0.1)    // → 10
lerp(100, 200, 0.25) // → 125

// Animation fluide (dans une boucle)
let current = 0
current = lerp(current, targetValue, 0.1)
```

---

### `rand`

```typescript
import { rand } from './src/math/rand'
```

**Signature :** `rand(min: number, max: number, isFloat?: boolean): number`

Retourne un nombre aléatoire entre `min` et `max` inclus. Si `isFloat` est `true`, retourne un nombre à virgule flottante.

```typescript
rand(1, 6)          // → 4      (entier, simulation d'un dé)
rand(0, 1, true)    // → 0.734… (flottant)
rand(10, 20)        // → 15
```

---

### `ratio`

```typescript
import { ratio } from './src/math/ratio'
```

**Signature :** `ratio(input: number, minInput: number, maxInput: number, minOutput: number, maxOutput: number): number`

Projette une valeur d'une plage d'entrée vers une plage de sortie (remapping / mise à l'échelle).

```typescript
ratio(5, 0, 10, 0, 100)    // → 50    (5 sur [0–10] → 50 sur [0–100])
ratio(0, -1, 1, 0, 255)    // → 127.5
ratio(1, 0, 1, 0, 360)     // → 360   (conversion en degrés)
```

---

### `roundTo`

```typescript
import roundTo from './src/math/roundTo'
```

**Signature :** `roundTo(num: number, precision: number): number`

Arrondit un nombre au palier de précision le plus proche (supérieur ou inférieur).

```typescript
roundTo(163, 5)     // → 165
roundTo(16, 5)      // → 15
roundTo(160, 100)   // → 200
roundTo(1.236, 0.01) // → 1.24  (arrondi à 2 décimales)
```

---

## Mouse

### `mouseRelativePosition`

```typescript
import { mouseRelativePosition } from './src/mouse/mouseRelativePosition'
```

**Signature :** `mouseRelativePosition(container: HTMLElement, mouseEvent: MouseEvent | PointerEvent): { x: number, y: number }`

Retourne la position du curseur en coordonnées relatives à un élément HTML (coin supérieur gauche = `{x: 0, y: 0}`).

```typescript
element.addEventListener('mousemove', (e) => {
  const pos = mouseRelativePosition(element, e)
  console.log(pos.x, pos.y)  // ex. → { x: 42, y: 18 }
})
```

---

## Objects

### `keySortAlpha`

```typescript
import keySortAlpha from './src/objects/keySortAlpha'
```

**Signature :** `keySortAlpha(data: object): object`

Retourne un nouvel objet avec les clés triées par ordre alphabétique.

```typescript
keySortAlpha({ zebra: 3, alpha: 1, mango: 2 })
// → { alpha: 1, mango: 2, zebra: 3 }
```

---

### `toPlainJson`

```typescript
import toPlainJson from './src/objects/toPlainJson'
```

**Signature :** `toPlainJson(value: any): any`

Clone en profondeur une valeur en ne conservant que les données sérialisables en JSON. Supprime les méthodes, `Date`, `Map`, `Set`, `Symbol`, les références circulaires, etc.

```typescript
toPlainJson({ a: 1, fn: () => {} })
// → { a: 1 }  (la fonction est supprimée)

toPlainJson([1, 2, { b: 'ok' }])
// → [1, 2, { b: 'ok' }]  (nouvelle référence)
```

---

## String

### `ellipsis`

```typescript
import { ellipsis } from './src/string/ellipsis'
```

**Signature :** `ellipsis(str: string, maxLength: number, options?: { suffix?: string, trimEnd?: boolean }): string`

Tronque une chaîne et ajoute un suffixe (par défaut `…`) si elle dépasse la longueur maximale. La longueur maximale inclut le suffixe.

```typescript
ellipsis('Bonjour tout le monde', 10)
// → 'Bonjour to…'

ellipsis('Bonjour tout le monde', 10, { suffix: '...' })
// → 'Bonjour...'

ellipsis('Court', 10)
// → 'Court'  (pas de troncature)
```

---

### `formatPercent`

```typescript
import formatPercent from './src/string/formatPercent'
```

**Signature :** `formatPercent(percent: number, langCode?: string): string`

Formate un pourcentage avec zéro de remplissage pour obtenir 4 caractères avant la virgule (`09.5`). Supporte la locale `fr` (virgule décimale).

```typescript
formatPercent(9.5)         // → '09.5'
formatPercent(9.5, 'fr')   // → '09,5'
formatPercent(100)         // → '100.0'
formatPercent(0.3)         // → '00.3'
```

---

### `htmlToText`

```typescript
import { htmlToText } from './src/string/htmlToText'
```

**Signature :** `htmlToText(html: string): string`

Convertit une chaîne HTML en texte brut : supprime toutes les balises et normalise les espaces.

```typescript
htmlToText('<p>Bonjour <strong>le monde</strong></p>')
// → 'Bonjour le monde'

htmlToText('<ul><li>Un</li><li>Deux</li></ul>')
// → 'Un Deux'
```

---

### `isHtmlEmpty`

```typescript
import isHtmlEmpty from './src/string/isHtmlEmpty'
```

**Signature :** `isHtmlEmpty(htmlString: string): boolean`

Retourne `true` si le HTML ne contient aucun contenu textuel visible (après parsing du DOM).

```typescript
isHtmlEmpty('<p></p>')           // → true
isHtmlEmpty('<p>   </p>')        // → true
isHtmlEmpty('<p>&nbsp;</p>')     // → false
isHtmlEmpty('<p>Bonjour</p>')    // → false
```

---

### `kebabCase`

```typescript
import { kebabCase } from './src/string/case-manipulation/kebabCase'
```

**Signature :** `kebabCase(string: string): string`

Convertit une chaîne camelCase, PascalCase, snake_case ou avec espaces en `kebab-case`.

```typescript
kebabCase('MonComposantVue')   // → 'mon-composant-vue'
kebabCase('hello world')       // → 'hello-world'
kebabCase('foo_bar_baz')       // → 'foo-bar-baz'
```

---

### `plural`

```typescript
import plural from './src/string/plural'
```

**Signature :** `plural(count: number | Array<any>, ifOne: string, ifMany: string, ifZero?: string | null): string`

Retourne le texte approprié selon le nombre. `count` peut être un nombre ou un tableau (sa longueur est utilisée). Si `ifZero` n'est pas fourni, `ifMany` est utilisé pour zéro.

```typescript
plural(1, '1 résultat', '{n} résultats')
// → '1 résultat'

plural(5, '1 résultat', '{n} résultats')
// → '{n} résultats'

plural(0, '1 résultat', '{n} résultats', 'Aucun résultat')
// → 'Aucun résultat'

plural(['a', 'b', 'c'], '1 item', 'plusieurs items')
// → 'plusieurs items'
```

---

### `randString`

```typescript
import randString from './src/string/randString'
```

**Signature :** `randString(strLen?: number, characters?: string): string`

Génère une chaîne aléatoire. Par défaut : 20 caractères alphanumériques minuscules.

```typescript
randString()                          // → 'k7x2mq9plf3nzb1owr4s'  (20 chars)
randString(8)                         // → 'a3f9k2xz'
randString(6, 'ABCDEF0123456789')     // → 'B3FA1C'
```

---

### `removeAccents`

```typescript
import { removeAccents } from './src/string/removeAccents'
```

**Signature :** `removeAccents(text: string): string`

Supprime les accents et diacritiques d'une chaîne via la décomposition Unicode NFD.

```typescript
removeAccents('éàüñç')   // → 'eaunc'
removeAccents('Héros')   // → 'Heros'
removeAccents('café')    // → 'cafe'
```

---

### `safeFileName`

```typescript
import { safeFileName } from './src/string/safeFileName'
```

**Signature :** `safeFileName(fileName: string): string`

Remplace tous les caractères non sûrs pour un nom de fichier (`/ \ ? % * : | " < >` et les espaces) par des tirets. Les tirets consécutifs sont fusionnés.

```typescript
safeFileName('Mon fichier (2026).txt')  // → 'Mon-fichier-(2026).txt'
safeFileName('foo/bar:baz')             // → 'foo-bar-baz'
safeFileName('hello   world')           // → 'hello-world'
```

---

### `specialChars`

```typescript
import specialChars from './src/string/specialChars'
```

Objet contenant des caractères spéciaux Unicode prêts à l'emploi.

| Clé | Valeur | Description |
|---|---|---|
| `specialChars.triangle.up` | `▲` | Triangle pointant vers le haut |
| `specialChars.triangle.down` | `▼` | Triangle pointant vers le bas |
| `specialChars.arrow.up` | `↑` | Flèche vers le haut |
| `specialChars.arrow.down` | `↓` | Flèche vers le bas |
| `specialChars.close` | `✕` | Croix de fermeture |
| `specialChars.check` | `✓` | Coche de validation |
| `specialChars.star` | `★` | Étoile pleine |
| `specialChars.warning` | `⚠` | Symbole d'avertissement |

```typescript
btn.textContent = `Fermer ${specialChars.close}`
badge.textContent = specialChars.check + ' Validé'
```

---

### `trimEmail`

```typescript
import trimEmail from './src/string/trimEmail'
```

**Signature :** `trimEmail(email: string, maxLength?: number): string`

Tronque un email trop long pour qu'il ne dépasse pas `maxLength` caractères (défaut : 14), en préservant lisiblement le domaine.

```typescript
trimEmail('utilisateur.long@example.com', 20)
// → 'utilisa...@example.com'

trimEmail('a@b.fr', 14)
// → 'a@b.fr'  (déjà assez court)
```

---

## Type Checking

### `basicTypeOf`

```typescript
import { basicTypeOf } from './src/type-checking/basicTypeOf'
```

**Signature :** `basicTypeOf(element: any): 'array' | 'object' | 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'bigint' | 'symbol' | 'function'`

Comme l'opérateur `typeof` natif, mais corrige deux cas problématiques : retourne `'array'` pour les tableaux et `'null'` pour `null` (contrairement à `typeof` qui retourne `'object'` dans les deux cas).

```typescript
basicTypeOf([1, 2, 3])    // → 'array'      (typeof → 'object' ❌)
basicTypeOf(null)          // → 'null'       (typeof → 'object' ❌)
basicTypeOf('hello')       // → 'string'
basicTypeOf(42)            // → 'number'
basicTypeOf({})            // → 'object'
basicTypeOf(undefined)     // → 'undefined'
basicTypeOf(() => {})      // → 'function'
```

---

## TypeCast

### `isInstanceOf`

```typescript
import isInstanceOf from './src/typeCast/isInstanceOf'
```

**Signature :** `isInstanceOf(object: any, instances: any[]): boolean`

Vérifie si un objet est une instance d'au moins une des classes fournies dans le tableau.

```typescript
isInstanceOf(new Date(), [Date, Map])     // → true
isInstanceOf(new Map(), [Date, Map])      // → true
isInstanceOf('texte', [Date, Map])        // → false
```

---

### `isString`

```typescript
import isString from './src/typeCast/isString'
```

**Signature :** `isString(variable: any): boolean`

Vérifie si une variable est une chaîne de caractères. Gère à la fois les littéraux (`'hello'`) et les objets `String` (`new String('hello')`).

```typescript
isString('bonjour')          // → true
isString(new String('abc'))  // → true
isString(42)                 // → false
isString(null)               // → false
```

---

## Valid

### `CnilPasswordChecker`

```typescript
import CnilPasswordChecker from './src/valid/CnilPasswordChecker'
```

Classe de validation d'un mot de passe selon les recommandations **CNIL 2022** (option A — sans double authentification). Expose chaque règle individuellement pour permettre un retour visuel détaillé.

**Règles vérifiées :**
- Au moins 12 caractères
- Au moins 1 lettre majuscule
- Au moins 1 lettre minuscule
- Au moins 1 chiffre
- Au moins 1 caractère spécial (`!@#$`…)

**API :**

| Propriété / Setter | Type | Description |
|---|---|---|
| `pwd` *(setter)* | `string` | Mot de passe à évaluer |
| `rules` | `PasswordRule[]` | Toutes les règles avec leur statut (`ok`) |
| `errors` | `string[]` | Libellés des règles **non respectées** |
| `successes` | `string[]` | Libellés des règles **respectées** |
| `isValid` | `boolean` | `true` si **toutes** les règles sont OK |
| `CnilPasswordChecker.lang` | `LangCode` | Langue courante des libellés (`fr`, `en`, `es`, `de`, `it`, ou custom) |
| `CnilPasswordChecker.RULE_DEFS` | `Omit<PasswordRule, 'ok'>[]` | Définitions de règles dans la langue courante |

**Types exportés :** `PasswordRule`, `Lang`, `LangCode`, `RuleKey`, `LangTranslations`.

```typescript
const checker = new CnilPasswordChecker()
checker.pwd = 'MonMotDePasse1!'

console.log(checker.isValid)
// → true

console.log(checker.errors)
// → []

console.log(checker.rules)
// → [
//   { key: 'minLength',   label: 'Au moins 12 caractères',            ok: true },
//   { key: 'hasUppercase', label: 'Au moins 1 lettre majuscule',      ok: true },
//   { key: 'hasLowercase', label: 'Au moins 1 lettre minuscule',      ok: true },
//   { key: 'hasDigit',     label: 'Au moins 1 chiffre',               ok: true },
//   { key: 'hasSpecial',   label: 'Au moins 1 caractère spécial (…)', ok: true },
// ]

checker.pwd = 'faible'
console.log(checker.errors)
// → ['Au moins 12 caractères', 'Au moins 1 lettre majuscule', 'Au moins 1 chiffre', 'Au moins 1 caractère spécial (…)']

// Changer la langue des libellés intégrés
CnilPasswordChecker.lang = 'en'
console.log(checker.rules.map((r) => r.label))
// → ['At least 12 characters', 'At least 1 uppercase letter', ...]

// Ajouter une langue personnalisée
CnilPasswordChecker.addLang('pt', {
  minLength: 'Pelo menos 12 caracteres',
  hasUppercase: 'Pelo menos 1 letra maiúscula',
  hasLowercase: 'Pelo menos 1 letra minúscula',
  hasDigit: 'Pelo menos 1 dígito',
  hasSpecial: 'Pelo menos 1 caractere especial (!@#$…)',
})
CnilPasswordChecker.lang = 'pt'
```

---

### `isStrongPassword`

```typescript
import { isStrongPassword } from './src/valid/isStrongPassword'
```

**Signature :** `isStrongPassword(password: string): boolean`

Raccourci vers `CnilPasswordChecker`. Retourne `true` si le mot de passe respecte toutes les recommandations CNIL 2022.

```typescript
isStrongPassword('MonMotDePasse1!')  // → true
isStrongPassword('1234')             // → false
isStrongPassword('motdepasse')       // → false  (pas de maj, chiffre, spécial)
```

---

### `isValidEmail`

```typescript
import { isValidEmail } from './src/valid/isValidEmail'
```

**Signature :** `isValidEmail(email: string): boolean`

Vérifie la validité syntaxique d'une adresse e-mail par expression régulière.

```typescript
isValidEmail('alice@example.com')    // → true
isValidEmail('alice@sub.domain.io')  // → true
isValidEmail('pas-un-email')         // → false
isValidEmail('@example.com')         // → false
```

---

### `isValidUrl`

```typescript
import { isValidUrl } from './src/valid/isValidUrl'
```

**Signature :** `isValidUrl(url: string): boolean`

Vérifie la validité d'une URL. Le protocole `http://` ou `https://` est optionnel. Supporte les domaines, les IPs, les ports et les query strings.

```typescript
isValidUrl('https://example.com/chemin?q=1')  // → true
isValidUrl('example.com')                      // → true
isValidUrl('192.168.1.1:8080')                 // → true
isValidUrl('pas une url')                      // → false
```

---

## Window

### `IframeMessageSender`

```typescript
import IframeMessageSender from './src/window/IframeMessageSender'
```

Classe pour envoyer des messages `postMessage` à une iframe ciblée par un sélecteur CSS.

**Constructeur :** `new IframeMessageSender(iframeSelector: string)`

**Propriétés :**

| Propriété | Type | Description |
|---|---|---|
| `evt` | `EventEmitter` | EventEmitter pour écouter les réponses |

**Méthodes :**

| Méthode | Signature | Description |
|---|---|---|
| `postMessage` | `(data: any) => void` | Envoie un message à l'iframe |
| `$iframeExists` | `() => boolean` | Vérifie si l'iframe est présente dans le DOM |

```typescript
const sender = new IframeMessageSender('#mon-iframe')

if (sender.$iframeExists()) {
  sender.postMessage({ type: 'REFRESH', payload: { id: 42 } })
}
```
