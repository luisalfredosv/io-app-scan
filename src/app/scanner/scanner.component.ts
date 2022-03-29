import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent {
  image = null;
  cameraActive: boolean = false;

  constructor(private _sanitizer: DomSanitizer) {}

  async openCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraPreview',
      className: 'cameraPreview',
      lockAndroidOrientation: true,
      disableAudio: true,
    };

    CameraPreview.start(cameraPreviewOpts);
    this.cameraActive = true;
  }

  async stopCamera() {
    CameraPreview.stop();
    this.cameraActive = false;
  }

  async captureImage() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 400,
      height: 400,
      quality: 90,
    };

    const result = await CameraPreview.capture(pictureOpts);
    this.image= `data:image/jpeg;base64,${result.value}`;

    await this.stopCamera();
    this.cameraActive = false;
  }

  async flipCamera() {
    CameraPreview.flip();
  }
}
