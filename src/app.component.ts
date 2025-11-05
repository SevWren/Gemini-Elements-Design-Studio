import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UiGeneratorComponent } from './components/ui-generator/ui-generator.component';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';
import { ImageAnalyzerComponent } from './components/image-analyzer/image-analyzer.component';
import { ImageRemixComponent } from './components/image-remix/image-remix.component';

type Tab = 'ui-generator' | 'image-generator' | 'image-analyzer' | 'image-remix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiGeneratorComponent,
    ImageGeneratorComponent,
    ImageAnalyzerComponent,
    ImageRemixComponent,
  ],
})
export class AppComponent {
  activeTab = signal<Tab>('ui-generator');
  tabs: { id: Tab; name: string }[] = [
    { id: 'ui-generator', name: 'Generate UI' },
    { id: 'image-generator', name: 'Generate Image' },
    { id: 'image-analyzer', name: 'Analyze Image' },
    { id: 'image-remix', name: 'Remix Image' },
  ];

  selectTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
