import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { CameraCaptureComponent } from '../camera-capture/camera-capture.component';

@Component({
  selector: 'app-image-analyzer',
  templateUrl: './image-analyzer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingSpinnerComponent, SafeHtmlPipe, CameraCaptureComponent],
})
export class ImageAnalyzerComponent {
  private readonly geminiService = inject(GeminiService);

  prompt = signal<string>('Describe this user interface. What are its strengths and weaknesses? Suggest improvements for accessibility.');
  isLoading = signal<boolean>(false);
  result = signal<string | null>(null);
  error = signal<string | null>(null);
  
  uploadedImage = signal<{ base64: string; mimeType: string; name: string } | null>(null);
  isCameraOpen = signal<boolean>(false);

  formattedResult = computed(() => this.result()?.replace(/\n/g, '<br>'));

  async analyzeImage(): Promise<void> {
    if (!this.prompt().trim() || !this.uploadedImage()) {
      this.error.set('Please upload an image and provide a prompt.');
      return;
    }

    this.isLoading.set(true);
    this.result.set(null);
    this.error.set(null);

    try {
      const { base64, mimeType } = this.uploadedImage()!;
      const analysis = await this.geminiService.analyzeImage(this.prompt(), base64, mimeType);
      this.result.set(analysis);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        // Strip the data URL prefix to get pure base64
        const base64 = dataUrl.split(',')[1];
        this.uploadedImage.set({ base64, mimeType: file.type, name: file.name });
        this.error.set(null);
      };
      reader.readAsDataURL(file);
    }
  }

  onImageCapture(dataUrl: string): void {
    const base64 = dataUrl.split(',')[1];
    const mimeType = 'image/png';
    const fileName = `capture-${new Date().toISOString()}.png`;
    this.uploadedImage.set({ base64, mimeType, name: fileName });
    this.error.set(null);
    this.closeCameraModal();
  }
  
  updatePrompt(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.prompt.set(input.value);
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  openCameraModal(): void {
    this.isCameraOpen.set(true);
  }

  closeCameraModal(): void {
    this.isCameraOpen.set(false);
  }
}