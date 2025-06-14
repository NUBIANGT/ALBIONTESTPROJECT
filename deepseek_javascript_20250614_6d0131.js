// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Sample market data (in a real app, this would come from an API)
    const marketData = [
        { item: "Claymore", tier: "4.1", buyPrice: 50000, sellPrice: 70000, profit: 20000, city: "Bridgewatch", demand: "Alta" },
        { item: "Scholar Robe", tier: "5.1", buyPrice: 80000, sellPrice: 100000, profit: 20000, city: "Martlock", demand: "Média" },
        { item: "Ox", tier: "6.0", buyPrice: 500000, sellPrice: 600000, profit: 100000, city: "Fort Sterling", demand: "Baixa" },
        { item: "Hellish Staff", tier: "7.1", buyPrice: 250000, sellPrice: 320000, profit: 70000, city: "Thetford", demand: "Alta" },
        { item: "Royal Armor", tier: "8.0", buyPrice: 1200000, sellPrice: 1500000, profit: 300000, city: "Caerleon", demand: "Média" },
    ];

    // Sample builds data
    const buildsData = [
        { 
            name: "PvP 1v1 Claymore", 
            type: "pvp", 
            description: "Build focada em duelos e combates pequenos", 
            items: [
                { name: "Claymore", img: "claymore.png" },
                { name: "Hunter Hood", img: "hunter-hood.png" },
                { name: "Mercenary Jacket", img: "mercenary-jacket.png" },
                { name: "Soldier Boots", img: "soldier-boots.png" },
                { name: "Thetford Cape", img: "thetford-cape.png" }
            ] 
        },
        { 
            name: "PvE Dungeon Light Crossbow", 
            type: "pve", 
            description: "Excelente para dungeons em grupo", 
            items: [
                { name: "Light Crossbow", img: "light-crossbow.png" },
                { name: "Scholar Cowl", img: "scholar-cowl.png" },
                { name: "Scholar Robe", img: "scholar-robe.png" },
                { name: "Scholar Sandals", img: "scholar-sandals.png" },
                { name: "Martlock Cape", img: "martlock-cape.png" }
            ] 
        },
        { 
            name: "ZvZ Holy Support", 
            type: "zvz", 
            description: "Build de suporte para ZvZ", 
            items: [
                { name: "Holy Staff", img: "holy-staff.png" },
                { name: "Knight Helm", img: "knight-helm.png" },
                { name: "Cleric Robe", img: "cleric-robe.png" },
                { name: "Guardian Boots", img: "guardian-boots.png" },
                { name: "Lymhurst Cape", img: "lymhurst-cape.png" }
            ] 
        },
        { 
            name: "GvG Tank", 
            type: "gvg", 
            description: "Build tank para GvG", 
            items: [
                { name: "Incubus Mace", img: "incubus-mace.png" },
                { name: "Judicator Helm", img: "judicator-helm.png" },
                { name: "Judicator Armor", img: "judicator-armor.png" },
                { name: "Judicator Boots", img: "judicator-boots.png" },
                { name: "Fort Sterling Cape", img: "fort-cape.png" }
            ] 
        }
    ];

    // Populate market table
    const marketTable = document.getElementById('market-data');
    const tierSelect = document.getElementById('tier-select');
    const citySelect = document.getElementById('city-select');

    function populateMarketTable(data) {
        marketTable.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.item}</td>
                <td>T${item.tier}</td>
                <td>${item.buyPrice.toLocaleString()}</td>
                <td>${item.sellPrice.toLocaleString()}</td>
                <td class="${item.profit > 50000 ? 'profit-high' : 'profit-low'}">${item.profit.toLocaleString()}</td>
                <td>${item.city}</td>
                <td><span class="demand-${item.demand.toLowerCase()}">${item.demand}</span></td>
            `;
            marketTable.appendChild(row);
        });
    }

    // Filter market data
    function filterMarketData() {
        const tier = tierSelect.value;
        const city = citySelect.value;
        
        let filteredData = marketData;
        
        if (tier !== 'all') {
            filteredData = filteredData.filter(item => item.tier.startsWith(tier));
        }
        
        if (city !== 'all') {
            filteredData = filteredData.filter(item => item.city.toLowerCase() === city);
        }
        
        populateMarketTable(filteredData);
    }

    tierSelect.addEventListener('change', filterMarketData);
    citySelect.addEventListener('change', filterMarketData);

    // Initial population
    populateMarketTable(marketData);

    // Populate builds
    const buildsContainer = document.getElementById('builds-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function populateBuilds(filter = 'all') {
        buildsContainer.innerHTML = '';
        
        const filteredBuilds = filter === 'all' 
            ? buildsData 
            : buildsData.filter(build => build.type === filter);
        
        filteredBuilds.forEach(build => {
            const buildCard = document.createElement('div');
            buildCard.className = 'build-card';
            buildCard.innerHTML = `
                <div class="build-header">
                    <h3>${build.name}</h3>
                    <span class="build-type ${build.type}">${build.type.toUpperCase()}</span>
                </div>
                <div class="build-content">
                    <p>${build.description}</p>
                    <div class="build-items">
                        ${build.items.map(item => `
                            <div class="build-item">
                                <img src="items/${item.img}" alt="${item.name}">
                                <span>${item.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            buildsContainer.appendChild(buildCard);
        });
    }

    // Filter builds
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            populateBuilds(filter);
        });
    });

    // Initial population
    populateBuilds();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
});