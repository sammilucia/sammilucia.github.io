class SimpleScrollbar {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';

        this.scrollContent = document.createElement('div');
        this.scrollContent.className = 'scroll-content';
        this.scrollContent.innerHTML = this.element.innerHTML;
        this.element.innerHTML = '';
        this.element.appendChild(this.scrollContent);

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
        const contentHeight = this.scrollContent.scrollHeight;
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
            this.scrollbarThumb.classList.add('active');
            startY = e.clientY;
            startScrollTop = this.scrollContent.scrollTop;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const delta = e.clientY - startY;
            const trackHeight = this.scrollbarTrack.clientHeight;
            const thumbHeight = this.scrollbarThumb.clientHeight;
            const scrollableHeight = this.scrollContent.scrollHeight - this.element.clientHeight;
            const scrollDistance = (delta / (trackHeight - thumbHeight)) * scrollableHeight;
            this.scrollContent.scrollTop = startScrollTop + scrollDistance;
            this.updateScrollbarThumbPosition();
        };

        const onMouseUp = () => {
            isDragging = false;
            this.scrollbarThumb.classList.remove('active');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        this.scrollbarThumb.addEventListener('mousedown', onMouseDown);

        this.scrollContent.addEventListener('scroll', () => {
            this.updateScrollbarThumbPosition();
        });

        window.addEventListener('resize', () => {
            this.updateScrollbar();
        });

        this.element.addEventListener('wheel', (event) => {
            if (!event.ctrlKey) {
                event.preventDefault();
                this.scrollContent.scrollTop += event.deltaY;
                this.updateScrollbarThumbPosition();
            }
        });
    }

    updateScrollbarThumbPosition() {
        const scrollPercent = this.scrollContent.scrollTop / (this.scrollContent.scrollHeight - this.element.clientHeight);
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