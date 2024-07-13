class SimpleScrollbar {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        // Apply custom scrollbar styles
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';

        // Create custom scrollbar elements
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
            const scrollbarHeight = visibleHeight / contentHeight * visibleHeight;
            this.scrollbarThumb.style.height = `${scrollbarHeight}px`;
        }
    }

    attachEvents() {
        // Scroll content when dragging the scrollbar
        this.scrollbarThumb.addEventListener('mousedown', (event) => {
            event.preventDefault();

            const startY = event.clientY;
            const startScrollTop = this.element.scrollTop;
            const scrollbarHeight = this.scrollbarThumb.clientHeight;
            const maxScrollTop = this.element.scrollHeight - this.element.clientHeight;

            const onMouseMove = (event) => {
                const deltaY = event.clientY - startY;
                const scrollRatio = maxScrollTop / (this.element.clientHeight - scrollbarHeight);
                const newScrollTop = startScrollTop + deltaY * scrollRatio;
                this.element.scrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop);
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Handle touch events
        this.scrollbarThumb.addEventListener('touchstart', (event) => {
            const startY = event.touches[0].clientY;
            const startScrollTop = this.element.scrollTop;
            const scrollbarHeight = this.scrollbarThumb.clientHeight;
            const maxScrollTop = this.element.scrollHeight - this.element.clientHeight;

            const onTouchMove = (event) => {
                const deltaY = event.touches[0].clientY - startY;
                const scrollRatio = maxScrollTop / (this.element.clientHeight - scrollbarHeight);
                const newScrollTop = startScrollTop + deltaY * scrollRatio;
                this.element.scrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop);
            };

            const onTouchEnd = () => {
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };

            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', onTouchEnd);
        });

        // Update scrollbar on scroll
        this.element.addEventListener('scroll', () => {
            this.updateScrollbarThumbPosition();
        });

        // Update scrollbar on resize
        window.addEventListener('resize', () => {
            this.updateScrollbar();
        });

        // Handle mousewheel events
        this.element.addEventListener('wheel', (event) => {
            if (!event.ctrlKey) {
                event.preventDefault();
                this.element.scrollTop += event.deltaY;
                this.updateScrollbarThumbPosition();
            }
        });

        // Allow ctrl + mouse wheel to zoom the page
        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey) {
                event.stopPropagation(); // Allow zoom to propagate
            }
        }, { passive: false });
    }

    updateScrollbarThumbPosition() {
        const scrollTop = this.element.scrollTop;
        const contentHeight = this.element.scrollHeight;
        const visibleHeight = this.element.clientHeight;
        const scrollbarTop = scrollTop / contentHeight * visibleHeight;
        this.scrollbarThumb.style.transform = `translateY(${scrollbarTop}px)`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-simple-scrollbar]').forEach(function (el) {
        new SimpleScrollbar(el);
    });
});
