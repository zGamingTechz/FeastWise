// Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = today.toLocaleDateString('en-US', options);
    
    // Login button event listener
    document.getElementById('loginButton').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple static authentication
        if (username === 'admin' && password === 'admin') {
            // Hide login screen with fade out
            document.getElementById('loginContainer').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loginContainer').style.display = 'none';
                
                // Show loading screen
                document.getElementById('loadingScreen').classList.add('active');
                
                // After animation, show dashboard
                setTimeout(() => {
                    document.getElementById('loadingScreen').classList.remove('active');
                    document.getElementById('dashboard').style.display = 'flex';
                    initCharts();
                }, 2500);
            }, 500);
        } else {
            // Show error message for invalid credentials
            alert('Invalid credentials. Use admin/admin to log in.');
        }
    });

    // Allow pressing Enter to login
    document.getElementById('password').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('loginButton').click();
        }
    });

    // Menu item click handler
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show appropriate content based on menu item
            const menuText = this.querySelector('span').textContent;
            if (menuText === 'Dashboard') {
                alert('Already on Dashboard');
            } else {
                alert(`Navigating to ${menuText} section - This would be implemented in the full version`);
            }
        });
    });
    
    // Action buttons event listeners
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            let actionType = this.textContent.trim();
            
            // Create modal effect with more detailed information
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-overlay';
            
            // Different content for each action
            let modalHTML = '';
            if (actionType === 'Donate Now') {
                modalHTML = `
                    <div class="modal-content">
                        <h2>Donate Excess Food</h2>
                        <p>Connect with local charities and food banks to donate the excess food.</p>
                        <div class="charity-list">
                            <div class="charity-item">
                                <h3>Local Food Bank</h3>
                                <p>Can accept donations within 2 hours</p>
                                <button class="action-button donate">Select</button>
                            </div>
                            <div class="charity-item">
                                <h3>Homeless Shelter</h3>
                                <p>Needs food for tonight's dinner</p>
                                <button class="action-button donate">Select</button>
                            </div>
                        </div>
                        <button class="modal-close">Close</button>
                    </div>
                `;
            } else if (actionType === 'Create Deal') {
                modalHTML = `
                    <div class="modal-content">
                        <h2>Create Discounted Food Deal</h2>
                        <p>Offer remaining food at a discount to recover costs.</p>
                        <div class="form-group">
                            <label>Discount Percentage</label>
                            <input type="range" min="10" max="90" value="50" id="discountSlider">
                            <span id="discountValue">50%</span>
                        </div>
                        <div class="form-group">
                            <label>Notification Method</label>
                            <select>
                                <option>Email to Attendees</option>
                                <option>Local Marketplace App</option>
                                <option>Social Media Post</option>
                            </select>
                        </div>
                        <button class="action-button discount">Publish Deal</button>
                        <button class="modal-close">Cancel</button>
                    </div>
                `;
            } else if (actionType === 'Schedule Pickup') {
                modalHTML = `
                    <div class="modal-content">
                        <h2>Schedule Composting Pickup</h2>
                        <p>Send inedible food waste to local composting services.</p>
                        <div class="form-group">
                            <label>Estimated Waste Amount</label>
                            <input type="text" value="15 kg" readonly>
                        </div>
                        <div class="form-group">
                            <label>Pickup Date</label>
                            <input type="date" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Composting Service</label>
                            <select>
                                <option>GreenCompost Inc.</option>
                                <option>City Composting Services</option>
                                <option>EcoWaste Solutions</option>
                            </select>
                        </div>
                        <button class="action-button compost">Confirm Pickup</button>
                        <button class="modal-close">Cancel</button>
                    </div>
                `;
            }
            
            modalContent.innerHTML = modalHTML;
            document.body.appendChild(modalContent);
            
            // Add event listener to close button
            modalContent.querySelector('.modal-close').addEventListener('click', function() {
                document.body.removeChild(modalContent);
            });
            
            // Handle discount slider if present
            const discountSlider = modalContent.querySelector('#discountSlider');
            if (discountSlider) {
                const discountValue = modalContent.querySelector('#discountValue');
                discountSlider.addEventListener('input', function() {
                    discountValue.textContent = `${this.value}%`;
                });
            }
            
            // Add interaction for action buttons within modals
            const modalActionButtons = modalContent.querySelectorAll('.action-button');
            modalActionButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    alert('Action successful! This would initiate the process in the full version.');
                    document.body.removeChild(modalContent);
                });
            });
        });
    });
    
    // Chart time range selector
    document.getElementById('chartTimeRange').addEventListener('change', function() {
        updateChartData(this.value);
    });
    
    // Table action buttons
    const tableButtons = document.querySelectorAll('.table-action-button');
    tableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionType = this.textContent.trim();
            const row = this.closest('tr');
            const eventName = row.cells[0].textContent;
            
            if (actionType === 'View Report') {
                showEventReport(eventName, row);
            } else {
                showEventManagement(eventName, row);
            }
        });
    });

    // Add additional styles for modals
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-content h2 {
            color: #2E7D32;
            margin-bottom: 15px;
        }
        .charity-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
        }
        .charity-item {
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 8px;
        }
        .charity-item h3 {
            margin-bottom: 5px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .modal-close {
            background-color: #f5f5f5;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .event-report {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
        }
        .report-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            align-items: center;
        }
        .report-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .metric-card {
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            margin: 5px 0;
        }
        .metric-label {
            color: #666;
            font-size: 14px;
        }
        .saved-money {
            color: #4CAF50;
        }
        .wasted-money {
            color: #D32F2F;
        }
    `;
    document.head.appendChild(style);
});

// Initialize Charts
function initCharts() {
    // Attendance Chart
    const attendanceChartCtx = document.getElementById('attendanceChart').getContext('2d');
    
    // Sample data
    const eventNames = ['Charity Fundraiser', 'Wedding', 'Corporate Event', 'Birthday Party', 'Annual Conference'];
    const rsvpData = [187, 152, 98, 65, 210];
    const actualData = [152, 142, 85, 60, 195];
    
    // Calculate attendance percentages
    const percentageData = actualData.map((actual, index) => 
        Math.round((actual / rsvpData[index]) * 100)
    );
    
    // Create global chart variable so we can update it later
    window.attendanceChart = new Chart(attendanceChartCtx, {
        type: 'bar',
        data: {
            labels: eventNames,
            datasets: [
                {
                    label: 'RSVP Count',
                    data: rsvpData,
                    backgroundColor: 'rgba(139, 195, 74, 0.7)',
                    borderColor: 'rgba(139, 195, 74, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Actual Attendance',
                    data: actualData,
                    backgroundColor: 'rgba(46, 125, 50, 0.7)',
                    borderColor: 'rgba(46, 125, 50, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const attendance = percentageData[index];
                            return `Attendance Rate: ${attendance}%`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Event'
                    }
                }
            }
        }
    });
}

// Update chart data based on the selected time range
function updateChartData(timeRange) {
    let eventNames, rsvpData, actualData;
    
    if (timeRange === 'Last 5 Events') {
        eventNames = ['Charity Fundraiser', 'Wedding', 'Corporate Event', 'Birthday Party', 'Annual Conference'];
        rsvpData = [187, 152, 98, 65, 210];
        actualData = [152, 142, 85, 60, 195];
    } else if (timeRange === 'Last 10 Events') {
        eventNames = [
            'Charity Fundraiser', 'Wedding', 'Corporate Event', 'Birthday Party', 'Annual Conference',
            'Tech Summit', 'Gala Dinner', 'Product Launch', 'Team Building', 'Community Meetup'
        ];
        rsvpData = [187, 152, 98, 65, 210, 175, 120, 90, 45, 80];
        actualData = [152, 142, 85, 60, 195, 158, 110, 82, 40, 72];
    } else { // All Events
        eventNames = [
            'Charity Fundraiser', 'Wedding', 'Corporate Event', 'Birthday Party', 'Annual Conference',
            'Tech Summit', 'Gala Dinner', 'Product Launch', 'Team Building', 'Community Meetup',
            'Holiday Party', 'Award Ceremony', 'Networking Event', 'Music Festival', 'Company Retreat'
        ];
        rsvpData = [187, 152, 98, 65, 210, 175, 120, 90, 45, 80, 150, 200, 85, 320, 60];
        actualData = [152, 142, 85, 60, 195, 158, 110, 82, 40, 72, 130, 180, 75, 290, 55];
    }
    
    // Update chart data
    window.attendanceChart.data.labels = eventNames;
    window.attendanceChart.data.datasets[0].data = rsvpData;
    window.attendanceChart.data.datasets[1].data = actualData;
    window.attendanceChart.update();
}

// Show event report for completed events
function showEventReport(eventName, row) {
    // Create modal with event report
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-overlay';
    
    // Create a mock report with realistic data
    const rsvpCount = parseInt(row.cells[3].textContent);
    const actualAttendance = Math.round(rsvpCount * 0.85); // 85% attendance
    const wastageCount = rsvpCount - actualAttendance;
    const costPerPerson = 45; // $45 per person for food
    const wastedAmount = wastageCount * costPerPerson;
    const savedAmount = Math.round(wastedAmount * 0.6); // 60% saved through management
    
    modalContent.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="report-header">
                <h2>Event Report: ${eventName}</h2>
                <span>March 28, 2025</span>
            </div>
            
            <p>The event was successfully completed with the following metrics:</p>
            
            <div class="report-metrics">
                <div class="metric-card">
                    <div class="metric-label">RSVP Count</div>
                    <div class="metric-value">${rsvpCount}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Actual Attendance</div>
                    <div class="metric-value">${actualAttendance}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Attendance Rate</div>
                    <div class="metric-value">${Math.round((actualAttendance/rsvpCount)*100)}%</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">No-shows</div>
                    <div class="metric-value">${wastageCount}</div>
                </div>
            </div>
            
            <h3>Food Waste Management</h3>
            <div class="report-metrics">
                <div class="metric-card">
                    <div class="metric-label">Potential Waste Value</div>
                    <div class="metric-value wasted-money">$${wastedAmount}</div>
                    <div class="metric-desc">Based on $${costPerPerson} per person</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Amount Saved</div>
                    <div class="metric-value saved-money">$${savedAmount}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Waste Reduction</div>
                    <div class="metric-value">60%</div>
                </div>
            </div>
            
            <h3>Actions Taken</h3>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Donated 15 meals to Local Food Bank</li>
                <li>Sold 8 discounted meal packages to staff</li>
                <li>Composted 5kg of inedible food waste</li>
            </ul>
            
            <h3>AI Recommendations for Future Events</h3>
            <p>Based on historical data analysis:</p>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Consider preparing for 15% fewer guests than RSVP count</li>
                <li>Set up a reminder system 24 hours before event to confirm attendance</li>
                <li>Prepare 10% of food closer to event time based on final confirmations</li>
            </ul>
            
            <button class="action-button" style="margin-right: 10px;">Download Full Report</button>
            <button class="modal-close">Close</button>
        </div>
    `;
    
    document.body.appendChild(modalContent);
    
    // Add event listener to close button
    modalContent.querySelector('.modal-close').addEventListener('click', function() {
        document.body.removeChild(modalContent);
    });
    
    // Handle download button
    modalContent.querySelector('.action-button').addEventListener('click', function() {
        alert('Report would be downloaded in the full version.');
    });
}

// Show event management for upcoming/active events
function showEventManagement(eventName, row) {
    // Create modal with event management options
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-overlay';
    
    const eventDate = row.cells[1].textContent;
    const location = row.cells[2].textContent;
    const rsvpCount = row.cells[3].textContent;
    const status = row.cells[4].querySelector('.status').textContent;
    
    // Different management options based on status
    let managementOptions = '';
    if (status === 'Today') {
        managementOptions = `
            <div style="margin: 20px 0;">
                <h3>Today's Event Management</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <button class="action-button">Start Check-in</button>
                    <button class="action-button">View Guest List</button>
                    <button class="action-button">Monitor Food Prep</button>
                    <button class="action-button">Update Attendance</button>
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <h3>Real-time Metrics</h3>
                <div class="report-metrics">
                    <div class="metric-card">
                        <div class="metric-label">Checked In</div>
                        <div class="metric-value">32</div>
                        <div class="metric-desc">of ${rsvpCount}</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Current Prediction</div>
                        <div class="metric-value">41</div>
                        <div class="metric-desc">Expected no-shows</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        managementOptions = `
            <div style="margin: 20px 0;">
                <h3>Plan for this Event</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <button class="action-button">Edit Event Details</button>
                    <button class="action-button">Manage Guest List</button>
                    <button class="action-button">Food Planning</button>
                    <button class="action-button">Send Reminders</button>
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <h3>AI Predictions</h3>
                <div class="report-metrics">
                    <div class="metric-card">
                        <div class="metric-label">Expected Attendance</div>
                        <div class="metric-value">${Math.round(parseInt(rsvpCount) * 0.85)}</div>
                        <div class="metric-desc">Based on similar events</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Recommended Prep</div>
                        <div class="metric-value">${Math.round(parseInt(rsvpCount) * 0.9)}</div>
                        <div class="metric-desc">Food servings</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    modalContent.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="report-header">
                <h2>Manage Event: ${eventName}</h2>
                <span class="status ${status === 'Today' ? 'status-active' : 'status-upcoming'}">${status}</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                <div>
                    <div style="font-weight: 500;">Date & Time</div>
                    <div>${eventDate} at 6:00 PM</div>
                </div>
                <div>
                    <div style="font-weight: 500;">Location</div>
                    <div>${location}</div>
                </div>
                <div>
                    <div style="font-weight: 500;">RSVP Count</div>
                    <div>${rsvpCount} guests</div>
                </div>
            </div>
            
            ${managementOptions}
            
            <button class="modal-close">Close</button>
        </div>
    `;
    
    document.body.appendChild(modalContent);
    
    // Add event listener to close button
    modalContent.querySelector('.modal-close').addEventListener('click', function() {
        document.body.removeChild(modalContent);
    });
    
    // Handle action buttons
    const actionButtons = modalContent.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert(`This would open the "${this.textContent}" functionality in the full version.`);
        });
    });
}