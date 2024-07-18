import EventEmitter from "eventemitter3";

declare interface FileDropperEmitter {
  on(event: 'filesDropped', listener: (files: File[]) => void): this;

  on(event: 'hover', listener: () => void): this;

  on(event: 'enter', listener: () => void): this;

  on(event: 'leave', listener: () => void): this;


}

class FileDropperEmitter extends EventEmitter {
  filesDropped(files: File[]) {
    this.emit('filesDropped', files)
  }

  hover() {
    this.emit('hover')
    this.emit('enter')
  }

  leave() {
    this.emit('leave')
  }
}


/**
 * Main purpose here is to extract files from a drop event.
 * @sorry Due to FileSystemEntry vs WebkitFileEntry vs FileEntry lacks there is a lot of tsignore here...
 */
export default class FileDropper extends FileDropperEmitter {


  /**
   * Is the zone file hovered ?
   */
  private _isHover = false;

  private _dragoutTimeOut?: number


  constructor($element?: HTMLElement) {
    super();

    if ($element) {
      $element.addEventListener("drop", e => this.onDrop(e));
      $element.addEventListener("dragenter", e => this.allowDrag(e));
      $element.addEventListener("dragover", e => this.allowDrag(e));
      $element.addEventListener("dragleave", () => this.isHover = false);
    }
    this._isHover = false;
  }

  /**
   * use it to allow file dnd operations.
   * @dragenter=allowDrag($event)
   * @dragover=allowDrag($event)
   * @param evt
   */
  private allowDrag(evt: DragEvent | Event) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    this.isHover = true;
    if (evt instanceof DragEvent && evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'copy';
    }
    evt.preventDefault();
  }

  /**
   * use it to catch file drop operations.
   * @drop=onDrop($event)
   * @param evt
   */
  private onDrop(evt: Event | DragEvent) {
    evt.preventDefault();
    this.isHover = false;
    if (evt instanceof DragEvent) {
      if (evt.dataTransfer === null) {
        console.warn("this is a h5478dio dataTransfer null error")
        return;
      }
      this.getFilesWebkitDataTransferItems(evt.dataTransfer.items)
        .then(
          // @ts-ignore
          (files: File[]) => {
            if (files.length > 0) {
              this.emit("filesDropped", files);
            } else {
              console.warn("this is a bfoz54d files.length zero error")
            }
          })
    } else {
      console.warn("this is a fu41ehckf not a DragEvent error")
    }
  }

  private getFilesWebkitDataTransferItems(dataTransferItems: DataTransferItemList) {
    const files: File[] = []

    function traverseFileTreePromise(item: FileSystemDirectoryEntry | FileSystemFileEntry | FileSystemEntry, path = '') {
      return new Promise(resolve => {
        if (item && item.isFile && item) {
          if ("file" in item) {
            item.file(file => {
              // @ts-ignore
              file.filepath = path + file.name //save full path
              files.push(file)
              resolve(file)
            }, (err) => {
              // this file can't be accessed, this is probably an OS protected file...
              console.warn("This is a file gu75u4t error dude!", err)
              resolve(null)
            })
          } else {
            console.warn("This is a file gu75u4t error dude!");
          }
        } else if (item && item.isDirectory) {
          // @ts-ignore
          const dirReader = item.createReader();
          const entriesPromises: any[] = []

          //here we need to do it recursive cause its
          // eslint-disable-next-line no-inner-declarations
          function readRecursive() {
            dirReader.readEntries(
              // @ts-ignore
              (entries) => {
                if (entries.length > 0) {
                  for (const entry of entries) {
                    entriesPromises.push(
                      traverseFileTreePromise(entry, path + item.name + "/")
                    )
                  }
                  readRecursive();
                } else {
                  //all files are read
                  resolve(Promise.all(entriesPromises))
                }
              }, (err: any) => {
                console.warn("This is a directory f475urt error dude!", err)
              });
          }

          readRecursive();
        } else {
          console.warn("This is an item unknown dyc845eo5 error dude!", item)
          resolve(null)
        }
      })
    }

    return new Promise((resolve) => {
      const entriesPromises = []
      // @ts-ignore
      for (const it of dataTransferItems)
        entriesPromises.push(traverseFileTreePromise(it.webkitGetAsEntry()))
      Promise.all(entriesPromises)
        .then(() => {
          resolve(files)
        })
    })
  }

  get isHover(): boolean {
    return this._isHover;
  }

  set isHover(value: boolean) {
    if (value !== this.isHover) {
      if (this._dragoutTimeOut) {
        clearTimeout(this._dragoutTimeOut);
      }
      if (value) {
        this.hover();
      } else {
        this._dragoutTimeOut = window.setTimeout(() => {
          this.leave();
        }, 100)

      }
    }
    this._isHover = value;
  }

}



