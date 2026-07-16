(function () {
    const root = document.documentElement;
    const clock = document.getElementById('nigeria-clock');


    // 0. Google Website Translator.
    // Google calls this function automatically after its translation script loads.
    window.googleTranslateElementInit = function () {
        const translateBox = document.getElementById('google_translate_element');

        if (!translateBox || !window.google || !google.translate) return;

        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ha,ig,yo,fr,ar,pt,es',
            autoDisplay: false
        }, 'google_translate_element');
    };

    // 1. Font size buttons.
    // CSS handles the actual resizing. JavaScript only adds a class to <html>.
    document.querySelectorAll('[data-font]').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll('[data-font]').forEach(function (b) {
                b.classList.remove('active');
            });

            button.classList.add('active');
            root.classList.remove('font-small', 'font-large');

            if (button.dataset.font === 'small') root.classList.add('font-small');
            if (button.dataset.font === 'large') root.classList.add('font-large');
        });
    });

    // 2. Nigeria clock.
    // A live clock cannot be done with CSS alone because the time changes every second.
    function updateClock() {
        if (!clock) return;

        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        clock.textContent = 'Nigeria, ' + formatter.format(new Date());
    }

    updateClock();
    setInterval(updateClock, 1000);

    // 3. Hero auto-slide.
    // The arrows, dots, fade and zoom are CSS. JavaScript only checks the next radio input.
    const heroRadios = Array.from(document.querySelectorAll('.hero-radio'));
    if (heroRadios.length > 1) {
        let index = heroRadios.findIndex(function (radio) { return radio.checked; });
        if (index < 0) index = 0;

        heroRadios.forEach(function (radio, radioIndex) {
            radio.addEventListener('change', function () {
                if (radio.checked) index = radioIndex;
            });
        });

        setInterval(function () {
            index = (index + 1) % heroRadios.length;
            heroRadios[index].checked = true;
        }, 3800);
    }

    // 4. Accordion pages.
    // CSS opens/closes the content. JavaScript only adds/removes the .open class.
    document.querySelectorAll('[data-accordion] .accordion-head').forEach(function (head) {
        head.addEventListener('click', function () {
            const item = head.closest('.accordion-item');
            const wrapper = head.closest('[data-accordion]');

            wrapper.querySelectorAll('.accordion-item').forEach(function (other) {
                if (other !== item) other.classList.remove('open');
            });

            item.classList.toggle('open');
        });
    });

    // 5. Static contact form message.
    // This is only a front-end demo. Real sending needs a backend or form service.
    document.querySelectorAll('form[data-contact-form]').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const status = form.querySelector('.form-status');
            if (status) status.textContent = 'Thank you. Your message has been prepared successfully in this static demo.';
            form.reset();
        });
    });

    // 6. Search results page.
    // This is a small local search list because this is a static website.
    const pages = [
        ['The Leadership', 'leadership.html', 'Profiles of the President, First Lady, Vice President and Second Lady.'],
        ['Presidency', 'presidency.html', 'Offices and institutions within the Presidency.'],
        ['Office of the President', 'office-president.html', 'Chief of Staff and presidential office information.'],
        ['State House Administration', 'state-house-administration.html', 'Permanent Secretary and State House administration.'],
        ['Cabinet', 'cabinet.html', 'Federal Executive Council and cabinet directory.'],
        ['Policy', 'policy.html', 'Government policy areas and public priorities.'],
        ['Press Office', 'press-office.html', 'Statements, news updates and media resources.'],
        ['Presidential Villa', 'presidential-villa.html', 'Aso Rock Villa, official functions and access information.'],
        ['Polytechnic Nasarawa Upgrade', 'article-polytechnic-nasarawa-upgrade.html', 'President Tinubu approves upgrade of Federal Polytechnic Nasarawa.'],
        ['Oriire Rescue Update', 'article-oriire-rescue-children-teachers.html', 'President Tinubu welcomes rescue of Oriire abducted children and teachers.'],
        ['Governor Umo Eno State House Visit', 'article-governor-umo-eno-state-house.html', 'President Tinubu receives Governor Umo Eno at the State House.'],
        ['Governor Alia Briefing', 'article-governor-alia-briefing.html', 'Governor Hyacinth Alia addresses journalists at the State House.'],
        ['Contact Us', 'contact.html', 'Official contact details and enquiry form.'],
        ['Budget & FOI', 'budget-foi.html', 'Budget and Freedom of Information resources.']
    ];

    const resultContainer = document.querySelector('[data-search-results]');
    if (resultContainer) {
        const params = new URLSearchParams(location.search);
        const query = (params.get('q') || '').trim().toLowerCase();
        const title = document.getElementById('search-title');
        const summary = document.getElementById('search-summary');
        const matches = query ? pages.filter(function (page) {
            return page.join(' ').toLowerCase().includes(query);
        }) : pages;

        if (title && query) title.textContent = 'Search results for: "' + query + '"';
        if (summary) summary.textContent = matches.length ? matches.length + ' page(s) found.' : 'The word you are looking for is not found.';

        resultContainer.innerHTML = matches.map(function (page) {
            return '<a class="search-result-item" href="' + page[1] + '"><h3>' + page[0] + '</h3><p>' + page[2] + '</p></a>';
        }).join('');
    }
})();
