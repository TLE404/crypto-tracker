document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
    const apiKey = 'CG-mDVVqLm5xBDjvcVq523LnAmB';
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': apiKey }
    };
    const tableBody = document.querySelector('#cryptoTable tbody');

    async function fetchCryptoData() {
        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json();
            displayCryptoData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayCryptoData(data) {
        tableBody.innerHTML = '';
        data.forEach((coin, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="fixed-column" data-label="Position">${index + 1}</td>
                <td class="fixed-column" data-label="Icon"><img src="${coin.image}" alt="${coin.name}"></td>
                <td class="fixed-column" data-label="Name"><a href="coin.html?id=${coin.id}">${coin.name}</a></td>
                <td data-label="Price (USD)">$${coin.current_price.toLocaleString()}</td>
                <td data-label="24h Volume">$${coin.total_volume.toLocaleString()}</td>
                <td data-label="Market Cap">$${coin.market_cap.toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    await fetchCryptoData();
});

