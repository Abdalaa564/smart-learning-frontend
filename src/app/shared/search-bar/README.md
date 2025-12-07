# Search Bar Component

## Overview
A reusable search bar component with smooth animations and text highlighting functionality. Extracted from the chat-rome component for use across multiple pages.

## Features
- ✨ Smooth expand/collapse animation
- 🔍 Real-time search text highlighting
- 🎨 Modern, clean design
- 🔄 Customizable placeholder text
- 📤 Event emission for parent components

## Usage

### 1. Import the Component
```typescript
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [SearchBarComponent],
  // ...
})
export class YourComponent {
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }
}
```

### 2. Add to Template
```html
<app-search-bar 
  placeholder="Search..." 
  (searchTextChange)="onSearchTextChange($event)">
</app-search-bar>
```

### 3. Use Highlighting in Your Content
```html
<div [innerHTML]="highlightText(yourContent)"></div>
```

## API

### Inputs
- `placeholder` (string): Placeholder text for the search input. Default: `'Search...'`

### Outputs
- `searchTextChange` (EventEmitter<string>): Emits the current search text whenever it changes

### Methods
- `highlightText(text: string): string`: Returns HTML string with highlighted matches

## Styling
The component uses CSS variables for theming:
- `--accent-color`: Primary accent color (default: #074226)
- `--default-color`: Default text color (default: #394450)

## Example
See `chat-rome.component.ts` for a complete implementation example.
