import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
import { StoreService } from '../services/store.service'

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnDestroy, OnInit {

  @Input() typeScanner: ETypeScanner;
  image = null;
  cameraActive: boolean = false;

  constructor(
    private _storeService: StoreService
    ) {}

  ngOnDestroy() {
    this.stopCamera();
  }

  ngOnInit(){
    this.stopCamera()
  }


  async openCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      position: this.typeScanner === ETypeScanner.face ? 'front' : 'rear',
      parent: 'cameraPreview',
      className: 'cameraPreview',
      lockAndroidOrientation: true,
      disableAudio: true,
      disableExifHeaderStripping: true,
      toBack: false,
      width: window.screen.width / 2,
      height: window.screen.height / 2,
      paddingBottom: 250,
      enableHighResolution: true,
      rotateWhenOrientationChanged: true,
    };

    await CameraPreview.start(cameraPreviewOpts);
    this.cameraActive = true;
  }

  async stopCamera() {
    CameraPreview.stop();
    this.cameraActive = false;
  }

  async captureImage() {

    const pictureOpts: CameraPreviewPictureOptions = {
      width: this.typeScanner === ETypeScanner.face ? 400 : 500,
      height: this.typeScanner === ETypeScanner.face ? 400 : 250,
      quality: 90,
    };

    const result = await CameraPreview.capture(pictureOpts);
    this.image= `data:image/jpeg;base64,${result.value}`;

    await this._storeService.saveInDisk('scanner', result.value);

    await this.stopCamera();
    this.cameraActive = false;
  }

  async flipCamera() {
    CameraPreview.flip();
  }
}

export enum ETypeScanner{
  face = 'face',
  document = 'document'
}
