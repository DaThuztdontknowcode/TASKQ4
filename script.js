document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('khu-pho-dropdown');
    const infoContainer = document.getElementById('info-container');

    // Fetch data from the API
    fetch('https://07dd0cd2195c41febe4245139f47336b.api.mockbin.io/')
        .then(response => response.json())
        .then(data => {
            // Extract Khu phố values and remove duplicates
            const khuPhoValues = [...new Set(data.map(item => item['Khu phố']))];

            // Populate dropdown options
            khuPhoValues.forEach(khuPho => {
                const option = document.createElement('option');
                option.value = khuPho;
                option.textContent = khuPho;
                dropdown.appendChild(option);
            });

            // Function to display info based on selected Khu phố
            dropdown.addEventListener('change', function() {
                const selectedKhuPho = this.value;
                const selectedInfo = data.filter(item => item['Khu phố'] === selectedKhuPho);

                // Display info
                infoContainer.innerHTML = '';
                if (selectedInfo.length > 0) {
                    const infoList = document.createElement('ul');
                    selectedInfo.forEach(info => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${info['Họ và tên']} - ${info['Birth']} - ${info['Đảng birth']} - ${info['Chức vụ']} - ${info['Phone']} - ${info['Nơi công tác']}`;
                        infoList.appendChild(listItem);
                    });
                    infoContainer.appendChild(infoList);
                } else {
                    const noInfoMessage = document.createElement('p');
                    noInfoMessage.textContent = 'Không có thông tin cho Khu phố này.';
                    infoContainer.appendChild(noInfoMessage);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
