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
    '2025-02-15': [
        { title: '📚 Koirakoulutuskurssi', time: '10:00', location: 'Eläinkoulu Tampere' }
    ]
};

// Sample dog-friendly locations
const dogFriendlyLocations = [
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
    }
    
    // Location picker map initialization
    if (document.getElementById('locationMap')) {
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