class DataVisualizationPlayground {
    constructor() {
        this.currentData = null;
        this.mainChart = null;
        this.miniCharts = {
            bar: null,
            line: null,
            pie: null
        };
        
        this.colorPalettes = [
            ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'],
            ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'],
            ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'],
            ['#1e40af', '#7c3aed', '#dc2626', '#059669', '#ea580c']
        ];
        this.currentPalette = 0;
        
        this.initializeCharts();
    }
    
    initializeCharts() {
        // Initialize main chart canvas
        const mainCtx = document.getElementById('mainChart').getContext('2d');
        this.mainChart = new Chart(mainCtx, {
            type: 'bar',
            data: {
                labels: ['Waiting for data...'],
                datasets: [{
                    label: 'No Data',
                    data: [0],
                    backgroundColor: ['#06b6d4']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(71, 85, 105, 0.3)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(71, 85, 105, 0.3)' }
                    }
                }
            }
        });
        
        // Initialize mini charts
        this.initializeMiniCharts();
    }
    
    initializeMiniCharts() {
        const chartConfigs = [
            { id: 'barChart', type: 'bar' },
            { id: 'lineChart', type: 'line' },
            { id: 'pieChart', type: 'pie' }
        ];
        
        chartConfigs.forEach(config => {
            const ctx = document.getElementById(config.id).getContext('2d');
            this.miniCharts[config.type] = new Chart(ctx, {
                type: config.type,
                data: {
                    labels: ['No Data'],
                    datasets: [{
                        label: 'Waiting',
                        data: [1],
                        backgroundColor: ['#64748b']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#e2e8f0',
                                font: { size: 12 }
                            }
                        }
                    },
                    scales: config.type !== 'pie' ? {
                        x: {
                            ticks: { color: '#94a3b8', font: { size: 10 } },
                            grid: { color: 'rgba(71, 85, 105, 0.3)' }
                        },
                        y: {
                            ticks: { color: '#94a3b8', font: { size: 10 } },
                            grid: { color: 'rgba(71, 85, 105, 0.3)' }
                        }
                    } : {}
                }
            });
        });
    }
    
    generateSampleData(type) {
        this.showLoading();
        
        let data = [];
        
        switch(type) {
            case 'sales':
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                data = months.map(month => ({
                    month: month,
                    sales: Math.floor(Math.random() * 40000) + 10000,
                    profit: Math.floor(Math.random() * 8000) + 2000,
                    customers: Math.floor(Math.random() * 400) + 100
                }));
                break;
                
            case 'scatter':
                for (let i = 0; i < 100; i++) {
                    const x = Math.random() * 100;
                    const y = x * 2 + Math.random() * 40 - 20;
                    data.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
                }
                break;
                
            case 'heatmap':
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        data.push({
                            x: i,
                            y: j,
                            value: Math.round(Math.random() * 100 * 100) / 100
                        });
                    }
                }
                break;
                
            default: // random
                const categories = ['A', 'B', 'C', 'D', 'E'];
                data = categories.map(category => ({
                    category: category,
                    value: Math.floor(Math.random() * 90) + 10,
                    count: Math.floor(Math.random() * 150) + 50
                }));
                break;
        }
        
        this.currentData = data;
        this.updateVisualization();
        this.analyzeData();
        this.updateDataTable();
        this.showSuccessToast(`Generated ${type} dataset with ${data.length} records!`);
        this.hideLoading();
    }
    
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        this.showLoading();
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const data = this.parseCSV(text);
                
                if (data.length > 0) {
                    this.currentData = data;
                    this.updateVisualization();
                    this.analyzeData();
                    this.updateDataTable();
                    this.showSuccessToast(`Uploaded ${data.length} records from ${file.name}!`);
                }
            } catch (error) {
                console.error('Error parsing CSV:', error);
                this.showSuccessToast('Error parsing CSV file. Please check the format.', 'error');
            } finally {
                this.hideLoading();
            }
        };
        
        reader.readAsText(file);
    }
    
    parseCSV(text) {
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];
        
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const row = {};
            
            headers.forEach((header, index) => {
                let value = values[index]?.trim() || '';
                // Try to convert to number
                const numValue = parseFloat(value);
                row[header] = isNaN(numValue) ? value : numValue;
            });
            
            data.push(row);
        }
        
        return data;
    }
    
    updateVisualization() {
        if (!this.currentData || this.currentData.length === 0) return;
        
        const chartType = document.getElementById('chartType').value;
        const colors = this.colorPalettes[this.currentPalette];
        
        // Prepare data based on chart type
        const chartData = this.prepareChartData(this.currentData, chartType);
        
        // Update main chart
        this.mainChart.destroy();
        const mainCtx = document.getElementById('mainChart').getContext('2d');
        this.mainChart = new Chart(mainCtx, {
            type: chartType,
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: chartData.label,
                    data: chartData.data,
                    backgroundColor: colors,
                    borderColor: colors.map(c => c + '80'),
                    borderWidth: 2,
                    fill: chartType === 'line' ? false : true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0',
                            font: { size: 14 }
                        }
                    }
                },
                scales: chartType !== 'pie' && chartType !== 'doughnut' && chartType !== 'radar' ? {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(71, 85, 105, 0.3)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(71, 85, 105, 0.3)' }
                    }
                } : {}
            }
        });
        
        // Update mini charts
        this.updateMiniCharts(chartData, colors);
        
        // Update data summary
        this.updateDataSummary();
    }
    
    prepareChartData(data, chartType) {
        if (!data || data.length === 0) return { labels: [], data: [], label: 'No Data' };
        
        const firstRow = data[0];
        const keys = Object.keys(firstRow);
        
        // Find the best columns to use
        const stringColumns = keys.filter(key => typeof firstRow[key] === 'string');
        const numberColumns = keys.filter(key => typeof firstRow[key] === 'number');
        
        let labels = [];
        let values = [];
        let label = 'Data';
        
        if (stringColumns.length > 0 && numberColumns.length > 0) {
            // Use string column for labels, number column for values
            const labelCol = stringColumns[0];
            const valueCol = numberColumns[0];
            
            labels = data.map(row => row[labelCol]);
            values = data.map(row => row[valueCol]);
            label = valueCol;
        } else if (numberColumns.length >= 2) {
            // Use first number column for labels, second for values
            labels = data.map((row, index) => `Item ${index + 1}`);
            values = data.map(row => row[numberColumns[0]]);
            label = numberColumns[0];
        } else {
            // Fallback: use indices
            labels = data.map((row, index) => `Row ${index + 1}`);
            values = data.map(() => Math.random() * 100);
            label = 'Random Values';
        }
        
        return { labels, data: values, label };
    }
    
    updateMiniCharts(chartData, colors) {
        const miniChartTypes = ['bar', 'line', 'pie'];
        
        miniChartTypes.forEach(type => {
            if (this.miniCharts[type]) {
                this.miniCharts[type].destroy();
                
                const ctx = document.getElementById(type + 'Chart').getContext('2d');
                this.miniCharts[type] = new Chart(ctx, {
                    type: type,
                    data: {
                        labels: chartData.labels.slice(0, 5), // Limit for mini charts
                        datasets: [{
                            label: chartData.label,
                            data: chartData.data.slice(0, 5),
                            backgroundColor: colors.slice(0, 5),
                            borderColor: colors.slice(0, 5),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: { duration: 800 },
                        plugins: {
                            legend: {
                                display: type === 'pie',
                                labels: {
                                    color: '#e2e8f0',
                                    font: { size: 10 }
                                }
                            }
                        },
                        scales: type !== 'pie' ? {
                            x: {
                                ticks: { color: '#94a3b8', font: { size: 8 } },
                                grid: { color: 'rgba(71, 85, 105, 0.3)' }
                            },
                            y: {
                                ticks: { color: '#94a3b8', font: { size: 8 } },
                                grid: { color: 'rgba(71, 85, 105, 0.3)' }
                            }
                        } : {}
                    }
                });
            }
        });
    }
    
    updateDataSummary() {
        if (!this.currentData) return;
        
        const summary = document.getElementById('dataSummary');
        const numRows = this.currentData.length;
        const columns = Object.keys(this.currentData[0] || {});
        
        summary.innerHTML = `
            <p><strong>📊 Records:</strong> ${numRows}</p>
            <p><strong>📋 Columns:</strong> ${columns.length}</p>
            <p><strong>🏷️ Fields:</strong> ${columns.join(', ')}</p>
            <p><strong>📈 Chart Type:</strong> ${document.getElementById('chartType').value}</p>
        `;
    }
    
    analyzeData() {
        if (!this.currentData) return;
        
        const numRows = this.currentData.length;
        const columns = Object.keys(this.currentData[0] || {});
        const numericColumns = columns.filter(col => 
            typeof this.currentData[0][col] === 'number'
        );
        
        // Update insights
        const insights = [
            `Dataset contains ${numRows} records across ${columns.length} dimensions`,
            `Identified ${numericColumns.length} numeric variables suitable for statistical analysis`,
            'Data appears suitable for correlation analysis and trend detection',
            'Consider applying clustering algorithms to identify hidden patterns'
        ];
        
        const recommendations = [
            'Scatter plots recommended for exploring variable relationships',
            'Time series analysis could reveal temporal patterns',
            'Consider normalizing data for better visualization scaling',
            'Outlier detection might improve data quality'
        ];
        
        document.getElementById('statsInsights').innerHTML = 
            insights.map(insight => `<p>• ${insight}</p>`).join('');
        
        document.getElementById('recommendations').innerHTML = 
            recommendations.map(rec => `<p>💡 ${rec}</p>`).join('');
        
        document.getElementById('patterns').innerHTML = `
            <p>🔍 Detected ${numericColumns.length} numeric variables</p>
            <p>📊 ${numRows} data points analyzed</p>
            <p>🎯 Ready for correlation analysis</p>
        `;
    }
    
    updateDataTable() {
        if (!this.currentData || this.currentData.length === 0) return;
        
        const table = document.getElementById('dataTable');
        const columns = Object.keys(this.currentData[0]);
        
        // Create header
        const thead = table.querySelector('thead tr');
        thead.innerHTML = columns.map(col => `<th>${col}</th>`).join('');
        
        // Create body
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = this.currentData.slice(0, 10).map(row => 
            `<tr>${columns.map(col => `<td>${row[col]}</td>`).join('')}</tr>`
        ).join('');
        
        if (this.currentData.length > 10) {
            tbody.innerHTML += `<tr><td colspan="${columns.length}"><em>... and ${this.currentData.length - 10} more rows</em></td></tr>`;
        }
    }
    
    animateChart() {
        if (this.mainChart) {
            this.mainChart.update('active');
            this.showSuccessToast('Chart animated!');
        }
    }
    
    exportChart() {
        if (this.mainChart) {
            const url = this.mainChart.toBase64Image();
            const link = document.createElement('a');
            link.href = url;
            link.download = 'visualization.png';
            link.click();
            this.showSuccessToast('Chart exported as PNG!');
        }
    }
    
    randomizeColors() {
        this.currentPalette = (this.currentPalette + 1) % this.colorPalettes.length;
        this.updateVisualization();
        this.showSuccessToast('Colors randomized!');
    }
    
    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }
    
    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }
    
    showSuccessToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const messageElement = toast.querySelector('.toast-message');
        messageElement.textContent = message;
        
        // Change colors based on type
        if (type === 'error') {
            toast.style.background = '#ef4444';
        } else {
            toast.style.background = '#10b981';
        }
        
        toast.style.display = 'flex';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

// Global functions for HTML onclick events
let playground;

function generateSampleData(type) {
    playground.generateSampleData(type);
}

function handleFileUpload(event) {
    playground.handleFileUpload(event);
}

function updateVisualization() {
    playground.updateVisualization();
}

function animateChart() {
    playground.animateChart();
}

function exportChart() {
    playground.exportChart();
}

function randomizeColors() {
    playground.randomizeColors();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            playground = new DataVisualizationPlayground();
            
            // Generate initial sample data immediately
            playground.generateSampleData('sales');
        });
    } else {
        // Fallback for older browsers
        setTimeout(() => {
            playground = new DataVisualizationPlayground();
            
            // Generate initial sample data immediately
            playground.generateSampleData('sales');
        }, 0);
    }
});
