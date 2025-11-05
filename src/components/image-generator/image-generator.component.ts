import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

interface PromptCategory {
  name: string;
  prompts: string[];
}

// A vast library of categorized prompts for image generation inspiration.
const IMAGE_PROMPT_CATEGORIES: PromptCategory[] = [
  {
    name: 'Artistic Movements',
    prompts: [
      'Render in the style of Impressionism, focusing on light and movement.',
      'Apply a Surrealist aesthetic, with dreamlike and bizarre imagery.',
      'Transform into a Cubist masterpiece, deconstructing subjects into geometric forms.',
      'Reimagine as a vibrant Pop Art piece with bold colors and halftone dots.',
      'Adopt the flowing, organic lines of Art Nouveau.',
      'Convert to a stark, emotional German Expressionist woodcut.',
      'Apply the chaotic energy of Abstract Expressionism.',
      'Render in the classical, idealized style of the Renaissance.',
      'Give it a dramatic, high-contrast Baroque look with chiaroscuro lighting.',
      'Transform into a delicate, romantic Rococo painting.',
      'Recreate in the precise, machine-like style of Futurism.',
      'Adopt the minimalist, primary-colored approach of De Stijl (Mondrian).',
      'Apply a photorealistic style with meticulous detail.',
      'Transform into a Symbolist painting, rich with metaphorical meaning.',
      'Give it the clean, sharp lines of Precisionism.',
      'Render with the raw, untutored look of Art Brut.',
      'Adopt the decorative, patterned style of the Arts and Crafts movement.',
      'Reimagine as a Russian Constructivist propaganda poster.',
      'Apply the shimmering, mosaic-like quality of Pointillism.',
      'Transform into a grand, epic scene in the style of the Hudson River School.',
    ],
  },
  {
    name: 'Cyberpunk & Sci-Fi',
    prompts: [
      'Infuse with a neon-noir, Blade Runner aesthetic.',
      'Transform into a high-tech, GITS-inspired cyborg.',
      'Render as a sprawling, dystopian cyberpunk cityscape.',
      'Apply a holographic glitch effect over the subject.',
      'Reimagine as a bio-mechanical creation by H.R. Giger.',
      'Give it a retro-futuristic look with vacuum tubes and chrome fins.',
      'Transform into a scene from a gritty, post-apocalyptic wasteland.',
      'Render as a sleek, minimalist interface from a sci-fi spaceship.',
      'Add augmented reality overlays and data streams.',
      'Depict as a character in a space opera with alien flora.',
      'Transform into a massive, derelict starship interior.',
      'Apply a "datamosh" glitch art style.',
      'Reimagine as a creature made of liquid metal.',
      'Render in the style of a vintage sci-fi pulp magazine cover.',
      'Give it a clean, utopian sci-fi aesthetic, like Star Trek.',
      'Transform into a scene within a vast virtual reality world.',
      'Add glowing data-tattoos and cybernetic implants.',
      'Recreate as a technical blueprint for a futuristic robot.',
      'Render as a soldier in powered armor.',
      'Depict a scene of first contact with an alien intelligence.',
    ],
  },
  {
    name: 'Fantasy & Mythological',
    prompts: [
      'Illustrate as a character from a high-fantasy epic.',
      'Transform into a mythical creature from Greek mythology.',
      'Render as an enchanted, glowing forest scene.',
      'Depict as a powerful sorcerer casting a complex spell.',
      'Reimagine as an ancient, weathered dragon.',
      'Give it the style of a medieval illuminated manuscript.',
      'Transform into a scene from Norse mythology, like Ragnarok.',
      'Render as a majestic, elven city built into trees.',
      'Add ethereal fairy wings and a magical aura.',
      'Depict as a dwarven forge deep within a mountain.',
      'Recreate as a legendary cursed artifact.',
      'Illustrate in the dark, gothic fantasy style of Dark Souls.',
      'Transform into a celestial being made of starlight.',
      'Render as a whimsical scene from a fairy tale.',
      'Give it the look of a tarot card, rich with symbolism.',
      'Reimagine as a creature from Japanese folklore (yokai).',
      'Depict as a knight in ornate, magical armor.',
      'Transform into a lost, underwater city like Atlantis.',
      'Render as a creature from the Cthulhu Mythos.',
      'Add elements of alchemical symbols and diagrams.',
    ],
  },
  {
    name: 'Horror & Gothic',
    prompts: [
      'Apply a dark, gothic horror aesthetic.',
      'Render in the style of a Junji Ito manga, with body horror.',
      'Transform into a grotesque, Cronenberg-esque creature.',
      'Give it the look of a found footage horror film still.',
      'Reimagine as a creature from a silent horror movie like Nosferatu.',
      'Depict as a haunted, dilapidated Victorian mansion.',
      'Illustrate in the unsettling, surreal style of Zdzisław Beksiński.',
      'Add elements of cosmic horror, hinting at vast, unknowable evils.',
      'Transform into a creepy, porcelain doll.',
      'Render as a scene from a slasher film, with dramatic shadows.',
      'Give it the grainy, saturated look of a Giallo horror film.',
      'Reimagine as a ghostly figure in a long, dark hallway.',
      'Apply a filter of grime, decay, and urban rot.',
      'Illustrate as a page from a madman\'s diary.',
      'Transform into a monster from a John Carpenter film.',
      'Depict as a haunted forest with twisted, grasping trees.',
      'Render with a single, terrifying light source from below.',
      'Give it the aesthetic of a plague doctor in a deserted city.',
      'Reimagine as a zombie or other undead creature.',
      'Add unsettling text that looks like it was scratched into the image.',
    ],
  },
  {
    name: 'Nature & Landscape',
    prompts: [
      'Reimagine as a majestic, Bob Ross-style landscape painting.',
      'Transform into a grand, Ansel Adams-inspired black and white photograph.',
      'Render as a vibrant, tropical rainforest teeming with life.',
      'Depict a serene, minimalist Japanese Zen garden.',
      'Illustrate as a dramatic, stormy seascape.',
      'Give it the look of a vast, arid desert at sunset.',
      'Transform into a scene of the Aurora Borealis over a frozen tundra.',
      'Render as a macro photograph of a flower, showing intricate details.',
      'Reimagine as a landscape viewed through a kaleidoscope.',
      'Depict an enchanted forest with bioluminescent plants.',
      'Give it the aesthetic of a vintage National Park poster.',
      'Transform into a single, ancient, wise-looking tree.',
      'Render as a powerful volcanic eruption.',
      'Illustrate as a peaceful countryside scene with rolling hills.',
      'Reimagine as a geological cross-section of the earth.',
      'Depict a terrarium or a miniature world in a bottle.',
      'Give it the look of an infrared photograph, with surreal colors.',
      'Transform into a majestic mountain range shrouded in mist.',
      'Render as a tranquil scene of a stream flowing through a forest.',
      'Illustrate as a field of wildflowers in a Ghibli-esque style.',
    ],
  },
  {
    name: 'Vintage & Retro',
    prompts: [
      'Give it the look of a faded, 1970s Kodachrome photograph.',
      'Transform into a bold, Art Deco travel poster from the 1920s.',
      'Render as a groovy, psychedelic piece of 1960s art.',
      'Apply the aesthetic of an 8-bit or 16-bit pixel art video game.',
      'Reimagine as a vintage, hand-drawn botanical illustration.',
      'Give it the grainy, black and white look of a film noir still.',
      'Transform into a mid-century modern illustration with clean lines.',
      'Render as a page from a 1950s science fiction comic book.',
      'Apply the look of a damaged, sepia-toned daguerreotype.',
      'Reimagine as a Victorian-era engraving.',
      'Give it the neon and chrome aesthetic of a 1980s album cover.',
      'Transform into a WWII-era propaganda poster.',
      'Render as a classic, airbrushed pin-up illustration.',
      'Apply the simple, charming style of a 1930s rubber hose cartoon.',
      'Reimagine as a design on a vintage tin toy.',
      'Give it the look of an old, water-stained map.',
      'Transform into a matchbook cover design from the 1940s.',
      'Render in the style of a technical illustration from an old encyclopedia.',
      'Apply the aesthetic of a 1990s Lisa Frank creation.',
      'Reimagine as a screen print concert poster from the 1970s.',
    ],
  },
  {
    name: 'Material & Texture',
    prompts: [
      'Recreate as a sculpture carved from polished marble.',
      'Transform into a rugged, weathered piece of driftwood.',
      'Render as if it were forged from rusted metal and copper.',
      'Illustrate as a delicate, intricate origami creation.',
      'Give it the texture of rough, hand-made paper.',
      'Reimagine as a stained glass window, glowing with light.',
      'Construct the scene entirely out of LEGO bricks.',
      'Transform into a soft, knitted or crocheted object.',
      'Render as a detailed, cross-hatched ink drawing.',
      'Apply the look of being carved from a single piece of jade.',
      'Reimagine as a vibrant, patterned mosaic tile artwork.',
      'Give it the texture of cracked, peeling paint on old wood.',
      'Transform into an object made of shimmering, iridescent crystal.',
      'Render as if it were made of flowing, molten gold.',
      'Illustrate as a chalk or pastel drawing on a rough surface.',
      'Recreate as a plush, felted wool sculpture.',
      'Give it the look of being etched into a sheet of glass.',
      'Transform into a claymation or plasticine model.',
      'Render as an intricate wire sculpture.',
      'Apply the texture of rich, embroidered velvet.',
    ],
  },
];

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingSpinnerComponent],
})
export class ImageGeneratorComponent {
  private readonly geminiService = inject(GeminiService);
  private readonly localStorageKey = 'gemini-design-studio-image-prompts';

  prompt = signal<string>('A synthwave-style illustration of a developer coding a euchre card game at a futuristic desk, with a futuristic city skyline in the background.');
  aspectRatio = signal<string>('16:9');
  numberOfImages = signal<number>(1);
  isLoading = signal<boolean>(false);
  result = signal<string[] | null>(null);
  error = signal<string | null>(null);
  
  aspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:4'];
  imageCounts = [1, 2, 3, 4];

  savedPrompts = signal<string[]>([]);
  showSavedPrompts = signal<boolean>(false);

  referenceImage = signal<{ base64: string; mimeType: string; } | null>(null);
  
  readonly presetPromptCategories: PromptCategory[] = IMAGE_PROMPT_CATEGORIES;
  activePresetCategory = signal<PromptCategory | null>(null);
  promptFilter = signal<string>('');
  
  isResizing = signal(false);
  promptContainerHeight = signal(240); // Initial height, same as max-h-60

  private resizeObserver: {
    startY: number;
    startHeight: number;
    mouseMoveListener: ((e: MouseEvent) => void) | null;
    mouseUpListener: (() => void) | null;
  } = { startY: 0, startHeight: 0, mouseMoveListener: null, mouseUpListener: null };


  filteredPrompts = computed(() => {
    const category = this.activePresetCategory();
    const filter = this.promptFilter().toLowerCase();
    if (!category) {
      return [];
    }
    if (!filter) {
      return category.prompts;
    }
    return category.prompts.filter(p => p.toLowerCase().includes(filter));
  });

  constructor() {
    this.loadPromptsFromStorage();
  }

  private loadPromptsFromStorage(): void {
    try {
      const storedPrompts = localStorage.getItem(this.localStorageKey);
      if (storedPrompts) {
        this.savedPrompts.set(JSON.parse(storedPrompts));
      }
    } catch (e) {
      console.error('Failed to load prompts from localStorage', e);
    }
  }

  private savePromptsToStorage(): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.savedPrompts()));
    } catch (e) {
      console.error('Failed to save prompts to localStorage', e);
    }
  }

  saveCurrentPrompt(): void {
    const currentPrompt = this.prompt().trim();
    if (currentPrompt && !this.savedPrompts().includes(currentPrompt)) {
      this.savedPrompts.update(prompts => [currentPrompt, ...prompts]);
      this.savePromptsToStorage();
    }
  }

  loadPrompt(promptToLoad: string): void {
    this.prompt.set(promptToLoad);
  }

  deletePrompt(index: number): void {
    this.savedPrompts.update(prompts => {
      const newPrompts = [...prompts];
      newPrompts.splice(index, 1);
      return newPrompts;
    });
    this.savePromptsToStorage();
  }

  toggleSavedPrompts(): void {
    this.showSavedPrompts.update(value => !value);
    if (!this.showSavedPrompts()) {
      this.activePresetCategory.set(null); // Reset category when hiding
    }
  }

  selectPresetCategory(category: PromptCategory): void {
    if (this.activePresetCategory() === category) {
      this.activePresetCategory.set(null); // Toggle off
    } else {
      this.activePresetCategory.set(category);
      this.promptFilter.set(''); // Reset filter when changing category
    }
  }

  updatePromptFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.promptFilter.set(input.value);
  }
  
  onResizeStart(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing.set(true);
    
    this.resizeObserver.startY = event.clientY;
    this.resizeObserver.startHeight = this.promptContainerHeight();

    this.resizeObserver.mouseMoveListener = (e: MouseEvent) => this.onResize(e);
    this.resizeObserver.mouseUpListener = () => this.onResizeEnd();

    document.addEventListener('mousemove', this.resizeObserver.mouseMoveListener);
    document.addEventListener('mouseup', this.resizeObserver.mouseUpListener, { once: true });
  }

  private onResize(event: MouseEvent): void {
    if (!this.isResizing()) return;

    const dy = event.clientY - this.resizeObserver.startY;
    const newHeight = this.resizeObserver.startHeight + dy;

    const minHeight = 120; // min h-30
    const maxHeight = 600; // max h-150

    this.promptContainerHeight.set(Math.max(minHeight, Math.min(newHeight, maxHeight)));
  }

  private onResizeEnd(): void {
    this.isResizing.set(false);
    if (this.resizeObserver.mouseMoveListener) {
        document.removeEventListener('mousemove', this.resizeObserver.mouseMoveListener);
    }
  }

  async generateImage(): Promise<void> {
    if (!this.prompt().trim()) {
      this.error.set('Prompt cannot be empty.');
      return;
    }

    this.isLoading.set(true);
    this.result.set(null);
    this.error.set(null);

    try {
      const refImg = this.referenceImage();
      let imageUrls: string[];

      if (refImg) {
        // Using a reference image, so we need the two-step process.
        imageUrls = await this.geminiService.generateImageFromImageAndText(
          this.prompt(),
          refImg,
          this.aspectRatio(),
          this.numberOfImages()
        );
      } else {
        // Standard text-to-image generation.
        imageUrls = await this.geminiService.generateImage(this.prompt(), this.aspectRatio(), this.numberOfImages());
      }
      
      this.result.set(imageUrls);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }

  updatePrompt(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.prompt.set(input.value);
  }

  setAspectRatio(ratio: string): void {
    this.aspectRatio.set(ratio);
  }
  
  setNumberOfImages(num: number): void {
    this.numberOfImages.set(num);
  }

  downloadImage(imageUrl: string): void {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `gemini-generated-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useAsReference(dataUrl: string): void {
    if (!dataUrl) return;

    const [header, base64] = dataUrl.split(',');
    const mimeTypeMatch = header.match(/:(.*?);/);
    if (!mimeTypeMatch || !base64) {
      this.error.set('Could not parse image data to use as reference.');
      return;
    }
    const mimeType = mimeTypeMatch[1];
    this.referenceImage.set({ base64, mimeType });
  }

  clearReferenceImage(): void {
    this.referenceImage.set(null);
  }
}