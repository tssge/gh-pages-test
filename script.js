// Simple JavaScript for enhanced user experience

// Global variables for maps and calendar
let mainMap, locationMap;
let selectedLocation = null;
let currentDate = new Date();

// Sample events data for calendar
const sampleEvents = {
    '2025-01-25': [
        { title: '🐕 Koiranäyttely Helsinki', time: '10:00', location: 'Messukeskus' }
    ],
    '2025-01-28': [
        { title: '🎾 Agility-harjoitukset', time: '18:00', location: 'Koirarata Espoo' }
    ],
    '2025-02-02': [
        { title: '🚶 Koirakavereiden kävely', time: '14:00', location: 'Keskuspuisto' }
    ],
    '2025-02-08': [
        { title: '🏥 Ilmainen terveystarkastus', time: '09:00', location: 'Eläinklinikka Vantaa' }
    ],
    '2025-02-15': [
        { title: '📚 Koirakoulutuskurssi', time: '10:00', location: 'Eläinkoulu Tampere' }
    ],
    '2025-02-22': [
        { title: '🎉 Koirafestivaali Turku', time: '11:00', location: 'Ruissalo' }
    ],
    '2025-03-01': [
        { title: '🏃 Lenkki labradorien kanssa', time: '09:00', location: 'Suomenlinna' }
    ],
    '2025-03-09': [
        { title: '🐕 Retrieverien tapaaminen', time: '15:00', location: 'Kaivopuisto' }
    ],
    '2025-03-15': [
        { title: '🎾 Agility-kilpailu', time: '10:00', location: 'Koirarata Tampere' }
    ],
    '2025-03-22': [
        { title: '📖 Pennunkoulutus aloittelijoille', time: '11:00', location: 'Koirakoulu Helsinki' }
    ],
    '2025-03-29': [
        { title: '🚶 Retki koirien kanssa', time: '10:00', location: 'Nuuksio' }
    ],
    '2025-04-05': [
        { title: '🐕 Saksanpaimenkoirien kokoontuminen', time: '13:00', location: 'Töölönlahti' }
    ],
    '2025-04-12': [
        { title: '🎪 Koiraopetuksen workshop', time: '14:00', location: 'Koirakoulu Oulu' }
    ],
    '2025-04-19': [
        { title: '🏥 Rokotuspäivä koirille', time: '10:00', location: 'Eläinklinikka Lahti' }
    ],
    '2025-04-26': [
        { title: '🎾 Frisbeekurssi koirille', time: '11:00', location: 'Puisto Jyväskylä' }
    ],
    '2025-05-03': [
        { title: '🚗 Koira-auto näyttely', time: '10:00', location: 'Messukeskus Helsinki' }
    ],
    '2025-05-10': [
        { title: '🌸 Kevätretki perheiden kanssa', time: '12:00', location: 'Seurasaari' }
    ],
    '2025-05-17': [
        { title: '🏃 Canicross-tapahtuma', time: '09:00', location: 'Espoo' }
    ],
    '2025-05-24': [
        { title: '🎉 Koirien uimarannan avajaiset', time: '13:00', location: 'Aurinkolahti' }
    ],
    '2025-05-31': [
        { title: '📚 Koirakäyttäytymisen kurssi', time: '10:00', location: 'Koirakoulu Kuopio' }
    ],
    '2025-06-07': [
        { title: '🏖️ Koirarannan turvallisuuskurssi', time: '11:00', location: 'Hietaranta' }
    ],
    '2025-06-14': [
        { title: '🎪 Koiratemppu-esitys', time: '15:00', location: 'Kauppatori Turku' }
    ],
    '2025-06-21': [
        { title: '🌞 Juhannusretki koirien kanssa', time: '10:00', location: 'Porvoo' }
    ],
    '2025-06-28': [
        { title: '🐕 Bernhardinkoirien tapaaminen', time: '14:00', location: 'Temppeliaukio' }
    ],
    '2025-07-05': [
        { title: '🏃 Kesäinen agility-harjoitus', time: '18:00', location: 'Koirarata Vantaa' }
    ],
    '2025-07-12': [
        { title: '🚶 Iltakävely senioreiden kanssa', time: '19:00', location: 'Kaivopuisto' }
    ],
    '2025-07-19': [
        { title: '🎉 Kesäjuhla koirille', time: '12:00', location: 'Linnanmäki' }
    ],
    '2025-07-26': [
        { title: '🏖️ Uimapäivä koirille', time: '11:00', location: 'Pihlajasaari' }
    ],
    '2025-08-02': [
        { title: '🎾 Kesäagility-kilpailu', time: '10:00', location: 'Koirarata Lahti' }
    ],
    '2025-08-09': [
        { title: '📸 Koiravalokuvauskurssi', time: '13:00', location: 'Botanical Garden' }
    ],
    '2025-08-16': [
        { title: '🚗 Matkailu koiran kanssa -info', time: '14:00', location: 'Koirakoulu Joensuu' }
    ],
    '2025-08-23': [
        { title: '🏥 Ensiapukurssi koirille', time: '11:00', location: 'Eläinklinikka Pori' }
    ],
    '2025-08-30': [
        { title: '🎪 Koiraterapia-esittely', time: '15:00', location: 'Vanhainkoti Helsinki' }
    ],
    '2025-09-06': [
        { title: '🍂 Syksynkoitokset koirille', time: '10:00', location: 'Keskuspuisto' }
    ],
    '2025-09-13': [
        { title: '🐕 Metsästyskoirien tapaaminen', time: '09:00', location: 'Nuuksio' }
    ],
    '2025-09-20': [
        { title: '📖 Koiranomistajien neuvonta', time: '12:00', location: 'Koirakoulu Rovaniemi' }
    ],
    '2025-09-27': [
        { title: '🎾 Syyagility-harjoitukset', time: '17:00', location: 'Koirarata Helsinki' }
    ],
    '2025-10-04': [
        { title: '🏃 Hikingretki koirien kanssa', time: '10:00', location: 'Koli' }
    ],
    '2025-10-11': [
        { title: '🎃 Halloween-juhla koirille', time: '16:00', location: 'Koirakoulu Seinäjoki' }
    ],
    '2025-10-18': [
        { title: '🏥 Talviterveystarkastus', time: '09:00', location: 'Eläinklinikka Mikkeli' }
    ],
    '2025-10-25': [
        { title: '📚 Talvikoulutuskurssi', time: '11:00', location: 'Koirakoulu Lappeenranta' }
    ],
    '2025-11-01': [
        { title: '🎪 Koiranäyttely Oulu', time: '10:00', location: 'Ouluhalli' }
    ],
    '2025-11-08': [
        { title: '🚶 Talvikävelyretki', time: '13:00', location: 'Suomenlinna' }
    ],
    '2025-11-15': [
        { title: '🎾 Sisäagility-harjoitukset', time: '18:00', location: 'Liikuntahalli Vaasa' }
    ],
    '2025-11-22': [
        { title: '📖 Koiran talvihoito-opastus', time: '14:00', location: 'Koirakoulu Hämeenlinna' }
    ],
    '2025-11-29': [
        { title: '🎉 Jouluvalmistelut koirille', time: '12:00', location: 'Koirakoulu Kotka' }
    ],
    '2025-12-06': [
        { title: '🎄 Joulunäyttely koirille', time: '11:00', location: 'Messukeskus Tampere' }
    ],
    '2025-12-13': [
        { title: '❄️ Lumileikkipäivä', time: '10:00', location: 'Keskuspuisto' }
    ],
    '2025-12-20': [
        { title: '🎅 Joulujuhla koirille', time: '15:00', location: 'Koirakoulu Rauma' }
    ],
    '2025-12-27': [
        { title: '🎾 Vuodenvaihteen agility', time: '13:00', location: 'Koirarata Kouvola' }
    ]
};

// Sample dog-friendly locations
const dogFriendlyLocations = [
    // Helsinki area
    {
        name: "Koiraystävällinen Kahvila",
        lat: 60.1699,
        lng: 24.9384,
        type: "restaurant",
        description: "Tervetuloa koirien kanssa! Terassi ja sisätilat koirille sallittuja."
    },
    {
        name: "Helsingin Keskuspuisto",
        lat: 60.2055,
        lng: 24.9668,
        type: "park", 
        description: "Iso koirapuisto vapaa-alueineen."
    },
    {
        name: "Koirahotelli Tassutupa",
        lat: 60.1756,
        lng: 24.8069,
        type: "hotel",
        description: "Koiraystävällinen majoitus koko perheelle."
    },
    
    // Tampere/Pirkanmaa area
    {
        name: "Eläinkoulu Tampere",
        lat: 61.4978,
        lng: 23.7610,
        type: "vet",
        description: "Koirakoulutuskurssit ja eläinlääkäripalvelut Tampereen sydämessä."
    },
    {
        name: "Koirarata Tampere",
        lat: 61.5134,
        lng: 23.7842,
        type: "park",
        description: "Agility-rata ja koirapuisto harjoitteluineen."
    },
    {
        name: "Messukeskus Tampere",
        lat: 61.4867,
        lng: 23.8123,
        type: "event",
        description: "Koiraystävälliset näyttelyt ja tapahtumat."
    },
    
    // Turku area  
    {
        name: "Ruissalo Koirapuisto",
        lat: 60.4344,
        lng: 22.1656,
        type: "park",
        description: "Kaunis koirapuisto Ruissalossa, vapaa-alue ja uimaranta."
    },
    {
        name: "Kauppatori Turku",
        lat: 60.4514,
        lng: 22.2681,
        type: "event",
        description: "Koiratemppu-esitykset ja tapahtumat Turun sydämessä."
    },
    {
        name: "Koiraystävällinen Turku Café",
        lat: 60.4485,
        lng: 22.2687,
        type: "restaurant",
        description: "Viihtyisä kahvila koirien kanssa Turun keskustassa."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize maps
    initializeMaps();
    
    // Initialize calendar
    initializeCalendar();
    
    // Initialize form handlers
    initializeForm();
    
    // Smooth scrolling for navigation links (fallback for older browsers)
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add a simple fade-in animation for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add a simple console message for developers
    console.log('🐕 Koiraystävälliset Paikat Suomessa sivusto ladattu onnistuneesti!');
    console.log('🗺️ Löydä koiraystävällisiä paikkoja: Tutustu karttaan ja osioihin');
});

// Initialize Leaflet maps
function initializeMaps() {
    // Main map initialization
    if (document.getElementById('map')) {
        try {
            // Check if Leaflet is available
            if (typeof L === 'undefined') {
                throw new Error('Leaflet library not available');
            }
            
            mainMap = L.map('map').setView([64.9841, 25.7482], 5); // Center on Finland
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mainMap);
            
            // Add sample dog-friendly locations
            dogFriendlyLocations.forEach(location => {
                const icon = getLocationIcon(location.type);
                L.marker([location.lat, location.lng], {icon: icon})
                    .addTo(mainMap)
                    .bindPopup(`
                        <div style="text-align: center;">
                            <h4>🐾 ${location.name}</h4>
                            <p>${location.description}</p>
                            <small>Tyyppi: ${getLocationTypeText(location.type)}</small>
                        </div>
                    `);
            });
            
            console.log('🗺️ Pääkartta ladattu onnistuneesti!');
        } catch (error) {
            console.warn('⚠️ Kartan lataus epäonnistui:', error.message);
            showMapFallback('map');
        }
    }
    
    // Location picker map initialization
    if (document.getElementById('locationMap')) {
        try {
            // Check if Leaflet is available
            if (typeof L === 'undefined') {
                throw new Error('Leaflet library not available');
            }
            
            locationMap = L.map('locationMap').setView([60.1699, 24.9384], 10); // Center on Helsinki
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(locationMap);
            
            // Add click handler for location selection
            locationMap.on('click', function(e) {
                if (selectedLocation) {
                    locationMap.removeLayer(selectedLocation);
                }
                
                selectedLocation = L.marker(e.latlng)
                    .addTo(locationMap)
                    .bindPopup('Valittu sijainti 🐾')
                    .openPopup();
                    
                // Update address field with coordinates
                document.getElementById('address').value = `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`;
            });
            
            console.log('🗺️ Sijaintivalitsin ladattu onnistuneesti!');
        } catch (error) {
            console.warn('⚠️ Sijaintivalitsimen lataus epäonnistui:', error.message);
            showMapFallback('locationMap');
        }
    }
}

// Show a clear fallback when map fails to load
function showMapFallback(mapId) {
    const mapElement = document.getElementById(mapId);
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 2rem;
                text-align: center;
                background: linear-gradient(135deg, #FFF8DC 0%, #F0E68C 50%, #FFFACD 100%);
                border-radius: 12px;
                margin: 1rem;
                box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                <div style="font-size: 1.3rem; font-weight: 600; color: #2C3E50; margin-bottom: 1rem;">
                    Kartta ei ole käytettävissä
                </div>
                <div style="font-size: 1rem; color: #34495E; line-height: 1.6; max-width: 400px;">
                    🐾 Interaktiivinen kartta koiraystävällisistä paikoista<br>
                    📍 Kartan lataamisessa tapahtui virhe<br>
                    🔄 Yritä päivittää sivu tai tarkista verkkoyhteytesi
                </div>
                <div style="margin-top: 1.5rem; font-size: 2rem;">🐕</div>
            </div>
        `;
        
        // Add a subtle animation to make it more engaging
        mapElement.style.animation = 'fadeIn 0.5s ease-in';
    }
}

// Get icon for location type
function getLocationIcon(type) {
    const iconMap = {
        'restaurant': '🍽️',
        'park': '🌳',
        'hotel': '🏨',
        'shop': '🏪',
        'beach': '🏖️',
        'vet': '🏥',
        'event': '🎉'
    };
    
    const iconText = iconMap[type] || '📍';
    
    return L.divIcon({
        html: `<div style="font-size: 24px; text-align: center;">${iconText}</div>`,
        iconSize: [30, 30],
        className: 'custom-map-icon'
    });
}

// Get location type text in Finnish
function getLocationTypeText(type) {
    const typeMap = {
        'restaurant': 'Ravintola/Kahvila',
        'park': 'Puisto/Ulkoilualue', 
        'hotel': 'Hotelli/Majoitus',
        'shop': 'Kauppa/Palvelu',
        'beach': 'Uimaranta',
        'vet': 'Eläinlääkäri',
        'event': 'Tapahtuma'
    };
    
    return typeMap[type] || 'Muu';
}

// Initialize calendar
function initializeCalendar() {
    const monthNames = [
        'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
        'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
    ];
    
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - (firstDay.getDay() + 6) % 7);
        
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            if (date.getMonth() !== month) {
                dayElement.style.opacity = '0.3';
            }
            
            const dateString = date.toISOString().split('T')[0];
            const events = sampleEvents[dateString];
            
            if (events) {
                dayElement.classList.add('has-event');
                dayElement.onclick = () => showEventDetails(dateString, events);
            }
            
            dayElement.innerHTML = `
                <span>${date.getDate()}</span>
                ${events ? '<div style="font-size: 0.7rem; color: #FF6B6B;">Tapahtuma</div>' : ''}
            `;
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Calendar navigation
    document.getElementById('prevMonth').onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    };
    
    document.getElementById('nextMonth').onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    };
    
    updateCalendar();
}

// Show event details
function showEventDetails(dateString, events) {
    const eventDetails = document.getElementById('eventDetails');
    const eventInfo = document.getElementById('eventInfo');
    
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('fi-FI');
    
    let eventsHtml = `<h5>📅 ${formattedDate}</h5>`;
    events.forEach(event => {
        eventsHtml += `
            <div style="margin: 1rem 0; padding: 1rem; background: #f9f9f9; border-radius: 8px;">
                <strong>${event.title}</strong><br>
                🕒 ${event.time}<br>
                📍 ${event.location}
            </div>
        `;
    });
    
    eventInfo.innerHTML = eventsHtml;
    eventDetails.style.display = 'block';
}

// Initialize form handlers
function initializeForm() {
    const form = document.getElementById('businessForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Regular form fields
            for (let [key, value] of formData.entries()) {
                if (!data[key]) {
                    data[key] = value;
                } else {
                    // Handle multiple values (checkboxes)
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                }
            }
            
            // Get checkbox groups
            ['dogSize', 'areas', 'services', 'timeRestrictions', 'requirements'].forEach(group => {
                const checkboxes = form.querySelectorAll(`input[name="${group}"]:checked`);
                data[group] = Array.from(checkboxes).map(cb => cb.value);
            });
            
            // Add location data if selected
            if (selectedLocation) {
                data.location = {
                    lat: selectedLocation.getLatLng().lat,
                    lng: selectedLocation.getLatLng().lng
                };
            }
            
            // Show success message
            alert('🐾 Kiitos ilmoituksesta! Tarkistamme tiedot ja lisäämme ne karttaamme pian.');
            
            // Log data for demonstration (in real app, this would be sent to server)
            console.log('Uusi ilmoitus:', data);
            
            // Reset form
            form.reset();
            if (selectedLocation) {
                locationMap.removeLayer(selectedLocation);
                selectedLocation = null;
            }
        });
    }
}

// Add a simple theme toggle (demonstration purposes)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Store theme preference
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});