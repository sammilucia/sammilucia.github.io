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
	}

	attachEvents() {
		this.scrollbarThumb.addEventListener('mousedown', (event) => {
			event.preventDefault();

			const startY = event.clientY;
			const startScrollTop = this.element.scrollTop;
			const scrollbarHeight = this.scrollbarThumb.clientHeight;
			const maxScrollTop = this.element.scrollHeight - this.element.clientHeight;

            const onMouseMove = (event) => {
                const deltaY = event.clientY - startY;
                const scrollRatio = this.element.scrollHeight / this.element.clientHeight;
                const newScrollTop = startScrollTop + (deltaY * scrollRatio);
            
                this.element.scrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop);
                this.updateScrollbarThumbPosition();
            };

			const onMouseUp = () => {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			};

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});

		this.scrollbarThumb.addEventListener('touchstart', (event) => {
			const startY = event.touches[0].clientY;
			const startScrollTop = this.element.scrollTop;
			const maxScrollTop = this.element.scrollHeight - this.element.clientHeight;
			const onTouchMove = (event) => {
				const deltaY = (event.touches[0].clientY - startY) * (window.devicePixelRatio || 1);
				const newScrollTop = startScrollTop + (deltaY / this.element.clientHeight) * this.element.scrollHeight;

				this.element.scrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop);
				this.updateScrollbarThumbPosition();
			};

			const onTouchEnd = () => {
				document.removeEventListener('touchmove', onTouchMove);
				document.removeEventListener('touchend', onTouchEnd);
			};

			document.addEventListener('touchmove', onTouchMove);
			document.addEventListener('touchend', onTouchEnd);
		});

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

		document.addEventListener('wheel', (event) => {
			if (event.ctrlKey) {
				event.stopPropagation(); // Allow zoom to propagate
			}
		}, { passive: false });
	}

    updateScrollbarThumbPosition() {
        const scrollPercentage = this.element.scrollTop / (this.element.scrollHeight - this.element.clientHeight);
        const maxScrollbarTop = this.element.clientHeight - this.scrollbarThumb.clientHeight;
        const scrollbarTop = scrollPercentage * maxScrollbarTop;
    
        this.scrollbarThumb.style.transform = `translateY(${scrollbarTop}px)`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-simple-scrollbar]').forEach(function (el) {
		new SimpleScrollbar(el);
	});
});
