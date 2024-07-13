document.addEventListener('DOMContentLoaded', function() {
    const shareLinks = document.querySelectorAll('.social-links a');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    shareLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let url;

            switch(this.className) {
                case 'linkedin':
                    url = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
                    break;
                case 'reddit':
                    url = `https://reddit.com/submit?url=${pageUrl}&title=${pageTitle}`;
                    break;
                case 'twitter':
                    url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
            }

            window.open(url, '_blank');
        });
    });
});