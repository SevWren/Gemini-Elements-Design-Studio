import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-camera-capture',
  standalone: true,
  templateUrl: './camera-capture.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraCaptureComponent implements OnChanges, OnDestroy {
  @Input() isOpen: boolean = false; 
  @Output() imageCapture = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement?: ElementRef<HTMLCanvasElement>;

  stream: MediaStream | null = null;
  error = signal<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['isOpen'] && changes['isOpen'].currentValue === true && !this.stream) {
          this.openCamera();
      } else if (changes['isOpen'] && changes['isOpen'].currentValue === false) {
          this.closeCameraStream();
      }
  }
  
  ngOnDestroy(): void {
    this.closeCameraStream();
  }

  async openCamera(): Promise<void> {
    this.error.set(null);
    
    // Defer to allow view to initialize
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      this.error.set('Could not access the camera. Please ensure permissions are granted and no other application is using it.');
    }
  }

  captureImage(): void {
    if (this.videoElement && this.canvasElement) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/png');
        this.imageCapture.emit(dataUrl);
        this.close();
      }
    }
  }
  
  close(): void {
    this.closeModal.emit();
  }

  private closeCameraStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
  }
}