import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

interface PromptCategory {
  name: string;
  prompts: string[];
}

const EUCHRE_PROMPT_CATEGORIES: PromptCategory[] = [
    {
        name: 'Game Table & Layout',
        prompts: [
            "A top-down view of a classic wooden euchre table with a green felt playing surface. Four player positions should be clearly marked.",
            "Refine the classic wooden table with a darker mahogany finish and subtle, worn textures on the green felt to give it a well-used, comfortable feel.",
            "Mark the player positions with elegant, minimalist icons representing North, South, East, and West, which glow softly when it's that player's turn.",
            "A modern, minimalist UI for a euchre game table. Use clean lines, abstract player indicators, and a dark theme.",
            "Enhance the modern UI by adding subtle neon highlights in a contrasting color (like cyan or magenta) that trace the flow of play and highlight winning cards.",
            "For the abstract player indicators, create animated geometric shapes that pulse gently and change form to indicate the current dealer or bidder.",
            "Design the main game screen for a 4-player euchre game, optimized for a tablet in landscape mode. Player's hand should be at the bottom.",
            "Integrate the score display seamlessly into the top corners of the tablet layout, and place the current trump indicator in a visually accessible but non-intrusive central top position.",
            "Ensure the touch targets for cards in the player's hand are large and forgiving for the tablet interface, with a clear visual 'lift' animation on touch-down.",
            "Create the central playing area where tricks are played. Each of the four card slots should be clearly associated with a player position.",
            "When a card is played into a slot, add a brief, subtle animation of the player's avatar or icon appearing behind the card to reinforce ownership.",
            "Design the empty card slots as slightly indented placeholders with a soft inner shadow, which disappears when a card is played on top, giving it a physical feel.",
            "A component showing the 'kitty' or 'crib' - the face-down cards not in play.",
            "Render the 'kitty' as a small, neat stack of four face-down cards, slightly offset from each other, with a subtle glow to indicate they are special.",
            "When the dealer picks up the trump and discards, create an animation where one card from their hand smoothly moves to the kitty, joining the stack face-down.",
            "UI for the single face-up card that is used to propose the trump suit. It should be visually distinct and centrally located during the bidding phase.",
            "Frame the face-up trump proposal card with a pulsating golden border to draw attention to it during the bidding phase. The pulse should quicken as a player's decision timer runs down.",
            "When a player orders up the dealer, create a satisfying animation where the proposal card lifts up and flies directly into the dealer's hand area.",
            "A responsive layout for the euchre game that adapts from a 4-corner desktop view to a vertical stack on mobile devices.",
            "On mobile, collapse the opponents' views into compact summary bars at the top, showing avatar, card count, and name, to maximize screen space for the player's hand and the playing area.",
            "For the mobile vertical layout, ensure the central playing area remains the focal point, with player hands and info arranged logically above and below it for a clear, one-handed play experience."
        ]
    },
    {
        name: 'Player Hand & Info',
        prompts: [
            "The player's hand of five cards, displayed in a fanned-out arc at the bottom of the screen. Cards should slightly overlap.",
            "Add a subtle 'lift and highlight' effect on hover to give tactile feedback, and make the selected card slightly larger than the others.",
            "Create a card sorting button that automatically arranges the player's hand by suit and rank, with the trump suit always grouped and prioritized on one side.",
            "A UI component for a single playing card. It should be clear, readable, and have variants for red and black suits.",
            "Design a special visual treatment for the Right Bower (Jack of trump) and Left Bower (other Jack of same color) to make them instantly recognizable as the top two cards.",
            "Create three distinct card back designs that players can choose from in the settings: a classic intricate pattern, a modern geometric one, and a minimalist solid color.",
            "A visual indicator for which player is the current dealer, perhaps a small 'D' icon next to their avatar.",
            "Animate the dealer icon by having it slide smoothly from the previous dealer to the new dealer at the start of each hand.",
            "When it's the dealer's turn to bid, make the dealer icon pulse gently to draw their attention.",
            "A component for displaying an opponent's information: their avatar, username, and number of cards in hand (represented by card backs).",
            "When an opponent plays a card, make their avatar frame flash briefly to indicate who played.",
            "If an opponent goes alone, gray out their partner's avatar and info panel to make it clear they are not participating in the hand.",
            "A visual state for a player's card in hand when it is selected or hovered over, ready to be played.",
            "Upon selecting a card, show a subtle 'confirm play' arrow or outline in the central playing area where the card will land.",
            "If a player tries to play an illegal card (e.g., not following suit when possible), make the selected card shake slightly and show a small red 'X' icon.",
            "Highlight the cards in the player's hand that are legal to play during a trick.",
            "For the legal cards, add a soft green glow to their border. Make all illegal cards slightly darker and desaturated.",
            "If the player has no legal moves other than to play trump, make the trump cards in their hand pulse slightly.",
            "A 'going alone' indicator, showing when a player's partner is sitting out the hand. The partner's avatar could be grayed out.",
            "In the center of the table, add a small, elegant text element that says '[Player Name] is going alone!' after the decision is made.",
            "For the player who is going alone, add a subtle crown icon or glow effect to their avatar for the duration of the hand."
        ]
    },
    {
        name: 'Bidding & Trump',
        prompts: [
            "A set of buttons for the first round of bidding: 'Order Up', 'Assist', and 'Pass'.",
            "Make the 'Order Up' and 'Assist' buttons visually distinct (e.g., green/blue) from the 'Pass' button (e.g., gray/red) to separate aggressive from passive actions.",
            "Add a countdown timer ring around the bidding buttons to show the player how much time they have left to make a decision.",
            "A modal or overlay for the second round of bidding, allowing the player to select a suit (clubs, diamonds, hearts, spades) as trump.",
            "Inside the modal, present the four suit icons. On hover, show a tooltip explaining the strategic implications of choosing that suit based on the player's hand.",
            "After a suit is selected, have the corresponding icon enlarge and glow, while the others fade away, before closing the modal.",
            "A clear visual indicator on the screen for what the current trump suit is, perhaps an icon in the corner.",
            "Place the trump indicator icon inside a dedicated, stylized component that also displays the name of the team who called trump.",
            "When a card of the trump suit is played, make the main trump indicator icon pulse once to reinforce the suit's power.",
            "UI for when a dealer is forced to pick up the trump card. Show the card animating into their hand and them discarding one card face-down.",
            "After the card is picked up, highlight the player's hand and prompt them to 'Choose a card to discard'. The discard action should have a clear confirmation.",
            "The discarded card should animate smoothly from the hand to a face-down position in a dedicated discard area, separate from the kitty.",
            "A 'Stick the Dealer' rule indicator, which changes the bidding options on the final round.",
            "When the 'Stick the Dealer' rule is active, display a prominent but temporary banner that says 'Stick the Dealer!' and disables the 'Pass' button for the dealer.",
            "Change the background of the dealer's bidding modal to a warning color (like amber) to signify they are in a must-call situation.",
            "A prompt asking the player if they want to 'Go Alone' after trump is called, with 'Yes' and 'No' buttons.",
            "Make the 'Go Alone' prompt a visually exciting modal with high-contrast colors and bold text to emphasize the high-risk, high-reward nature of the decision.",
            "Add a small info icon to the 'Go Alone' prompt that, on hover, explains the scoring benefits (+4 points for 5 tricks) and risks."
        ]
    },
    {
        name: 'Gameplay',
        prompts: [
            "An animation for a card being played, moving from the player's hand to their slot in the center of the table.",
            "Refine the animation so the card has a slight arc and rotation, making it feel like it was physically thrown onto the table.",
            "Add a subtle, unique sound effect for the card landing on the table surface.",
            "A visual effect for the winning card of a trick, such as a glow or a border highlight.",
            "After the last card is played, have the other three cards fade slightly, then animate a golden wreath or crown icon appearing over the winning card.",
            "The winning card should pulse with light before the entire trick is collected.",
            "An animation for the four played cards being collected and moved to the trick pile of the winning player.",
            "Instead of just moving, have the cards stack neatly on top of each other, then animate as a single packet to the winner's trick pile.",
            "The winner's trick pile should increment with a satisfying 'tick' animation and sound.",
            "A small component next to each team's score showing how many tricks they have won in the current hand (out of 5).",
            "Represent the won tricks as small, filled-in icons (like stars or diamonds). When a trick is won, animate the next icon filling in.",
            "When a team wins their third trick (securing the point), make their trick counter flash and display a '+1 pt' text briefly.",
            "A 'Your Turn' indicator, using a glowing border or text to prompt the player to act.",
            "Animate the glowing border around the player's avatar with a pulsing effect, and display a large but semi-transparent 'Your Turn' text in the center of the screen that fades after a few seconds.",
            "If the player is taking too long, make the 'Your Turn' indicator's pulse speed up.",
            "A visual representation of the 'left bower' card, showing it as part of the trump suit and as the second-highest card.",
            "When trump is selected, automatically add a small, unobtrusive trump suit icon to the corner of the Left Bower card in every player's hand to mark it.",
            "If the Left Bower is played, add a special visual effect, like a trail of light in the trump suit's color, as it moves to the center.",
            "UI showing the last trick played, with the four cards and the winner visible in a corner of the screen.",
            "Design the 'last trick' component as a small, dismissible overlay. The winning card should be slightly larger than the other three.",
            "Add a small icon of the player who won the trick next to the four cards in the 'last trick' view."
        ]
    },
    {
        name: 'Scoring & State',
        prompts: [
            "A classic euchre scoreboard using two cards (e.g., a 6 and a 4) to cover pips and keep score up to 10.",
            "Animate the covering card sliding smoothly to reveal the next pip when a point is scored.",
            "Make the pips that represent the current score glow slightly to improve readability.",
            "A modern digital scoreboard showing the score for 'Us' and 'Them' as numbers, from 0 to 10.",
            "When a team scores, have the number animate up with a quick, satisfying 'tick' effect, like a slot machine.",
            "Add small icons next to the 'Us' and 'Them' labels, perhaps using the players' avatars.",
            "A 'Game Point' visual alert when a team reaches 9 points.",
            "When a team hits 9 points, make their score on the scoreboard pulse with a golden glow and display a 'Match Point!' banner briefly.",
            "During the hand where a team is at match point, their side of the scoreboard should have a subtle, persistent shimmer.",
            "A 'Game Over' modal that displays the final score, congratulates the winners, and has buttons for 'New Game' and 'Exit to Lobby'.",
            "In the 'Game Over' modal, show the avatars of the winning team with confetti falling around them. The 'New Game' button should be the primary, most prominent call to action.",
            "Add a 'View Stats' button to the modal that shows a summary of the game, like how many euchres occurred and who went alone most often.",
            "A visual effect for scoring points: +1 for 3-4 tricks, +2 for 5 tricks, +4 for going alone and winning 5 tricks.",
            "Create a dynamic text animation that pops up near the scoring team's trick counter, explicitly stating how they scored (e.g., 'March! +2 Points', 'Alone! +4 Points').",
            "The intensity of the scoring visual effect should increase with the points scored. A +4 should be much more dramatic than a +1.",
            "A 'Euchred!' banner or animation for when the team that called trump fails to take at least 3 tricks.",
            "Design a bold, impactful 'EUCHRED!' animation in a slightly aggressive font that appears over the offending team's play area. The defending team's score should animate with '+2 Points!'",
            "Add a unique, slightly sad sound effect (like a trombone) when a team is euchred."
        ]
    },
    {
        name: 'Lobby & Menus',
        prompts: [
            "A game lobby screen with four slots for players to join. Show avatars and usernames. A 'Ready' checkbox for each player.",
            "When a player joins a slot, have their avatar and info card animate into place. The 'Ready' checkbox should turn into a large, green, glowing checkmark when ticked.",
            "Add a 'Host' crown icon to the player who created the lobby, giving them the ability to start the game or kick players.",
            "A 'Create Game' modal with options for setting house rules, like 'Stick the Dealer'.",
            "Design the house rule options as stylish toggle switches. Add a small 'i' icon next to each rule that explains what it does on hover.",
            "Include an option to make the game 'Invite Only' versus 'Public'.",
            "A settings menu overlay with controls for sound volume, animation speed, and card back design.",
            "Use sliders for volume and animation speed, providing immediate visual feedback. The card back design should show a preview of the selected back.",
            "Add a 'Confirm Changes' button and a 'Reset to Default' option in the settings menu.",
            "A 'How to Play' screen that explains the basic rules of Euchre with simple graphics.",
            "Organize the 'How to Play' screen with tabs for 'The Basics', 'Bidding', 'Scoring', and 'Special Cards' for easy navigation.",
            "Use simple, animated diagrams to illustrate concepts like 'what is a bower?' and 'how to follow suit'.",
            "A chat box component for players to communicate during the game.",
            "Make the chat box collapsible to save screen space. A new message should trigger a small, non-intrusive notification bubble.",
            "Include a button for quick emoji reactions that appear temporarily above the player's avatar.",
            "A player profile component showing stats like 'Games Won' and 'Total Euchres'.",
            "Design the profile as a stylish card that appears when you click on a player's avatar. Use bar graphs or pie charts to visualize stats like 'Win/Loss Ratio'.",
            "Add a 'Friend Request' button to the profile component for players you aren't already friends with.",
            "An invitation popup to join a friend's euchre game.",
            "The invitation should be a 'toast' notification that is visually appealing and has clear 'Accept' and 'Decline' buttons.",
            "If the player is already in a game, the 'Accept' button should be disabled and the notification should state that they must finish their current game first."
        ]
    },
    {
        name: 'Themes',
        prompts: [
            "A dark mode theme for a euchre game, with neon highlights for cards and actions.",
            "For the neon theme, make the trump suit indicator glow intensely, and have played cards leave a faint neon trail as they animate.",
            "Use a font that looks like a neon sign for key text elements like 'Euchred!' and player names.",
            "A skeuomorphic design for a euchre game, with realistic wood textures, shiny cards, and casino-style chips for scoring.",
            "Animate the casino chips for scoring, having them slide and stack with a satisfying clinking sound.",
            "The playing cards should have a glossy finish that catches a virtual light source as they move.",
            "A 'Wild West Saloon' theme, with a rustic poker table, vintage card designs, and western-style fonts.",
            "The background should be a dimly-lit saloon interior, with faint ambient sounds like a player piano.",
            "Use a 'Wanted Poster' style for the Game Over screen, showing the winning team.",
            "A futuristic, sci-fi theme for a euchre game, with holographic cards and a sleek spaceship interior as the background.",
            "The cards should flicker into existence when dealt, and dissolve when a trick is taken. The playing surface could be a holographic projection.",
            "Player avatars could be contained within sleek, floating holographic pods.",
            "A fantasy theme, where suits are represented by factions (e.g., elves, dwarves) and the table is a stone altar.",
            "Customize the face cards to be fantasy characters: Elven King, Dwarven Queen, Orc Jack.",
            "The winning card of a trick could trigger a brief, magical particle effect related to its faction's theme.",
            "A minimalist, abstract theme using simple shapes and a limited color palette to represent cards and players.",
            "Represent suits with simple icons (a circle, square, triangle, cross) and ranks with dots instead of numbers.",
            "Animations should be crisp and geometric, like shapes sliding and snapping into place."
        ]
    },
    {
        name: 'Misc Components',
        prompts: [
            "A 'Waiting for player...' indicator that shows a spinner over the avatar of the player whose turn it is.",
            "Customize the spinner to be a rotating card back, or a sand-timer icon that slowly depletes.",
            "The text should be more specific, e.g., 'Waiting for [Player Name] to bid...' or '...to play a card.'",
            "An emoji or quick-chat reaction system for players to send simple messages like 'Nice play!' or a thumbs-up.",
            "The emojis should appear above the player's avatar and play a short, bouncy animation before fading out.",
            "Create a small, circular menu that appears on long-pressing a player's avatar, allowing you to choose from 5-6 common reactions.",
            "A connection status icon for each player (green for good, red for disconnected).",
            "If a player disconnects, overlay their avatar with a semi-transparent red color and a 'Reconnecting...' message. The game should pause with a countdown.",
            "Add a yellow icon for 'unstable connection' if their ping is high.",
            "A confirmation dialog for when a player tries to leave a game in progress.",
            "The dialog should clearly state the penalty for leaving, such as a loss of rank or a temporary matchmaking ban.",
            "Use a high-alert color scheme (reds and yellows) and require the user to type 'LEAVE' to confirm, to prevent accidental exits.",
            "A card-dealing animation where cards fly from the dealer's position to each player's hand.",
            "Make the dealing animation fast and satisfying, with the cards arcing gracefully. Each card should make a soft 'swoosh' sound as it travels.",
            "The final card dealt to each player should flip over briefly to show its face before joining their hand, adding a little flair.",
            "A tutorial tooltip that points to the turned-up card and explains the 'Order Up' option to a new player.",
            "Design the tooltip to appear only for players below a certain level or rank. It should have a friendly, illustrative icon.",
            "The tooltip should be interactive; when the player completes the action (e.g., clicks 'Pass'), the tooltip should congratulate them and fade out."
        ]
    }
];


@Component({
  selector: 'app-ui-generator',
  templateUrl: './ui-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingSpinnerComponent, SafeHtmlPipe],
})
export class UiGeneratorComponent {
  private readonly geminiService = inject(GeminiService);
  private readonly localStorageKey = 'gemini-design-studio-ui-prompts';

  prompt = signal<string>('Create a responsive card component for a blog post with a placeholder image, title, excerpt, and author details. Use Tailwind CSS.');
  useProModel = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  result = signal<string | null>(null);
  error = signal<string | null>(null);
  copyButtonText = signal('Copy Code');
  savedPrompts = signal<string[]>([]);
  showSavedPrompts = signal<boolean>(false);
  
  readonly presetPromptCategories: PromptCategory[] = EUCHRE_PROMPT_CATEGORIES;
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

  async generateCode(): Promise<void> {
    if (!this.prompt().trim()) {
      this.error.set('Prompt cannot be empty.');
      return;
    }

    this.isLoading.set(true);
    this.result.set(null);
    this.error.set(null);
    this.copyButtonText.set('Copy Code');

    try {
      const generatedCode = await this.geminiService.generateText(this.prompt(), this.useProModel());
      this.result.set(generatedCode);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  updatePrompt(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.prompt.set(textarea.value);
  }

  toggleProModel(): void {
    this.useProModel.update(value => !value);
  }

  copyToClipboard(): void {
    const code = this.result();
    if (code) {
      // Extract content from <pre><code> block if present
      const match = code.match(/```(?:html|css|javascript|jsx|tsx)?\s*([\s\S]*?)\s*```/);
      const textToCopy = match ? match[1] : code;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.copyButtonText.set('Copied!');
        setTimeout(() => this.copyButtonText.set('Copy Code'), 2000);
      }).catch(err => {
        this.copyButtonText.set('Failed to copy');
         setTimeout(() => this.copyButtonText.set('Copy Code'), 2000);
        console.error('Failed to copy text: ', err);
      });
    }
  }
}