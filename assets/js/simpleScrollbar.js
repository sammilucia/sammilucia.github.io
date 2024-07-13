class SimpleScrollbar {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        // apply custom scrollbar styles
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';

        // create custom scrollbar elements
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
        const scrollbarHeight = visibleHeight / contentHeight * visibleHeight;

        this.scrollbarThumb.style.height = `${scrollbarHeight}px`;
    }

    attachEvents() {
        // scroll content when dragging the scrollbar
        this.scrollbarThumb.addEventListener('mousedown', (event) => {
            event.preventDefault();

            const startY = event.clientY;
            const startScrollTop = this.element.scrollTop;
            const onMouseMove = (event) => {
                const deltaY = event.clientY - startY;
                this.element.scrollTop = startScrollTop + deltaY / this.element.clientHeight * this.element.scrollHeight;
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });

        // handle touch events
        this.scrollbarThumb.addEventListener('touchstart', (event) => {
            const startY = event.touches[0].clientY;
            const startScrollTop = this.element.scrollTop;
            const onTouchMove = (event) => {
                const deltaY = event.touches[0].clientY - startY;
                this.element.scrollTop = startScrollTop + deltaY / this.element.clientHeight * this.element.scrollHeight;
            };

            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', () => {
                document.removeEventListener('touchmove', onTouchMove);
            }, { once: true });
        });

        // update scrollbar on scroll
        this.element.addEventListener('scroll', () => {
            const scrollTop = this.element.scrollTop;
            const contentHeight = this.element.scrollHeight;
            const visibleHeight = this.element.clientHeight;
            const scrollbarTop = scrollTop / contentHeight * visibleHeight;

            this.scrollbarThumb.style.transform = `translateY(${scrollbarTop}px)`;
        });

        // update scrollbar on resize
        window.addEventListener('resize', () => {
            this.updateScrollbar();
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-simple-scrollbar]').forEach(function (el) {
        new SimpleScrollbar(el);
    });
});
