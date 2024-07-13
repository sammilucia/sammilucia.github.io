class SimpleScrollbar {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';

        this.scrollbarTrack = document.createElement('div');
        this.scrollbarThumb = document.createElement('div');

        this.scrollbarTrack.classList.add('simple-scrollbar-track');
        this.scrollbarThumb.classList.add('simple-scrollbar-thumb');

        this.scrollbarTrack.appendChild(this.scrollbarThumb);
        this.element.appendChild(this.scrollbarTrack);

        this.updateScrollbar();
        this.attachEvents();
    }

    updateScrollbar() {
        const contentHeight = this.element.scrollHeight;
        const visibleHeight = this.element.clientHeight;

        if (contentHeight <= visibleHeight) {
            this.scrollbarTrack.style.display = 'none';
        } else {
            this.scrollbarTrack.style.display = 'block';
            const scrollbarHeight = (visibleHeight / contentHeight) * visibleHeight;
            this.scrollbarThumb.style.height = `${scrollbarHeight}px`;
        }
        this.updateScrollbarThumbPosition();
    }

    attachEvents() {
        let isDragging = false;
        let startY, startScrollTop;

        const onMouseDown = (e) => {
            isDragging = true;
            startY = e.clientY - this.scrollbarThumb.getBoundingClientRect().top;
            startScrollTop = this.element.scrollTop;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const y = e.clientY - this.scrollbarTrack.getBoundingClientRect().top;
            const trackHeight = this.scrollbarTrack.clientHeight;
            const thumbHeight = this.scrollbarThumb.clientHeight;
            const scrollableHeight = this.element.scrollHeight - this.element.clientHeight;
            const scrollPercent = (y - startY) / (trackHeight - thumbHeight);
            this.element.scrollTop = startScrollTop + scrollPercent * scrollableHeight;
            this.updateScrollbarThumbPosition();
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        this.scrollbarThumb.addEventListener('mousedown', onMouseDown);

        this.element.addEventListener('scroll', () => {
            this.updateScrollbarThumbPosition();
        });

        window.addEventListener('resize', () => {
            this.updateScrollbar();
        });

        this.element.addEventListener('wheel', (event) => {
            if (!event.ctrlKey) {
                event.preventDefault();
                this.element.scrollTop += event.deltaY;
                this.updateScrollbarThumbPosition();
            }
        });
    }

    updateScrollbarThumbPosition() {
        const scrollPercent = this.element.scrollTop / (this.element.scrollHeight - this.element.clientHeight);
        const trackHeight = this.scrollbarTrack.clientHeight;
        const thumbHeight = this.scrollbarThumb.clientHeight;
        const maxTop = trackHeight - thumbHeight;
        const top = scrollPercent * maxTop;
        this.scrollbarThumb.style.top = `${top}px`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-simple-scrollbar]').forEach(function (el) {
        new SimpleScrollbar(el);
    });
});