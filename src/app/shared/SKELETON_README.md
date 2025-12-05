# Skeleton Loading System

## 🚀 Quick Start

### 1. Import the component you need:

```typescript
import { SkeletonComponent } from './shared/skeleton/skeleton';
import { SkeletonCardComponent } from './shared/skeleton-card/skeleton-card';
import { SkeletonListComponent } from './shared/skeleton-list/skeleton-list';
import { SkeletonTableComponent } from './shared/skeleton-table/skeleton-table';
```

### 2. Add to your component imports:

```typescript
@Component({
  imports: [CommonModule, SkeletonCardComponent]
})
```

### 3. Use in your template:

```html
<app-skeleton-card *ngIf="isLoading"></app-skeleton-card>
<div *ngIf="!isLoading">{{ actualContent }}</div>
```

## 📁 Components Created

- ✅ **Base Skeleton** - `src/app/shared/skeleton/`
- ✅ **Skeleton Card** - `src/app/shared/skeleton-card/`
- ✅ **Skeleton List** - `src/app/shared/skeleton-list/`
- ✅ **Skeleton Table** - `src/app/shared/skeleton-table/`
- ✅ **Demo Component** - `src/app/components/skeleton-demo/`

## 📖 Full Documentation

See [skeleton-loading-guide.md](C:\Users\AbdallaKhalil\.gemini\antigravity\brain\b1476ec4-d94d-4820-a60a-53bb9a4beb58\skeleton-loading-guide.md) for complete usage guide.

## 🎯 Features

- ✨ Wave & Pulse animations
- 🎨 Matches your project design system
- 📱 Fully responsive
- 🌙 Dark mode support
- ♿ Accessible
- 🔧 Highly customizable
- 🧪 Unit tested
