document.addEventListener('DOMContentLoaded', function () {
    // Share button functionality
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                })
                    .catch(console.error);
            } else {
                // Fallback for browsers that don't support the Web Share API
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = window.location.href;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);

                // Show a temporary message
                const message = document.createElement('div');
                message.textContent = 'Link copied to clipboard!';
                message.className = 'copy-message';
                document.body.appendChild(message);

                setTimeout(() => {
                    document.body.removeChild(message);
                }, 2000);
            }
        });
    }

    // Subscribe button functionality
    const subscribeButton = document.querySelector('.subscribe-button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function () {
            window.location.href = 'https://joinsecurity.club';
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Here you would typically send the email to your server or newsletter service
                // For now, we'll just show a success message

                // Clear the input
                emailInput.value = '';

                // Show success message
                const message = document.createElement('div');
                message.textContent = 'Thanks for subscribing!';
                message.className = 'copy-message';
                document.body.appendChild(message);

                setTimeout(() => {
                    document.body.removeChild(message);
                }, 2000);
            }
        });
    }
}); 