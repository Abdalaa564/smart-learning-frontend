import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchBarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle search open state', () => {
        expect(component.isSearchOpen).toBe(false);
        component.toggleSearch();
        expect(component.isSearchOpen).toBe(true);
        component.toggleSearch();
        expect(component.isSearchOpen).toBe(false);
    });

    it('should clear search text when closing', () => {
        component.searchText = 'test';
        component.isSearchOpen = true;
        component.toggleSearch();
        expect(component.searchText).toBe('');
    });

    it('should highlight matching text', () => {
        component.searchText = 'test';
        const result = component.highlightText('this is a test string');
        expect(result).toContain('<mark class="highlight">test</mark>');
    });

    it('should return original text when search is empty', () => {
        component.searchText = '';
        const text = 'this is a test string';
        const result = component.highlightText(text);
        expect(result).toBe(text);
    });

    it('should emit search text changes', () => {
        spyOn(component.searchTextChange, 'emit');
        component.searchText = 'new search';
        component.onSearchChange();
        expect(component.searchTextChange.emit).toHaveBeenCalledWith('new search');
    });
});
