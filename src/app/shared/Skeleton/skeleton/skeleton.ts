import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonType = 'text' | 'circle' | 'rectangle' | 'card' | 'avatar' | 'button';

@Component({
    selector: 'app-skeleton',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skeleton.html',
    styleUrls: ['./skeleton.css']
})
export class SkeletonComponent {
    /**
     * Type of skeleton to display
     */
    @Input() type: SkeletonType = 'text';

    /**
     * Width of the skeleton (e.g., '100%', '200px', '50rem')
     */
    @Input() width: string = '100%';

    /**
     * Height of the skeleton (e.g., '20px', '100%', '10rem')
     */
    @Input() height: string = '1rem';

    /**
     * Border radius (e.g., '4px', '50%', '8px')
     */
    @Input() borderRadius: string = '4px';

    /**
     * Number of skeleton lines to display (for text type)
     */
    @Input() lines: number = 1;

    /**
     * Custom CSS class
     */
    @Input() customClass: string = '';

    /**
     * Animation type: 'pulse' or 'wave'
     */
    @Input() animation: 'pulse' | 'wave' = 'wave';

    /**
     * Get array for ngFor
     */
    get linesArray(): number[] {
        return Array(this.lines).fill(0);
    }

    /**
     * Get skeleton styles
     */
    getSkeletonStyles(): { [key: string]: string } {
        const styles: { [key: string]: string } = {
            width: this.width,
            height: this.height,
            borderRadius: this.borderRadius
        };

        // Preset styles for different types
        switch (this.type) {
            case 'circle':
            case 'avatar':
                styles['borderRadius'] = '50%';
                if (!this.width || this.width === '100%') {
                    styles['width'] = '40px';
                }
                if (!this.height || this.height === '1rem') {
                    styles['height'] = '40px';
                }
                break;
            case 'button':
                styles['borderRadius'] = '8px';
                if (!this.width || this.width === '100%') {
                    styles['width'] = '120px';
                }
                if (!this.height || this.height === '1rem') {
                    styles['height'] = '40px';
                }
                break;
            case 'card':
                styles['borderRadius'] = '12px';
                if (!this.height || this.height === '1rem') {
                    styles['height'] = '200px';
                }
                break;
        }

        return styles;
    }
}
